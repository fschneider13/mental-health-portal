# Mental Health Assessment Portal

A static web portal for mental health assessments (PHQ-9, GAD-7, DASS-21) deployed on GitHub Pages with GitHub Actions CI/CD.

## Setup on GitHub

### Create Repository

- Create a repository at [https://github.com/fschneider13/mental-health-portal](https://github.com/fschneider13/mental-health-portal).

### Firebase Configuration

1. Set up a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Google Authentication** and add your app's domain under **Authorized domains** to allow login locally and when deployed.
3. Add the following Firebase configuration values as GitHub Secrets under **Settings > Secrets and variables > Actions**:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

### Local Development

1. Copy `.env.example` to `.env.local`.
2. Add your Firebase configuration values to `.env.local` to connect the app to your Firebase project when running `next dev`.

### Add Files

- Upload all project files to the `main` branch via GitHub’s web interface or CLI.
- Ensure the following files are included:
  - `package.json`
  - `next.config.js`
  - `.github/workflows/deploy.yml`

## Deployment

- Push changes to the `main` branch to trigger the GitHub Actions workflow.
- The site will be deployed to [https://fschneider13.github.io/mental-health-portal/](https://fschneider13.github.io/mental-health-portal/).

## Notes

- **Questionnaires**: Implement PHQ-9, GAD-7, and DASS-21 questions in `pages/phq9.jsx`, `pages/gad7.jsx`, and `pages/dass21.jsx`. (Note: Questionnaire content is not included due to copyright restrictions.)
- **GitHub Pages**: Enable GitHub Pages in **Settings > Pages**, selecting the `gh-pages` branch as the source.
- **Issues**: Use GitHub Issues to track feedback and bug reports.
---

## Auora Financial Model (Python)

This repository now also contains a Python package (`auora_model`) that reimplements the Auora SaaS valuation spreadsheet as a programmable pipeline. The implementation focuses on parity with the Excel workbook by:

- Preserving sheet names and relying on the first column as the label index for cross-sheet lookups.
- Loading scenario assumptions from the **Scenarios** worksheet and allowing overrides via CLI/API.
- Rebuilding the calculation pipeline across client growth, revenue, costs, P&L, cash flow, and valuation modules.
- Exporting reconstructed results back to Excel, CSV, or JSON outputs.

### Project layout

```
pyproject.toml
auora_model/
  api/            # FastAPI application (create_app)
  core/           # Timeline utilities, calculators, orchestration
  io/             # Excel loaders/export helpers
  scenarios/      # Scenario configuration loader
  cli.py          # Typer CLI entrypoint
tests/             # pytest-based regression tests
```

### Running the CLI

```bash
python -m auora_model.cli run-all \
  --workbook Auora_SaaS_Model_Valuation_v9_2_compat_nodraw_2025-10-18.xlsx \
  --scenario Base \
  --start-month 2026-01 \
  --months 60 \
  --overrides "New clients per month=18,Taxes on revenue=0.11" \
  --export-xlsx out.xlsx \
  --export-csv ./exports
```

### API server

```bash
uvicorn auora_model.api.app:create_app --factory --host 0.0.0.0 --port 8000 \
  --workbook Auora_SaaS_Model_Valuation_v9_2_compat_nodraw_2025-10-18.xlsx
```

Endpoints:

- `POST /run` – Execute the model for a scenario/start month and optional overrides.
- `GET /results/{sheet}` – Retrieve a specific worksheet as JSON records.
- `GET /export/xlsx` – Download all reconstructed sheets as JSON suitable for writing to Excel.

### Tests

Install the package (editable mode recommended) and run pytest:

```bash
pip install -e .[test]
pytest
```

The tests build a lightweight workbook fixture covering Base/Bull/Bear scenarios, exercise the CLI, and verify that yearly aggregates match monthly totals.

### Extending the calculators

The calculators in `auora_model/core/calculators.py` encapsulate the translation from Excel formulas to pandas/NumPy operations. Each calculator implements the same order of execution as the workbook. Additional sheets can be added by implementing new `SheetCalculator` subclasses and registering them in `DEFAULT_CALCULATORS`.
