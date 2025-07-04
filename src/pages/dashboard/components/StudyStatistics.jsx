import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StudyStatistics = () => {
  const weeklyData = [
    { day: 'Mon', notes: 3 },
    { day: 'Tue', notes: 5 },
    { day: 'Wed', notes: 2 },
    { day: 'Thu', notes: 8 },
    { day: 'Fri', notes: 6 },
    { day: 'Sat', notes: 4 },
    { day: 'Sun', notes: 1 }
  ];

  const subjectData = [
    { name: 'Biology', value: 35, color: '#10B981' },
    { name: 'Mathematics', value: 25, color: '#3B82F6' },
    { name: 'History', value: 20, color: '#F59E0B' },
    { name: 'Chemistry', value: 15, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#6B7280' }
  ];

  const stats = [
    {
      label: 'Notes Generated',
      value: '127',
      change: '+12',
      changeType: 'increase',
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      label: 'Study Hours',
      value: '48.5',
      change: '+5.2',
      changeType: 'increase',
      icon: 'Clock',
      color: 'text-accent'
    },
    {
      label: 'Topics Covered',
      value: '23',
      change: '+3',
      changeType: 'increase',
      icon: 'BookOpen',
      color: 'text-warning'
    },
    {
      label: 'PDF Downloads',
      value: '89',
      change: '+18',
      changeType: 'increase',
      icon: 'Download',
      color: 'text-success'
    }
  ];

  const achievements = [
    {
      title: 'Study Streak',
      description: '7 days in a row',
      icon: 'Flame',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Quick Learner',
      description: '10+ notes this week',
      icon: 'Zap',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Subject Master',
      description: 'Biology expert',
      icon: 'Award',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Study Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary-50 ${stat.color} mb-2`}>
                <Icon name={stat.icon} size={20} />
              </div>
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-xs text-text-secondary">{stat.label}</div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                <Icon 
                  name={stat.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                  className="text-success" 
                />
                <span className="text-xs text-success">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Weekly Activity</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <YAxis hide />
              <Bar 
                dataKey="notes" 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Distribution */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Subject Distribution</h3>
        <div className="flex items-center justify-between">
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  dataKey="value"
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 ml-4 space-y-2">
            {subjectData.slice(0, 3).map((subject, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  ></div>
                  <span className="text-text-secondary">{subject.name}</span>
                </div>
                <span className="text-text-primary font-medium">{subject.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${achievement.bgColor} flex items-center justify-center`}>
                <Icon name={achievement.icon} size={18} className={achievement.color} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary">{achievement.title}</div>
                <div className="text-xs text-text-secondary">{achievement.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center space-y-2 p-3 rounded-lg border border-border hover:bg-secondary-50 transition-smooth">
            <Icon name="Heart" size={20} className="text-error" />
            <span className="text-xs text-text-secondary">Favorites</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-3 rounded-lg border border-border hover:bg-secondary-50 transition-smooth">
            <Icon name="History" size={20} className="text-secondary" />
            <span className="text-xs text-text-secondary">History</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-3 rounded-lg border border-border hover:bg-secondary-50 transition-smooth">
            <Icon name="Share2" size={20} className="text-primary" />
            <span className="text-xs text-text-secondary">Share</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-3 rounded-lg border border-border hover:bg-secondary-50 transition-smooth">
            <Icon name="Settings" size={20} className="text-accent" />
            <span className="text-xs text-text-secondary">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyStatistics;