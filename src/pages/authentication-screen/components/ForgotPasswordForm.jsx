import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Check your email
          </h3>
          <p className="text-text-secondary text-sm">
            We've sent a password reset link to {email}
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={onBack}
            fullWidth
          >
            Back to Sign In
          </Button>
          
          <p className="text-xs text-text-secondary">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => {
                setIsSuccess(false);
                setEmail('');
              }}
              className="text-primary hover:text-primary-700 transition-smooth"
            >
              try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Key" size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Forgot your password?
        </h3>
        <p className="text-text-secondary text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-error-50 border border-error-100 rounded-lg text-error text-sm">
            <Icon name="AlertCircle" size={16} />
            <span>{error}</span>
          </div>
        )}
        
        <div>
          <label htmlFor="reset-email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address
          </label>
          <Input
            id="reset-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className={error ? 'border-error focus:ring-error' : ''}
          />
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            fullWidth
          >
            Send Reset Link
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            fullWidth
          >
            <Icon name="ArrowLeft" size={16} />
            Back to Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;