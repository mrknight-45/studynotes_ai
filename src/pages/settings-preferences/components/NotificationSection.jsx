import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationSection = ({ isExpanded, onToggle, Notification }) => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    generationComplete: true,
    studyReminders: false,
    weeklyDigest: true,
    newFeatures: true,
    systemUpdates: false,
    reminderTime: '09:00',
    reminderDays: ['monday', 'wednesday', 'friday']
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const notificationTypes = [
  {
    key: 'generationComplete',
    label: 'Generation Complete',
    description: 'Get notified when your study notes are ready',
    icon: 'CheckCircle'
  },
  {
    key: 'studyReminders',
    label: 'Study Reminders',
    description: 'Receive reminders to review your notes',
    icon: 'Clock'
  },
  {
    key: 'weeklyDigest',
    label: 'Weekly Digest',
    description: 'Summary of your study activity and progress',
    icon: 'BarChart3'
  },
  {
    key: 'newFeatures',
    label: 'New Features',
    description: 'Learn about new features and improvements',
    icon: 'Sparkles'
  },
  {
    key: 'systemUpdates',
    label: 'System Updates',
    description: 'Important system maintenance notifications',
    icon: 'Settings'
  }];


  const weekDays = [
  { value: 'monday', label: 'Mon' },
  { value: 'tuesday', label: 'Tue' },
  { value: 'wednesday', label: 'Wed' },
  { value: 'thursday', label: 'Thu' },
  { value: 'friday', label: 'Fri' },
  { value: 'saturday', label: 'Sat' },
  { value: 'sunday', label: 'Sun' }];


  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReminderDayToggle = (day) => {
    setNotifications((prev) => ({
      ...prev,
      reminderDays: prev.reminderDays.includes(day) ?
      prev.reminderDays.filter((d) => d !== day) :
      [...prev.reminderDays, day]
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const testNotification = () => {
    // Simulate test notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('StudyNotes AI', {
        body: 'This is a test notification from StudyNotes AI!',
        icon: '/favicon.ico'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('StudyNotes AI', {
            body: 'This is a test notification from StudyNotes AI!',
            icon: '/favicon.ico'
          });
        }
      });
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
            <p className="text-sm text-text-secondary">Manage your notification preferences</p>
          </div>
        </div>
        <Icon
          name={isExpanded ? "ChevronUp" : "ChevronDown"}
          size={20}
          className="text-text-secondary transition-transform duration-200" />

      </button>

      {isExpanded &&
      <div className="px-6 pb-6 border-t border-border">
          {saveStatus &&
        <div className={`flex items-center space-x-2 text-sm p-3 rounded-lg mb-4 ${
        saveStatus === 'success' ? 'bg-success-50 text-success border border-success-100' : 'bg-error-50 text-error border border-error-100'}`
        }>
              <Icon
            name={saveStatus === 'success' ? 'CheckCircle' : 'AlertCircle'}
            size={16} />

              <span>
                {saveStatus === 'success' ? 'Notification settings saved' : 'Failed to save settings'}
              </span>
            </div>
        }

          <div className="space-y-6">
            {/* Master Email Toggle */}
            <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={20} className="text-text-secondary" />
                <div>
                  <div className="font-medium text-text-primary">Email Notifications</div>
                  <div className="text-sm text-text-secondary">
                    Enable or disable all email notifications
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                className="sr-only peer" />

                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {/* Individual Notification Types */}
            {notifications.emailNotifications &&
          <div className="space-y-4">
                <h4 className="text-md font-medium text-text-primary">Notification Types</h4>
                {notificationTypes.map((type) =>
            <div key={type.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon name={type.icon} size={18} className="text-text-secondary" />
                      <div>
                        <div className="font-medium text-text-primary">{type.label}</div>
                        <div className="text-sm text-text-secondary">{type.description}</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                  type="checkbox"
                  checked={notifications[type.key]}
                  onChange={(e) => handleNotificationChange(type.key, e.target.checked)}
                  className="sr-only peer" />

                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
            )}
              </div>
          }

            {/* Study Reminder Settings */}
            {notifications.studyReminders && notifications.emailNotifications &&
          <div className="space-y-4 p-4 bg-accent-50 rounded-lg border border-accent-100">
                <h4 className="text-md font-medium text-text-primary flex items-center space-x-2">
                  <Icon name="Clock" size={18} />
                  <span>Study Reminder Settings</span>
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Reminder Time
                  </label>
                  <input
                type="time"
                value={notifications.reminderTime}
                onChange={(e) => handleNotificationChange('reminderTime', e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />

                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Reminder Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {weekDays.map((day) =>
                <button
                  key={day.value}
                  onClick={() => handleReminderDayToggle(day.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  notifications.reminderDays.includes(day.value) ?
                  'bg-primary text-primary-foreground' :
                  'bg-secondary-100 text-text-secondary hover:bg-secondary-200'}`
                  }>

                        {day.label}
                      </button>
                )}
                  </div>
                </div>
              </div>
          }

            {/* Test Notification */}
            <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
              <div>
                <div className="font-medium text-text-primary">Test Notifications</div>
                <div className="text-sm text-text-secondary">
                  Send a test notification to check your settings
                </div>
              </div>
              <Button
              variant="ghost"
              size="sm"
              iconName="Send"
              onClick={testNotification}>

                Test
              </Button>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-border">
              <Button
              variant="primary"
              onClick={handleSave}
              loading={isSaving}
              iconName="Save"
              iconPosition="left">

                Save Notification Settings
              </Button>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default NotificationSection;