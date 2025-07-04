import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialLogin = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'text-gray-800',
      bgColor: 'hover:bg-gray-50'
    }
  ];

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider.id);
    
    // Simulate social login
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/dashboard');
    } catch (error) {
      console.error(`${provider.name} login failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface text-text-secondary">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider)}
            loading={loadingProvider === provider.id}
            className={`${provider.bgColor} border-border`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name={provider.icon} size={18} className={provider.color} />
              <span className="text-text-primary">{provider.name}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;