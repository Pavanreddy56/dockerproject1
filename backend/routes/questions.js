const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

// Return all questions but hide the correct answer (answerIndex)
router.get('/', async (req, res) => {
  const qs = await Question.find({}, { answerIndex: 0 }).limit(50);
  res.json(qs);
});

// Submit answers for grading
// body: { answers: [{ questionId, answerIndex }, ... ] }
router.post('/submit', async (req, res) => {
  const { answers } = req.body;
  if (!Array.isArray(answers)) return res.status(400).json({ error: 'answers array required' });

  let total = 0;
  let correct = 0;
  let details = [];

  for (const a of answers) {
    const q = await Question.findById(a.questionId);
    if (!q) continue;
    total++;
    const isCorrect = (q.answerIndex === a.answerIndex);
    if (isCorrect) correct++;
    details.push({
      questionId: q._id,
      text: q.text,
      selected: a.answerIndex,
      correctIndex: q.answerIndex,
      isCorrect
    });
  }

  res.json({ total, correct, score: Math.round((correct / Math.max(1, total)) * 100), details });
});

module.exports = router;
