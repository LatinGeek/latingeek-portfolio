#!/bin/bash
# Test build script for latingeek-portfolio
# Run this before pushing to GitHub to catch build errors

set -e  # Exit on error

echo "🚀 Starting test build for latingeek-portfolio..."
echo "================================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project root directory"
    exit 1
fi

# Check Node.js version
echo "📦 Node.js version: $(node --version)"
echo "📦 npm version: $(npm --version)"

# Clean any previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📥 Installing dependencies..."
    npm install --legacy-peer-deps
else
    echo "📦 Dependencies already installed"
fi

# TypeScript check
echo "🔍 Running TypeScript check..."
npx tsc --noEmit

# ESLint check
echo "🔍 Running ESLint..."
npx eslint . --ext .ts,.tsx --quiet

# Build the project
echo "🏗️  Building project..."
npm run build

# Check build output
if [ -d ".next" ]; then
    echo "✅ Build successful!"
    echo "📁 Build output: .next/"
    
    # Check for common issues
    echo "🔍 Checking for common issues..."
    
    # Check bundle size
    if [ -f ".next/analyze/client.html" ]; then
        echo "📊 Bundle analysis available: .next/analyze/"
    fi
    
    # Check for large images
    echo "🖼️  Checking image optimization..."
    find public -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | xargs -I {} du -h {} | sort -hr | head -5
    
    echo "================================================"
    echo "🎉 All checks passed! Ready to push to GitHub."
    echo "Next steps:"
    echo "1. git add ."
    echo "2. git commit -m 'Your message'"
    echo "3. git push origin main"
else
    echo "❌ Build failed - .next directory not created"
    exit 1
fi