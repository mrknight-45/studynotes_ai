import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'empty', searchQuery = '', onClearFilters }) => {
  const navigate = useNavigate();

  const topicSuggestions = [
    'Photosynthesis Process',
    'Quadratic Equations',
    'World War II Timeline',
    'Shakespeare\'s Hamlet',
    'Python Programming Basics',
    'Human Anatomy Systems'
  ];

  if (type === 'search') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-text-secondary" />
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No results found
        </h3>
        
        <p className="text-text-secondary text-center mb-6 max-w-md">
          We couldn't find any study notes matching "{searchQuery}". Try adjusting your search terms or filters.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            onClick={() => navigate('/note-generation-interface')}
            iconName="Plus"
          >
            Create New Notes
          </Button>
          
          {onClearFilters && (
            <Button
              variant="secondary"
              onClick={onClearFilters}
              iconName="RotateCcw"
            >
              Clear Filters
            </Button>
          )}
        </div>

        <div className="mt-8 w-full max-w-md">
          <p className="text-sm text-text-secondary mb-3 text-center">
            Try searching for:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {topicSuggestions.slice(0, 3).map((suggestion) => (
              <button
                key={suggestion}
                className="text-xs bg-secondary-100 text-text-secondary px-3 py-1 rounded-full hover:bg-secondary-200 transition-smooth"
                onClick={() => navigate('/note-generation-interface', { 
                  state: { suggestedTopic: suggestion } 
                })}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'filtered') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
          <Icon name="Filter" size={32} className="text-text-secondary" />
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No notes match your filters
        </h3>
        
        <p className="text-text-secondary text-center mb-6 max-w-md">
          Try adjusting your filter criteria to see more study notes, or create new notes for the topics you're looking for.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            onClick={onClearFilters}
            iconName="RotateCcw"
          >
            Clear All Filters
          </Button>
          
          <Button
            variant="primary"
            onClick={() => navigate('/note-generation-interface')}
            iconName="Plus"
          >
            Create New Notes
          </Button>
        </div>
      </div>
    );
  }

  // Default empty state
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 bg-primary-50 rounded-full flex items-center justify-center mb-6">
        <Icon name="BookOpen" size={48} className="text-primary" />
      </div>
      
      <h3 className="text-2xl font-semibold text-text-primary mb-2">
        Start Building Your Study Library
      </h3>
      
      <p className="text-text-secondary text-center mb-8 max-w-md">
        Create your first AI-generated study notes and build a comprehensive library of learning materials tailored to your needs.
      </p>

      <Button
        variant="primary"
        onClick={() => navigate('/note-generation-interface')}
        iconName="Plus"
        size="lg"
      >
        Create Your First Notes
      </Button>

      <div className="mt-12 w-full max-w-2xl">
        <h4 className="text-lg font-medium text-text-primary mb-4 text-center">
          Popular Topics to Get Started
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {topicSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => navigate('/note-generation-interface', { 
                state: { suggestedTopic: suggestion } 
              })}
              className="p-4 bg-surface border border-border rounded-lg hover:shadow-elevated hover:border-primary transition-smooth text-left group"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Lightbulb" size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-smooth">
                  {suggestion}
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Generate comprehensive notes
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center space-x-6 text-sm text-text-secondary">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-accent" />
          <span>AI-Powered</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Download" size={16} className="text-accent" />
          <span>PDF Export</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Image" size={16} className="text-accent" />
          <span>Visual Diagrams</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;