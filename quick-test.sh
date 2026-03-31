#!/bin/bash
echo "🔍 Quick test for critical build issues"
echo "========================================"

# Check 1: Polyfill imports are commented out
echo "1. Checking polyfill imports..."
if grep -r "import('intersection-observer')" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "//" | grep -v "node_modules" > /dev/null; then
    echo "❌ Found uncommented intersection-observer import"
    exit 1
else
    echo "✅ No uncommented intersection-observer imports"
fi

if grep -r "import('resize-observer-polyfill')" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "//" | grep -v "node_modules" > /dev/null; then
    echo "❌ Found uncommented resize-observer-polyfill import"
    exit 1
else
    echo "✅ No uncommented resize-observer-polyfill imports"
fi

if grep -r "import('css-vars-ponyfill')" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "//" | grep -v "node_modules" > /dev/null; then
    echo "❌ Found uncommented css-vars-ponyfill import"
    exit 1
else
    echo "✅ No uncommented css-vars-ponyfill imports"
fi

# Check 2: Required files exist
echo ""
echo "2. Checking required files..."
REQUIRED_FILES=(
    "package.json"
    "next.config.ts"
    "app/[locale]/layout.tsx"
    "app/[locale]/page.tsx"
    "lib/browser-compatibility.ts"
    "components/compatibility/BrowserCompatibility.tsx"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Check 3: Package.json has required dependencies
echo ""
echo "3. Checking package.json dependencies..."
if grep -q '"next-intl"' package.json; then
    echo "✅ next-intl in package.json"
else
    echo "❌ next-intl missing from package.json"
    exit 1
fi

# Check 4: Browser compatibility has proper error handling
echo ""
echo "4. Checking browser compatibility error handling..."
if grep -q "console.warn('Polyfill loading failed'" lib/browser-compatibility.ts; then
    echo "✅ Polyfill error handling in place"
else
    echo "⚠️  Polyfill error handling not found (check manually)"
fi

echo ""
echo "========================================"
echo "✅ Quick test passed!"
echo ""
echo "Note: Full build test requires proper dependency installation."
echo "The critical polyfill import issue has been fixed."
echo ""
echo "If Vercel build still fails, check:"
echo "1. Turbopack configuration in next.config.ts"
echo "2. Dependency installation logs"
echo "3. Module resolution issues"