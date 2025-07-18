import React, { useState } from 'react';
import { Brain, GitBranch, Sparkles, Moon, Sun, Upload, Lightbulb } from 'lucide-react';
import MindMapVisualization from '../../../components/MindMapVisualization';
import FlowchartVisualization from '../../../components/FlowchartVisualization';
import { generateMindMap, generateFlowchart, analyzeContentType } from '../../../utils/mindMapAPI';

const MindMapFlowInterface = () => {
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('mindmap');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mindMapData, setMindMapData] = useState(null);
  const [flowchartData, setFlowchartData] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [provider, setProvider] = useState('gemini');
  const [generationStep, setGenerationStep] = useState('');
  const [suggestion, setSuggestion] = useState('');

  // Sample notes for demonstration
  const sampleNotes = {
    mindmap: `Photosynthesis is the process by which plants make their own food using sunlight, water, and carbon dioxide.

Key Components:
- Chlorophyll: Green pigment that captures light
- Stomata: Pores for gas exchange
- Water: Absorbed through roots
- Carbon dioxide: Taken from air

Light Reactions:
- Occur in thylakoids
- Convert light energy to chemical energy
- Produce oxygen as byproduct

Dark Reactions (Calvin Cycle):
- Occur in stroma
- Use chemical energy to make glucose
- Don't actually require darkness

Importance:
- Produces oxygen for atmosphere
- Forms base of food chain
- Converts CO2 to organic compounds`,

    flowchart: `How to Solve a Math Problem:

Step 1: Read the problem carefully
- Identify what is being asked
- Note any given information
- Underline key words

Step 2: Plan your approach
- What operation is needed?
- What formula applies?
- Draw a diagram if helpful

Step 3: Solve the problem
- Show all work clearly
- Use proper units
- Double-check calculations

Step 4: Check your answer
- Does the answer make sense?
- Is it in the right units?
- Try working backwards

If answer seems wrong:
- Go back to Step 2
- Check for calculation errors
- Re-read the problem

If answer is correct:
- Write final answer clearly
- Include proper units
- Done!`
  };

  const handleGenerate = async (type) => {
    if (!notes.trim()) {
      setError('Please enter some notes to generate a visualization.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGenerationStep('Analyzing your notes...');

    try {
      if (type === 'mindmap') {
        setGenerationStep('Creating mind map structure...');
        const data = await generateMindMap(notes, provider);
        setMindMapData(data);
        setActiveTab('mindmap');
      } else if (type === 'flowchart') {
        setGenerationStep('Creating flowchart structure...');
        const data = await generateFlowchart(notes, provider);
        setFlowchartData(data);
        setActiveTab('flowchart');
      }
      setGenerationStep('Complete!');
    } catch (err) {
      console.error('Generation error:', err);
      setError(`Failed to generate ${type}: ${err.message}`);
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleSmartSuggest = async () => {
    if (!notes.trim()) return;

    try {
      setGenerationStep('Analyzing content type...');
      const suggested = await analyzeContentType(notes);
      setSuggestion(suggested);
      setGenerationStep('');
    } catch (err) {
      console.error('Analysis error:', err);
      setSuggestion('');
      setGenerationStep('');
    }
  };

  const loadSample = (type) => {
    setNotes(sampleNotes[type]);
    setSuggestion(type);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <div className={`border-b transition-colors duration-300 ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-purple-600" />
                <GitBranch className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  MindMapFlow AI
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Transform your notes into visual learning experiences
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* AI Provider Selection */}
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="gemini">Gemini AI</option>
                <option value="openai">OpenAI GPT-4</option>
              </select>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <div className={`rounded-lg shadow-lg p-6 mb-8 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Upload className="mr-2" size={20} />
              Input Your Notes
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => loadSample('mindmap')}
                className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                Sample: Mind Map
              </button>
              <button
                onClick={() => loadSample('flowchart')}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Sample: Flowchart
              </button>
            </div>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your study notes here... 

For example:
• Topic explanations and concepts (better for Mind Maps)
• Step-by-step processes and procedures (better for Flowcharts)
• Any unstructured text from your study materials"
            className={`w-full h-48 p-4 border rounded-lg resize-none transition-colors ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleGenerate('mindmap')}
                disabled={isGenerating || !notes.trim()}
                className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                <Brain className="mr-2" size={20} />
                Generate Mind Map
              </button>

              <button
                onClick={() => handleGenerate('flowchart')}
                disabled={isGenerating || !notes.trim()}
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                <GitBranch className="mr-2" size={20} />
                Generate Flowchart
              </button>
            </div>

            <button
              onClick={handleSmartSuggest}
              disabled={isGenerating || !notes.trim()}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
              }`}
            >
              <Lightbulb className="mr-2" size={16} />
              Smart Suggest
            </button>
          </div>

          {/* Smart Suggestion */}
          {suggestion && (
            <div className={`mt-4 p-3 rounded-lg ${
              suggestion === 'mindmap' 
                ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                : 'bg-blue-100 text-blue-800 border border-blue-200'
            }`}>
              <div className="flex items-center">
                <Sparkles className="mr-2" size={16} />
                <span className="font-medium">
                  AI Recommendation: Your content is better suited for a {suggestion === 'mindmap' ? 'Mind Map' : 'Flowchart'}
                </span>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          {isGenerating && (
            <div className={`mt-4 p-4 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-blue-50'
            }`}>
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
                <span className="text-blue-600 font-medium">{generationStep}</span>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-800 font-medium">{error}</div>
            </div>
          )}
        </div>

        {/* Visualization Tabs */}
        {(mindMapData || flowchartData) && (
          <div className={`rounded-lg shadow-lg ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Tab Header */}
            <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('mindmap')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'mindmap'
                      ? 'border-purple-500 text-purple-600'
                      : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                  }`}
                >
                  <Brain className="inline mr-2" size={16} />
                  Mind Map
                  {mindMapData && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ready</span>}
                </button>
                <button
                  onClick={() => setActiveTab('flowchart')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'flowchart'
                      ? 'border-blue-500 text-blue-600'
                      : `border-transparent ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} hover:border-gray-300`
                  }`}
                >
                  <GitBranch className="inline mr-2" size={16} />
                  Flowchart
                  {flowchartData && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Ready</span>}
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'mindmap' && (
                <div>
                  {mindMapData ? (
                    <MindMapVisualization data={mindMapData} />
                  ) : (
                    <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Brain size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No mind map generated yet. Click "Generate Mind Map" to create one.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'flowchart' && (
                <div>
                  {flowchartData ? (
                    <FlowchartVisualization data={flowchartData} />
                  ) : (
                    <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <GitBranch size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No flowchart generated yet. Click "Generate Flowchart" to create one.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Getting Started */}
        {!mindMapData && !flowchartData && !isGenerating && (
          <div className={`rounded-lg shadow-lg p-8 text-center ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-center mb-6">
              <Brain className="h-16 w-16 text-purple-600 opacity-50" />
              <GitBranch className="h-16 w-16 text-blue-600 opacity-50 -ml-4" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Welcome to MindMapFlow AI!</h3>
            <p className={`text-lg mb-6 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Transform your study notes into beautiful, interactive visualizations. 
              Perfect for students who want to make learning more visual and engaging.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className={`p-6 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-purple-200 bg-purple-50'}`}>
                <Brain className="h-8 w-8 text-purple-600 mb-3" />
                <h4 className="font-semibold mb-2">Mind Maps</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Perfect for organizing concepts, definitions, and topic overviews. Great for subjects like biology, history, or literature.
                </p>
              </div>
              <div className={`p-6 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-blue-200 bg-blue-50'}`}>
                <GitBranch className="h-8 w-8 text-blue-600 mb-3" />
                <h4 className="font-semibold mb-2">Flowcharts</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Ideal for step-by-step processes, algorithms, and procedures. Perfect for math, science, or programming topics.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MindMapFlowInterface;