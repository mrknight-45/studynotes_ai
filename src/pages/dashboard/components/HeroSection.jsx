import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HeroSection = () => {
  const [topic, setTopic] = useState('');
  const [educationLevel, setEducationLevel] = useState('basic');
  const navigate = useNavigate();

  const handleGenerateNotes = () => {
    if (topic.trim()) {
      navigate('/note-generation-interface', { 
        state: { topic: topic.trim(), level: educationLevel } 
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && topic.trim()) {
      handleGenerateNotes();
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 lg:p-8 mb-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-3">
            Generate AI-Powered Study Notes
          </h1>
          <p className="text-text-secondary text-base lg:text-lg">
            Transform any topic into comprehensive study materials with visual diagrams and structured content
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your study topic (e.g., Photosynthesis, World War II, Calculus)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full text-center text-lg py-4 pr-12"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon name="Search" size={20} className="text-text-secondary" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="GraduationCap" size={18} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-secondary">Education Level:</span>
            </div>
            
            <div className="flex bg-surface rounded-lg p-1 border border-border">
              {[
                { value: 'basic', label: 'Basic', icon: 'BookOpen' },
                { value: 'intermediate', label: 'Intermediate', icon: 'Book' },
                { value: 'advanced', label: 'Advanced', icon: 'GraduationCap' }
              ].map((level) => (
                <button
                  key={level.value}
                  onClick={() => setEducationLevel(level.value)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    educationLevel === level.value
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={level.icon} size={16} />
                  <span>{level.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleGenerateNotes}
            disabled={!topic.trim()}
            iconName="Sparkles"
            iconPosition="left"
            className="w-full sm:w-auto px-8 py-3 text-lg font-semibold"
          >
            Generate Study Notes
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[
            'Photosynthesis',
            'Machine Learning',
            'French Revolution',
            'Quantum Physics',
            'Cell Biology'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setTopic(suggestion)}
              className="px-3 py-1 text-sm bg-surface border border-border rounded-full text-text-secondary hover:text-text-primary hover:border-primary transition-smooth"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;