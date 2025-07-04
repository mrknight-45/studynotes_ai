import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorHandler = ({ error, onRetry, onReset }) => {
  const errorTypes = {
    'network': {
      title: 'Connection Error',
      message: 'Unable to connect to our AI services. Please check your internet connection and try again.',
      icon: 'Wifi',
      color: 'text-error',
      bgColor: 'bg-error-50',
      suggestions: [
        'Check your internet connection',
        'Try refreshing the page',
        'Contact support if the problem persists'
      ]
    },
    'api': {
      title: 'Service Temporarily Unavailable',
      message: 'Our AI generation service is currently experiencing high demand. Please try again in a few moments.',
      icon: 'Server',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      suggestions: [
        'Wait a few minutes and try again',
        'Try with a simpler topic',
        'Check our status page for updates'
      ]
    },
    'validation': {
      title: 'Invalid Topic',
      message: 'The topic you entered couldn\'t be processed. Please try a different topic or be more specific.',
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      suggestions: [
        'Be more specific with your topic',
        'Use proper spelling and grammar',
        'Try one of our suggested topics'
      ]
    },
    'quota': {
      title: 'Generation Limit Reached',
      message: 'You\'ve reached your daily generation limit. Upgrade your plan or try again tomorrow.',
      icon: 'Clock',
      color: 'text-error',
      bgColor: 'bg-error-50',
      suggestions: [
        'Try again tomorrow',
        'Upgrade to a premium plan',
        'Use the editor to modify existing notes'
      ]
    },
    'default': {
      title: 'Something Went Wrong',
      message: 'An unexpected error occurred while generating your notes. Please try again.',
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error-50',
      suggestions: [
        'Try again with the same topic',
        'Refresh the page and start over',
        'Contact support if the issue continues'
      ]
    }
  };

  // Mock error type detection
  const getErrorType = (errorMessage) => {
    if (!errorMessage) return 'default';
    
    const message = errorMessage.toLowerCase();
    if (message.includes('network') || message.includes('connection')) return 'network';
    if (message.includes('api') || message.includes('service')) return 'api';
    if (message.includes('validation') || message.includes('invalid')) return 'validation';
    if (message.includes('quota') || message.includes('limit')) return 'quota';
    
    return 'default';
  };

  const errorType = getErrorType(error?.message);
  const errorConfig = errorTypes[errorType];

  const suggestedTopics = [
    'Photosynthesis Process',
    'Newton\'s Laws of Motion',
    'World War II Timeline',
    'Calculus Derivatives',
    'Shakespeare\'s Hamlet'
  ];

  return (
    <div className="bg-surface rounded-lg shadow-soft border border-border p-6">
      <div className="text-center mb-6">
        <div className={`w-16 h-16 ${errorConfig.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon name={errorConfig.icon} size={32} className={errorConfig.color} />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {errorConfig.title}
        </h3>
        <p className="text-text-secondary">
          {errorConfig.message}
        </p>
      </div>

      {/* Error Details */}
      {error?.details && (
        <div className="bg-secondary-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-text-primary mb-2">Error Details:</h4>
          <p className="text-sm text-text-secondary font-mono">
            {error.details}
          </p>
        </div>
      )}

      {/* Suggestions */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">What you can do:</h4>
        <ul className="space-y-2">
          {errorConfig.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-text-secondary">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Topics */}
      {errorType === 'validation' && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-primary mb-3">Try these popular topics:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  // This would typically call a parent function to set the topic
                  onReset?.();
                  // Simulate setting the topic
                  const topicInput = document.querySelector('textarea');
                  if (topicInput) {
                    topicInput.value = topic;
                    topicInput.dispatchEvent(new Event('input', { bubbles: true }));
                  }
                }}
                className="text-left p-3 rounded-lg border border-border hover:border-primary hover:bg-primary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="text-sm text-text-secondary hover:text-primary">
                  {topic}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="primary"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={onRetry}
        >
          Try Again
        </Button>
        <Button
          variant="secondary"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={onReset}
        >
          Start Over
        </Button>
        <Button
          variant="ghost"
          iconName="HelpCircle"
          iconPosition="left"
          onClick={() => {
            // Mock help/support action
            window.open('mailto:support@studynotes-ai.com?subject=Generation Error', '_blank');
          }}
        >
          Get Help
        </Button>
      </div>

      {/* Status Link */}
      <div className="text-center mt-6 pt-6 border-t border-border">
        <p className="text-xs text-text-secondary">
          Check our{' '}
          <button 
            onClick={() => window.open('https://status.studynotes-ai.com', '_blank')}
            className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
          >
            service status page
          </button>
          {' '}for real-time updates
        </p>
      </div>
    </div>
  );
};

export default ErrorHandler;