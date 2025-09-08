/**
 * Main Express server
 * - Serves static frontend from ./public
 * - API endpoints under /api
 * - Connects to MongoDB (MONGO_URL env or default to mongodb://mongo:27017/devops_app)
 */

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const uploadsRouter = require('./routes/uploads');
const questionsRouter = require('./routes/questions');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/devops_app';

async function start() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Connected to MongoDB:', MONGO_URL);

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static frontend
  app.use(express.static(path.join(__dirname, 'public')));

  // API
  app.use('/api/uploads', uploadsRouter);
  app.use('/api/questions', questionsRouter);

  // health
  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log('Server listening on port', port));
}

start().catch(err => {
  console.error('Failed to start app:', err);
  process.exit(1);
});

const express = require("express");
const Quiz = require("../models/quiz");

const router = express.Router();

// Save quiz attempt
router.post("/quiz", async (req, res) => {
  try {
    const quiz = new Quiz(req.body);  // expects {title, questions, score}
    await quiz.save();
    res.status(201).json({ message: "Quiz saved successfully", quiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all quiz attempts
router.get("/quiz", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
