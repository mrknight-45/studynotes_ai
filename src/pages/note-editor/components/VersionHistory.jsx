import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VersionHistory = ({ versions, onRestore, isVisible, onToggle }) => {
  const [selectedVersion, setSelectedVersion] = useState(null);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getVersionIcon = (type) => {
    switch (type) {
      case 'auto': return 'Clock';
      case 'manual': return 'Save';
      case 'export': return 'Download';
      default: return 'FileText';
    }
  };

  const handleRestore = (version) => {
    if (window.confirm('Are you sure you want to restore this version? Current changes will be lost.')) {
      onRestore(version.id);
      setSelectedVersion(null);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-0 top-16 bottom-0 w-80 bg-surface border-l border-border shadow-floating z-[800] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={18} className="text-primary" />
          <h3 className="font-medium text-text-primary">Version History</h3>
        </div>
        <button
          onClick={onToggle}
          className="p-1 text-text-secondary hover:text-text-primary transition-smooth"
        >
          <Icon name="X" size={16} />
        </button>
      </div>

      {/* Version List */}
      <div className="flex-1 overflow-y-auto">
        {versions.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="History" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No version history yet</p>
            <p className="text-xs text-text-secondary mt-1">
              Versions are saved automatically as you edit
            </p>
          </div>
        ) : (
          <div className="p-2">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className={`p-3 rounded-lg mb-2 border transition-smooth cursor-pointer ${
                  selectedVersion?.id === version.id
                    ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-200 hover:bg-secondary-50'
                }`}
                onClick={() => setSelectedVersion(version)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2 flex-1">
                    <Icon 
                      name={getVersionIcon(version.type)} 
                      size={14} 
                      className="text-text-secondary mt-0.5" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-text-primary">
                          {version.name || `Version ${versions.length - index}`}
                        </span>
                        {index === 0 && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mt-1">
                        {formatTimestamp(version.timestamp)}
                      </p>
                      {version.description && (
                        <p className="text-xs text-text-secondary mt-1 truncate">
                          {version.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Version Actions */}
                {selectedVersion?.id === version.id && index > 0 && (
                  <div className="mt-3 pt-3 border-t border-border flex space-x-2">
                    <Button
                      variant="primary"
                      size="xs"
                      onClick={() => handleRestore(version)}
                      iconName="RotateCcw"
                    >
                      Restore
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setSelectedVersion(null)}
                      iconName="Eye"
                    >
                      Preview
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-secondary-50">
        <div className="text-xs text-text-secondary text-center">
          <Icon name="Info" size={12} className="inline mr-1" />
          Versions are saved automatically every 5 minutes
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;