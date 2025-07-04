import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const GenerationProgress = ({ isGenerating, step, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'analyze', label: 'Analyzing Topic', icon: 'Search' },
    { id: 'generate', label: 'Generating Content', icon: 'FileText' },
    { id: 'diagrams', label: 'Creating Diagrams', icon: 'Image' },
    { id: 'finalize', label: 'Finalizing Notes', icon: 'CheckCircle' }
  ];

  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return prev + 1;
      });
    }, 300); // Slower progress for better UX

    return () => clearInterval(interval);
  }, [isGenerating, onComplete]);

  useEffect(() => {
    // Update current step based on progress
    if (progress < 25) setCurrentStep(0);
    else if (progress < 50) setCurrentStep(1);
    else if (progress < 75) setCurrentStep(2);
    else setCurrentStep(3);
  }, [progress]);

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'pending';
  };

  return (
    <div className="bg-surface rounded-lg shadow-soft border border-border p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Icon name="Loader" size={24} className="text-primary" />
          </motion.div>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Generating Your Study Notes
        </h3>
        <p className="text-text-secondary">
          {step || 'Please wait while we create comprehensive study materials...'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">Progress</span>
          <span className="text-sm font-medium text-text-primary">{progress}%</span>
        </div>
        <div className="w-full bg-secondary-100 rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <motion.div
              key={step.id}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                status === 'current' ?'bg-primary-50 border border-primary-200' 
                  : status === 'completed' ?'bg-green-50 border border-green-200' :'bg-secondary-50 border border-secondary-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                status === 'current' ?'bg-primary text-white' 
                  : status === 'completed' ?'bg-green-500 text-white' :'bg-secondary-200 text-secondary-600'
              }`}>
                {status === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : status === 'current' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Icon name={step.icon} size={16} />
                  </motion.div>
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <div className="flex-1">
                <div className={`font-medium ${
                  status === 'current' ?'text-primary' 
                    : status === 'completed' ?'text-green-700' :'text-secondary-600'
                }`}>
                  {step.label}
                </div>
                {status === 'current' && (
                  <motion.div
                    className="text-sm text-text-secondary mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {step.id === 'analyze' && 'Understanding your topic and requirements...'}
                    {step.id === 'generate' && 'Creating comprehensive study content...'}
                    {step.id === 'diagrams' && 'Generating educational diagrams...'}
                    {step.id === 'finalize' && 'Organizing and formatting your notes...'}
                  </motion.div>
                )}
              </div>
              {status === 'current' && (
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Estimated Time */}
      <div className="mt-6 text-center">
        <p className="text-sm text-text-secondary">
          Estimated time remaining: {Math.max(0, Math.ceil((100 - progress) / 3))} seconds
        </p>
      </div>
    </div>
  );
};

export default GenerationProgress;