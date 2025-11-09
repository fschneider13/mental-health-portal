from __future__ import annotations

from pathlib import Path

import pytest

pd = pytest.importorskip("pandas")

from auora_model.core.model import AuoraModel


@pytest.fixture()
def workbook_path(tmp_path: Path) -> Path:
    path = tmp_path / "model.xlsx"
    scenarios = pd.DataFrame(
        {
            "Parameter": [
                "Initial clients",
                "New clients per month",
                "Churn %",
                "Avg price per client (R$/month)",
                "Set-up ticket (R$ per new client)",
                "Taxes on revenue",
                "Fixed monthly costs",
                "Variable cost per client",
                "Capex",
                "Working capital variation",
                "WACC",
                "VC multiple",
                "Exit year",
            ],
            "Base": [
                100,
                10,
                0.02,
                4000,
                8000,
                0.12,
                50000,
                1500,
                10000,
                2000,
                0.18,
                5,
                2030,
            ],
            "Bull": [
                120,
                15,
                0.015,
                4200,
                9000,
                0.11,
                48000,
                1300,
                15000,
                2500,
                0.16,
                6,
                2031,
            ],
            "Bear": [
                90,
                5,
                0.03,
                3800,
                7000,
                0.13,
                52000,
                1800,
                8000,
                1500,
                0.22,
                4,
                2029,
            ],
        }
    )
    inputs = pd.DataFrame({"Parameter": ["Example"], "Value": [1]})
    with pd.ExcelWriter(path, engine="openpyxl") as writer:
        scenarios.to_excel(writer, sheet_name="Scenarios", index=False)
        inputs.to_excel(writer, sheet_name="Inputs", index=False)
    return path


def test_model_generates_expected_sheets(workbook_path: Path):
    model = AuoraModel(workbook_path)
    results = model.run(scenario="Base", start_month="2026-01", months=24)
    assert "P&L" in results.sheets
    assert "P&L (Y)" in results.sheets
    assert "DCF Valuation" in results.sheets

    pnl = results.sheets["P&L"]
    months = pnl.columns[:2]
    gross_first = pnl.loc["Gross Revenue", months[0]]
    assert gross_first > 0

    pnl_yearly = results.sheets["P&L (Y)"]
    year = pnl_yearly.columns[0]
    assert pytest.approx(pnl.loc["Net Revenue", months].sum(), rel=1e-6) == pnl_yearly.loc["Net Revenue", year]


def test_cli_run_all(tmp_path: Path, workbook_path: Path):
    from typer.testing import CliRunner

    from auora_model import cli

    runner = CliRunner()
    result = runner.invoke(
        cli.app,
        [
            "run-all",
            "--workbook",
            str(workbook_path),
            "--scenario",
            "Bull",
            "--start-month",
            "2026-01",
            "--months",
            "12",
            "--overrides",
            "New clients per month=20",
        ],
    )
    assert result.exit_code == 0
    assert "Generated" in result.stdout

