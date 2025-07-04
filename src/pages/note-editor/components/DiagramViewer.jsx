import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Image from '../../../components/AppImage';

const DiagramViewer = ({ diagram, onRegenerate, onUpdateDescription }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [customDescription, setCustomDescription] = useState(diagram.customDescription || '');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      await onRegenerate(diagram.id, customDescription);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSaveDescription = () => {
    onUpdateDescription(diagram.id, customDescription);
    setIsEditingDescription(false);
  };

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {/* Diagram Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary-50">
          <div className="flex items-center space-x-2">
            <Icon name="Image" size={18} className="text-primary" />
            <h4 className="font-medium text-text-primary">{diagram.title}</h4>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomToggle}
              iconName="ZoomIn"
              title="View full size"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRegenerate}
              loading={isRegenerating}
              iconName="RefreshCw"
              title="Regenerate diagram"
            />
          </div>
        </div>

        {/* Diagram Image */}
        <div className="relative">
          <div className="aspect-video bg-secondary-50 flex items-center justify-center overflow-hidden">
            <Image
              src={diagram.imageUrl}
              alt={diagram.altText}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Image Overlay Controls */}
          <div className="absolute top-2 right-2 flex space-x-1">
            <button
              onClick={handleZoomToggle}
              className="p-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-smooth"
            >
              <Icon name="Maximize2" size={16} />
            </button>
          </div>
        </div>

        {/* Diagram Caption */}
        <div className="p-4">
          <div className="text-sm text-text-secondary mb-2">Caption:</div>
          <div className="text-sm text-text-primary bg-secondary-50 p-3 rounded-lg">
            {diagram.caption}
          </div>
        </div>

        {/* Custom Description */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-text-primary">
              Custom Description (for regeneration)
            </label>
            {!isEditingDescription ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingDescription(true)}
                iconName="Edit2"
              >
                Edit
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCustomDescription(diagram.customDescription || '');
                    setIsEditingDescription(false);
                  }}
                  iconName="X"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveDescription}
                  iconName="Check"
                >
                  Save
                </Button>
              </div>
            )}
          </div>

          {isEditingDescription ? (
            <textarea
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder="Describe how you want the diagram to look..."
              className="w-full h-24 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          ) : (
            <div className="text-sm text-text-secondary bg-secondary-50 p-3 rounded-lg min-h-[60px] flex items-center">
              {customDescription || 'No custom description provided. Add one to guide diagram regeneration.'}
            </div>
          )}
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-[1000] bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={handleZoomToggle}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-smooth"
            >
              <Icon name="X" size={24} />
            </button>
            
            <div className="bg-white rounded-lg overflow-hidden">
              <Image
                src={diagram.imageUrl}
                alt={diagram.altText}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
            
            <div className="absolute -bottom-16 left-0 right-0 text-center">
              <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg inline-block">
                {diagram.caption}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiagramViewer;