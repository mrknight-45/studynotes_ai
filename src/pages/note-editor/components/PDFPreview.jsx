import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PDFPreview = ({ noteData, isVisible, onToggle, onExport }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [exportOptions, setExportOptions] = useState({
    includeImages: true,
    includeToc: true,
    pageNumbers: true,
    watermark: false
  });

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean design with blue accents',
      preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200&h=280&fit=crop'
    },
    {
      id: 'academic',
      name: 'Academic',
      description: 'Traditional academic format',
      preview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=280&fit=crop'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple black and white layout',
      preview: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=280&fit=crop'
    }
  ];

  const handleExport = () => {
    onExport({
      template: selectedTemplate,
      options: exportOptions
    });
  };

  const handleOptionChange = (option, value) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[900] bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-floating max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-text-primary">PDF Preview & Export</h2>
          </div>
          <button
            onClick={onToggle}
            className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Settings Panel */}
          <div className="w-80 border-r border-border p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Template Selection */}
              <div>
                <h3 className="font-medium text-text-primary mb-3">Template</h3>
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-smooth ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-200'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-16 bg-secondary-100 rounded overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-b from-primary-100 to-primary-200"></div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-text-primary">{template.name}</div>
                          <div className="text-xs text-text-secondary">{template.description}</div>
                        </div>
                        {selectedTemplate === template.id && (
                          <Icon name="Check" size={16} className="text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Export Options */}
              <div>
                <h3 className="font-medium text-text-primary mb-3">Export Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeImages}
                      onChange={(e) => handleOptionChange('includeImages', e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">Include diagrams</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeToc}
                      onChange={(e) => handleOptionChange('includeToc', e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">Table of contents</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportOptions.pageNumbers}
                      onChange={(e) => handleOptionChange('pageNumbers', e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">Page numbers</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportOptions.watermark}
                      onChange={(e) => handleOptionChange('watermark', e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary">StudyNotes AI watermark</span>
                  </label>
                </div>
              </div>

              {/* Export Actions */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  onClick={handleExport}
                  iconName="Download"
                  fullWidth
                >
                  Export PDF
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={() => {/* Handle Google Drive export */}}
                  iconName="Cloud"
                  fullWidth
                >
                  Save to Drive
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => {/* Handle email sharing */}}
                  iconName="Mail"
                  fullWidth
                >
                  Email PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex-1 p-6 bg-secondary-50 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white shadow-soft rounded-lg overflow-hidden">
                {/* PDF Preview Content */}
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-text-primary mb-2">
                      {noteData.topic || 'Study Notes'}
                    </h1>
                    <p className="text-text-secondary">
                      Generated with StudyNotes AI • {new Date().toLocaleDateString()}
                    </p>
                  </div>

                  {exportOptions.includeToc && (
                    <div className="mb-8 p-4 bg-secondary-50 rounded-lg">
                      <h2 className="font-semibold text-text-primary mb-3">Table of Contents</h2>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Definition</span>
                          <span>1</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Explanation</span>
                          <span>1</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Key Points</span>
                          <span>2</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Real-Life Applications</span>
                          <span>3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Summary</span>
                          <span>4</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sample Content Preview */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-text-primary mb-3">Definition</h2>
                      <p className="text-text-primary leading-relaxed">
                        This is a preview of how your study notes will appear in the exported PDF document...
                      </p>
                    </div>

                    {exportOptions.includeImages && (
                      <div className="bg-secondary-50 p-4 rounded-lg text-center">
                        <Icon name="Image" size={48} className="text-text-secondary mx-auto mb-2" />
                        <p className="text-sm text-text-secondary">Diagram will appear here</p>
                      </div>
                    )}

                    <div>
                      <h2 className="text-lg font-semibold text-text-primary mb-3">Key Points</h2>
                      <ul className="list-disc list-inside space-y-1 text-text-primary">
                        <li>Sample key point one</li>
                        <li>Sample key point two</li>
                        <li>Sample key point three</li>
                      </ul>
                    </div>
                  </div>

                  {exportOptions.pageNumbers && (
                    <div className="text-center mt-8 pt-4 border-t border-border">
                      <span className="text-sm text-text-secondary">Page 1</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;