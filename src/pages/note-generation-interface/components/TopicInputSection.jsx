import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TopicInputSection = ({ 
  topic, 
  setTopic, 
  educationLevel, 
  setEducationLevel, 
  customRequirements, 
  setCustomRequirements,
  onGenerate,
  isGenerating 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const educationLevels = [
    { 
      value: 'basic', 
      label: 'Basic', 
      description: 'Simple explanations with fundamental concepts' 
    },
    { 
      value: 'intermediate', 
      label: 'Intermediate', 
      description: 'Detailed analysis with practical applications' 
    },
    { 
      value: 'advanced', 
      label: 'Advanced', 
      description: 'In-depth coverage with complex relationships' 
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate();
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-soft border border-border p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Input */}
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-text-primary mb-2">
            Study Topic
          </label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your study topic (e.g., Photosynthesis, World War II, Calculus Derivatives, etc.)"
            className="w-full h-32 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none text-text-primary placeholder-text-secondary bg-background"
            required
            disabled={isGenerating}
          />
          <p className="text-xs text-text-secondary mt-1">
            Be specific for better results. Include context if needed.
          </p>
        </div>

        {/* Education Level Selector */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Education Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {educationLevels.map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setEducationLevel(level.value)}
                disabled={isGenerating}
                className={`p-4 rounded-lg border-2 transition-smooth text-left ${
                  educationLevel === level.value
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-200 text-text-secondary hover:text-text-primary'
                } ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="font-medium text-sm">{level.label}</div>
                <div className="text-xs mt-1 opacity-80">{level.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Options Toggle */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            disabled={isGenerating}
            className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
          >
            <Icon name={showAdvanced ? "ChevronDown" : "ChevronRight"} size={16} />
            <span className="text-sm font-medium">Advanced Options</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 p-4 bg-secondary-50 rounded-lg border border-secondary-200 space-y-4">
              {/* Custom Requirements */}
              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-text-primary mb-2">
                  Custom Requirements (Optional)
                </label>
                <Input
                  id="requirements"
                  type="text"
                  value={customRequirements}
                  onChange={(e) => setCustomRequirements(e.target.value)}
                  placeholder="e.g., Include historical context, Focus on practical applications"
                  disabled={isGenerating}
                />
              </div>

              {/* Content Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Content Length
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text-primary bg-background"
                    disabled={isGenerating}
                  >
                    <option value="concise">Concise</option>
                    <option value="detailed" selected>Detailed</option>
                    <option value="comprehensive">Comprehensive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Include Diagrams
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-text-primary bg-background"
                    disabled={isGenerating}
                  >
                    <option value="auto" selected>Auto-generate</option>
                    <option value="minimal">Minimal</option>
                    <option value="extensive">Extensive</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isGenerating}
            iconName="Sparkles"
            iconPosition="left"
            disabled={!topic.trim() || isGenerating}
            className="px-8"
          >
            {isGenerating ? 'Generating Notes...' : 'Generate Study Notes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TopicInputSection;