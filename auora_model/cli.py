"""Command line interface for the Auora model."""
from __future__ import annotations

from pathlib import Path
from typing import Dict, Optional

import typer

from .core.model import AuoraModel

app = typer.Typer(add_completion=False, help="Run the Auora SaaS financial model")


def _load_model(workbook: Path) -> AuoraModel:
    return AuoraModel(workbook)


@app.command("run-monthly")
def run_monthly(
    workbook: Path = typer.Option(..., exists=True, dir_okay=False, help="Path to the source Excel model"),
    scenario: str = typer.Option("Base", help="Scenario column to use"),
    start_month: str = typer.Option("2026-01", help="Start month in YYYY-MM format"),
    months: int = typer.Option(60, help="Number of months to simulate"),
):
    model = _load_model(workbook)
    results = model.run(scenario=scenario, start_month=start_month, months=months)
    typer.echo(results.sheets["P&L"].to_string())


@app.command("run-yearly")
def run_yearly(
    workbook: Path = typer.Option(..., exists=True, dir_okay=False, help="Path to the source Excel model"),
    scenario: str = typer.Option("Base", help="Scenario column to use"),
    start_month: str = typer.Option("2026-01", help="Start month in YYYY-MM format"),
    months: int = typer.Option(60, help="Number of months to simulate"),
):
    model = _load_model(workbook)
    results = model.run(scenario=scenario, start_month=start_month, months=months)
    typer.echo(results.sheets["P&L (Y)"].to_string())


@app.command("run-all")
def run_all(
    workbook: Path = typer.Option(..., exists=True, dir_okay=False, help="Path to the source Excel model"),
    scenario: str = typer.Option("Base", help="Scenario column to use"),
    start_month: str = typer.Option("2026-01", help="Start month in YYYY-MM format"),
    months: int = typer.Option(60, help="Number of months to simulate"),
    overrides: Optional[str] = typer.Option(None, help="Overrides in key=value format separated by commas"),
    export_xlsx: Optional[Path] = typer.Option(None, help="Optional path to export the reconstructed workbook"),
    export_csv: Optional[Path] = typer.Option(None, help="Optional directory to export per-sheet CSV files"),
):
    model = _load_model(workbook)
    parsed_overrides: Dict[str, float] = {}
    if overrides:
        for pair in overrides.split(","):
            key, value = pair.split("=", 1)
            parsed_overrides[key.strip()] = float(value)
    results = model.run(scenario=scenario, start_month=start_month, overrides=parsed_overrides or None, months=months)
    typer.echo(f"Generated {len(results.sheets)} sheets for scenario {scenario}")
    if export_xlsx:
        results.to_excel(export_xlsx)
        typer.echo(f"Exported workbook to {export_xlsx}")
    if export_csv:
        results.to_csv(export_csv)
        typer.echo(f"Exported CSV files to {export_csv}")


if __name__ == "__main__":
    app()
