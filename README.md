# CGPA Calculator

A React + Vite app focused on Anna University CGPA calculation and professional PDF reports for CSE/IT departments.

## Project Structure
- `index.html` — Vite HTML entry
- `public/` — app logo, report logo, Anna University logo
- `src/components/` — common UI, calculator, dashboard, and report components
- `src/pages/` — Dashboard, Calculator, Report, History, About, NotFound
- `src/layouts/` — main shell and report layout
- `src/data/regulations/` — department/regulation JSON subject data
- `src/hooks/` — CGPA, subjects, and local storage hooks
- `src/services/` — calculator, storage, export, PDF, and report services
- `src/utils/` — constants, grade points, formula, formatting, validation
- `src/context/` — app and theme state providers
- `src/routes/` — React Router route definitions
- `src/styles/` — global, variable, and report CSS

## Quick Start (local)
Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Deploy (static hosting)
- Build command: `npm run build`
- Output directory: `dist`
- Netlify/Vercel: connect the repo and use the build command/output directory above.

## PDF Report
The report preview includes college logo, student details, department, regulation, semester, subject-wise grades, credits, grade points, points earned, semester GPA, overall CGPA, total credits, formula, and generation timestamp. Export uses `jsPDF` + `html2canvas`.

## Notes
- Data persists in your browser via `localStorage`.
- Public assets currently include `logo.png`, `report-logo.png`, `app_logo.png`, and `anna-university-logo.jpg`.
- Dark mode is saved per browser.
