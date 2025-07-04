import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ lastSaved, isSaving, hasUnsavedChanges }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const diffInSeconds = Math.floor((now - lastSaved) / 1000);
      
      if (diffInSeconds < 60) {
        setTimeAgo('just now');
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else {
        const hours = Math.floor(diffInSeconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [lastSaved]);

  const getStatusColor = () => {
    if (isSaving) return 'text-warning';
    if (hasUnsavedChanges) return 'text-error';
    return 'text-success';
  };

  const getStatusIcon = () => {
    if (isSaving) return 'Loader2';
    if (hasUnsavedChanges) return 'AlertCircle';
    return 'CheckCircle';
  };

  const getStatusText = () => {
    if (isSaving) return 'Saving...';
    if (hasUnsavedChanges) return 'Unsaved changes';
    return lastSaved ? `Saved ${timeAgo}` : 'Not saved';
  };

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Icon 
        name={getStatusIcon()} 
        size={14} 
        className={`${getStatusColor()} ${isSaving ? 'animate-spin' : ''}`} 
      />
      <span className={getStatusColor()}>
        {getStatusText()}
      </span>
    </div>
  );
};

export default AutoSaveIndicator;