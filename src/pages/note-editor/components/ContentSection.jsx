import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ContentSection = ({ 
  section, 
  onUpdate, 
  onReorder, 
  isExpanded, 
  onToggleExpand,
  isDragging,
  onDragStart,
  onDragEnd 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(section.content);
  const [wordCount, setWordCount] = useState(0);
  const textareaRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleSave = () => {
    onUpdate(section.id, content);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(section.content);
    setIsEditing(false);
  };

  const handleFormatText = (format) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = selectedText;
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = selectedText.split('\n').map(line => `• ${line}`).join('\n');
        break;
      default:
        break;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  const getSectionIcon = (type) => {
    switch (type) {
      case 'definition': return 'BookOpen';
      case 'explanation': return 'FileText';
      case 'keyPoints': return 'List';
      case 'applications': return 'Lightbulb';
      case 'summary': return 'CheckCircle';
      default: return 'FileText';
    }
  };

  return (
    <div 
      ref={dragRef}
      className={`bg-surface border border-border rounded-lg transition-all duration-200 ${
        isDragging ? 'shadow-floating scale-105 opacity-90' : 'shadow-soft'
      }`}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <button
            onMouseDown={() => onDragStart(section.id)}
            onMouseUp={onDragEnd}
            className="cursor-grab active:cursor-grabbing p-1 text-text-secondary hover:text-text-primary transition-smooth"
            title="Drag to reorder"
          >
            <Icon name="GripVertical" size={16} />
          </button>
          
          <div className="flex items-center space-x-2">
            <Icon name={getSectionIcon(section.type)} size={18} className="text-primary" />
            <h3 className="font-medium text-text-primary">{section.title}</h3>
          </div>
          
          <span className="text-xs text-text-secondary bg-secondary-50 px-2 py-1 rounded">
            {wordCount} words
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {isEditing && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                iconName="X"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                iconName="Check"
              >
                Save
              </Button>
            </div>
          )}
          
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit2"
            >
              Edit
            </Button>
          )}
          
          <button
            onClick={() => onToggleExpand(section.id)}
            className="p-1 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </button>
        </div>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="p-4">
          {isEditing ? (
            <div className="space-y-4">
              {/* Formatting Toolbar */}
              <div className="flex items-center space-x-2 p-2 bg-secondary-50 rounded-lg">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleFormatText('bold')}
                  iconName="Bold"
                  title="Bold"
                />
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleFormatText('italic')}
                  iconName="Italic"
                  title="Italic"
                />
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleFormatText('list')}
                  iconName="List"
                  title="Bullet List"
                />
                <div className="w-px h-4 bg-border mx-2" />
                <span className="text-xs text-text-secondary">
                  {wordCount} words
                </span>
              </div>

              {/* Text Editor */}
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-40 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={`Enter ${section.title.toLowerCase()} content...`}
              />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-text-primary leading-relaxed">
                {content || `No ${section.title.toLowerCase()} content yet. Click Edit to add content.`}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentSection;