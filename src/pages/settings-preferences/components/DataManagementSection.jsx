import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataManagementSection = ({ isExpanded, onToggle }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [exportStatus, setExportStatus] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleExportData = async () => {
    setIsExporting(true);
    setExportStatus(null);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock export data
      const exportData = {
        notes: [
          { id: 1, title: 'Physics - Quantum Mechanics', content: 'Study notes content...', createdAt: '2024-01-15' },
          { id: 2, title: 'Chemistry - Organic Compounds', content: 'Study notes content...', createdAt: '2024-01-14' }
        ],
        preferences: {
          educationLevel: 'intermediate',
          diagramStyle: 'modern',
          language: 'english'
        },
        exportDate: new Date().toISOString()
      };
      
      // Download as JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `studynotes-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportStatus('success');
      setTimeout(() => setExportStatus(null), 3000);
    } catch (error) {
      setExportStatus('error');
      setTimeout(() => setExportStatus(null), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportData = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsImporting(true);
    setImportStatus(null);
    
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate data structure
      if (!data.notes || !data.preferences) {
        throw new Error('Invalid backup file format');
      }
      
      setImportStatus('success');
      setTimeout(() => setImportStatus(null), 3000);
    } catch (error) {
      setImportStatus('error');
      setTimeout(() => setImportStatus(null), 3000);
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE MY ACCOUNT') {
      return;
    }

    try {
      // Simulate account deletion
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would redirect to a goodbye page or login
      alert('Account deletion initiated. You will be logged out shortly.');
      setShowDeleteConfirm(false);
      setDeleteConfirmText('');
    } catch (error) {
      alert('Failed to delete account. Please try again.');
    }
  };

  const dataStats = {
    totalNotes: 24,
    totalSize: '12.5 MB',
    lastBackup: '2024-01-10',
    accountCreated: '2023-09-15'
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Icon name="Database" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Data Management</h3>
            <p className="text-sm text-text-secondary">Export, import, and manage your data</p>
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
            {/* Data Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-secondary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{dataStats.totalNotes}</div>
                <div className="text-sm text-text-secondary">Total Notes</div>
              </div>
              <div className="text-center p-3 bg-secondary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{dataStats.totalSize}</div>
                <div className="text-sm text-text-secondary">Data Size</div>
              </div>
              <div className="text-center p-3 bg-secondary-50 rounded-lg">
                <div className="text-sm font-medium text-text-primary">{dataStats.lastBackup}</div>
                <div className="text-sm text-text-secondary">Last Backup</div>
              </div>
              <div className="text-center p-3 bg-secondary-50 rounded-lg">
                <div className="text-sm font-medium text-text-primary">{dataStats.accountCreated}</div>
                <div className="text-sm text-text-secondary">Member Since</div>
              </div>
            </div>

            {/* Export Data */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-text-primary">Export Your Data</h4>
              
              {exportStatus && (
                <div className={`flex items-center space-x-2 text-sm p-3 rounded-lg ${
                  exportStatus === 'success' ?'bg-success-50 text-success border border-success-100' :'bg-error-50 text-error border border-error-100'
                }`}>
                  <Icon 
                    name={exportStatus === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                    size={16} 
                  />
                  <span>
                    {exportStatus === 'success' ? 'Data exported successfully' : 'Export failed'}
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  onClick={handleExportData}
                  loading={isExporting}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export All Data
                </Button>
                <div className="text-sm text-text-secondary flex items-center">
                  <Icon name="Info" size={16} className="mr-1" />
                  Includes notes, preferences, and settings
                </div>
              </div>
            </div>

            {/* Import Data */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-text-primary">Import Data</h4>
              
              {importStatus && (
                <div className={`flex items-center space-x-2 text-sm p-3 rounded-lg ${
                  importStatus === 'success' ?'bg-success-50 text-success border border-success-100' :'bg-error-50 text-error border border-error-100'
                }`}>
                  <Icon 
                    name={importStatus === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                    size={16} 
                  />
                  <span>
                    {importStatus === 'success' ? 'Data imported successfully' : 'Import failed - Invalid file format'}
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isImporting}
                  />
                  <Button
                    variant="secondary"
                    loading={isImporting}
                    iconName="Upload"
                    iconPosition="left"
                    disabled={isImporting}
                  >
                    Import Backup File
                  </Button>
                </div>
                <div className="text-sm text-text-secondary flex items-center">
                  <Icon name="Info" size={16} className="mr-1" />
                  Only JSON backup files are supported
                </div>
              </div>
            </div>

            {/* Privacy Controls */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h4 className="text-md font-medium text-text-primary">Privacy Controls</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                  <div>
                    <div className="font-medium text-text-primary">Usage Analytics</div>
                    <div className="text-sm text-text-secondary">
                      Help improve the app by sharing anonymous usage data
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                  <div>
                    <div className="font-medium text-text-primary">Data Processing</div>
                    <div className="text-sm text-text-secondary">
                      Allow processing of study content for AI improvements
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="space-y-4 pt-4 border-t border-error-100">
              <h4 className="text-md font-medium text-error flex items-center space-x-2">
                <Icon name="AlertTriangle" size={18} />
                <span>Danger Zone</span>
              </h4>
              
              <div className="p-4 bg-error-50 border border-error-100 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-error">Delete Account</div>
                    <div className="text-sm text-error-600 mt-1">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </div>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>

              {/* Delete Confirmation Modal */}
              {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4 shadow-floating">
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon name="AlertTriangle" size={24} className="text-error" />
                      <h3 className="text-lg font-semibold text-text-primary">Delete Account</h3>
                    </div>
                    
                    <p className="text-text-secondary mb-4">
                      This will permanently delete your account and all your study notes. 
                      This action cannot be undone.
                    </p>
                    
                    <p className="text-sm text-text-secondary mb-4">
                      Type <strong>DELETE MY ACCOUNT</strong> to confirm:
                    </p>
                    
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-error focus:border-transparent mb-4"
                      placeholder="DELETE MY ACCOUNT"
                    />
                    
                    <div className="flex space-x-3">
                      <Button
                        variant="danger"
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirmText !== 'DELETE MY ACCOUNT'}
                        className="flex-1"
                      >
                        Delete Account
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeleteConfirmText('');
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagementSection;