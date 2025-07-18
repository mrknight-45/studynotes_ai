#!/bin/bash

# MindMapFlow AI - Setup Script
echo "🧠 Setting up MindMapFlow AI..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js 16+."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "🔧 Creating environment file..."
    cp .env.example .env
    echo "📝 Please edit .env file and add your API keys:"
    echo "   - VITE_GEMINI_API_KEY (required)"
    echo "   - VITE_OPENAI_API_KEY (optional)"
    echo ""
    echo "Get Gemini API key from: https://ai.google.dev/"
    echo "Get OpenAI API key from: https://platform.openai.com/api-keys"
else
    echo "✅ Environment file already exists"
fi

# Create a simple health check
echo "🔍 Running health check..."
if npm list react > /dev/null 2>&1; then
    echo "✅ React is properly installed"
else
    echo "❌ React installation issue detected"
fi

if npm list d3 > /dev/null 2>&1; then
    echo "✅ D3.js is properly installed"
else
    echo "❌ D3.js installation issue detected"
fi

if npm list reactflow > /dev/null 2>&1; then
    echo "✅ ReactFlow is properly installed"
else
    echo "❌ ReactFlow installation issue detected"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your API keys"
echo "2. Run 'npm start' to launch the development server"
echo "3. Open http://localhost:3000 in your browser"
echo "4. Check DEMO_GUIDE.md for a complete walkthrough"
echo ""
echo "🚀 Happy visual learning!"