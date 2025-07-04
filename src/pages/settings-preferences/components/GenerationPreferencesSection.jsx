import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GenerationPreferencesSection = ({ isExpanded, onToggle }) => {
  const [preferences, setPreferences] = useState({
    educationLevel: 'intermediate',
    diagramStyle: 'modern',
    contentLength: 'medium',
    language: 'english',
    includeExamples: true,
    includeQuestions: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const educationLevels = [
    { value: 'basic', label: 'Basic', description: 'Simple explanations with fundamental concepts' },
    { value: 'intermediate', label: 'Intermediate', description: 'Detailed explanations with practical examples' },
    { value: 'advanced', label: 'Advanced', description: 'In-depth analysis with complex applications' }
  ];

  const diagramStyles = [
    { value: 'modern', label: 'Modern', description: 'Clean, minimalist design with vibrant colors' },
    { value: 'classic', label: 'Classic', description: 'Traditional academic style with standard formatting' },
    { value: 'colorful', label: 'Colorful', description: 'Bright, engaging visuals with multiple colors' }
  ];

  const contentLengths = [
    { value: 'short', label: 'Short', description: 'Concise summaries (1-2 pages)' },
    { value: 'medium', label: 'Medium', description: 'Balanced content (3-5 pages)' },
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive coverage (6+ pages)' }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Generation Preferences</h3>
            <p className="text-sm text-text-secondary">Customize how your study notes are generated</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-secondary transition-transform duration-200"
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          {saveStatus && (
            <div className={`flex items-center space-x-2 text-sm p-3 rounded-lg mb-4 ${
              saveStatus === 'success' ?'bg-success-50 text-success border border-success-100' :'bg-error-50 text-error border border-error-100'
            }`}>
              <Icon 
                name={saveStatus === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                size={16} 
              />
              <span>
                {saveStatus === 'success' ? 'Preferences saved successfully' : 'Failed to save preferences'}
              </span>
            </div>
          )}

          <div className="space-y-6">
            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Default Education Level
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {educationLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => handlePreferenceChange('educationLevel', level.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      preferences.educationLevel === level.value
                        ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-200 text-text-primary'
                    }`}
                  >
                    <div className="font-medium mb-1">{level.label}</div>
                    <div className="text-xs text-text-secondary">{level.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Diagram Style */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Preferred Diagram Style
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {diagramStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => handlePreferenceChange('diagramStyle', style.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      preferences.diagramStyle === style.value
                        ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-200 text-text-primary'
                    }`}
                  >
                    <div className="font-medium mb-1">{style.label}</div>
                    <div className="text-xs text-text-secondary">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Length */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Content Length
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {contentLengths.map((length) => (
                  <button
                    key={length.value}
                    onClick={() => handlePreferenceChange('contentLength', length.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      preferences.contentLength === length.value
                        ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-200 text-text-primary'
                    }`}
                  >
                    <div className="font-medium mb-1">{length.label}</div>
                    <div className="text-xs text-text-secondary">{length.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Language
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => handlePreferenceChange('language', lang.value)}
                    className={`p-3 rounded-lg border-2 text-center transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      preferences.language === lang.value
                        ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-200 text-text-primary'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Additional Content
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.includeExamples}
                    onChange={(e) => handlePreferenceChange('includeExamples', e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-text-primary">Include real-life examples</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.includeQuestions}
                    onChange={(e) => handlePreferenceChange('includeQuestions', e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-text-primary">Include practice questions</span>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="primary"
                onClick={handleSave}
                loading={isSaving}
                iconName="Save"
                iconPosition="left"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerationPreferencesSection;