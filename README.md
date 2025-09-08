# Docker DevOps Project - Resume Upload + DevOps Quiz

This project demonstrates a small full-stack application using Docker:
- Backend: Node.js + Express
- Database: MongoDB
- Admin UI: mongo-express
- Frontend: Simple HTML/JS served by Express
- Containerized with Docker and orchestrated with docker-compose

Features:
- Upload a resume (PDF/DOCX) with name + email. Files stored in a Docker volume bind (`backend/uploads`).
- Persist resume metadata in MongoDB.
- DevOps quiz: fetch questions, answer them, and get an immediate score.
- mongo-express provides a web UI for inspecting the MongoDB contents (http://localhost:8081).

## How to run

Requirements: Docker & Docker Compose installed.

1. Build and start containers:
```bash
docker compose up --build
```

2. Seed the database with example DevOps questions (optional — docker-compose runs the backend but seeding is manual):
Open a new shell and run:
```bash
docker exec -it devops_backend npm run seed
```
This will add sample questions to MongoDB.

3. Open the app:
- Frontend (served by backend): http://localhost:5000
- Mongo Express UI: http://localhost:8081 (user: admin / pass: password)

4. Stop & remove:
```bash
docker compose down
```

## What is included
- `backend/` — Node.js app (server, routes, models)
- `docker-compose.yml` — runs mongo, mongo-express, and backend
- `backend/Dockerfile` — builds the backend image
- `backend/public/` — frontend static files (index.html, app.js, styles.css)
- `backend/uploads/` — bind-mounted directory used to persist uploaded resume files

Read the `backend/README.md` for more technical details about endpoints and code flow.
