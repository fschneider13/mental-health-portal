"""Utilities for loading and exporting Auora Excel workbooks."""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, Mapping, Optional

import pandas as pd


@dataclass
class SheetData:
    """Container for a labelled sheet.

    The first column of the sheet is considered the label index and is always
    converted to string to facilitate lookups that mimic Excel's INDEX/MATCH
    behaviour.
    """

    name: str
    data: pd.DataFrame

    def labelled(self) -> pd.DataFrame:
        """Return the dataframe with a string index based on the first column."""
        if self.data.empty:
            return self.data
        df = self.data.copy()
        first_col = df.columns[0]
        df[first_col] = df[first_col].astype(str)
        df = df.set_index(first_col, drop=True)
        return df


class ExcelModelLoader:
    """Helper responsible for reading the source Excel model."""

    def __init__(self, workbook_path: Path) -> None:
        self.workbook_path = Path(workbook_path)
        if not self.workbook_path.exists():
            raise FileNotFoundError(f"Workbook not found: {self.workbook_path}")

    def load_sheet(self, name: str, *, header: int = 0, index_col: Optional[int] = None) -> SheetData:
        df = pd.read_excel(self.workbook_path, sheet_name=name, header=header, index_col=index_col, engine="openpyxl")
        if isinstance(df, pd.Series):
            df = df.to_frame()
        return SheetData(name=name, data=df)

    def load_labelled_sheet(self, name: str) -> pd.DataFrame:
        return self.load_sheet(name).labelled()


def ensure_required_sheets(loader: ExcelModelLoader, required: Iterable[str]) -> None:
    missing: list[str] = []
    for sheet in required:
        try:
            loader.load_sheet(sheet)
        except ValueError:
            missing.append(sheet)
    if missing:
        missing_list = ", ".join(missing)
        raise ValueError(f"Workbook {loader.workbook_path} is missing sheets: {missing_list}")
