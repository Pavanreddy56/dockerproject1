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
Quick checklist (prereqs)

Make sure you have:

Docker (and Docker Engine). Check: docker --version

Docker Compose (modern plugin). Check: docker compose version

Git. Check: git --version

If any of those are missing, install Docker Desktop (includes compose) or your platform’s Docker packages.

1) Clone the repo
git clone https://github.com/Pavanreddy56/dockerproject1.git
cd dockerproject1


This repo contains docker-compose.yml, a backend/ folder (Express + Dockerfile + frontend static files), README and LICENSE. 
GitHub
+1

2) Inspect the important files (quick)

Open these to understand how services are wired:

# list files
ls -la

# view compose file
cat docker-compose.yml

# view backend Dockerfile and server
cat backend/Dockerfile
cat backend/server.js


docker-compose.yml defines mongo, mongo-express, and backend services (so Docker Compose will bring up DB, admin UI and your app). 
GitHub

3) Start the whole stack (build + run)

From repo root:

docker compose up --build -d


This will build the backend image and start three containers: MongoDB, mongo-express (DB UI), and the backend app. (Command suggested in your repo README.) 
GitHub

To watch logs:

docker compose logs -f backend
# or all logs
docker compose logs -f


To see running containers:

docker ps

4) Seed the database with example questions

(One-time — the seed script inserts sample DevOps questions.)

docker exec -it devops_backend npm run seed


The README shows this exact seed command and explains it. After seeding you’ll see questions in mongo-express or via API. 
GitHub

5) Verify the app & UIs

Backend health check:

curl http://localhost:5000/health
# expected: { "status":"ok" }


Frontend (served by backend): open http://localhost:5000 in browser.

Mongo Express UI: open http://localhost:8081 and login using the credentials in the compose file (admin / password by default). 
GitHub

6) Quick functional tests

Upload a resume (via curl)
(Replace /path/to/resume.pdf with a real file)

curl -v -F "name=Your Name" \
      -F "email=you@example.com" \
      -F "resume=@/path/to/resume.pdf" \
      http://localhost:5000/api/uploads/upload


List resumes (API)

curl http://localhost:5000/api/uploads


Download a file (open link shown in the resume record) or:

curl -O http://localhost:5000/api/uploads/file/<filename>


Run quiz flow (via UI) — click Load Quiz, answer and submit.

7) Inspect uploaded files and DB

On host (uploads folder is bind-mounted):

ls -la backend/uploads


From inside backend container:

docker exec -it devops_backend ls -la /usr/src/app/uploads


Inspect documents with mongo-express at http://localhost:8081. 
GitHub

8) Typical development workflow (edit → rebuild)

If you change backend code, you have two main options:

A — Rebuild container (simple)

# rebuild only backend and recreate
docker compose up -d --build backend
# view logs
docker compose logs -f backend


B — Fast local dev (hot reload)
Edit docker-compose.yml (locally, for dev only) to bind-mount your backend source into the container and use nodemon:

services:
  backend:
    # ...
    volumes:
      - ./backend:/usr/src/app      # mount code
      - /usr/src/app/node_modules  # keep container node_modules


Then modify backend/package.json to add "dev": "nodemon server.js" and in Dockerfile / compose use that command for local dev. (Use this only on your dev machine — don't commit production compose changes.)

9) Cleanup & reset

Stop containers:

docker compose down


Stop + remove volumes (warning: deletes DB data):

docker compose down -v


Remove dangling images/volumes:

docker system prune --volumes

10) Git workflow — push your changes to the repo
git checkout -b feature/resume-ui
git add .
git commit -m "Improve resume upload UI + validations"
git push -u origin feature/resume-ui
# create PR from GitHub UI

11) Troubleshooting — common issues & fixes

Ports already in use → docker compose will fail to bind. Check docker ps and stop conflicting service or change ports in docker-compose.yml.

Mongo connection refused → Wait a few seconds for mongo to initialize, then check docker compose logs mongo. Use depends_on in compose (exists) but may still need readiness checks.

Uploads not saved → confirm backend/uploads exists and has correct permissions on host; check mount path and multer errors in backend logs.

Seed inserted nothing → ensure you run docker exec -it devops_backend npm run seed after containers are up and that backend container is connected to mongo (look at backend logs for connection errors).

File permission/SELinux on Linux → if host is SELinux-enabled, bind-mounts may need :z/:Z flags or chown adjustments.

12) Nice-to-have improvements (next steps)

Move secrets out of docker-compose.yml into .env or Docker secrets.

Add basic authentication & validation for the upload endpoint.

Use a separate front-end (React) and serve it from Nginx for production.

Add GitHub Actions to build the backend image and push to Docker Hub or a registry on push to main.

Add tests for the API and a Cypress/Playwright test for upload flow.
