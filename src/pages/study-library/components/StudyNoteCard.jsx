import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudyNoteCard = ({ 
  note, 
  viewMode, 
  isSelected, 
  onSelect, 
  isBulkMode,
  onQuickAction 
}) => {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'basic':
        return 'bg-success-100 text-success border-success-200';
      case 'intermediate':
        return 'bg-warning-100 text-warning border-warning-200';
      case 'advanced':
        return 'bg-error-100 text-error border-error-200';
      default:
        return 'bg-secondary-100 text-text-secondary border-secondary-200';
    }
  };

  const handleCardClick = () => {
    if (isBulkMode) {
      onSelect(note.id);
    } else {
      navigate('/note-editor', { state: { noteId: note.id } });
    }
  };

  const handleQuickAction = (action, e) => {
    e.stopPropagation();
    onQuickAction(action, note.id);
  };

  if (viewMode === 'list') {
    return (
      <div 
        className={`bg-surface border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth cursor-pointer ${
          isSelected ? 'ring-2 ring-primary border-primary' : ''
        }`}
        onClick={handleCardClick}
      >
        <div className="flex items-center space-x-4">
          {/* Selection Checkbox */}
          {isBulkMode && (
            <div className="flex-shrink-0">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(note.id)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Thumbnail */}
          <div className="flex-shrink-0 w-16 h-16 bg-secondary-100 rounded-lg overflow-hidden">
            <Image
              src={note.thumbnail}
              alt={`${note.topic} thumbnail`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-text-primary truncate">
                  {note.topic}
                </h3>
                <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                  {note.description}
                </p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-text-secondary">
                    {formatDate(note.createdAt)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(note.level)}`}>
                    {note.level}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon name="FileText" size={12} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">{note.pageCount} pages</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              {!isBulkMode && (
                <div className="flex items-center space-x-1 ml-4">
                  <Button
                    variant="ghost"
                    onClick={(e) => handleQuickAction('view', e)}
                    iconName="Eye"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <Button
                    variant="ghost"
                    onClick={(e) => handleQuickAction('download', e)}
                    iconName="Download"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <Button
                    variant="ghost"
                    onClick={(e) => handleQuickAction('share', e)}
                    iconName="Share2"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary-100 text-text-secondary px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs text-text-secondary">
                +{note.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Grid View
  return (
    <div 
      className={`group bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevated transition-smooth cursor-pointer ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Selection Checkbox */}
      {isBulkMode && (
        <div className="absolute top-3 left-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(note.id)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 bg-surface"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative h-48 bg-secondary-100 overflow-hidden">
        <Image
          src={note.thumbnail}
          alt={`${note.topic} thumbnail`}
          className="w-full h-full object-cover"
        />
        
        {/* Quick Actions Overlay */}
        {!isBulkMode && (
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
            <Button
              variant="ghost"
              onClick={(e) => handleQuickAction('view', e)}
              iconName="Eye"
              size="sm"
              className="bg-surface text-text-primary hover:bg-secondary-50"
            />
            <Button
              variant="ghost"
              onClick={(e) => handleQuickAction('download', e)}
              iconName="Download"
              size="sm"
              className="bg-surface text-text-primary hover:bg-secondary-50"
            />
            <Button
              variant="ghost"
              onClick={(e) => handleQuickAction('share', e)}
              iconName="Share2"
              size="sm"
              className="bg-surface text-text-primary hover:bg-secondary-50"
            />
          </div>
        )}

        {/* Level Badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(note.level)}`}>
            {note.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
          {note.topic}
        </h3>
        
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {note.description}
        </p>

        <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
          <span>{formatDate(note.createdAt)}</span>
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={12} />
            <span>{note.pageCount} pages</span>
          </div>
        </div>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {note.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary-100 text-text-secondary px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {note.tags.length > 2 && (
              <span className="text-xs text-text-secondary">
                +{note.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyNoteCard;