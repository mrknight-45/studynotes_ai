import genAI from './geminiClient';

/**
 * Generates structured study notes for a given topic using Gemini API
 * @param {string} topic - The study topic
 * @param {string} educationLevel - The educational level (basic, intermediate, advanced)
 * @param {string} customRequirements - Additional custom requirements
 * @returns {Promise<Object>} Generated study notes with structured content
 */
export async function generateStudyNotes(topic, educationLevel = 'intermediate', customRequirements = '') {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const levelDescriptions = {
      basic: 'simple language suitable for beginners, with basic explanations and examples',
      intermediate: 'moderate complexity with detailed explanations and practical examples',
      advanced: 'comprehensive depth with technical details, complex concepts, and advanced applications'
    };

    const prompt = `Generate comprehensive study notes for the topic: "${topic}"

Educational Level: ${educationLevel} (${levelDescriptions[educationLevel]})
${customRequirements ? `Additional Requirements: ${customRequirements}` : ''}

Please structure the response as a JSON object with the following format:
{
  "topic": "${topic}",
  "educationLevel": "${educationLevel}",
  "sections": [
    {
      "id": "definition",
      "title": "Definition",
      "content": "Clear, concise definition of the topic",
      "icon": "BookOpen"
    },
    {
      "id": "explanation",
      "title": "Detailed Explanation",
      "content": "Comprehensive explanation with key concepts, processes, and mechanisms",
      "icon": "Zap"
    },
    {
      "id": "keypoints",
      "title": "Key Points",
      "content": "Important facts, formulas, equations, and bullet points",
      "icon": "List"
    },
    {
      "id": "applications",
      "title": "Real-Life Applications",
      "content": "Practical applications, examples, and real-world relevance",
      "icon": "Globe"
    },
    {
      "id": "summary",
      "title": "Summary",
      "content": "Concise summary tying together all key concepts",
      "icon": "CheckCircle"
    }
  ],
  "diagrams": [
    {
      "id": "diagram1",
      "title": "Diagram Title",
      "description": "Detailed description for diagram generation",
      "prompt": "Specific prompt for educational diagram generation"
    }
  ]
}

Important guidelines:
1. Content should be educational and accurate
2. Include specific examples and practical applications
3. Use appropriate terminology for the education level
4. Format content with line breaks for readability
5. Include 2-3 relevant diagram descriptions
6. Make diagram prompts specific and educational
7. Ensure all content is factual and well-structured

Return only the JSON object, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON response from Gemini API');
    }
    
    const studyNotes = JSON.parse(jsonMatch[0]);
    return studyNotes;
    
  } catch (error) {
    console.error('Error generating study notes:', error);
    throw new Error(`Failed to generate study notes: ${error.message}`);
  }
}

/**
 * Generates educational diagrams using Gemini's multimodal capabilities
 * @param {string} prompt - Description of the diagram to generate
 * @param {string} topic - The main topic for context
 * @returns {Promise<string>} Base64 encoded image data
 */
export async function generateEducationalDiagram(prompt, topic) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const educationalPrompt = `Create an educational diagram for the topic "${topic}".

Diagram requirements:
- ${prompt}
- Include clear labels and annotations
- Use educational colors and professional styling
- Make it suitable for study purposes
- Include key terminology and concepts
- Design should be clean and easy to understand

The diagram should be informative, visually appealing, and help students understand the concept better.`;

    const result = await model.generateContent([{
      text: educationalPrompt,
      generationConfig: {
        mimeType: 'image/png',
        dimensions: { width: 1024, height: 768 }
      }
    }]);
    
    const response = await result.response;
    
    if (response.parts && response.parts[0]?.inlineData?.data) {
      return response.parts[0].inlineData.data;
    }
    
    throw new Error('No image data received from Gemini API');
    
  } catch (error) {
    console.error('Error generating educational diagram:', error);
    
    // Return placeholder image data if generation fails
    return generatePlaceholderDiagram(prompt, topic);
  }
}

/**
 * Generates a placeholder diagram when actual generation fails
 * @param {string} prompt - Original diagram prompt
 * @param {string} topic - The topic
 * @returns {string} Base64 encoded placeholder image
 */
function generatePlaceholderDiagram(prompt, topic) {
  // Create a simple canvas-based placeholder
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Border
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  
  // Title
  ctx.fillStyle = '#495057';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Educational Diagram: ${topic}`, canvas.width / 2, 60);
  
  // Subtitle
  ctx.font = '16px Arial';
  ctx.fillText('Diagram generation in progress...', canvas.width / 2, 100);
  
  // Description
  ctx.font = '14px Arial';
  ctx.textAlign = 'left';
  const words = prompt.split(' ');
  let line = '';
  let y = 150;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > canvas.width - 100 && i > 0) {
      ctx.fillText(line, 50, y);
      line = words[i] + ' ';
      y += 20;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 50, y);
  
  return canvas.toDataURL().split(',')[1];
}

/**
 * Regenerates a specific section of study notes
 * @param {string} sectionId - The ID of the section to regenerate
 * @param {string} topic - The original topic
 * @param {string} educationLevel - The education level
 * @param {string} customRequirements - Additional requirements
 * @returns {Promise<Object>} Regenerated section content
 */
export async function regenerateSection(sectionId, topic, educationLevel, customRequirements = '') {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const sectionPrompts = {
      definition: `Provide a clear, comprehensive definition of "${topic}" suitable for ${educationLevel} level students.`,
      explanation: `Provide a detailed explanation of "${topic}" including key concepts, processes, and mechanisms for ${educationLevel} level.`,
      keypoints: `List the most important key points, facts, and takeaways about "${topic}" for ${educationLevel} level students.`,
      applications: `Describe real-life applications, examples, and practical relevance of "${topic}" for ${educationLevel} level.`,
      summary: `Provide a concise summary of "${topic}" that ties together all key concepts for ${educationLevel} level students.`
    };

    const prompt = `${sectionPrompts[sectionId] || sectionPrompts.explanation}
    
    ${customRequirements ? `Additional requirements: ${customRequirements}` : ''}
    
    Format the response with clear paragraphs and use ** for subheadings where appropriate.
    Include specific examples and make it engaging for students.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return {
      id: sectionId,
      content: response.text(),
      regeneratedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error regenerating section:', error);
    throw new Error(`Failed to regenerate section: ${error.message}`);
  }
}

/**
 * Streams study notes generation for real-time updates
 * @param {string} topic - The study topic
 * @param {string} educationLevel - The education level
 * @param {string} customRequirements - Additional requirements
 * @param {Function} onChunk - Callback for each chunk of generated content
 * @returns {Promise<void>}
 */
export async function streamStudyNotesGeneration(topic, educationLevel, customRequirements, onChunk) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Generate study notes for "${topic}" at ${educationLevel} level. ${customRequirements ? `Additional requirements: ${customRequirements}` : ''}
    
    Please provide content in sections, clearly marked with section headers.`;

    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        onChunk(text);
      }
    }
  } catch (error) {
    console.error('Error in streaming study notes generation:', error);
    throw error;
  }
}