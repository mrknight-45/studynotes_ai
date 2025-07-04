import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In', icon: 'LogIn' },
    { id: 'register', label: 'Sign Up', icon: 'UserPlus' }
  ];

  return (
    <div className="flex bg-secondary-50 rounded-lg p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            activeTab === tab.id
              ? 'bg-surface text-primary shadow-soft'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name={tab.icon} size={18} />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;