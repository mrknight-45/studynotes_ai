import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppearanceSection = ({ isExpanded, onToggle }) => {
  const [appearance, setAppearance] = useState({
    theme: 'system',
    fontSize: 'medium',
    contrast: 'normal',
    reducedMotion: false
  });

  const themes = [
    { value: 'light', label: 'Light', icon: 'Sun', description: 'Clean, bright interface' },
    { value: 'dark', label: 'Dark', icon: 'Moon', description: 'Easy on the eyes' },
    { value: 'system', label: 'System', icon: 'Monitor', description: 'Match device settings' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small', description: 'Compact text size' },
    { value: 'medium', label: 'Medium', description: 'Standard text size' },
    { value: 'large', label: 'Large', description: 'Larger text for better readability' }
  ];

  const contrastLevels = [
    { value: 'normal', label: 'Normal', description: 'Standard contrast' },
    { value: 'high', label: 'High', description: 'Enhanced contrast for better visibility' }
  ];

  const handleAppearanceChange = (key, value) => {
    setAppearance(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyTheme = (theme) => {
    // This would typically integrate with your theme system
    console.log('Applying theme:', theme);
  };

  useEffect(() => {
    applyTheme(appearance.theme);
  }, [appearance.theme]);

  const getPreviewText = () => {
    const sizeClass = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    }[appearance.fontSize];

    const contrastClass = appearance.contrast === 'high' ?'text-black bg-white border-2 border-black' :'text-text-primary bg-surface';

    return `${sizeClass} ${contrastClass}`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <Icon name="Palette" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Appearance</h3>
            <p className="text-sm text-text-secondary">Customize the look and feel of the app</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-secondary transition-transform duration-200"
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Theme
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handleAppearanceChange('theme', theme.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      appearance.theme === theme.value
                        ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-200 text-text-primary'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name={theme.icon} size={18} />
                      <span className="font-medium">{theme.label}</span>
                    </div>
                    <div className="text-xs text-text-secondary">{theme.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Font Size
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {fontSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => handleAppearanceChange('fontSize', size.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      appearance.fontSize === size.value
                        ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-200 text-text-primary'
                    }`}
                  >
                    <div className="font-medium mb-1">{size.label}</div>
                    <div className="text-xs text-text-secondary">{size.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contrast */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Contrast
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contrastLevels.map((contrast) => (
                  <button
                    key={contrast.value}
                    onClick={() => handleAppearanceChange('contrast', contrast.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      appearance.contrast === contrast.value
                        ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-200 text-text-primary'
                    }`}
                  >
                    <div className="font-medium mb-1">{contrast.label}</div>
                    <div className="text-xs text-text-secondary">{contrast.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility Options */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Accessibility
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appearance.reducedMotion}
                    onChange={(e) => handleAppearanceChange('reducedMotion', e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <div>
                    <div className="font-medium text-text-primary">Reduce motion</div>
                    <div className="text-sm text-text-secondary">
                      Minimize animations and transitions
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Preview
              </label>
              <div className="p-4 rounded-lg border border-border bg-secondary-50">
                <div className={`p-4 rounded ${getPreviewText()}`}>
                  <h4 className="font-semibold mb-2">Sample Study Note</h4>
                  <p className="mb-2">
                    This is how your study notes will appear with the current settings. 
                    The text size and contrast will be applied throughout the application.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="BookOpen" size={16} />
                    <span>Physics - Quantum Mechanics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="primary"
                onClick={() => applyTheme(appearance.theme)}
                iconName="Check"
                iconPosition="left"
              >
                Apply Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppearanceSection;