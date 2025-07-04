import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ActionContextPanel from '../../components/ui/ActionContextPanel';
import Icon from '../../components/AppIcon';
import AccountSection from './components/AccountSection';
import GenerationPreferencesSection from './components/GenerationPreferencesSection';
import ExportSettingsSection from './components/ExportSettingsSection';
import AppearanceSection from './components/AppearanceSection';
import NotificationSection from './components/NotificationSection';
import DataManagementSection from './components/DataManagementSection';

const SettingsPreferences = () => {
  const [expandedSections, setExpandedSections] = useState({
    account: false,
    generation: false,
    export: false,
    appearance: false,
    notifications: false,
    data: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAllSections = () => {
    const allExpanded = Object.values(expandedSections).every(Boolean);
    const newState = !allExpanded;
    
    setExpandedSections({
      account: newState,
      generation: newState,
      export: newState,
      appearance: newState,
      notifications: newState,
      data: newState
    });
  };

  const settingsOverview = {
    totalSections: 6,
    expandedCount: Object.values(expandedSections).filter(Boolean).length,
    lastModified: 'January 15, 2024'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ActionContextPanel />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Settings" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Settings & Preferences</h1>
                  <p className="text-text-secondary">Customize your StudyNotes AI experience</p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={expandAllSections}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <Icon name={Object.values(expandedSections).every(Boolean) ? "Minimize2" : "Maximize2"} size={16} />
                  <span>{Object.values(expandedSections).every(Boolean) ? "Collapse All" : "Expand All"}</span>
                </button>
              </div>
            </div>

            {/* Settings Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Layers" size={20} className="text-primary" />
                  <div>
                    <div className="text-sm text-text-secondary">Total Sections</div>
                    <div className="text-lg font-semibold text-text-primary">{settingsOverview.totalSections}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Eye" size={20} className="text-accent" />
                  <div>
                    <div className="text-sm text-text-secondary">Currently Expanded</div>
                    <div className="text-lg font-semibold text-text-primary">{settingsOverview.expandedCount}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={20} className="text-secondary" />
                  <div>
                    <div className="text-sm text-text-secondary">Last Modified</div>
                    <div className="text-sm font-medium text-text-primary">{settingsOverview.lastModified}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Account Information */}
            <AccountSection 
              isExpanded={expandedSections.account}
              onToggle={() => toggleSection('account')}
            />

            {/* Generation Preferences */}
            <GenerationPreferencesSection 
              isExpanded={expandedSections.generation}
              onToggle={() => toggleSection('generation')}
            />

            {/* Export Settings */}
            <ExportSettingsSection 
              isExpanded={expandedSections.export}
              onToggle={() => toggleSection('export')}
            />

            {/* Appearance */}
            <AppearanceSection 
              isExpanded={expandedSections.appearance}
              onToggle={() => toggleSection('appearance')}
            />

            {/* Notifications */}
            <NotificationSection 
              isExpanded={expandedSections.notifications}
              onToggle={() => toggleSection('notifications')}
            />

            {/* Data Management */}
            <DataManagementSection 
              isExpanded={expandedSections.data}
              onToggle={() => toggleSection('data')}
            />
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-surface rounded-lg border border-border p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Need Help?</h3>
                <p className="text-text-secondary mb-4">
                  If you have questions about any of these settings or need assistance with your account, 
                  our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <Icon name="MessageCircle" size={16} />
                    <span>Contact Support</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <Icon name="BookOpen" size={16} />
                    <span>View Documentation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPreferences;