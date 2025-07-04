import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  onClearFilters 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    levels: true,
    dates: false,
    tags: false
  });

  const categories = [
    { id: 'science', label: 'Science', count: 24 },
    { id: 'mathematics', label: 'Mathematics', count: 18 },
    { id: 'history', label: 'History', count: 12 },
    { id: 'literature', label: 'Literature', count: 8 },
    { id: 'technology', label: 'Technology', count: 15 },
    { id: 'languages', label: 'Languages', count: 6 }
  ];

  const educationLevels = [
    { id: 'basic', label: 'Basic', count: 32 },
    { id: 'intermediate', label: 'Intermediate', count: 28 },
    { id: 'advanced', label: 'Advanced', count: 23 }
  ];

  const popularTags = [
    'exam-prep', 'quick-review', 'detailed-notes', 'visual-aids', 
    'formulas', 'definitions', 'examples', 'practice-questions'
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleLevelChange = (levelId) => {
    const updatedLevels = filters.levels.includes(levelId)
      ? filters.levels.filter(id => id !== levelId)
      : [...filters.levels, levelId];
    
    onFiltersChange({
      ...filters,
      levels: updatedLevels
    });
  };

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  const handleTagToggle = (tag) => {
    const updatedTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFiltersChange({
      ...filters,
      tags: updatedTags
    });
  };

  const getActiveFiltersCount = () => {
    return filters.categories.length + 
           filters.levels.length + 
           filters.tags.length + 
           (filters.dateRange.start || filters.dateRange.end ? 1 : 0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Filter Panel */}
      <div className={`
        fixed lg:static top-0 left-0 h-full w-80 bg-surface border-r border-border z-50 
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
              {getActiveFiltersCount() > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={onClearFilters}
                size="sm"
                className="text-text-secondary"
              >
                Clear
              </Button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-secondary-50 transition-smooth"
            >
              <span className="font-medium text-text-primary">Categories</span>
              <Icon 
                name={expandedSections.categories ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary"
              />
            </button>
            
            {expandedSections.categories && (
              <div className="mt-2 space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary-50 cursor-pointer transition-smooth"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm text-text-primary">{category.label}</span>
                    </div>
                    <span className="text-xs text-text-secondary bg-secondary-100 px-2 py-1 rounded">
                      {category.count}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Education Levels Section */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('levels')}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-secondary-50 transition-smooth"
            >
              <span className="font-medium text-text-primary">Education Level</span>
              <Icon 
                name={expandedSections.levels ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary"
              />
            </button>
            
            {expandedSections.levels && (
              <div className="mt-2 space-y-2">
                {educationLevels.map((level) => (
                  <label
                    key={level.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary-50 cursor-pointer transition-smooth"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.levels.includes(level.id)}
                        onChange={() => handleLevelChange(level.id)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm text-text-primary">{level.label}</span>
                    </div>
                    <span className="text-xs text-text-secondary bg-secondary-100 px-2 py-1 rounded">
                      {level.count}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Date Range Section */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('dates')}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-secondary-50 transition-smooth"
            >
              <span className="font-medium text-text-primary">Creation Date</span>
              <Icon 
                name={expandedSections.dates ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary"
              />
            </button>
            
            {expandedSections.dates && (
              <div className="mt-2 space-y-3">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">From</label>
                  <Input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">To</label>
                  <Input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tags Section */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('tags')}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-secondary-50 transition-smooth"
            >
              <span className="font-medium text-text-primary">Tags</span>
              <Icon 
                name={expandedSections.tags ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary"
              />
            </button>
            
            {expandedSections.tags && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth ${
                        filters.tags.includes(tag)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;