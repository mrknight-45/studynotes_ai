# Quick Demo Instructions

## 🚀 How to Test the AI Study Notes Generator

### Getting Started
1. **Start the Application**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:5173`

2. **Add Your API Key**
   - Get a free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add it to your `.env` file:
   ```bash
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
   - Restart the development server

### Test Scenarios

#### Scenario 1: Basic Science Topic
- **Topic**: "Photosynthesis"
- **Education Level**: Basic
- **Custom Requirements**: "Include simple diagrams for elementary students"
- **Expected Result**: Simple, easy-to-understand content with basic vocabulary

#### Scenario 2: Advanced Chemistry
- **Topic**: "Chemical Equilibrium"
- **Education Level**: Advanced
- **Custom Requirements**: "Include Le Chatelier's principle and mathematical calculations"
- **Expected Result**: Complex content with formulas and detailed explanations

#### Scenario 3: History Topic
- **Topic**: "World War II Causes"
- **Education Level**: Intermediate
- **Custom Requirements**: "Focus on political and economic factors"
- **Expected Result**: Structured historical analysis with multiple perspectives

#### Scenario 4: Mathematics
- **Topic**: "Quadratic Equations"
- **Education Level**: Intermediate
- **Custom Requirements**: "Include step-by-step solving methods and real-world applications"
- **Expected Result**: Mathematical content with examples and applications

### Features to Test

#### 📝 Content Generation
1. Try different education levels for the same topic
2. Test various subject areas (science, math, history, literature)
3. Use custom requirements to guide content focus
4. Test regeneration of individual sections

#### 📊 Visual Elements
1. Check if diagrams are generated (placeholder images if API doesn't support image generation)
2. Test the expandable sections
3. Review the clean, structured layout

#### 📄 PDF Export
1. Click "Download PDF" after generating content
2. Test different PDF templates in the note editor
3. Verify formatting and content preservation
4. Check if images are included properly

#### 🎨 User Interface
1. Test responsive design on different screen sizes
2. Try the topic suggestions feature
3. Test navigation between pages
4. Check error handling with invalid inputs

### Expected Workflow
1. **Dashboard** → Welcome screen with quick access
2. **Note Generation** → Main content creation interface
3. **Generated Content** → Review and interact with AI-created notes
4. **PDF Export** → Professional document download
5. **Note Editor** → Advanced editing and customization

### Performance Notes
- First generation may take 10-15 seconds
- Subsequent regenerations are typically faster
- PDF generation is nearly instantaneous
- Large topics may require more processing time

### Troubleshooting
- **No content generated**: Check API key configuration
- **PDF not downloading**: Ensure browser allows downloads
- **Slow performance**: Check internet connection and API rate limits
- **Missing diagrams**: Placeholder images are normal if image generation fails

### Demo Tips
1. **Start Simple**: Use basic topics like "Water Cycle" or "Gravity"
2. **Show Variety**: Demonstrate different education levels
3. **Highlight Speed**: Show how quickly professional notes are generated
4. **Demonstrate PDF**: Export and open the PDF to show formatting
5. **Show Regeneration**: Regenerate a section to show AI flexibility