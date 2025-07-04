import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-error';
    if (passwordStrength < 50) return 'bg-warning';
    if (passwordStrength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message and redirect
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
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
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
          Full Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
          className={errors.name ? 'border-error focus:ring-error' : ''}
        />
        {errors.name && (
          <div className="flex items-center space-x-1 mt-1 text-error text-xs">
            <Icon name="AlertCircle" size={12} />
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <Input
          id="register-email"
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
        <label htmlFor="register-password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <Input
          id="register-password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          className={errors.password ? 'border-error focus:ring-error' : ''}
        />
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-text-secondary">Password strength</span>
              <span className={`font-medium ${
                passwordStrength < 25 ? 'text-error' :
                passwordStrength < 50 ? 'text-warning' :
                passwordStrength < 75 ? 'text-accent' : 'text-success'
              }`}>
                {getPasswordStrengthText()}
              </span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
          </div>
        )}
        {errors.password && (
          <div className="flex items-center space-x-1 mt-1 text-error text-xs">
            <Icon name="AlertCircle" size={12} />
            <span>{errors.password}</span>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className={errors.confirmPassword ? 'border-error focus:ring-error' : ''}
        />
        {errors.confirmPassword && (
          <div className="flex items-center space-x-1 mt-1 text-error text-xs">
            <Icon name="AlertCircle" size={12} />
            <span>{errors.confirmPassword}</span>
          </div>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        loading={isLoading}
        fullWidth
        className="mt-6"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;