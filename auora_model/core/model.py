"""High level orchestration for the Auora model."""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, Mapping, Optional

import pandas as pd

from ..io.excel_loader import ExcelModelLoader, ensure_required_sheets
from ..scenarios.config import ScenarioManager
from .calculators import DEFAULT_CALCULATORS, SheetCalculator
from .formula_engine import ModelContext
from .timeline import Timeline

REQUIRED_SHEETS = [
    "Inputs",
    "Scenarios",
]


@dataclass
class ModelResults:
    scenario: str
    start_month: str
    sheets: Dict[str, pd.DataFrame]

    def to_excel(self, output_path: Path) -> None:
        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        with pd.ExcelWriter(output_path, engine="openpyxl") as writer:
            for sheet_name, df in self.sheets.items():
                df.reset_index().to_excel(writer, sheet_name=sheet_name, index=False)

    def to_csv(self, output_dir: Path) -> Dict[str, Path]:
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)
        exported: Dict[str, Path] = {}
        for sheet_name, df in self.sheets.items():
            path = output_dir / f"{sheet_name}.csv"
            df.reset_index().to_csv(path, index=False)
            exported[sheet_name] = path
        return exported

    def to_json(self) -> Dict[str, list[dict]]:
        payload: Dict[str, list[dict]] = {}
        for sheet_name, df in self.sheets.items():
            payload[sheet_name] = df.reset_index().to_dict(orient="records")
        return payload


class AuoraModel:
    """Python reimplementation of the Auora SaaS Excel model."""

    def __init__(self, workbook_path: Path, calculators: Optional[Iterable[SheetCalculator]] = None) -> None:
        self.workbook_path = Path(workbook_path)
        self.loader = ExcelModelLoader(self.workbook_path)
        ensure_required_sheets(self.loader, REQUIRED_SHEETS)
        self.calculators = list(calculators or DEFAULT_CALCULATORS)
        self._scenario_manager: Optional[ScenarioManager] = None

    @property
    def scenario_manager(self) -> ScenarioManager:
        if self._scenario_manager is None:
            scenario_sheet = self.loader.load_sheet("Scenarios").data
            self._scenario_manager = ScenarioManager(scenario_sheet)
        return self._scenario_manager

    def run(
        self,
        *,
        scenario: str,
        start_month: str,
        overrides: Optional[Mapping[str, float]] = None,
        months: int = 60,
    ) -> ModelResults:
        scenario_obj = self.scenario_manager.apply_overrides(scenario, overrides)
        timeline = Timeline.from_start(start_month, months=months)

        context = ModelContext(sheets={})
        sheets: Dict[str, pd.DataFrame] = {}
        for calculator in self.calculators:
            result = calculator.compute(context, timeline, scenario_obj.parameters)
            context.sheets[result.name] = result.dataframe
            sheets[result.name] = result.dataframe
        return ModelResults(scenario=scenario, start_month=start_month, sheets=sheets)

    def available_scenarios(self) -> Iterable[str]:
        return self.scenario_manager.available_scenarios

