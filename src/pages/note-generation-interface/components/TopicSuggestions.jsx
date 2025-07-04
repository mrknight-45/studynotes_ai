import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';


const TopicSuggestions = ({ onSelectTopic, isVisible }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: 'Grid' },
    { id: 'science', name: 'Science', icon: 'Atom' },
    { id: 'math', name: 'Mathematics', icon: 'Calculator' },
    { id: 'history', name: 'History', icon: 'Clock' },
    { id: 'literature', name: 'Literature', icon: 'BookOpen' },
    { id: 'technology', name: 'Technology', icon: 'Cpu' }
  ];

  const suggestions = [
    // Science Topics
    { 
      topic: 'Photosynthesis', 
      category: 'science', 
      description: 'How plants convert sunlight into energy',
      difficulty: 'intermediate',
      estimatedTime: '15-20 min'
    },
    { 
      topic: 'Newton\'s Laws of Motion', 
      category: 'science', 
      description: 'The three fundamental laws of classical mechanics',
      difficulty: 'intermediate',
      estimatedTime: '20-25 min'
    },
    { 
      topic: 'DNA Structure and Function', 
      category: 'science', 
      description: 'The blueprint of life and genetic information',
      difficulty: 'advanced',
      estimatedTime: '25-30 min'
    },
    { 
      topic: 'The Water Cycle', 
      category: 'science', 
      description: 'How water moves through Earth\'s systems',
      difficulty: 'basic',
      estimatedTime: '10-15 min'
    },
    { 
      topic: 'Cellular Respiration', 
      category: 'science', 
      description: 'How cells produce energy from glucose',
      difficulty: 'intermediate',
      estimatedTime: '20-25 min'
    },
    { 
      topic: 'Acid Rain Formation', 
      category: 'science', 
      description: 'Environmental chemistry and pollution effects',
      difficulty: 'intermediate',
      estimatedTime: '15-20 min'
    },

    // Mathematics Topics
    { 
      topic: 'Quadratic Equations', 
      category: 'math', 
      description: 'Solving polynomial equations of degree 2',
      difficulty: 'intermediate',
      estimatedTime: '20-25 min'
    },
    { 
      topic: 'Pythagorean Theorem', 
      category: 'math', 
      description: 'The relationship between sides of right triangles',
      difficulty: 'basic',
      estimatedTime: '15-20 min'
    },
    { 
      topic: 'Calculus: Derivatives', 
      category: 'math', 
      description: 'Rate of change and slope of curves',
      difficulty: 'advanced',
      estimatedTime: '30-35 min'
    },
    { 
      topic: 'Probability and Statistics', 
      category: 'math', 
      description: 'Analyzing data and predicting outcomes',
      difficulty: 'intermediate',
      estimatedTime: '25-30 min'
    },

    // History Topics
    { 
      topic: 'World War II', 
      category: 'history', 
      description: 'The global conflict from 1939-1945',
      difficulty: 'intermediate',
      estimatedTime: '30-35 min'
    },
    { 
      topic: 'The Renaissance', 
      category: 'history', 
      description: 'European cultural and artistic revival',
      difficulty: 'intermediate',
      estimatedTime: '25-30 min'
    },
    { 
      topic: 'American Civil War', 
      category: 'history', 
      description: 'The conflict between North and South (1861-1865)',
      difficulty: 'intermediate',
      estimatedTime: '25-30 min'
    },
    { 
      topic: 'Ancient Greek Democracy', 
      category: 'history', 
      description: 'The birth of democratic governance',
      difficulty: 'basic',
      estimatedTime: '20-25 min'
    },

    // Literature Topics
    { 
      topic: 'Shakespeare\'s Hamlet', 
      category: 'literature', 
      description: 'Analysis of the tragic prince of Denmark',
      difficulty: 'advanced',
      estimatedTime: '30-35 min'
    },
    { 
      topic: 'Poetry Analysis Techniques', 
      category: 'literature', 
      description: 'How to analyze literary devices and themes',
      difficulty: 'intermediate',
      estimatedTime: '20-25 min'
    },
    { 
      topic: 'The Hero\'s Journey', 
      category: 'literature', 
      description: 'Joseph Campbell\'s monomyth narrative structure',
      difficulty: 'intermediate',
      estimatedTime: '25-30 min'
    },

    // Technology Topics
    { 
      topic: 'Artificial Intelligence Basics', 
      category: 'technology', 
      description: 'Introduction to AI concepts and applications',
      difficulty: 'intermediate',
      estimatedTime: '25-30 min'
    },
    { 
      topic: 'Computer Networks', 
      category: 'technology', 
      description: 'How computers communicate and share data',
      difficulty: 'intermediate',
      estimatedTime: '20-25 min'
    },
    { 
      topic: 'Cybersecurity Fundamentals', 
      category: 'technology', 
      description: 'Protecting digital information and systems',
      difficulty: 'basic',
      estimatedTime: '20-25 min'
    },
    { 
      topic: 'Climate Change', 
      category: 'science', 
      description: 'Global warming causes, effects, and solutions',
      difficulty: 'intermediate',
      estimatedTime: '25-30 min'
    }
  ];

  const filteredSuggestions = selectedCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-surface rounded-lg shadow-soft border border-border p-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Popular Study Topics
        </h3>
        <p className="text-text-secondary">
          Choose a topic to get started quickly, or enter your own custom topic above
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            <Icon name={category.icon} size={16} className="mr-1" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Topic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSuggestions.map((suggestion, index) => (
          <motion.div
            key={`${suggestion.topic}-${index}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onSelectTopic(suggestion.topic)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors">
                {suggestion.topic}
              </h4>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(suggestion.difficulty)}`}>
                {suggestion.difficulty}
              </span>
            </div>
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {suggestion.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary flex items-center">
                <Icon name="Clock" size={14} className="mr-1" />
                {suggestion.estimatedTime}
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="ArrowRight" size={16} className="text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Custom Topic Prompt */}
      <div className="mt-6 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h4 className="font-medium text-text-primary">Need something specific?</h4>
        </div>
        <p className="text-sm text-text-secondary">
          Enter any topic in the search box above. Our AI can generate study notes for virtually any subject, 
          from basic concepts to advanced theories. Try topics like "Quantum Physics", "Renaissance Art", 
          "Machine Learning", or "Ancient Philosophy".
        </p>
      </div>
    </motion.div>
  );
};

export default TopicSuggestions;