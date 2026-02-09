# Specification

## Summary
**Goal:** Build the HeartSense AI web app with a public landing page and a CVD risk assessment flow that calls a backend prediction API and shows a clear, educational result.

**Planned changes:**
- Create a public landing page for “HeartSense AI: Smart CVD Risk Prediction” with sections (Overview, How it works, Disclaimer) and a prominent “Start Assessment” call-to-action.
- Add basic site navigation (header with Home/Assessment links) and a footer with project info and a disclaimer reference.
- Implement an assessment form collecting: age, sex, systolic blood pressure, total cholesterol, HDL cholesterol, smoking status, diabetes status; include client-side validation and inline errors.
- Add a single Motoko actor backend method (e.g., `predict`) that returns a deterministic `{ riskScore (0–100); riskLevel (Low/Moderate/High); explanation[] }`.
- Connect the form to the backend using React Query; show loading state, render results (riskScore, riskLevel, explanation list) without full page reload, and include a “Start Over” action.
- Add a medical/educational disclaimer component shown on both landing and results views.
- Apply a coherent, accessible health-oriented theme across pages (avoid blue/purple as primary colors).
- Add and reference generated static image assets from `frontend/public/assets/generated` (logo, hero illustration, icons).

**User-visible outcome:** Users can read about HeartSense AI, start a CVD risk assessment, submit their risk-factor inputs to receive a deterministic risk score/level with explanations, view disclaimers, and restart the assessment.
