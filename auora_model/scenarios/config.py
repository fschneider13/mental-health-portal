"""Scenario loading and overrides."""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, Iterable, Mapping, MutableMapping, Optional

import pandas as pd


@dataclass
class Scenario:
    name: str
    parameters: Dict[str, float]

    def with_overrides(self, overrides: Mapping[str, float]) -> "Scenario":
        merged = dict(self.parameters)
        merged.update({k: float(v) for k, v in overrides.items()})
        return Scenario(name=self.name, parameters=merged)


class ScenarioManager:
    """Reads scenario information from the `Scenarios` worksheet."""

    def __init__(self, scenario_sheet: pd.DataFrame) -> None:
        self.scenario_sheet = scenario_sheet
        self.scenario_sheet.columns = [str(col) for col in self.scenario_sheet.columns]
        if "Parameter" not in self.scenario_sheet.columns:
            raise ValueError("Scenario sheet must contain a 'Parameter' column")
        self.scenario_sheet = self.scenario_sheet.set_index("Parameter", drop=True)

    @property
    def available_scenarios(self) -> Iterable[str]:
        for column in self.scenario_sheet.columns:
            yield column

    def get(self, name: str) -> Scenario:
        if name not in self.scenario_sheet.columns:
            available = ", ".join(self.scenario_sheet.columns)
            raise KeyError(f"Scenario '{name}' not found. Available: {available}")
        series = self.scenario_sheet[name].dropna()
        parameters = {str(idx): float(value) for idx, value in series.items()}
        return Scenario(name=name, parameters=parameters)

    def apply_overrides(self, scenario: str, overrides: Optional[Mapping[str, float]] = None) -> Scenario:
        base = self.get(scenario)
        return base.with_overrides(overrides or {})

