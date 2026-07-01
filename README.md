# CGPA Calculator Web App

A React + Vite web app to calculate semester-wise GPA and overall CGPA for Anna University CSE/IT with local persistence, dark mode, search, export/import, and charts.

## Project Structure
- `index.html` — Vite HTML entry
- `src/main.jsx` — React entry point
- `src/App.jsx` — Calculator UI and logic
- `src/data.js` — Grade options and syllabus data
- `src/styles.css` — App styles

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

## Notes
- Data persists in your browser via `localStorage`.
- Use Export/Import to back up and restore your data.
- Dark Mode toggle is saved per browser.
