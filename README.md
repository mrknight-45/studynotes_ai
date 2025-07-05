# AI-Powered Study Notes Generator

> Transform any topic into comprehensive, structured study materials with AI-powered content generation and seamless PDF export.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Node](https://img.shields.io/badge/Node.js-16+-green.svg)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)

## 🌟 Key Features

- **🤖 AI-Powered Content Generation**: Uses Google's Gemini AI to create detailed, structured study notes
- **📊 Visual Diagrams**: Generates educational diagrams and visual aids  
- **📄 Professional PDF Export**: High-quality PDF generation with multiple templates
- **🎯 Education Level Customization**: Basic, Intermediate, and Advanced content levels
- **⚡ Real-time Progress**: Live updates during content generation
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🔄 Content Regeneration**: Regenerate individual sections or entire notes
- **🎨 Modern UI**: Clean, intuitive interface built with React and Tailwind CSS

## 🚀 Live Demo

Visit the [live application](https://your-demo-url.com) to try it out!

**Sample Topics to Try:**
- "Photosynthesis" (Basic level)
- "Chemical Equilibrium" (Advanced level)  
- "World War II Causes" (Intermediate level)
- "Machine Learning Basics" (Intermediate level)

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Setup](#api-setup)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🔧 Installation

### Prerequisites
- Node.js 16 or higher
- npm or yarn package manager
- Google Gemini API key (free)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-study-notes-generator.git
cd ai-study-notes-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Add your Gemini API key to .env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. **Start the development server**
```bash
npm start
```

5. **Open your browser**
Navigate to `http://localhost:5173` to use the application.

## 📖 Usage

### Basic Workflow

1. **Enter Topic**: Type any study topic (e.g., "Photosynthesis", "World War II")
2. **Select Education Level**: Choose Basic, Intermediate, or Advanced
3. **Add Custom Requirements**: Optional specific requirements or focus areas
4. **Generate Notes**: Click "Generate Study Notes" and wait for AI processing
5. **Review Content**: Browse generated sections with definitions, explanations, key points, applications, and summary
6. **Export PDF**: Download professionally formatted PDF with one click

### Advanced Features

- **Section Regeneration**: Click the regenerate button on any section to get alternative content
- **Content Editing**: Continue to the note editor for further customization
- **Template Selection**: Choose from Modern, Academic, or Minimal PDF templates
- **Topic Suggestions**: Browse categorized suggestions or search popular topics

## ✨ Features

### AI Content Generation
- **Structured Output**: Consistent 5-section format (Definition, Explanation, Key Points, Applications, Summary)
- **Education Levels**: Content complexity automatically adjusted for target audience
- **Custom Requirements**: Tailor content with specific focus areas or constraints
- **Multiple Subjects**: Works with Science, Math, History, Literature, Technology, and more

### PDF Export System
- **Professional Formatting**: Clean, academic-style layouts with proper typography
- **Multiple Templates**: Modern, Academic, and Minimal design options
- **Visual Integration**: Includes generated diagrams and charts
- **Customizable Options**: Control content inclusion, page numbering, and branding

### User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progress Tracking**: Real-time updates during content generation
- **Error Handling**: Graceful error recovery with retry mechanisms
- **Accessibility**: Screen reader support and keyboard navigation

## 🛠 Tech Stack

### Core Technologies
- **Frontend**: React 18.2.0 with Vite
- **Styling**: Tailwind CSS 3.4.6 with custom design system
- **Routing**: React Router DOM 6.0.2
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion for smooth transitions

### AI & PDF Libraries
- **AI Integration**: Google Generative AI (@google/generative-ai)
- **PDF Generation**: jsPDF for programmatic PDF creation
- **HTML to Canvas**: html2canvas for visual content capture
- **Form Handling**: React Hook Form for form management

### Development Tools
- **Build Tool**: Vite 5.0.0 for fast development and builds
- **CSS Framework**: Tailwind CSS with typography and forms plugins
- **Package Manager**: npm
- **Code Quality**: ESLint configuration for React

## � API Setup

### Google Gemini AI Setup

1. **Get API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the generated key

2. **Configure Environment**
   ```bash
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Verify Setup**
   - Restart the development server
   - Try generating notes for a simple topic like "Water Cycle"
   - Check browser console for any API errors

### API Usage & Limits
- **Free Tier**: 60 requests per minute
- **Content Limits**: Best results with topics under 500 characters
- **Rate Limiting**: Built-in retry mechanisms for rate limit handling

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                          # Reusable UI components
│   │   ├── Header.jsx              # Navigation header
│   │   ├── Button.jsx              # Custom button component
│   │   └── Breadcrumb.jsx          # Navigation breadcrumbs
│   ├── AppIcon.jsx                 # Icon wrapper component
│   └── ErrorBoundary.jsx           # Error boundary for React errors
├── pages/
│   ├── dashboard/                   # Main landing page
│   │   ├── index.jsx               # Dashboard container
│   │   └── components/             # Dashboard-specific components
│   ├── note-generation-interface/   # Core generation interface
│   │   ├── index.jsx               # Main generation page
│   │   └── components/             # Generation components
│   │       ├── TopicInputSection.jsx
│   │       ├── GenerationProgress.jsx
│   │       ├── GeneratedContent.jsx
│   │       ├── TopicSuggestions.jsx
│   │       └── ErrorHandler.jsx
│   ├── note-editor/                # Note editing interface
│   │   └── components/
│   │       └── PDFPreview.jsx      # PDF preview modal
│   └── study-library/              # Saved notes library
├── utils/
│   ├── geminiAPI.js                # AI integration functions
│   ├── geminiClient.js             # Gemini client configuration
│   └── pdfGenerator.js             # PDF export utilities
├── styles/                         # Global styles and Tailwind config
├── App.jsx                         # Main application component
├── Routes.jsx                      # Application routing
└── index.jsx                       # Application entry point
```

## 🎯 Use Cases

### Educational Institutions
- **Teachers**: Quickly create study materials for lesson planning
- **Students**: Generate comprehensive notes for exam preparation
- **Tutors**: Create customized content for different learning levels

### Professional Development
- **Training Materials**: Generate content for corporate training sessions
- **Research**: Create structured overviews of complex topics
- **Documentation**: Generate educational content for technical subjects

### Personal Learning
- **Self-Study**: Explore new subjects with structured learning materials
- **Exam Preparation**: Create focused study guides for certifications
- **Knowledge Building**: Generate comprehensive overviews of interests

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify dashboard
```

### Docker
```bash
docker build -t ai-study-notes .
docker run -p 3000:3000 ai-study-notes
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Reporting Issues
Please use the [issue tracker](https://github.com/yourusername/ai-study-notes-generator/issues) to report bugs or request features.

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## � Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful content generation
- [React](https://reactjs.org/) for the robust frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling system
- [Lucide React](https://lucide.dev/) for the clean icon system
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation capabilities

## 📞 Support

- **Documentation**: Full guides available in the `/docs` folder
- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions
- **Email**: For direct support, contact [support@yourdomain.com]

---

**Built with ❤️ using React, Tailwind CSS, and Google Gemini AI**

*Transform any topic into professional study materials in seconds!*
