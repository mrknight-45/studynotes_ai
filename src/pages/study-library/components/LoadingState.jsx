import React from 'react';

const LoadingState = ({ viewMode = 'grid' }) => {
  const SkeletonCard = ({ isListView = false }) => (
    <div className={`bg-surface border border-border rounded-lg overflow-hidden animate-pulse ${
      isListView ? 'p-4' : ''
    }`}>
      {isListView ? (
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-secondary-200 rounded-lg flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="h-5 bg-secondary-200 rounded mb-2" />
            <div className="h-4 bg-secondary-200 rounded mb-2 w-3/4" />
            <div className="flex items-center space-x-4">
              <div className="h-3 bg-secondary-200 rounded w-20" />
              <div className="h-3 bg-secondary-200 rounded w-16" />
              <div className="h-3 bg-secondary-200 rounded w-24" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="h-48 bg-secondary-200" />
          <div className="p-4">
            <div className="h-5 bg-secondary-200 rounded mb-2" />
            <div className="h-4 bg-secondary-200 rounded mb-3 w-3/4" />
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 bg-secondary-200 rounded w-20" />
              <div className="h-3 bg-secondary-200 rounded w-16" />
            </div>
            <div className="flex gap-1">
              <div className="h-5 bg-secondary-200 rounded w-12" />
              <div className="h-5 bg-secondary-200 rounded w-16" />
            </div>
          </div>
        </>
      )}
    </div>
  );

  const getSkeletonCount = () => {
    if (viewMode === 'list') return 8;
    return 12; // Grid view
  };

  const getGridClasses = () => {
    if (viewMode === 'list') {
      return 'space-y-4';
    }
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Loading Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="h-8 bg-secondary-200 rounded w-32 animate-pulse" />
          <div className="h-6 bg-secondary-200 rounded w-20 animate-pulse" />
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <div className="h-10 bg-secondary-200 rounded w-80 animate-pulse" />
          <div className="h-10 bg-secondary-200 rounded w-20 animate-pulse" />
          <div className="h-10 bg-secondary-200 rounded w-24 animate-pulse" />
        </div>
      </div>

      {/* Loading Cards */}
      <div className={getGridClasses()}>
        {Array.from({ length: getSkeletonCount() }).map((_, index) => (
          <SkeletonCard key={index} isListView={viewMode === 'list'} />
        ))}
      </div>

      {/* Loading Pagination */}
      <div className="flex items-center justify-center mt-8 space-x-2">
        <div className="h-10 bg-secondary-200 rounded w-10 animate-pulse" />
        <div className="h-10 bg-secondary-200 rounded w-10 animate-pulse" />
        <div className="h-10 bg-secondary-200 rounded w-10 animate-pulse" />
        <div className="h-10 bg-secondary-200 rounded w-10 animate-pulse" />
      </div>
    </div>
  );
};

export default LoadingState;