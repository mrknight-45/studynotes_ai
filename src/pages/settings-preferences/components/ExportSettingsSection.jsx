import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExportSettingsSection = ({ isExpanded, onToggle }) => {
  const [settings, setSettings] = useState({
    pdfTemplate: 'professional',
    fileNaming: 'topic-date',
    customPrefix: '',
    googleDriveEnabled: false,
    dropboxEnabled: true,
    autoExport: false
  });
  const [isConnecting, setIsConnecting] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState({
    googleDrive: 'disconnected',
    dropbox: 'connected'
  });

  const pdfTemplates = [
    { value: 'professional', label: 'Professional', description: 'Clean, business-style layout' },
    { value: 'academic', label: 'Academic', description: 'Traditional academic formatting' },
    { value: 'colorful', label: 'Colorful', description: 'Vibrant design with visual elements' },
    { value: 'minimal', label: 'Minimal', description: 'Simple, distraction-free layout' }
  ];

  const fileNamingOptions = [
    { value: 'topic-date', label: 'Topic + Date', example: 'Physics-Mechanics-2024-01-15.pdf' },
    { value: 'date-topic', label: 'Date + Topic', example: '2024-01-15-Physics-Mechanics.pdf' },
    { value: 'topic-only', label: 'Topic Only', example: 'Physics-Mechanics.pdf' },
    { value: 'custom', label: 'Custom Prefix', example: 'StudyNotes-Physics-Mechanics.pdf' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCloudConnect = async (service) => {
    setIsConnecting(service);
    
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionStatus(prev => ({
        ...prev,
        [service]: 'connected'
      }));
      handleSettingChange(`${service}Enabled`, true);
    } catch (error) {
      setConnectionStatus(prev => ({
        ...prev,
        [service]: 'error'
      }));
    } finally {
      setIsConnecting(null);
    }
  };

  const handleCloudDisconnect = (service) => {
    setConnectionStatus(prev => ({
      ...prev,
      [service]: 'disconnected'
    }));
    handleSettingChange(`${service}Enabled`, false);
  };

  const getConnectionIcon = (service) => {
    const status = connectionStatus[service];
    switch (status) {
      case 'connected':
        return <Icon name="CheckCircle" size={16} className="text-success" />;
      case 'error':
        return <Icon name="AlertCircle" size={16} className="text-error" />;
      default:
        return <Icon name="Circle" size={16} className="text-text-secondary" />;
    }
  };

  const getConnectionText = (service) => {
    const status = connectionStatus[service];
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Connection Failed';
      default:
        return 'Not Connected';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
            <Icon name="Download" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Export Settings</h3>
            <p className="text-sm text-text-secondary">Configure PDF templates and cloud storage</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-secondary transition-transform duration-200"
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="space-y-6">
            {/* PDF Template Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                PDF Template
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pdfTemplates.map((template) => (
                  <button
                    key={template.value}
                    onClick={() => handleSettingChange('pdfTemplate', template.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      settings.pdfTemplate === template.value
                        ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-secondary-200 text-text-primary'
                    }`}
                  >
                    <div className="font-medium mb-1">{template.label}</div>
                    <div className="text-xs text-text-secondary">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* File Naming Convention */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                File Naming Convention
              </label>
              <div className="space-y-3">
                {fileNamingOptions.map((option) => (
                  <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="fileNaming"
                      value={option.value}
                      checked={settings.fileNaming === option.value}
                      onChange={(e) => handleSettingChange('fileNaming', e.target.value)}
                      className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-text-primary">{option.label}</div>
                      <div className="text-sm text-text-secondary">{option.example}</div>
                    </div>
                  </label>
                ))}
              </div>

              {settings.fileNaming === 'custom' && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Custom Prefix
                  </label>
                  <Input
                    type="text"
                    value={settings.customPrefix}
                    onChange={(e) => handleSettingChange('customPrefix', e.target.value)}
                    placeholder="Enter custom prefix"
                  />
                </div>
              )}
            </div>

            {/* Cloud Storage Integration */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Cloud Storage Integration
              </label>
              <div className="space-y-4">
                {/* Google Drive */}
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <Icon name="Cloud" size={16} color="white" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">Google Drive</div>
                      <div className="flex items-center space-x-2 text-sm">
                        {getConnectionIcon('googleDrive')}
                        <span className="text-text-secondary">
                          {getConnectionText('googleDrive')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {connectionStatus.googleDrive === 'connected' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCloudDisconnect('googleDrive')}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        loading={isConnecting === 'googleDrive'}
                        onClick={() => handleCloudConnect('googleDrive')}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>

                {/* Dropbox */}
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <Icon name="HardDrive" size={16} color="white" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">Dropbox</div>
                      <div className="flex items-center space-x-2 text-sm">
                        {getConnectionIcon('dropbox')}
                        <span className="text-text-secondary">
                          {getConnectionText('dropbox')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {connectionStatus.dropbox === 'connected' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCloudDisconnect('dropbox')}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        loading={isConnecting === 'dropbox'}
                        onClick={() => handleCloudConnect('dropbox')}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Auto Export Option */}
            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoExport}
                  onChange={(e) => handleSettingChange('autoExport', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <div>
                  <div className="font-medium text-text-primary">Auto-export to cloud</div>
                  <div className="text-sm text-text-secondary">
                    Automatically save generated PDFs to connected cloud storage
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportSettingsSection;