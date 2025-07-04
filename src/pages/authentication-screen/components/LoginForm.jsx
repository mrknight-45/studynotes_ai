import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = ({ onForgotPassword }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = {
    email: 'student@example.com',
    password: 'password123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        navigate('/dashboard');
      } else {
        setErrors({
          general: `Invalid credentials. Use email: ${mockCredentials.email} and password: ${mockCredentials.password}`
        });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.general && (
        <div className="flex items-center space-x-2 p-3 bg-error-50 border border-error-100 rounded-lg text-error text-sm">
          <Icon name="AlertCircle" size={16} />
          <span>{errors.general}</span>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? 'border-error focus:ring-error' : ''}
        />
        {errors.email && (
          <div className="flex items-center space-x-1 mt-1 text-error text-xs">
            <Icon name="AlertCircle" size={12} />
            <span>{errors.email}</span>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          className={errors.password ? 'border-error focus:ring-error' : ''}
        />
        {errors.password && (
          <div className="flex items-center space-x-1 mt-1 text-error text-xs">
            <Icon name="AlertCircle" size={12} />
            <span>{errors.password}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Input
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4"
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary-700 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1 py-1"
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        fullWidth
        className="mt-6"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;