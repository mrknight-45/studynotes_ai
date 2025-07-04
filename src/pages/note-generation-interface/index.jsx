import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ActionContextPanel from '../../components/ui/ActionContextPanel';
import TopicInputSection from './components/TopicInputSection';
import GenerationProgress from './components/GenerationProgress';
import GeneratedContent from './components/GeneratedContent';
import TopicSuggestions from './components/TopicSuggestions';
import ErrorHandler from './components/ErrorHandler';
import { generateStudyNotes, generateEducationalDiagram } from '../../utils/geminiAPI';

const NoteGenerationInterface = () => {
  const [topic, setTopic] = useState('');
  const [educationLevel, setEducationLevel] = useState('intermediate');
  const [customRequirements, setCustomRequirements] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [generationStep, setGenerationStep] = useState('');

  // Auto-hide suggestions when user starts typing
  useEffect(() => {
    setShowSuggestions(topic.trim().length === 0);
  }, [topic]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedContent(null);
    setGeneratedImages([]);
    setGenerationStep('Analyzing topic and preparing content...');

    try {
      // Step 1: Generate study notes
      setGenerationStep('Generating comprehensive study notes...');
      const studyNotes = await generateStudyNotes(topic, educationLevel, customRequirements);
      
      // Step 2: Generate diagrams
      setGenerationStep('Creating educational diagrams...');
      const images = [];
      
      if (studyNotes.diagrams && studyNotes.diagrams.length > 0) {
        for (let i = 0; i < studyNotes.diagrams.length; i++) {
          const diagram = studyNotes.diagrams[i];
          setGenerationStep(`Generating diagram ${i + 1} of ${studyNotes.diagrams.length}...`);
          
          try {
            const imageData = await generateEducationalDiagram(diagram.prompt, topic);
            images.push({
              id: diagram.id,
              title: diagram.title,
              data: imageData,
              caption: diagram.description,
              alt: `Educational diagram: ${diagram.title}`
            });
          } catch (imgError) {
            console.warn(`Failed to generate diagram ${diagram.id}:`, imgError);
            // Continue with other diagrams even if one fails
          }
        }
      }

      setGenerationStep('Finalizing content...');
      
      // Combine notes with generated images
      const contentWithImages = {
        ...studyNotes,
        diagrams: images,
        generatedAt: new Date().toISOString()
      };

      setGeneratedContent(contentWithImages);
      setGeneratedImages(images);

    } catch (err) {
      console.error('Generation error:', err);
      setError({
        message: err.message || 'Failed to generate study notes',
        details: `Unable to generate content for "${topic}" at ${educationLevel} level. Please try again or contact support if the issue persists.`,
        timestamp: new Date().toISOString(),
        type: 'generation_error'
      });
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleGenerationComplete = () => {
    // This is called when the progress animation completes
    // The actual content setting is handled in handleGenerate
  };

  const handleSelectTopic = (selectedTopic) => {
    setTopic(selectedTopic);
    setShowSuggestions(false);
    // Auto-focus on topic input after selection
    setTimeout(() => {
      const topicInput = document.querySelector('textarea');
      if (topicInput) {
        topicInput.focus();
      }
    }, 100);
  };

  const handleRegenerateSection = async (sectionId) => {
    if (!generatedContent) return;

    try {
      setGenerationStep(`Regenerating ${sectionId} section...`);
      
      // Import the regenerateSection function
      const { regenerateSection } = await import('../../utils/geminiAPI');
      const updatedSection = await regenerateSection(sectionId, topic, educationLevel, customRequirements);
      
      // Update the content with the regenerated section
      setGeneratedContent(prev => ({
        ...prev,
        sections: prev.sections.map(section => 
          section.id === sectionId 
            ? { ...section, content: updatedSection.content }
            : section
        )
      }));

    } catch (error) {
      console.error(`Failed to regenerate section ${sectionId}:`, error);
      setError({
        message: `Failed to regenerate ${sectionId} section`,
        details: error.message,
        timestamp: new Date().toISOString(),
        type: 'regeneration_error'
      });
    } finally {
      setGenerationStep('');
    }
  };

  const handleRegenerateDiagram = async (diagramId) => {
    if (!generatedContent) return;

    try {
      setGenerationStep(`Regenerating diagram...`);
      
      const diagram = generatedContent.diagrams.find(d => d.id === diagramId);
      if (diagram) {
        const imageData = await generateEducationalDiagram(diagram.caption, topic);
        
        // Update the images
        setGeneratedImages(prev => prev.map(img => 
          img.id === diagramId 
            ? { ...img, data: imageData }
            : img
        ));

        // Update the content
        setGeneratedContent(prev => ({
          ...prev,
          diagrams: prev.diagrams.map(d => 
            d.id === diagramId 
              ? { ...d, data: imageData }
              : d
          )
        }));
      }

    } catch (error) {
      console.error(`Failed to regenerate diagram ${diagramId}:`, error);
      setError({
        message: `Failed to regenerate diagram`,
        details: error.message,
        timestamp: new Date().toISOString(),
        type: 'regeneration_error'
      });
    } finally {
      setGenerationStep('');
    }
  };

  const handleRetry = () => {
    setError(null);
    handleGenerate();
  };

  const handleReset = () => {
    setTopic('');
    setEducationLevel('intermediate');
    setCustomRequirements('');
    setIsGenerating(false);
    setGeneratedContent(null);
    setGeneratedImages([]);
    setError(null);
    setShowSuggestions(true);
    setGenerationStep('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ActionContextPanel />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-4">
              Generate Study Notes
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Transform any topic into comprehensive study materials with AI-powered content generation and visual diagrams
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Error State */}
            {error && (
              <ErrorHandler
                error={error}
                onRetry={handleRetry}
                onReset={handleReset}
              />
            )}

            {/* Generation Progress */}
            {isGenerating && (
              <GenerationProgress
                isGenerating={isGenerating}
                step={generationStep}
                onComplete={handleGenerationComplete}
              />
            )}

            {/* Generated Content */}
            {generatedContent && !isGenerating && !error && (
              <GeneratedContent
                content={generatedContent}
                images={generatedImages}
                onRegenerateSection={handleRegenerateSection}
                onRegenerateDiagram={handleRegenerateDiagram}
              />
            )}

            {/* Input Section - Always visible but disabled during generation */}
            {!generatedContent && !isGenerating && !error && (
              <>
                <TopicInputSection
                  topic={topic}
                  setTopic={setTopic}
                  educationLevel={educationLevel}
                  setEducationLevel={setEducationLevel}
                  customRequirements={customRequirements}
                  setCustomRequirements={setCustomRequirements}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />

                {/* Topic Suggestions */}
                {showSuggestions && (
                  <div className="lg:max-w-2xl lg:mx-auto">
                    <TopicSuggestions
                      onSelectTopic={handleSelectTopic}
                      isVisible={showSuggestions}
                    />
                  </div>
                )}
              </>
            )}

            {/* Quick Actions for Generated Content */}
            {generatedContent && !isGenerating && (
              <div className="bg-surface rounded-lg shadow-soft border border-border p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div>
                    <h3 className="font-medium text-text-primary">
                      Want to generate notes for another topic?
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Start a new generation or modify your current topic
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-secondary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      New Topic
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NoteGenerationInterface;