import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ActionContextPanel from '../../components/ui/ActionContextPanel';
import HeroSection from './components/HeroSection';
import RecentNotesSection from './components/RecentNotesSection';
import StudyStatistics from './components/StudyStatistics';
import QuickAccessToolbar from './components/QuickAccessToolbar';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - StudyNotes AI';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ActionContextPanel />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                  Welcome back, Student!
                </h1>
                <p className="text-text-secondary">
                  Ready to create some amazing study materials today?
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>All systems operational</span>
                  </div>
                  <div className="text-xs">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              <HeroSection />
              <QuickAccessToolbar />
              <RecentNotesSection />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <StudyStatistics />
              </div>
            </div>
          </div>

          {/* Mobile Statistics - Show below main content on mobile */}
          <div className="lg:hidden mt-8">
            <StudyStatistics />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;