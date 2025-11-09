"""FastAPI application exposing the model results."""
from __future__ import annotations

from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, Mapping, Optional

from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel, Field

from ..core.model import AuoraModel


class RunRequest(BaseModel):
    scenario: str = Field("Base", description="Scenario column to use from the Scenarios sheet")
    start_month: str = Field("2026-01", description="Start month in YYYY-MM format")
    months: int = Field(60, ge=1, le=120, description="Number of months to simulate")
    overrides: Dict[str, float] | None = Field(default=None, description="Overrides for input parameters")


class RunResponse(BaseModel):
    scenario: str
    start_month: str
    sheets: Dict[str, list[dict]]


class SheetResponse(BaseModel):
    name: str
    records: list[dict]


class AppConfig(BaseModel):
    workbook_path: Path


def create_app(workbook_path: Path) -> FastAPI:
    app = FastAPI(title="Auora Financial Model API")

    config = AppConfig(workbook_path=workbook_path)

    @lru_cache
    def get_model() -> AuoraModel:
        return AuoraModel(config.workbook_path)

    @app.post("/run", response_model=RunResponse)
    def run_model(request: RunRequest, model: AuoraModel = Depends(get_model)) -> RunResponse:
        results = model.run(
            scenario=request.scenario,
            start_month=request.start_month,
            overrides=request.overrides,
            months=request.months,
        )
        return RunResponse(scenario=results.scenario, start_month=results.start_month, sheets=results.to_json())

    @app.get("/results/{sheet}", response_model=SheetResponse)
    def get_sheet(sheet: str, model: AuoraModel = Depends(get_model)) -> SheetResponse:
        results = model.run(scenario="Base", start_month="2026-01")
        if sheet not in results.sheets:
            raise HTTPException(status_code=404, detail=f"Sheet '{sheet}' not found")
        return SheetResponse(name=sheet, records=results.sheets[sheet].reset_index().to_dict(orient="records"))

    @app.get("/export/xlsx")
    def export_excel(model: AuoraModel = Depends(get_model)) -> Dict[str, Any]:
        results = model.run(scenario="Base", start_month="2026-01")
        json_payload = results.to_json()
        return {"sheets": json_payload}

    return app

