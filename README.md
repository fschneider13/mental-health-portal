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