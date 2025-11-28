# Architecture Overview

This document summarizes the architecture and design decisions for the Task Manager demo app and records a few recommended improvements from the review.

High level
----------
- Backend: Spring Boot application implementing a REST API under `/api/tasks`. Uses Spring Data JPA with an in-memory H2 database for persistence.
- Frontend: React + TypeScript app built with Vite. UI built using Material UI (MUI). The frontend uses an `api.ts` wrapper (axios) to communicate with backend endpoints.

Folders
-------
- `backend/` — Maven project (Spring Boot)
  - `src/main/java` — application code (controller, model, repository, exception handler)
  - `src/test/java` — integration tests (uses SpringBootTest + TestRestTemplate)
- `frontend/` — Vite + React + TypeScript
  - `src/components` — UI components (`TaskList`, `TaskForm`)
  - `src/api.ts` — axios wrapper for `/api` endpoints
  - `src/*` — app entry (`App.tsx`, `main.tsx`) and types

Design notes
------------
- The backend currently uses a controller -> repository flow (no separate service layer). This is fine for a small demo but adding a `service/` layer is recommended for larger apps and easier unit testing.
- CORS is enabled via `@CrossOrigin(origins = "*")` on the controller for development convenience. For production, restrict to allowed origins.

Testing
-------
- Backend integration tests use `SpringBootTest(webEnvironment = RANDOM_PORT)` with `TestRestTemplate` targeting the running embedded server and H2.
- Frontend tests use Vitest + React Testing Library and mock the `./api` module for integration-style tests.

Improvements and roadmap
------------------------
1. Add a small service layer in the backend for business logic and to facilitate unit tests.
2. Add Swagger/OpenAPI support for API documentation.
3. Harden production config: limit CORS, disable H2 console, enable authentication.
4. Add CI (GitHub Actions) to run backend and frontend tests on push.
5. Consider adding a small logging & monitoring strategy (structured logs, centralized collector) for production readiness.
