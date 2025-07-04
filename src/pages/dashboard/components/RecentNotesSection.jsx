import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentNotesSection = () => {
  const navigate = useNavigate();
  const [loadingStates, setLoadingStates] = useState({});

  const recentNotes = [
    {
      id: 1,
      title: "Photosynthesis Process",
      topic: "Biology",
      level: "intermediate",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop",
      pages: 8,
      downloadCount: 3
    },
    {
      id: 2,
      title: "World War II Timeline",
      topic: "History",
      level: "advanced",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop",
      pages: 12,
      downloadCount: 7
    },
    {
      id: 3,
      title: "Calculus Fundamentals",
      topic: "Mathematics",
      level: "basic",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "generating",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      pages: 0,
      downloadCount: 0,
      progress: 65
    },
    {
      id: 4,
      title: "Chemical Bonding",
      topic: "Chemistry",
      level: "intermediate",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
      pages: 6,
      downloadCount: 2
    },
    {
      id: 5,
      title: "Renaissance Art",
      topic: "Art History",
      level: "advanced",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      pages: 15,
      downloadCount: 5
    },
    {
      id: 6,
      title: "Python Programming",
      topic: "Computer Science",
      level: "basic",
      createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
      pages: 10,
      downloadCount: 12
    }
  ];

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const handleDownload = async (noteId, title) => {
    setLoadingStates(prev => ({ ...prev, [noteId]: true }));
    
    // Simulate download process
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([`# ${title}\n\nGenerated study notes content...`], { type: 'application/pdf' });
      element.href = URL.createObjectURL(file);
      element.download = `${title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setLoadingStates(prev => ({ ...prev, [noteId]: false }));
    }, 1500);
  };

  const handleViewNotes = (noteId) => {
    navigate('/note-editor', { state: { noteId } });
  };

  const handleRegenerate = (noteId, title) => {
    navigate('/note-generation-interface', { 
      state: { topic: title, regenerate: true, noteId } 
    });
  };

  const getStatusBadge = (status, progress) => {
    if (status === 'generating') {
      return (
        <div className="flex items-center space-x-2 px-2 py-1 bg-warning-50 text-warning rounded-full text-xs">
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
          <span>Generating {progress}%</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center space-x-1 px-2 py-1 bg-success-50 text-success rounded-full text-xs">
        <Icon name="CheckCircle" size={12} />
        <span>Complete</span>
      </div>
    );
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'basic': return 'bg-blue-50 text-blue-600';
      case 'intermediate': return 'bg-amber-50 text-amber-600';
      case 'advanced': return 'bg-red-50 text-red-600';
      default: return 'bg-secondary-50 text-secondary-600';
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Recent Study Notes</h2>
        <Button
          variant="ghost"
          onClick={() => navigate('/study-library')}
          iconName="ArrowRight"
          iconPosition="right"
          className="text-sm"
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentNotes.map((note) => (
          <div
            key={note.id}
            className="bg-surface rounded-xl border border-border shadow-soft hover:shadow-elevated transition-smooth overflow-hidden group"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={note.thumbnail}
                alt={note.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                {getStatusBadge(note.status, note.progress)}
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(note.level)}`}>
                  {note.level}
                </span>
              </div>
              {note.status === 'generating' && (
                <div className="absolute bottom-0 left-0 right-0 bg-surface bg-opacity-90 p-2">
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${note.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-text-primary mb-1 line-clamp-2">
                  {note.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span className="flex items-center space-x-1">
                    <Icon name="Tag" size={14} />
                    <span>{note.topic}</span>
                  </span>
                  <span>{formatDate(note.createdAt)}</span>
                </div>
              </div>

              {note.status === 'completed' && (
                <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                  <span className="flex items-center space-x-1">
                    <Icon name="FileText" size={12} />
                    <span>{note.pages} pages</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Download" size={12} />
                    <span>{note.downloadCount} downloads</span>
                  </span>
                </div>
              )}

              <div className="flex space-x-2">
                {note.status === 'completed' ? (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => handleViewNotes(note.id)}
                      iconName="Eye"
                      size="sm"
                      className="flex-1"
                    >
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleDownload(note.id, note.title)}
                      loading={loadingStates[note.id]}
                      iconName="Download"
                      size="sm"
                      className="flex-1"
                    >
                      PDF
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleRegenerate(note.id, note.title)}
                      iconName="RefreshCw"
                      size="sm"
                    >
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="secondary"
                    disabled
                    iconName="Clock"
                    size="sm"
                    className="w-full"
                  >
                    Generating...
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotesSection;