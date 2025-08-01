var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Health check
router.get('/', function(req, res) {
  res.json({ status: 'ok', service: 'ReadCore API' });
});

// POST /summarize
router.post('/summarize', upload.single('file'), async (req, res) => {
  const { bookName, text, mode, compression } = req.body;
  // file: req.file (if uploaded)
  // TODO: Parse file/text, call LLM, return summary
  res.json({
    summary: 'This is a dummy summary. Real summarization coming soon!',
    mode,
    compression,
    bookName,
    textLength: text ? text.length : 0,
    fileUploaded: !!req.file
  });
});

// Summarization endpoint will go here

module.exports = router;
