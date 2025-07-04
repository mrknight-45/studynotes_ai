import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', parent: null },
    '/note-generation-interface': { label: 'Generate Notes', parent: '/dashboard' },
    '/note-editor': { label: 'Note Editor', parent: '/note-generation-interface' },
    '/study-library': { label: 'Study Library', parent: null },
    '/settings-preferences': { label: 'Settings', parent: null },
    '/authentication-screen': { label: 'Sign In', parent: null }
  };

  const buildBreadcrumbs = (pathname) => {
    const breadcrumbs = [];
    let currentPath = pathname;

    while (currentPath && routeMap[currentPath]) {
      const route = routeMap[currentPath];
      breadcrumbs.unshift({
        label: route.label,
        path: currentPath,
        isActive: currentPath === pathname
      });
      currentPath = route.parent;
    }

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs(location.pathname);

  // Don't show breadcrumbs for single-level pages or auth page
  if (breadcrumbs.length <= 1 || location.pathname === '/authentication-screen') {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    if (path !== location.pathname) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            {index > 0 && (
              <Icon name="ChevronRight" size={16} className="text-text-secondary flex-shrink-0" />
            )}
            
            {crumb.isActive ? (
              <span className="font-medium text-text-primary whitespace-nowrap">
                {crumb.label}
              </span>
            ) : (
              <button
                onClick={() => handleBreadcrumbClick(crumb.path)}
                className="hover:text-text-primary transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1 py-0.5 whitespace-nowrap"
              >
                {crumb.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;