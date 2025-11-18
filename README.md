# Task Manager (Demo)

This workspace contains a simple task manager demo app with:

- Backend: Spring Boot (Maven) + H2 in-memory database
- Frontend: Vite + React + TypeScript + Material UI

Run backend:

```bash
cd backend
mvn spring-boot:run
```

Run frontend (in a separate terminal):

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server proxies `/api` requests to `http://localhost:8080`.

Notes:
- The backend exposes REST endpoints under `/api/tasks`.
- H2 console is available at `/h2-console` when running the backend.
