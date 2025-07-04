import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickAccessToolbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'favorites',
      label: 'Favorites',
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error-50',
      count: 12,
      onClick: () => navigate('/study-library?filter=favorites')
    },
    {
      id: 'recent',
      label: 'Recent',
      icon: 'Clock',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      count: 8,
      onClick: () => navigate('/study-library?filter=recent')
    },
    {
      id: 'downloads',
      label: 'Downloads',
      icon: 'Download',
      color: 'text-success',
      bgColor: 'bg-success-50',
      count: 23,
      onClick: () => navigate('/study-library?filter=downloads')
    },
    {
      id: 'shared',
      label: 'Shared',
      icon: 'Share2',
      color: 'text-accent',
      bgColor: 'bg-accent-50',
      count: 5,
      onClick: () => navigate('/study-library?filter=shared')
    }
  ];

  const recentSearches = [
    'Photosynthesis',
    'World War II',
    'Calculus',
    'Chemical Bonding',
    'Renaissance Art'
  ];

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate('/study-library', { state: { searchQuery: query.trim() } });
      setSearchQuery('');
      setIsSearchExpanded(false);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Quick Access</h3>
        <button
          onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth"
        >
          <Icon name="Search" size={20} />
        </button>
      </div>

      {/* Search Section */}
      {isSearchExpanded && (
        <div className="mb-6 p-4 bg-secondary-50 rounded-lg">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Search your study notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="w-full pr-10"
            />
            <button
              onClick={() => handleSearch(searchQuery)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded text-text-secondary hover:text-text-primary"
            >
              <Icon name="Search" size={18} />
            </button>
          </div>

          <div>
            <div className="text-sm font-medium text-text-secondary mb-2">Recent Searches</div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                  className="px-3 py-1 text-sm bg-surface border border-border rounded-full text-text-secondary hover:text-text-primary hover:border-primary transition-smooth"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="flex flex-col items-center space-y-3 p-4 rounded-lg border border-border hover:border-primary hover:shadow-soft transition-smooth group"
          >
            <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon name={action.icon} size={24} className={action.color} />
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-text-primary">{action.label}</div>
              <div className="text-xs text-text-secondary">{action.count} items</div>
            </div>
          </button>
        ))}
      </div>

      {/* Export Options */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-sm font-medium text-text-secondary mb-3">Export Options</div>
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            iconName="FileText"
            iconPosition="left"
            size="sm"
            onClick={() => {
              // Simulate bulk export
              const element = document.createElement('a');
              const file = new Blob(['# Bulk Export\n\nAll study notes...'], { type: 'application/zip' });
              element.href = URL.createObjectURL(file);
              element.download = 'study-notes-bulk.zip';
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
          >
            Bulk PDF
          </Button>
          <Button
            variant="ghost"
            iconName="Mail"
            iconPosition="left"
            size="sm"
            onClick={() => {
              const subject = encodeURIComponent('Study Notes from StudyNotes AI');
              const body = encodeURIComponent('Check out my study notes created with StudyNotes AI!');
              window.open(`mailto:?subject=${subject}&body=${body}`);
            }}
          >
            Email
          </Button>
          <Button
            variant="ghost"
            iconName="Cloud"
            iconPosition="left"
            size="sm"
            onClick={() => {
              // Simulate Google Drive integration
              alert('Google Drive integration coming soon!');
            }}
          >
            Drive
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessToolbar;