"""Utilities for building the model timeline."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import List

import pandas as pd


@dataclass
class Timeline:
    start_month: pd.Timestamp
    months: int

    @classmethod
    def from_start(cls, start_month: str, months: int = 60) -> "Timeline":
        ts = pd.Period(start_month, freq="M").to_timestamp()
        return cls(start_month=ts, months=months)

    @property
    def monthly_index(self) -> pd.Index:
        return pd.period_range(self.start_month, periods=self.months, freq="M").to_timestamp()

    @property
    def year_index(self) -> pd.Index:
        years = sorted({ts.year for ts in self.monthly_index})
        return pd.Index(years, name="Year")

    def to_month_labels(self) -> List[str]:
        return [ts.strftime("%Y-%m") for ts in self.monthly_index]

    def to_year_labels(self) -> List[str]:
        return [str(year) for year in self.year_index]
