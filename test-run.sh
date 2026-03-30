#!/bin/bash
echo "Testing Latingeek Portfolio Setup..."

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory exists"
    
    # Check key dependencies
    if [ -d "node_modules/next" ]; then
        echo "✅ Next.js installed"
    else
        echo "❌ Next.js not found"
    fi
    
    if [ -d "node_modules/react" ]; then
        echo "✅ React installed"
    else
        echo "❌ React not found"
    fi
    
    if [ -d "node_modules/next-intl" ]; then
        echo "✅ next-intl installed"
    else
        echo "❌ next-intl not found"
    fi
    
    if [ -d "node_modules/framer-motion" ]; then
        echo "✅ framer-motion installed"
    else
        echo "❌ framer-motion not found"
    fi
else
    echo "❌ node_modules directory not found"
fi

# Check TypeScript compilation
echo -e "\nChecking TypeScript compilation..."
npx tsc --noEmit --skipLibCheck 2>&1 | head -20

# Check if we can run dev server
echo -e "\nChecking if we can start dev server..."
timeout 5 npm run dev 2>&1 | grep -E "(ready|error|failed)" | head -5

echo -e "\nTest complete!"