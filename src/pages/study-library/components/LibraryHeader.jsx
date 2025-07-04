import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const LibraryHeader = ({ 
  searchQuery, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  sortBy, 
  onSortChange,
  onFilterToggle,
  isFilterOpen,
  selectedCount,
  onBulkAction,
  isBulkMode,
  onBulkModeToggle
}) => {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First', icon: 'Calendar' },
    { value: 'date-asc', label: 'Oldest First', icon: 'Calendar' },
    { value: 'topic-asc', label: 'Topic A-Z', icon: 'Type' },
    { value: 'topic-desc', label: 'Topic Z-A', icon: 'Type' },
    { value: 'level-asc', label: 'Level: Basic First', icon: 'TrendingUp' },
    { value: 'level-desc', label: 'Level: Advanced First', icon: 'TrendingDown' }
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Sort';
  };

  const handleBulkAction = (action) => {
    onBulkAction(action);
  };

  return (
    <div className="bg-surface border-b border-border sticky top-16 z-40">
      <div className="px-4 lg:px-6 py-4">
        {/* Mobile Header */}
        <div className="lg:hidden space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={20} className="text-text-secondary" />
            </div>
            <Input
              type="search"
              placeholder="Search your study notes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={onFilterToggle}
                iconName="Filter"
                size="sm"
                className={isFilterOpen ? 'bg-primary-50 text-primary' : ''}
              >
                Filter
              </Button>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  iconName="ArrowUpDown"
                  size="sm"
                >
                  Sort
                </Button>
                
                {showSortMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-surface rounded-lg shadow-floating border border-border py-1 z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onSortChange(option.value);
                          setShowSortMenu(false);
                        }}
                        className={`flex items-center space-x-2 w-full px-3 py-2 text-sm text-left hover:bg-secondary-50 transition-smooth ${
                          sortBy === option.value ? 'bg-primary-50 text-primary' : 'text-text-secondary'
                        }`}
                      >
                        <Icon name={option.icon} size={16} />
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={onBulkModeToggle}
                iconName="CheckSquare"
                size="sm"
                className={isBulkMode ? 'bg-primary-50 text-primary' : ''}
              >
                Select
              </Button>
              
              <div className="flex bg-secondary-100 rounded-lg p-1">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={`p-2 rounded transition-smooth ${
                    viewMode === 'grid' ?'bg-surface shadow-soft text-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="Grid3X3" size={16} />
                </button>
                <button
                  onClick={() => onViewModeChange('list')}
                  className={`p-2 rounded transition-smooth ${
                    viewMode === 'list' ?'bg-surface shadow-soft text-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="List" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-text-primary">Study Library</h1>
            
            {isBulkMode && selectedCount > 0 && (
              <div className="flex items-center space-x-2 bg-primary-50 text-primary px-3 py-1 rounded-lg">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-medium">{selectedCount} selected</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="Search" size={20} className="text-text-secondary" />
              </div>
              <Input
                type="search"
                placeholder="Search your study notes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={onFilterToggle}
                iconName="Filter"
                className={isFilterOpen ? 'bg-primary-50 text-primary' : ''}
              >
                Filter
              </Button>

              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  iconName="ArrowUpDown"
                >
                  {getCurrentSortLabel()}
                </Button>
                
                {showSortMenu && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-surface rounded-lg shadow-floating border border-border py-1 z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onSortChange(option.value);
                          setShowSortMenu(false);
                        }}
                        className={`flex items-center space-x-2 w-full px-3 py-2 text-sm text-left hover:bg-secondary-50 transition-smooth ${
                          sortBy === option.value ? 'bg-primary-50 text-primary' : 'text-text-secondary'
                        }`}
                      >
                        <Icon name={option.icon} size={16} />
                        <span>{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                onClick={onBulkModeToggle}
                iconName="CheckSquare"
                className={isBulkMode ? 'bg-primary-50 text-primary' : ''}
              >
                Select
              </Button>

              <div className="flex bg-secondary-100 rounded-lg p-1">
                <button
                  onClick={() => onViewModeChange('grid')}
                  className={`p-2 rounded transition-smooth ${
                    viewMode === 'grid' ?'bg-surface shadow-soft text-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="Grid3X3" size={16} />
                </button>
                <button
                  onClick={() => onViewModeChange('list')}
                  className={`p-2 rounded transition-smooth ${
                    viewMode === 'list' ?'bg-surface shadow-soft text-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="List" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {isBulkMode && selectedCount > 0 && (
          <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                {selectedCount} note{selectedCount > 1 ? 's' : ''} selected
              </span>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => handleBulkAction('download')}
                  iconName="Download"
                  size="sm"
                >
                  Download
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleBulkAction('share')}
                  iconName="Share2"
                  size="sm"
                >
                  Share
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleBulkAction('delete')}
                  iconName="Trash2"
                  size="sm"
                  className="text-error hover:bg-error-50"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryHeader;