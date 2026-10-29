# Second Serving

AI-Driven Food Waste Prevention and Redistribution is a community platform concept for helping food providers share surplus with nearby food banks, NGOs, and volunteers before it goes to waste.

The experience brings food providers and local pickup partners together around a simple flow:

**Food provider → surplus forecast → local alert → pickup → redistribution**

## Features

- Interactive landing page with an illustrative 3D food-rescue network.
- Clickable workflow that explains kitchen signals, forecasting, alerts, and redistribution.
- Surplus listing discovery with prepared-food and produce filters.
- Role-specific signup and sign-in flows for food providers, NGOs, and volunteers.
- Role-specific signed-in workspace actions.
- Demo accounts for quickly exploring each role.
- A standalone HTML prototype alongside the Next.js application.

## Technology

- Next.js 15, React 19, and TypeScript
- Three.js with React Three Fiber and Drei
- Lucide React icons
- CSS for responsive layouts, visual effects, and interactions
- Browser `localStorage` for prototype accounts and sessions

## Run the Next.js site

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create and run a production build with:

```bash
npm run build
npm run start
```

## Run the standalone prototype

Serve the project folder locally so browser storage and cryptographic APIs work in a secure local context:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). The standalone page is `index.html`; its interactive behavior is in `auth.js` and its styles are in `auth.css`.

## Demo accounts

Select a demo account in the app or use these prototype-only credentials:

| Role | Email | Password |
| --- | --- | --- |
| Food provider | `provider@secondserving.demo` | `ShareFood2026!` |
| NGO or food bank | `ngo@secondserving.demo` | `RescueMeals2026!` |
| Volunteer | `volunteer@secondserving.demo` | `Pickup2026!` |

These accounts are for local demonstration only. New prototype accounts and sign-in sessions are stored in the current browser; there is no production authentication service or server-side account storage.

## Prototype scope

Forecasts, listings, impact figures, and pickup examples are illustrative demo data. The current project does not connect to a live prediction service, notification provider, mapping backend, or food-safety verification system. A production deployment would need those services and appropriate account, privacy, and food-handling safeguards.
