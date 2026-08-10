# JobTracker

A full-stack, JavaScript-only job application tracker built with Next.js App Router, Express, MongoDB/Mongoose, and JWT authentication.

## Run locally

1. In one terminal:

   ```bash
   cd server
   npm install
   npm run dev
   ```

2. In another terminal:

   ```bash
   cd client
   npm install
   npm run dev
   ```

3. Open http://localhost:3000.

The provided `server/.env` contains the MongoDB Atlas URI. Add `JWT_SECRET`, `JWT_EXPIRES_IN`, and `CLIENT_URL` before running; see `server/.env.example`. The client URL is configured in `client/.env.local` and is safe to expose because it contains only the API base URL.

## Features

- JWT registration, login, current-user authentication, and protected API routes
- Per-user jobs with CRUD, searching, filtering, sorting, and pagination
- Dashboard metrics, chart, recent activity, responsive jobs view
- Kanban pipeline, interview/follow-up calendar, detailed job form
- Light/dark mode, responsive sidebar drawer, toasts, empty/loading states

## API

`/api/auth`: register, login, me  
`/api/jobs`: list, create, get, update, delete, status update  
`/api/dashboard`: stats, activity
