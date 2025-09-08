# Backend: Resume Upload & DevOps Quiz

## Endpoints

### Resume upload
- `POST /api/uploads/upload` (multipart/form-data)
  - fields: `name`, `email`, `resume` (file)
  - stores file to `/usr/src/app/uploads` and metadata in MongoDB collection `resumes`.

- `GET /api/uploads/` - list all resume metadata
- `GET /api/uploads/:id` - get resume metadata by id
- `GET /api/uploads/file/:filename` - download/serve resume file
- `DELETE /api/uploads/:id` - delete resume and metadata

### Questions / Quiz
- `GET /api/questions` - returns an array of questions (the correct answerIndex is hidden)
- `POST /api/questions/submit` - submit answers for scoring
  - body: `{ "answers": [ { "questionId": "<id>", "answerIndex": 0 }, ... ] }`
  - response: `{ total, correct, score, details }`

## Seed
To insert sample questions into the database:
```
npm run seed
```

## Notes
- Uploaded files are stored in `uploads/`. In Docker Compose we bind this to `./backend/uploads` so files persist.
- When running with Docker Compose, the backend will connect to `mongodb://mongo:27017/devops_app` by default.
