import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import LanguageSelector from './components/LanguageSelector';

const AuthenticationScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setActiveTab('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-surface to-accent-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-sm border-b border-border">
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
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

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          </div>

          {/* Auth Card */}
          <div className="relative bg-surface rounded-2xl shadow-floating border border-border p-8">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="GraduationCap" size={32} className="text-primary" />
              </div>
              
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                {showForgotPassword 
                  ? 'Reset Password' 
                  : activeTab === 'login' ?'Welcome Back' :'Create Account'
                }
              </h1>
              
              <p className="text-text-secondary text-sm">
                {showForgotPassword 
                  ? 'Enter your email to receive a reset link'
                  : activeTab === 'login' ?'Sign in to access your study materials and notes' :'Join thousands of students creating better study notes'
                }
              </p>
            </div>

            {/* Auth Forms */}
            {showForgotPassword ? (
              <ForgotPasswordForm onBack={handleBackToLogin} />
            ) : (
              <>
                {/* Tab Navigation */}
                <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

                {/* Form Content */}
                <div className="space-y-6">
                  {activeTab === 'login' ? (
                    <LoginForm onForgotPassword={handleForgotPassword} />
                  ) : (
                    <RegisterForm />
                  )}

                  {/* Social Login */}
                  <SocialLogin />
                </div>
              </>
            )}

            {/* Footer Links */}
            {!showForgotPassword && (
              <div className="mt-8 text-center">
                <p className="text-xs text-text-secondary">
                  By continuing, you agree to our{' '}
                  <button className="text-primary hover:text-primary-700 transition-smooth">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button className="text-primary hover:text-primary-700 transition-smooth">
                    Privacy Policy
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-primary mb-1">Demo Credentials</p>
                <p className="text-primary-700 text-xs">
                  Email: student@example.com<br />
                  Password: password123
                </p>
              </div>
            </div>
          </div>

          {/* Educational Background */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-6 opacity-60">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-text-secondary" />
                <span className="text-xs text-text-secondary">10,000+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={16} className="text-text-secondary" />
                <span className="text-xs text-text-secondary">50,000+ Notes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-text-secondary" />
                <span className="text-xs text-text-secondary">4.9 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthenticationScreen;