import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ActionContextPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const location = useLocation();

  const contextualPages = ['/note-generation-interface', '/note-editor'];
  const shouldShow = contextualPages.includes(location.pathname);

  useEffect(() => {
    setIsVisible(shouldShow);
    if (!shouldShow) {
      setIsExpanded(false);
    }
  }, [shouldShow]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    // Simulate save operation
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    // Simulate export functionality
    const element = document.createElement('a');
    const file = new Blob(['# Study Notes\n\nExported content...'], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'study-notes.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Study Notes',
          text: 'Check out my study notes created with StudyNotes AI',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Could show a toast notification here
    }
  };

  if (!isVisible) return null;

  const getContextActions = () => {
    if (location.pathname === '/note-generation-interface') {
      return [
        {
          icon: 'Save',
          label: 'Save Draft',
          onClick: handleSave,
          loading: isSaving,
          variant: 'primary'
        },
        {
          icon: 'ArrowRight',
          label: 'Continue to Editor',
          onClick: () => window.location.href = '/note-editor',
          variant: 'secondary'
        }
      ];
    }

    if (location.pathname === '/note-editor') {
      return [
        {
          icon: 'Save',
          label: 'Save',
          onClick: handleSave,
          loading: isSaving,
          variant: 'primary'
        },
        {
          icon: 'Download',
          label: 'Export',
          onClick: handleExport,
          variant: 'secondary'
        },
        {
          icon: 'Share2',
          label: 'Share',
          onClick: handleShare,
          variant: 'ghost'
        }
      ];
    }

    return [];
  };

  const actions = getContextActions();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-[900]">
        <div className="bg-surface rounded-lg shadow-floating border border-border p-4 w-48">
          <div className="space-y-3">
            <div className="text-sm font-medium text-text-primary mb-4">
              Quick Actions
            </div>
            
            {saveStatus && (
              <div className={`flex items-center space-x-2 text-sm p-2 rounded-lg ${
                saveStatus === 'success' ?'bg-success-50 text-success border border-success-100' :'bg-error-50 text-error border border-error-100'
              }`}>
                <Icon 
                  name={saveStatus === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                  size={16} 
                />
                <span>
                  {saveStatus === 'success' ? 'Saved successfully' : 'Save failed'}
                </span>
              </div>
            )}

            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                onClick={action.onClick}
                loading={action.loading}
                iconName={action.icon}
                iconPosition="left"
                className="w-full justify-start"
                size="sm"
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Panel */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[900] bg-surface border-t border-border shadow-floating">
        <div className="px-4 py-3">
          {/* Expand/Collapse Button */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
            >
              <Icon name="Zap" size={18} />
              <span className="text-sm font-medium">Quick Actions</span>
              <Icon 
                name={isExpanded ? "ChevronDown" : "ChevronUp"} 
                size={16} 
                className="transition-transform duration-200"
              />
            </button>

            {saveStatus && (
              <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${
                saveStatus === 'success' ?'bg-success-50 text-success' :'bg-error-50 text-error'
              }`}>
                <Icon 
                  name={saveStatus === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                  size={12} 
                />
                <span>
                  {saveStatus === 'success' ? 'Saved' : 'Error'}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`transition-all duration-200 ${
            isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="flex space-x-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  onClick={action.onClick}
                  loading={action.loading}
                  iconName={action.icon}
                  size="sm"
                  className="flex-1"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Always visible primary action on mobile */}
          {!isExpanded && actions.length > 0 && (
            <div className="flex justify-center">
              <Button
                variant={actions[0].variant}
                onClick={actions[0].onClick}
                loading={actions[0].loading}
                iconName={actions[0].icon}
                iconPosition="left"
                size="sm"
              >
                {actions[0].label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ActionContextPanel;