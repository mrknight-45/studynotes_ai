import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ActionContextPanel from '../../components/ui/ActionContextPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContentSection from './components/ContentSection';
import DiagramViewer from './components/DiagramViewer';
import VersionHistory from './components/VersionHistory';
import PDFPreview from './components/PDFPreview';
import AutoSaveIndicator from './components/AutoSaveIndicator';

const NoteEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [noteData, setNoteData] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [draggedSection, setDraggedSection] = useState(null);
  const [isVersionHistoryVisible, setIsVersionHistoryVisible] = useState(false);
  const [isPDFPreviewVisible, setIsPDFPreviewVisible] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const mockNoteData = {
    id: 'note-001',
    topic: 'Photosynthesis in Plants',
    level: 'intermediate',
    createdAt: new Date(Date.now() - 3600000),
    lastModified: new Date(Date.now() - 300000),
    sections: [
      {
        id: 'definition',
        type: 'definition',
        title: 'Definition',
        content: `Photosynthesis is the biological process by which plants, algae, and certain bacteria convert light energy from the sun into chemical energy stored in glucose molecules.\n\nThis process is fundamental to life on Earth as it produces oxygen as a byproduct and forms the base of most food chains.`,
        order: 1
      },
      {
        id: 'explanation',
        type: 'explanation',
        title: 'Detailed Explanation',
        content: `The photosynthesis process occurs in two main stages:\n\n**Light-dependent reactions (Photo reactions):**\n• Occur in the thylakoid membranes of chloroplasts\n• Chlorophyll absorbs light energy\n• Water molecules are split, releasing oxygen\n• ATP and NADPH are produced\n\n**Light-independent reactions (Calvin Cycle):**\n• Take place in the stroma of chloroplasts\n• Carbon dioxide is fixed into organic molecules\n• ATP and NADPH from light reactions are used\n• Glucose is produced as the final product`,
        order: 2
      },
      {
        id: 'keyPoints',
        type: 'keyPoints',
        title: 'Key Points',
        content: `• **Chemical equation:** 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n• **Location:** Primarily occurs in chloroplasts of plant cells\n• **Pigments involved:** Chlorophyll a, chlorophyll b, carotenoids\n• **Energy conversion:** Light energy → Chemical energy (glucose)\n• **Byproducts:** Oxygen gas released into atmosphere\n• **Factors affecting rate:** Light intensity, CO₂ concentration, temperature\n• **Importance:** Primary source of energy for most ecosystems`,
        order: 3
      },
      {
        id: 'applications',
        type: 'applications',
        title: 'Real-Life Applications',
        content: `**Environmental Applications:**\n• Carbon dioxide removal from atmosphere\n• Oxygen production for atmospheric balance\n• Climate regulation through carbon sequestration\n\n**Agricultural Applications:**\n• Crop optimization through understanding light requirements\n• Greenhouse design for maximum photosynthetic efficiency\n• Hydroponic systems utilizing artificial lighting\n\n**Biotechnology Applications:**\n• Artificial photosynthesis research for renewable energy\n• Biofuel production from photosynthetic organisms\n• Development of more efficient solar panels inspired by photosynthesis`,
        order: 4
      },
      {
        id: 'summary',
        type: 'summary',
        title: 'Summary',
        content: `Photosynthesis is a vital biological process that converts sunlight into chemical energy, producing glucose and oxygen. It occurs in two stages: light-dependent reactions in thylakoids and the Calvin cycle in chloroplast stroma.\n\nThis process is essential for life on Earth, providing energy for food chains and maintaining atmospheric oxygen levels. Understanding photosynthesis has practical applications in agriculture, environmental science, and renewable energy research.`,
        order: 5
      }
    ],
    diagrams: [
      {
        id: 'diagram-001',
        title: 'Photosynthesis Process Overview',
        imageUrl: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=800&h=600&fit=crop',
        altText: 'Diagram showing the complete photosynthesis process with light and dark reactions',
        caption: 'Complete overview of photosynthesis showing both light-dependent and light-independent reactions',
        customDescription: 'Show a detailed diagram of a chloroplast with thylakoids and stroma, illustrating the flow of energy and materials'
      },
      {
        id: 'diagram-002',
        title: 'Chloroplast Structure',
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
        altText: 'Detailed structure of a chloroplast showing thylakoids, stroma, and other components',
        caption: 'Cross-section of a chloroplast highlighting the locations where different stages of photosynthesis occur',
        customDescription: 'Create a labeled cross-section diagram of a chloroplast with clear identification of all major components'
      }
    ]
  };

  const mockVersions = [
    {
      id: 'v1',
      name: 'Current Version',
      type: 'manual',
      timestamp: new Date(),
      description: 'Latest edits to key points section'
    },
    {
      id: 'v2',
      name: 'Auto-save',
      type: 'auto',
      timestamp: new Date(Date.now() - 300000),
      description: 'Automatic save after editing explanation'
    },
    {
      id: 'v3',
      name: 'Initial Draft',
      type: 'manual',
      timestamp: new Date(Date.now() - 3600000),
      description: 'First version after AI generation'
    }
  ];

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        // Simulate loading from API or localStorage
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNoteData(mockNoteData);
        
        // Initialize expanded sections (expand first few by default)
        const initialExpanded = {};
        mockNoteData.sections.slice(0, 2).forEach(section => {
          initialExpanded[section.id] = true;
        });
        setExpandedSections(initialExpanded);
        
        setLastSaved(mockNoteData.lastModified);
      } catch (error) {
        console.error('Failed to load note data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!hasUnsavedChanges || isSaving) return;
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  }, [hasUnsavedChanges, isSaving]);

  useEffect(() => {
    const autoSaveInterval = setInterval(autoSave, 30000); // Auto-save every 30 seconds
    return () => clearInterval(autoSaveInterval);
  }, [autoSave]);

  // Section management
  const handleSectionUpdate = (sectionId, newContent) => {
    setNoteData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, content: newContent } : section
      )
    }));
    setHasUnsavedChanges(true);
  };

  const handleToggleExpand = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleDragStart = (sectionId) => {
    setDraggedSection(sectionId);
  };

  const handleDragEnd = () => {
    setDraggedSection(null);
  };

  const handleSectionReorder = (fromIndex, toIndex) => {
    if (!noteData) return;
    
    const newSections = [...noteData.sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    
    setNoteData(prev => ({
      ...prev,
      sections: newSections.map((section, index) => ({
        ...section,
        order: index + 1
      }))
    }));
    setHasUnsavedChanges(true);
  };

  // Diagram management
  const handleDiagramRegenerate = async (diagramId, customDescription) => {
    try {
      // Simulate API call for diagram regeneration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setNoteData(prev => ({
        ...prev,
        diagrams: prev.diagrams.map(diagram =>
          diagram.id === diagramId
            ? {
                ...diagram,
                imageUrl: `https://images.unsplash.com/photo-${Date.now()}?w=800&h=600&fit=crop`,
                customDescription
              }
            : diagram
        )
      }));
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error('Failed to regenerate diagram:', error);
    }
  };

  const handleDiagramDescriptionUpdate = (diagramId, description) => {
    setNoteData(prev => ({
      ...prev,
      diagrams: prev.diagrams.map(diagram =>
        diagram.id === diagramId
          ? { ...diagram, customDescription: description }
          : diagram
      )
    }));
    setHasUnsavedChanges(true);
  };

  // Version management
  const handleVersionRestore = (versionId) => {
    // In a real app, this would restore the content from the selected version
    console.log('Restoring version:', versionId);
    setHasUnsavedChanges(true);
  };

  // Export functionality
  const handlePDFExport = (exportConfig) => {
    console.log('Exporting PDF with config:', exportConfig);
    // Simulate PDF generation
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob(['PDF content would be generated here'], { type: 'application/pdf' });
      element.href = URL.createObjectURL(file);
      element.download = `${noteData.topic.replace(/\s+/g, '_')}_study_notes.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setIsPDFPreviewVisible(false);
    }, 1000);
  };

  // Navigation handlers
  const handleBackToDashboard = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };

  const handleGoToLibrary = () => {
    navigate('/study-library');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-text-secondary">Loading your study notes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!noteData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <p className="text-text-primary mb-2">Failed to load study notes</p>
            <p className="text-text-secondary mb-4">Please try again or go back to dashboard</p>
            <Button variant="primary" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Edit3" size={24} className="text-primary" />
                <h1 className="text-2xl font-bold text-text-primary">Note Editor</h1>
              </div>
              <p className="text-text-secondary">
                Customize and refine your AI-generated study materials
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <AutoSaveIndicator
                lastSaved={lastSaved}
                isSaving={isSaving}
                hasUnsavedChanges={hasUnsavedChanges}
              />
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => setIsVersionHistoryVisible(true)}
                  iconName="History"
                  size="sm"
                >
                  History
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setIsPDFPreviewVisible(true)}
                  iconName="FileText"
                  size="sm"
                >
                  Preview PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Topic Information */}
          <div className="bg-surface border border-border rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-1">
                  {noteData.topic}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span className="flex items-center space-x-1">
                    <Icon name="Target" size={14} />
                    <span>Level: {noteData.level}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Created: {noteData.createdAt.toLocaleDateString()}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3 sm:mt-0">
                <Button
                  variant="ghost"
                  onClick={handleBackToDashboard}
                  iconName="ArrowLeft"
                  size="sm"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleGoToLibrary}
                  iconName="FolderOpen"
                  size="sm"
                >
                  Library
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-2 space-y-4">
              {/* Content Sections */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">Content Sections</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const allExpanded = Object.keys(expandedSections).length === noteData.sections.length;
                        const newExpanded = {};
                        if (!allExpanded) {
                          noteData.sections.forEach(section => {
                            newExpanded[section.id] = true;
                          });
                        }
                        setExpandedSections(newExpanded);
                      }}
                      iconName="Maximize2"
                      size="sm"
                    >
                      {Object.keys(expandedSections).length === noteData.sections.length ? 'Collapse All' : 'Expand All'}
                    </Button>
                  </div>
                </div>

                {noteData.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <ContentSection
                      key={section.id}
                      section={section}
                      onUpdate={handleSectionUpdate}
                      onReorder={handleSectionReorder}
                      isExpanded={expandedSections[section.id]}
                      onToggleExpand={handleToggleExpand}
                      isDragging={draggedSection === section.id}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
              </div>

              {/* Diagrams Section */}
              {noteData.diagrams && noteData.diagrams.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-text-primary">Educational Diagrams</h3>
                  {noteData.diagrams.map((diagram) => (
                    <DiagramViewer
                      key={diagram.id}
                      diagram={diagram}
                      onRegenerate={handleDiagramRegenerate}
                      onUpdateDescription={handleDiagramDescriptionUpdate}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button
                    variant="primary"
                    onClick={() => setIsPDFPreviewVisible(true)}
                    iconName="Download"
                    fullWidth
                  >
                    Export PDF
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleGoToLibrary}
                    iconName="Save"
                    fullWidth
                  >
                    Save to Library
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {/* Handle sharing */}}
                    iconName="Share2"
                    fullWidth
                  >
                    Share Notes
                  </Button>
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-surface border border-border rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-3">Document Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Sections:</span>
                    <span className="text-text-primary">{noteData.sections.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Diagrams:</span>
                    <span className="text-text-primary">{noteData.diagrams.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Total Words:</span>
                    <span className="text-text-primary">
                      {noteData.sections.reduce((total, section) => {
                        const words = section.content.trim().split(/\s+/).filter(word => word.length > 0);
                        return total + words.length;
                      }, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Last Modified:</span>
                    <span className="text-text-primary">{noteData.lastModified.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-accent-50 border border-accent-100 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium text-accent mb-1">Pro Tips</h4>
                    <ul className="text-xs text-accent space-y-1">
                      <li>• Use drag handles to reorder sections</li>
                      <li>• Click diagram regenerate for new visuals</li>
                      <li>• Auto-save runs every 30 seconds</li>
                      <li>• Version history tracks all changes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals and Panels */}
      <VersionHistory
        versions={mockVersions}
        onRestore={handleVersionRestore}
        isVisible={isVersionHistoryVisible}
        onToggle={() => setIsVersionHistoryVisible(false)}
      />

      <PDFPreview
        noteData={noteData}
        isVisible={isPDFPreviewVisible}
        onToggle={() => setIsPDFPreviewVisible(false)}
        onExport={handlePDFExport}
      />

      <ActionContextPanel />
    </div>
  );
};

export default NoteEditor;