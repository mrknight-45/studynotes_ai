import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { generateStudyNotesPDF } from '../../../utils/pdfGenerator';

const GeneratedContent = ({ content, images, onRegenerateSection, onRegenerateDiagram }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const navigate = useNavigate();

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleContinueToEditor = () => {
    navigate('/note-editor');
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generateStudyNotesPDF(content, images);
      // PDF generation success handled by the utility function
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface rounded-lg shadow-soft border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Study Notes: {content?.topic}
            </h2>
            <p className="text-text-secondary">
              Generated on {new Date().toLocaleDateString()} • Education Level: {content?.educationLevel}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              iconName="Download"
              size="sm"
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}
            </Button>
            <Button
              variant="secondary"
              iconName="RefreshCw"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Regenerate All
            </Button>
            <Button
              variant="primary"
              iconName="Edit"
              iconPosition="left"
              onClick={handleContinueToEditor}
            >
              Continue to Editor
            </Button>
          </div>
        </div>
      </div>

      {/* Generated Diagrams */}
      {images && images.length > 0 && (
        <div className="bg-surface rounded-lg shadow-soft border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="Image" size={20} className="mr-2" />
            Visual Diagrams
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((diagram) => (
              <div key={diagram.id} className="space-y-3">
                <div className="relative group">
                  <div className="overflow-hidden rounded-lg border border-border">
                    <img
                      src={`data:image/png;base64,${diagram.data}`}
                      alt={diagram.alt}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="RefreshCw"
                      onClick={() => onRegenerateDiagram?.(diagram.id)}
                      className="bg-surface shadow-soft"
                    >
                      Regenerate
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">{diagram.title}</h4>
                  <p className="text-sm text-text-secondary">{diagram.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="space-y-4">
        {content?.sections?.map((section) => (
          <div key={section.id} className="bg-surface rounded-lg shadow-soft border border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name={section.icon} size={20} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {section.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RefreshCw"
                    onClick={() => onRegenerateSection?.(section.id)}
                  >
                    Regenerate
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName={expandedSections[section.id] ? "ChevronUp" : "ChevronDown"}
                    onClick={() => toggleSection(section.id)}
                  />
                </div>
              </div>

              <div className={`transition-all duration-300 ${
                expandedSections[section.id] === false ? 'max-h-20 overflow-hidden' : ''
              }`}>
                <div className="prose prose-sm max-w-none text-text-primary">
                  {section?.content?.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return <br key={index} />;
                    
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h4 key={index} className="font-semibold text-text-primary mt-4 mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </h4>
                      );
                    }
                    
                    if (paragraph.startsWith('•')) {
                      return (
                        <div key={index} className="flex items-start space-x-2 mb-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{paragraph.substring(1).trim()}</span>
                        </div>
                      );
                    }
                    
                    return (
                      <p key={index} className="mb-3 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {expandedSections[section.id] === false && (
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ChevronDown"
                    onClick={() => toggleSection(section.id)}
                  >
                    Show More
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="bg-surface rounded-lg shadow-soft border border-border p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <p className="text-text-primary font-medium">Ready to customize your notes?</p>
            <p className="text-sm text-text-secondary">
              Continue to the editor to make adjustments and export your study materials.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              iconName="Download"
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
            </Button>
            <Button
              variant="primary"
              iconName="Edit"
              iconPosition="left"
              onClick={handleContinueToEditor}
            >
              Continue to Editor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedContent;