const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Resume = require('../models/Resume');

const router = express.Router();
const uploadDir = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, unique);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 }, // 12MB max
  fileFilter: function (req, file, cb) {
    // accept pdf, doc, docx, txt
    const allowed = ['.pdf', '.doc', '.docx', '.txt'];
    if (!allowed.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error('Only pdf/doc/docx/txt files are allowed'));
    }
    cb(null, true);
  }
});

router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const doc = new Resume({
      name,
      email,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
    await doc.save();
    res.json({ message: 'Uploaded', resume: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Upload failed' });
  }
});

router.get('/', async (req, res) => {
  const docs = await Resume.find().sort({ uploadedAt: -1 });
  res.json(docs);
});

router.get('/:id', async (req, res) => {
  const doc = await Resume.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

router.get('/file/:filename', (req, res) => {
  const p = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(p)) return res.status(404).send('File not found');
  res.sendFile(p);
});

router.delete('/:id', async (req, res) => {
  const doc = await Resume.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  try {
    const p = path.join(uploadDir, doc.filename);
    if (fs.existsSync(p)) fs.unlinkSync(p);
    await doc.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
