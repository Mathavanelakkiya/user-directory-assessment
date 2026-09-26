# User Directory Assessment

A small full-stack User Directory application built for the coding assessment.

## Stack
- React + Vite frontend
- .NET 8 Web API
- Entity Framework Core + SQLite
- Swagger/OpenAPI
- Docker Compose (bonus)

## Features
- List users with loading, empty and error states
- Add user with client-side validation and success toast
- REST CRUD endpoints: GET/POST/PUT/DELETE
- SQLite persistence at `data/app.db` (configurable)
- Appropriate HTTP status codes and API validation
- CORS for local React development

## Run locally
Prerequisites: .NET 8 SDK and Node.js 20+.

### 1. Start API
```bash
cd backend/UserDirectory.Api
dotnet restore
dotnet run --launch-profile http
```
API: `http://localhost:5080`
Swagger: `http://localhost:5080/swagger`

### 2. Start React
In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`.

### Docker
```bash
docker compose up --build
```
Web: `http://localhost:5173`
API: `http://localhost:5080`

## API
- `GET /api/users` - list users
- `GET /api/users/{id}` - get one user
- `POST /api/users` - create user
- `PUT /api/users/{id}` - update user
- `DELETE /api/users/{id}` - delete user

## Validation
- Name: required, 2–100 characters
- Age: integer, 0–120
- City: required
- State: required
- Pincode: required, 4–10 characters

## AI disclosure
AI assistance was used during development for scaffolding, code review ideas, validation checks, and documentation. The final implementation was reviewed and adapted for the assessment requirements.
