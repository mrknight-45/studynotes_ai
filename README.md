# 🧠 MindMapFlow AI

**Transform your study notes into beautiful, interactive visualizations!**

MindMapFlow AI is a powerful full-stack application that helps students convert unstructured text notes into:
- 🌟 **Interactive Mind Maps** - Perfect for organizing concepts and topic overviews
- 📊 **Dynamic Flowcharts** - Ideal for step-by-step processes and procedures

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Analysis**: Converts plain text notes into structured visualizations
- **Dual Visualization Types**: Choose between mind maps and flowcharts
- **Smart Recommendations**: AI suggests the best visualization type for your content
- **Interactive Editing**: Drag, zoom, and customize your visualizations
- **Export Options**: Download as PNG or PDF for offline use

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with mobile-first approach
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Sample Content**: Pre-loaded examples to get you started quickly
- **Real-time Generation**: Live progress tracking during AI processing

### 🤖 AI Integration
- **Multiple AI Providers**: Support for both Gemini AI and OpenAI GPT-4
- **Optimized Prompts**: Specialized prompts for mind map and flowchart generation
- **Content Analysis**: Intelligent detection of content type (conceptual vs procedural)

### 📱 Technical Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Visualizations**: Built with D3.js and ReactFlow
- **Export Capabilities**: High-quality PNG and PDF export
- **Zoom & Pan**: Smooth navigation for large visualizations

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```env
# Required: Get from https://ai.google.dev/
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Get from https://platform.openai.com/api-keys
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Start Development Server
```bash
npm start
```

Visit `http://localhost:3000` to see your app!

## 🎓 How to Use

### For Mind Maps (Concepts & Topics):
1. Paste notes about a topic (e.g., "Photosynthesis", "World War II", "React Hooks")
2. Click "Generate Mind Map" 
3. Get a hierarchical visualization with main topic, subtopics, and key points
4. Perfect for: Definitions, categorized information, topic overviews

### For Flowcharts (Processes & Procedures):
1. Paste step-by-step instructions or processes
2. Click "Generate Flowchart"
3. Get a process flow with start/end nodes, decisions, and actions
4. Perfect for: Algorithms, procedures, workflows, decision trees

### Smart Features:
- **Smart Suggest**: Let AI recommend the best visualization type
- **Sample Content**: Try pre-loaded examples for both mind maps and flowcharts
- **AI Provider Choice**: Switch between Gemini AI and OpenAI
- **Export Options**: Save your visualizations as PNG or PDF

## 🏗️ Architecture

### Frontend (React + Vite)
- **Components**: Modular React components for each visualization type
- **Styling**: TailwindCSS for responsive, modern design
- **State Management**: React hooks for local state
- **Visualization Libraries**: 
  - D3.js for interactive mind maps
  - ReactFlow for dynamic flowcharts

### AI Integration
- **Gemini AI**: Primary AI provider for content generation
- **OpenAI GPT-4**: Alternative AI provider option
- **Custom Prompts**: Specialized prompts for each visualization type
- **Content Analysis**: Smart content type detection

### Export System
- **HTML2Canvas**: Convert visualizations to images
- **jsPDF**: Generate PDF documents
- **High Quality**: Vector-based exports when possible

## 📁 Project Structure

```
src/
├── components/
│   ├── MindMapVisualization.jsx     # D3.js mind map component
│   ├── FlowchartVisualization.jsx   # ReactFlow flowchart component
│   └── ui/                          # Reusable UI components
├── pages/
│   └── note-generation-interface/
│       ├── index.jsx                # Main app entry
│       └── components/
│           └── MindMapFlowInterface.jsx  # Main interface
├── utils/
│   ├── mindMapAPI.js               # AI generation logic
│   ├── openaiClient.js             # OpenAI configuration
│   └── geminiClient.js             # Gemini AI configuration
└── styles/                         # Global styles
```

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `VITE_OPENAI_API_KEY` | OpenAI API key | No |

### AI Providers
- **Gemini AI** (Default): Free tier available, good performance
- **OpenAI GPT-4**: Requires paid subscription, excellent quality

## 🎨 Customization

### Themes
- Toggle between light and dark modes
- Responsive design adapts to screen size
- Consistent color scheme throughout

### Visualization Customization
- **Mind Maps**: Color-coded subtopics, zoomable interface
- **Flowcharts**: Draggable nodes, different shapes for different node types
- **Export**: Customizable file names based on content

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag & drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for CI/CD

### Environment Setup for Production
Make sure to set your environment variables in your deployment platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React**: UI framework
- **D3.js**: Data visualization library
- **ReactFlow**: Interactive node-based UIs
- **TailwindCSS**: Utility-first CSS framework
- **Gemini AI**: Google's AI platform
- **OpenAI**: GPT-4 language model
- **Lucide React**: Beautiful icons

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include steps to reproduce the problem
4. Mention your browser and OS version

---

**Made with ❤️ for students who love visual learning!**
