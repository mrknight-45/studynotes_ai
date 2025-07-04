import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ActionContextPanel from '../../components/ui/ActionContextPanel';
import LibraryHeader from './components/LibraryHeader';
import FilterPanel from './components/FilterPanel';
import StudyNotesGrid from './components/StudyNotesGrid';

const StudyLibrary = () => {
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    tags: [],
    dateRange: {
      start: '',
      end: ''
    }
  });

  // Mock data for study notes
  const mockNotes = [
    {
      id: '1',
      topic: 'Photosynthesis Process in Plants',
      description: 'Comprehensive study notes covering the complete photosynthesis process, including light and dark reactions, chloroplast structure, and energy conversion mechanisms.',
      level: 'intermediate',
      category: 'science',
      createdAt: '2024-01-15T10:30:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      pageCount: 8,
      tags: ['biology', 'plants', 'energy', 'exam-prep']
    },
    {
      id: '2',
      topic: 'Quadratic Equations and Solutions',
      description: 'Detailed mathematical analysis of quadratic equations, including factoring methods, quadratic formula, and graphical representations with real-world applications.',
      level: 'advanced',
      category: 'mathematics',
      createdAt: '2024-01-14T14:20:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      pageCount: 12,
      tags: ['algebra', 'equations', 'formulas', 'practice-questions']
    },
    {
      id: '3',
      topic: 'World War II Timeline and Events',
      description: 'Chronological overview of major World War II events, key battles, political decisions, and their impact on global history and modern society.',
      level: 'basic',
      category: 'history',
      createdAt: '2024-01-13T09:15:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=300&fit=crop',
      pageCount: 15,
      tags: ['world-war', 'timeline', 'events', 'detailed-notes']
    },
    {
      id: '4',
      topic: 'Shakespeare\'s Hamlet Analysis',
      description: 'Literary analysis of Hamlet including character development, themes, symbolism, and historical context with detailed scene-by-scene breakdown.',
      level: 'advanced',
      category: 'literature',
      createdAt: '2024-01-12T16:45:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      pageCount: 10,
      tags: ['shakespeare', 'drama', 'analysis', 'literature']
    },
    {
      id: '5',
      topic: 'Python Programming Fundamentals',
      description: 'Introduction to Python programming covering basic syntax, data types, control structures, functions, and object-oriented programming concepts.',
      level: 'basic',
      category: 'technology',
      createdAt: '2024-01-11T11:30:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
      pageCount: 20,
      tags: ['programming', 'python', 'coding', 'beginner']
    },
    {
      id: '6',
      topic: 'Human Circulatory System',
      description: 'Detailed study of the human circulatory system including heart anatomy, blood vessels, circulation pathways, and common cardiovascular diseases.',
      level: 'intermediate',
      category: 'science',
      createdAt: '2024-01-10T13:20:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      pageCount: 14,
      tags: ['anatomy', 'biology', 'health', 'visual-aids']
    },
    {
      id: '7',
      topic: 'French Language Basics',
      description: 'Essential French vocabulary, grammar rules, pronunciation guide, and common phrases for beginners with practical conversation examples.',
      level: 'basic',
      category: 'languages',
      createdAt: '2024-01-09T08:45:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=300&fit=crop',
      pageCount: 18,
      tags: ['french', 'language', 'vocabulary', 'beginner']
    },
    {
      id: '8',
      topic: 'Calculus Derivatives and Applications',
      description: 'Advanced calculus concepts focusing on derivatives, differentiation rules, optimization problems, and real-world applications in physics and engineering.',
      level: 'advanced',
      category: 'mathematics',
      createdAt: '2024-01-08T15:10:00Z',
      thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=300&fit=crop',
      pageCount: 16,
      tags: ['calculus', 'derivatives', 'mathematics', 'advanced']
    }
  ];

  // Filter and sort notes
  const getFilteredAndSortedNotes = () => {
    let filteredNotes = [...mockNotes];

    // Apply search filter
    if (searchQuery) {
      filteredNotes = filteredNotes.filter(note =>
        note.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filteredNotes = filteredNotes.filter(note =>
        filters.categories.includes(note.category)
      );
    }

    // Apply level filter
    if (filters.levels.length > 0) {
      filteredNotes = filteredNotes.filter(note =>
        filters.levels.includes(note.level)
      );
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      filteredNotes = filteredNotes.filter(note =>
        filters.tags.some(tag => note.tags.includes(tag))
      );
    }

    // Apply date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      filteredNotes = filteredNotes.filter(note => {
        const noteDate = new Date(note.createdAt);
        const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;
        
        if (startDate && noteDate < startDate) return false;
        if (endDate && noteDate > endDate) return false;
        return true;
      });
    }

    // Apply sorting
    filteredNotes.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'topic-asc':
          return a.topic.localeCompare(b.topic);
        case 'topic-desc':
          return b.topic.localeCompare(a.topic);
        case 'level-asc':
          const levelOrder = { basic: 1, intermediate: 2, advanced: 3 };
          return levelOrder[a.level] - levelOrder[b.level];
        case 'level-desc':
          const levelOrderDesc = { advanced: 1, intermediate: 2, basic: 3 };
          return levelOrderDesc[a.level] - levelOrderDesc[b.level];
        default:
          return 0;
      }
    });

    return filteredNotes;
  };

  // Load notes with simulated delay
  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const filteredNotes = getFilteredAndSortedNotes();
      setNotes(filteredNotes);
      setLoading(false);
    };

    loadNotes();
  }, [searchQuery, filters, sortBy]);

  // Handle note selection
  const handleSelectNote = (noteId) => {
    setSelectedNotes(prev => 
      prev.includes(noteId) 
        ? prev.filter(id => id !== noteId)
        : [...prev, noteId]
    );
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    switch (action) {
      case 'download':
        console.log('Downloading notes:', selectedNotes);
        // Simulate bulk download
        alert(`Downloading ${selectedNotes.length} notes...`);
        break;
      case 'share': console.log('Sharing notes:', selectedNotes);
        // Simulate bulk share
        alert(`Sharing ${selectedNotes.length} notes...`);
        break;
      case 'delete':
        console.log('Deleting notes:', selectedNotes);
        // Simulate bulk delete
        if (confirm(`Are you sure you want to delete ${selectedNotes.length} notes?`)) {
          setNotes(prev => prev.filter(note => !selectedNotes.includes(note.id)));
          setSelectedNotes([]);
        }
        break;
      default:
        break;
    }
  };

  // Handle quick actions
  const handleQuickAction = (action, noteId) => {
    const note = notes.find(n => n.id === noteId);
    
    switch (action) {
      case 'view': navigate('/note-editor', { state: { noteId } });
        break;
      case 'download':
        console.log('Downloading note:', noteId);
        // Simulate download
        const element = document.createElement('a');
        const file = new Blob([`# ${note.topic}\n\n${note.description}`], { type: 'text/markdown' });
        element.href = URL.createObjectURL(file);
        element.download = `${note.topic.replace(/\s+/g, '-').toLowerCase()}.md`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: note.topic,
            text: note.description,
            url: window.location.href,
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        }
        break;
      default:
        break;
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      categories: [],
      levels: [],
      tags: [],
      dateRange: { start: '', end: '' }
    });
    setSearchQuery('');
  };

  // Toggle bulk mode
  const handleBulkModeToggle = () => {
    setIsBulkMode(!isBulkMode);
    setSelectedNotes([]);
  };

  // Load more notes (for infinite scroll simulation)
  const handleLoadMore = async () => {
    // Simulate loading more notes
    await new Promise(resolve => setTimeout(resolve, 1000));
    // For demo purposes, we'll just set hasMore to false
    setHasMore(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ActionContextPanel />
      
      <main className="pt-16">
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterPanel
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${
            isFilterOpen ? 'lg:ml-80' : ''
          }`}>
            {/* Library Header */}
            <LibraryHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
              isFilterOpen={isFilterOpen}
              selectedCount={selectedNotes.length}
              onBulkAction={handleBulkAction}
              isBulkMode={isBulkMode}
              onBulkModeToggle={handleBulkModeToggle}
            />

            {/* Breadcrumb */}
            <div className="px-4 lg:px-6">
              <Breadcrumb />
            </div>

            {/* Notes Grid */}
            <StudyNotesGrid
              notes={notes}
              viewMode={viewMode}
              loading={loading}
              searchQuery={searchQuery}
              filters={filters}
              selectedNotes={selectedNotes}
              onSelectNote={handleSelectNote}
              isBulkMode={isBulkMode}
              onQuickAction={handleQuickAction}
              onClearFilters={handleClearFilters}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudyLibrary;