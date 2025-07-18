import openai from './openaiClient';
import genAI from './geminiClient';

/**
 * Generates a mind map structure from unstructured text notes
 * @param {string} notes - The input text notes
 * @param {string} provider - AI provider ('openai' or 'gemini')
 * @returns {Promise<Object>} Mind map data structure
 */
export async function generateMindMap(notes, provider = 'gemini') {
  const prompt = `Convert the following study notes into a hierarchical mind map structure. 
Extract the main topic and organize subtopics with their key points.

Input Notes:
${notes}

Return a JSON object with this exact structure:
{
  "topic": "Main Topic Title",
  "subtopics": [
    {
      "title": "Subtopic 1",
      "points": ["Point 1", "Point 2", "Point 3"],
      "color": "#4F46E5"
    },
    {
      "title": "Subtopic 2", 
      "points": ["Point A", "Point B"],
      "color": "#059669"
    }
  ]
}

Guidelines:
- Identify the main topic from the notes
- Create 3-6 subtopics maximum
- Each subtopic should have 2-5 key points
- Use different colors for each subtopic
- Make titles concise but descriptive
- Points should be brief and specific

Return only the JSON object, no additional text.`;

  try {
    if (provider === 'openai') {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at converting unstructured notes into organized mind maps. Always return valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to parse JSON response from OpenAI');
      }
      
      return JSON.parse(jsonMatch[0]);
    } else {
      // Use Gemini
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to parse JSON response from Gemini');
      }
      
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Error generating mind map:', error);
    throw new Error(`Failed to generate mind map: ${error.message}`);
  }
}

/**
 * Generates a flowchart structure from process-oriented text notes
 * @param {string} notes - The input text notes
 * @param {string} provider - AI provider ('openai' or 'gemini')
 * @returns {Promise<Object>} Flowchart data structure
 */
export async function generateFlowchart(notes, provider = 'gemini') {
  const prompt = `Convert the following study notes into a flowchart structure that shows processes, steps, or workflows.
Focus on identifying sequential steps, decision points, and relationships.

Input Notes:
${notes}

Return a JSON object with this exact structure:
{
  "title": "Process Title",
  "nodes": [
    {
      "id": "1",
      "label": "Start",
      "type": "start",
      "position": { "x": 250, "y": 50 }
    },
    {
      "id": "2", 
      "label": "Step 1",
      "type": "process",
      "position": { "x": 250, "y": 150 }
    },
    {
      "id": "3",
      "label": "Decision Point?",
      "type": "decision", 
      "position": { "x": 250, "y": 250 }
    },
    {
      "id": "4",
      "label": "End",
      "type": "end",
      "position": { "x": 250, "y": 350 }
    }
  ],
  "edges": [
    { "id": "e1-2", "source": "1", "target": "2", "label": "" },
    { "id": "e2-3", "source": "2", "target": "3", "label": "" },
    { "id": "e3-4", "source": "3", "target": "4", "label": "Yes" }
  ]
}

Guidelines:
- Identify sequential processes or workflows
- Use appropriate node types: start, process, decision, end
- Position nodes logically with proper spacing
- Create clear connections between steps
- Include decision branches where applicable
- Keep labels concise and actionable
- Ensure the flow makes logical sense

Return only the JSON object, no additional text.`;

  try {
    if (provider === 'openai') {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at converting unstructured notes into organized flowcharts. Always return valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to parse JSON response from OpenAI');
      }
      
      return JSON.parse(jsonMatch[0]);
    } else {
      // Use Gemini
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to parse JSON response from Gemini');
      }
      
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error('Error generating flowchart:', error);
    throw new Error(`Failed to generate flowchart: ${error.message}`);
  }
}

/**
 * Analyzes text to determine if it's better suited for mind map or flowchart
 * @param {string} notes - The input text notes
 * @returns {Promise<string>} Recommended visualization type
 */
export async function analyzeContentType(notes) {
  const prompt = `Analyze the following text and determine whether it would be better visualized as a MIND MAP or FLOWCHART.

Text:
${notes}

Return only one word: "mindmap" or "flowchart"

Guidelines:
- Choose "mindmap" for: topic explanations, definitions, categorized information, concepts with multiple aspects
- Choose "flowchart" for: step-by-step processes, procedures, workflows, decision trees, sequential instructions`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().toLowerCase().trim();
    
    return text.includes('flowchart') ? 'flowchart' : 'mindmap';
  } catch (error) {
    console.error('Error analyzing content type:', error);
    return 'mindmap'; // Default fallback
  }
}