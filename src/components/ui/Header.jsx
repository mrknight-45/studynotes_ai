import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/authentication-screen';

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'Home',
      tooltip: 'Create and access study materials'
    },
    {
      label: 'Library',
      path: '/study-library',
      icon: 'FolderOpen',
      tooltip: 'Manage saved notes'
    },
    {
      label: 'Settings',
      path: '/settings-preferences',
      icon: 'Settings',
      tooltip: 'Account and preferences'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    navigate('/authentication-screen');
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileMenuOpen && !event.target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-surface border-b border-border shadow-soft">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-3 transition-smooth hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-text-primary">
                StudyNotes AI
              </span>
            </button>
          </div>

          {!isAuthPage && (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      location.pathname === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                    }`}
                    title={item.tooltip}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Desktop Profile Menu */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative profile-menu-container">
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-2 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <Icon name="ChevronDown" size={16} />
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-floating border border-border py-1 animate-scale-in">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium text-text-primary">Student User</p>
                        <p className="text-xs text-text-secondary">student@example.com</p>
                      </div>
                      <button
                        onClick={() => {
                          handleNavigation('/settings-preferences');
                          setIsProfileMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-smooth"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {!isAuthPage && isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-[1020] bg-black bg-opacity-50 md:hidden" onClick={toggleMobileMenu} />
          <div className="fixed top-16 left-0 right-0 z-[1020] bg-surface border-b border-border shadow-floating md:hidden animate-slide-in">
            <nav className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Student User</p>
                    <p className="text-xs text-text-secondary">student@example.com</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 mt-2 rounded-lg text-error hover:bg-error-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2"
                >
                  <Icon name="LogOut" size={20} />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;