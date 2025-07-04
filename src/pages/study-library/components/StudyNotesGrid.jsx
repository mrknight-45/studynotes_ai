import React, { useState, useEffect } from 'react';
import StudyNoteCard from './StudyNoteCard';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudyNotesGrid = ({ 
  notes, 
  viewMode, 
  loading, 
  searchQuery, 
  filters,
  selectedNotes,
  onSelectNote,
  isBulkMode,
  onQuickAction,
  onClearFilters,
  onLoadMore,
  hasMore
}) => {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    await onLoadMore();
    setLoadingMore(false);
  };

  const getEmptyStateType = () => {
    if (searchQuery) return 'search';
    if (filters.categories.length > 0 || filters.levels.length > 0 || filters.tags.length > 0) {
      return 'filtered';
    }
    return 'empty';
  };

  const getGridClasses = () => {
    if (viewMode === 'list') {
      return 'space-y-4';
    }
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
  };

  if (loading) {
    return <LoadingState viewMode={viewMode} />;
  }

  if (notes.length === 0) {
    return (
      <EmptyState 
        type={getEmptyStateType()}
        searchQuery={searchQuery}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">
            {notes.length} note{notes.length !== 1 ? 's' : ''} found
          </span>
          
          {searchQuery && (
            <span className="text-sm text-text-primary">
              for "{searchQuery}"
            </span>
          )}
        </div>

        {/* Bulk Selection Summary */}
        {isBulkMode && selectedNotes.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-primary">
            <Icon name="CheckCircle" size={16} />
            <span>{selectedNotes.length} selected</span>
          </div>
        )}
      </div>

      {/* Notes Grid/List */}
      <div className={getGridClasses()}>
        {notes.map((note) => (
          <StudyNoteCard
            key={note.id}
            note={note}
            viewMode={viewMode}
            isSelected={selectedNotes.includes(note.id)}
            onSelect={onSelectNote}
            isBulkMode={isBulkMode}
            onQuickAction={onQuickAction}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="secondary"
            onClick={handleLoadMore}
            loading={loadingMore}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Load More Notes
          </Button>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && notes.length > 0 && (
        <div className="flex items-center justify-center mt-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="CheckCircle" size={16} />
            <span>You've reached the end of your study library</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyNotesGrid;