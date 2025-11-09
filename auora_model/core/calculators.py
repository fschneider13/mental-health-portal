"""Sheet calculators implementing a subset of the Excel workbook."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Iterable, Mapping, MutableMapping, Optional

import numpy as np
import pandas as pd

from .formula_engine import ModelContext, convert_annual_to_monthly_rate, discount_cashflows, yearly_aggregate
from .timeline import Timeline


@dataclass
class SheetResult:
    name: str
    dataframe: pd.DataFrame


class SheetCalculator:
    name: str

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        raise NotImplementedError


class ClientGrowthCalculator(SheetCalculator):
    name = "Client Growth"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        months = timeline.to_month_labels()
        initial_clients = scenario_parameters.get("Initial clients", 0.0)
        new_clients = scenario_parameters.get("New clients per month", 0.0)
        churn = scenario_parameters.get("Churn %", 0.0)

        data = []
        current = initial_clients
        for month in months:
            acquired = new_clients
            churned = current * churn
            current = current + acquired - churned
            data.append({
                "Month": month,
                "Installed Base": current,
                "New Clients": acquired,
                "Churned Clients": churned,
            })
        df = pd.DataFrame(data).set_index("Month").T
        df.index.name = "Metric"
        return SheetResult(name=self.name, dataframe=df)


class RevenueCalculator(SheetCalculator):
    name = "Revenue"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        client_growth = context.get_sheet("Client Growth")
        months = timeline.to_month_labels()
        price = scenario_parameters.get("Avg price per client (R$/month)", 0.0)
        setup = scenario_parameters.get("Set-up ticket (R$ per new client)", 0.0)

        mrr = client_growth.loc["Installed Base", months] * price
        setup_revenue = client_growth.loc["New Clients", months] * setup
        df = pd.DataFrame({"MRR": mrr, "Setup": setup_revenue, "Total Revenue": mrr + setup_revenue})
        df = df.T
        df.index.name = "Metric"
        return SheetResult(name=self.name, dataframe=df)


class RevenueYearlyCalculator(SheetCalculator):
    name = "Revenue (Y)"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        monthly = context.get_sheet("Revenue")
        aggregated = yearly_aggregate(monthly)
        aggregated.index.name = "Metric"
        return SheetResult(name=self.name, dataframe=aggregated)


class CostsCalculator(SheetCalculator):
    name = "Costs"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        months = timeline.to_month_labels()
        fixed_cost = scenario_parameters.get("Fixed monthly costs", 0.0)
        variable_per_client = scenario_parameters.get("Variable cost per client", 0.0)
        client_growth = context.get_sheet("Client Growth")
        variable_costs = client_growth.loc["Installed Base", months] * variable_per_client
        df = pd.DataFrame({
            "Fixed": np.repeat(fixed_cost, len(months)),
            "Variable": variable_costs,
            "Total Costs": variable_costs + fixed_cost,
        }, index=months).T
        df.index.name = "Metric"
        return SheetResult(name=self.name, dataframe=df)


class CostsYearlyCalculator(SheetCalculator):
    name = "Costs (Y)"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        monthly = context.get_sheet("Costs")
        aggregated = yearly_aggregate(monthly)
        aggregated.index.name = "Metric"
        return SheetResult(name=self.name, dataframe=aggregated)


class PLCalculator(SheetCalculator):
    name = "P&L"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        revenue = context.get_sheet("Revenue")
        costs = context.get_sheet("Costs")
        months = timeline.to_month_labels()
        taxes_rate = scenario_parameters.get("Taxes on revenue", 0.0)

        gross = revenue.loc["Total Revenue", months]
        taxes = gross * taxes_rate
        net_revenue = gross - taxes
        total_costs = costs.loc["Total Costs", months]
        ebitda = net_revenue - total_costs

        df = pd.DataFrame({
            "Gross Revenue": gross,
            "Taxes": taxes,
            "Net Revenue": net_revenue,
            "Total Costs": total_costs,
            "EBITDA": ebitda,
        }).T
        df.index.name = "Metric"
        return SheetResult(name=self.name, dataframe=df)


class PLYearlyCalculator(SheetCalculator):
    name = "P&L (Y)"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        monthly = context.get_sheet("P&L")
        aggregated = yearly_aggregate(monthly)
        aggregated.index.name = "Metric"
        return SheetResult(name=self.name, dataframe=aggregated)


class CashFlowCalculator(SheetCalculator):
    name = "CashFlow"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        pl = context.get_sheet("P&L")
        months = timeline.to_month_labels()
        capex = scenario_parameters.get("Capex", 0.0)
        delta_wc = scenario_parameters.get("Working capital variation", 0.0)

        ebitda = pl.loc["EBITDA", months]
        free_cashflow = ebitda - capex - delta_wc
        df = pd.DataFrame({
            "EBITDA": ebitda,
            "Capex": np.repeat(capex, len(months)),
            "Working Capital": np.repeat(delta_wc, len(months)),
            "FCFF": free_cashflow,
        }).T
        df.index.name = "Metric"
        return SheetResult(name=self.name, dataframe=df)


class CashFlowYearlyCalculator(SheetCalculator):
    name = "CashFlow (Y)"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        monthly = context.get_sheet("CashFlow")
        aggregated = yearly_aggregate(monthly)
        aggregated.index.name = "Metric"
        return SheetResult(name=self.name, dataframe=aggregated)


class DCFValuationCalculator(SheetCalculator):
    name = "DCF Valuation"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        cashflow = context.get_sheet("CashFlow")
        months = timeline.to_month_labels()
        annual_wacc = scenario_parameters.get("WACC", 0.0)
        monthly_wacc = convert_annual_to_monthly_rate(annual_wacc)
        fcff = cashflow.loc["FCFF", months]
        discounted, factors = discount_cashflows(fcff.values, monthly_wacc)
        df = pd.DataFrame({
            "FCFF": fcff.values,
            "Discount Factor": factors,
            "Present Value": discounted,
        }, index=months).T
        df.index.name = "Metric"
        total = discounted.sum()
        df.loc["Enterprise Value"] = [total for _ in months]
        return SheetResult(name=self.name, dataframe=df)


class VCMethodCalculator(SheetCalculator):
    name = "VC Method"

    def compute(self, context: ModelContext, timeline: Timeline, scenario_parameters: Mapping[str, float]) -> SheetResult:
        pl_yearly = context.get_sheet("P&L (Y)")
        valuation_multiple = scenario_parameters.get("VC multiple", 5.0)
        exit_year = scenario_parameters.get("Exit year", float(timeline.year_index[-1]))

        if str(int(exit_year)) not in pl_yearly.columns:
            exit_column = pl_yearly.columns[-1]
        else:
            exit_column = str(int(exit_year))
        revenue_exit = pl_yearly.loc["Net Revenue", exit_column]
        valuation = revenue_exit * valuation_multiple
        df = pd.DataFrame({
            "Metric": ["Exit Revenue", "Multiple", "Post-money"],
            "Value": [revenue_exit, valuation_multiple, valuation],
        }).set_index("Metric").T
        return SheetResult(name=self.name, dataframe=df)


DEFAULT_CALCULATORS: Iterable[SheetCalculator] = (
    ClientGrowthCalculator(),
    RevenueCalculator(),
    RevenueYearlyCalculator(),
    CostsCalculator(),
    CostsYearlyCalculator(),
    PLCalculator(),
    PLYearlyCalculator(),
    CashFlowCalculator(),
    CashFlowYearlyCalculator(),
    DCFValuationCalculator(),
    VCMethodCalculator(),
)
