# RAGA Healthcare SaaS UI

B2B healthcare SaaS frontend built for the RAGA.AI Frontend Developer Assignment: React, TypeScript, Firebase Authentication, Zustand, patient management (grid/list), analytics, and a service worker for notifications.

## Tech stack

- React 19 + TypeScript + Vite
- Firebase Authentication (email/password)
- Zustand (global state)
- React Router

## Setup

```bash
npm install
cp .env.example .env
```

Add your Firebase web app keys to `.env` (see `.env.example`). Enable **Email/Password** sign-in in the Firebase console.

```bash
npm run dev
```

## Scripts

| Command   | Description        |
| --------- | ------------------ |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Service worker and notifications

The app registers `public/sw.js`. On the **Dashboard**, use **Simulate care team alert** to request notification permission and show a **local** notification via the service worker (suitable for the assignment demo). Use a secure context (`https://` or `http://localhost`).

## Git workflow (feature branches)

Work is split across branches (e.g. `chore/project-scaffold`, `feat/app-shell-routing-zustand`, `feat/firebase-authentication`, `feat/dashboard-analytics-patients`, `feat/service-worker-notifications`). Merge them into `main` in order when you are ready.

## License

Private — assignment submission.
