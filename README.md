# Task Manager (Demo)

This workspace contains a simple task manager demo app with:

- Backend: Spring Boot (Maven) + H2 in-memory database
- Frontend: Vite + React + TypeScript + Material UI

```markdown
# Task Manager (Demo)

This workspace contains a simple task manager demo app (full-stack):

- Backend: Spring Boot (Maven) + H2 in-memory database
- Frontend: Vite + React + TypeScript + Material UI

This README covers running the app, running tests, and common troubleshooting steps.

Prerequisites
-----------
- Java 17+ and Maven (for backend)
- Node 18+ and npm (for frontend)
- Optional: nvm and SDKMAN for managing local runtimes

Run the backend (development)
-----------------------------
In one terminal:

```bash
cd backend
mvn spring-boot:run
```

Run the frontend (development)
------------------------------
In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server proxies `/api` requests to `http://localhost:8080` (see `vite.config.ts`).

Run tests
---------
- Backend (Maven):

```bash
cd backend
mvn test
```

- Frontend (Vitest):

```bash
cd frontend
npm test
```

Troubleshooting
---------------
- npm / optional native dependency issues: some environments may fail on an optional Rollup native dependency (e.g. `@rollup/rollup-linux-x64-gnu`). If you see native module install errors, try:

```bash
rm -rf node_modules package-lock.json
npm install
```

- Port conflicts: Backend defaults to `8080`, frontend to `5173`. If those ports are in use, stop the conflicting service or change the port in `application.properties` (backend) or `vite.config.ts` (frontend).

API / H2
--------
- REST endpoints are available under `/api/tasks` (GET/POST/PUT/DELETE).
- H2 console (when backend runs) is available at `/h2-console` (JDBC URL: `jdbc:h2:mem:tasksdb`).

Recommendations & Next Steps
----------------------------
- Add more tests (unit and integration) — some tests already included in `backend/src/test` and `frontend/src`.
- Consider adding Swagger/OpenAPI for interactive API docs.
- For production, secure CORS, disable H2 console, and add authentication.

Contact / Support
-----------------
If you hit issues running the project locally, include your OS, Node and Java versions and the failing command when opening an issue.

```
