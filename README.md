#
Mental Health Assessment Portal
A static web portal for mental health assessments (PHQ-9, GAD-7, DASS-21) deployed on GitHub Pages with GitHub Actions CI/CD.
Setup on GitHub

Create Repository:

Created at https://github.com/fschneider13/mental-health-portal.

Firebase Configuration:

Set up a Firebase project at console.firebase.google.com.
Enable Google Authentication.
Add Firebase config as GitHub Secrets under Settings > Secrets and variables > Actions:
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

Add Files:

Add all files via GitHub’s web interface to the main branch.
Ensure package.json, next.config.js, and .github/workflows/deploy.yml are included.

Deployment

Push changes to the main branch to trigger the GitHub Actions workflow.
The site will be deployed to https://fschneider13.github.io/mental-health-portal/.

Notes

Questionnaires: Add PHQ-9, GAD-7, and DASS-21 questions in pages/phq9.jsx, pages/gad7.jsx, and pages/dass21.jsx (not included due to copyright).
GitHub Pages: Enable in Settings > Pages, selecting gh-pages branch.
Issues: Use GitHub Issues for feedback and bug reports.
