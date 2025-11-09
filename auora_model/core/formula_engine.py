"""Minimal formula helpers mirroring the Excel workbook patterns."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Iterable, Mapping, Tuple

import numpy as np
import pandas as pd


@dataclass
class ModelContext:
    sheets: Dict[str, pd.DataFrame]

    def get_sheet(self, name: str) -> pd.DataFrame:
        try:
            return self.sheets[name]
        except KeyError as exc:
            raise KeyError(f"Sheet '{name}' not computed yet") from exc


def direct_reference(context: ModelContext, sheet: str, label: str, column: str) -> float:
    df = context.get_sheet(sheet)
    return float(df.loc[label, column])


def index_match(context: ModelContext, source_sheet: str, target_label: str, column_offset: int) -> float:
    df = context.get_sheet(source_sheet)
    columns = list(df.columns)
    if column_offset >= len(columns):
        raise IndexError(f"Column offset {column_offset} out of bounds for sheet {source_sheet}")
    column = columns[column_offset]
    return float(df.loc[target_label, column])


def yearly_aggregate(monthly: pd.DataFrame) -> pd.DataFrame:
    years = [col.split("-")[0] for col in monthly.columns]
    stacked = monthly.copy()
    stacked.columns = years
    aggregated = stacked.groupby(level=0, axis=1).sum()
    return aggregated


def convert_annual_to_monthly_rate(rate: float) -> float:
    return (1 + rate) ** (1 / 12) - 1


def discount_cashflows(cashflows: Iterable[float], monthly_rate: float) -> Tuple[np.ndarray, np.ndarray]:
    cashflows = np.asarray(list(cashflows), dtype=float)
    periods = np.arange(1, len(cashflows) + 1)
    discount_factors = 1 / (1 + monthly_rate) ** periods
    discounted = cashflows * discount_factors
    return discounted, discount_factors
