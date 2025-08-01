var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const OpenAI = require('openai');
const pdfParse = require('pdf-parse');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here', // Replace with actual API key
});

// Helper function to chunk text
function chunkText(text, maxChunkSize = 4000) {
  const chunks = [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  let currentChunk = '';
  
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? '. ' : '') + sentence;
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

// Helper function to generate summary prompt
function generatePrompt(bookTitle, compressionLevel, mode, text) {
  return `You are a highly intelligent and precise book summarizer.

Your task is to summarize the book: "${bookTitle}"

Compression level: ${compressionLevel}%
Summary Type: ${mode}

🔒 Do NOT skip important events, themes, arguments, character arcs, or the author's message — even if shortening the text. Always preserve:
- Logical flow
- Key turning points
- Quotes with context
- Symbolism or philosophy
- Main ideas per chapter (or section)

Provide the summary in this structure:
1. 📘 Chapter Summaries (numbered)
2. 🧠 Themes and Motifs
3. 👤 Character Breakdown (for fiction)
4. 💬 Important Quotes with meaning
5. ⚙️ Author's Intent and Message

Write in clear, engaging, structured tone. Your output must be highly valuable even to someone preparing for an exam, thesis, or discussion.

Book content to summarize:
${text}`;
}

// Health check
router.get('/', function(req, res) {
  res.json({ status: 'ok', service: 'ReadCore API' });
});

// POST /summarize
router.post('/summarize', upload.single('file'), async (req, res) => {
  try {
    const { bookName, text, mode, compression } = req.body;
    const compressionLevel = parseInt(compression) || 30;
    
    let bookContent = '';
    let bookTitle = bookName || 'Unknown Book';
    
    // Extract text from uploaded file or use provided text
    if (req.file) {
      if (req.file.mimetype === 'application/pdf') {
        const pdfData = await pdfParse(req.file.buffer);
        bookContent = pdfData.text;
      } else if (req.file.mimetype === 'text/plain') {
        bookContent = req.file.buffer.toString('utf8');
      } else {
        return res.status(400).json({ error: 'Unsupported file type. Please upload PDF or TXT files.' });
      }
    } else if (text) {
      bookContent = text;
    } else {
      return res.status(400).json({ error: 'Please provide either book text or upload a file.' });
    }
    
    if (bookContent.length < 100) {
      return res.status(400).json({ error: 'Text content is too short. Please provide more content to summarize.' });
    }
    
    // Chunk text if it's too long
    const chunks = chunkText(bookContent);
    let fullSummary = '';
    
    // Process chunks and get summary
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const chunkPrompt = generatePrompt(bookTitle, compressionLevel, mode, chunk);
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert book summarizer. Provide concise, accurate summaries that preserve all important details and maintain logical flow."
          },
          {
            role: "user",
            content: chunkPrompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      });
      
      const chunkSummary = completion.choices[0].message.content;
      fullSummary += (i > 0 ? '\n\n' : '') + chunkSummary;
    }
    
    // Get final refined summary
    const finalPrompt = `Refine and combine this summary into a cohesive, well-structured summary for "${bookTitle}":

${fullSummary}

Ensure the final summary follows the requested structure and compression level (${compressionLevel}%).`;

    const finalCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert book summarizer. Create final, polished summaries that are well-structured and comprehensive."
        },
        {
          role: "user",
          content: finalPrompt
        }
      ],
      max_tokens: 3000,
      temperature: 0.2,
    });
    
    const finalSummary = finalCompletion.choices[0].message.content;
    
    res.json({
      summary: finalSummary,
      mode,
      compression: compressionLevel,
      bookName: bookTitle,
      textLength: bookContent.length,
      fileUploaded: !!req.file,
      chunksProcessed: chunks.length
    });
    
  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary. Please try again.',
      details: error.message 
    });
  }
});

module.exports = router;
