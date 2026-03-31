#!/bin/bash

echo "🧪 Testing i18n Implementation"
echo "================================"

# Check if translation files exist
echo "1. Checking translation files..."
if [ -f "messages/en.json" ] && [ -f "messages/es.json" ]; then
    echo "   ✅ English and Spanish translation files exist"
else
    echo "   ❌ Missing translation files"
    exit 1
fi

# Check if all required translation keys exist in both files
echo "2. Checking translation keys..."
EN_KEYS=$(jq -r 'paths(scalars) | join(".")' messages/en.json | sort)
ES_KEYS=$(jq -r 'paths(scalars) | join(".")' messages/es.json | sort)

if [ "$EN_KEYS" = "$ES_KEYS" ]; then
    echo "   ✅ Both files have the same keys"
else
    echo "   ❌ Key mismatch between files"
    echo "   Missing in Spanish:"
    comm -23 <(echo "$EN_KEYS") <(echo "$ES_KEYS")
    echo "   Missing in English:"
    comm -13 <(echo "$EN_KEYS") <(echo "$ES_KEYS")
fi

# Check if locale-specific content files exist
echo "3. Checking locale-specific content..."
if [ -f "content/bio.es.json" ] && [ -f "content/projects.es.json" ]; then
    echo "   ✅ Spanish content files exist"
else
    echo "   ❌ Missing Spanish content files"
fi

# Check if components use translations correctly
echo "4. Checking component translation usage..."
MISSING_TRANSLATIONS=0

# Check About component
if grep -q "useTranslations" components/sections/About.tsx; then
    echo "   ✅ About component uses translations"
else
    echo "   ❌ About component missing useTranslations"
    MISSING_TRANSLATIONS=1
fi

# Check Projects component
if grep -q "useTranslations" components/sections/Projects.tsx; then
    echo "   ✅ Projects component uses translations"
else
    echo "   ❌ Projects component missing useTranslations"
    MISSING_TRANSLATIONS=1
fi

# Check Contact component
if grep -q "useTranslations" components/sections/Contact.tsx; then
    echo "   ✅ Contact component uses translations"
else
    echo "   ❌ Contact component missing useTranslations"
    MISSING_TRANSLATIONS=1
fi

# Check Header component
if grep -q "useTranslations" components/layout/Header.tsx; then
    echo "   ✅ Header component uses translations"
else
    echo "   ❌ Header component missing useTranslations"
    MISSING_TRANSLATIONS=1
fi

# Check Footer component
if grep -q "useTranslations" components/layout/Footer.tsx; then
    echo "   ✅ Footer component uses translations"
else
    echo "   ❌ Footer component missing useTranslations"
    MISSING_TRANSLATIONS=1
fi

# Check error pages
if grep -q "useTranslations" "app/[locale]/not-found.tsx" && grep -q "useTranslations" "app/[locale]/error.tsx"; then
    echo "   ✅ Error pages use translations"
else
    echo "   ❌ Error pages missing translations"
    MISSING_TRANSLATIONS=1
fi

# Check if build works
echo "5. Testing build..."
if npm run build > /tmp/build.log 2>&1; then
    echo "   ✅ Build successful"
    echo "   Build output saved to /tmp/build.log"
else
    echo "   ❌ Build failed"
    cat /tmp/build.log | tail -20
    exit 1
fi

echo ""
echo "📊 Test Summary"
echo "================"
if [ $MISSING_TRANSLATIONS -eq 0 ]; then
    echo "✅ All i18n tests passed!"
    echo ""
    echo "Next steps:"
    echo "1. Run the development server: npm run dev"
    echo "2. Visit http://localhost:3000/en for English"
    echo "3. Visit http://localhost:3000/es for Spanish"
    echo "4. Test language switcher functionality"
else
    echo "⚠️  Some translation issues found"
    echo "Please fix the components marked with ❌ above"
fi