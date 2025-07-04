import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSection = ({ isExpanded, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Student User',
    email: 'student@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus('success');
      setIsEditing(false);
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: 'Student User',
      email: 'student@example.com',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Account Information</h3>
            <p className="text-sm text-text-secondary">Manage your profile and security settings</p>
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
          {saveStatus && (
            <div className={`flex items-center space-x-2 text-sm p-3 rounded-lg mb-4 ${
              saveStatus === 'success' ?'bg-success-50 text-success border border-success-100' :'bg-error-50 text-error border border-error-100'
            }`}>
              <Icon 
                name={saveStatus === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                size={16} 
              />
              <span>
                {saveStatus === 'success' ? 'Account updated successfully' : 'Failed to update account'}
              </span>
            </div>
          )}

          <div className="space-y-6">
            {/* Profile Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-text-primary">Profile Information</h4>
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Edit2"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="p-3 bg-secondary-50 rounded-lg text-text-primary">
                      {formData.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="p-3 bg-secondary-50 rounded-lg text-text-primary">
                      {formData.email}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Password Change */}
            {isEditing && (
              <div>
                <h4 className="text-md font-medium text-text-primary mb-4">Change Password</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Current Password
                    </label>
                    <Input
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        New Password
                      </label>
                      <Input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={isSaving}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Changes
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSection;