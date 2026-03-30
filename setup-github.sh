#!/bin/bash
echo "Setting up GitHub repository for Latingeek Portfolio..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: Not in project directory"
    exit 1
fi

# Create repository on GitHub (manual instructions)
echo ""
echo "=== MANUAL STEPS REQUIRED ==="
echo "1. Go to: https://github.com/new"
echo "2. Repository name: latingeek-portfolio"
echo "3. Description: Professional portfolio for German Lamela (Latingeek)"
echo "4. Choose: Public repository"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
echo "=== AFTER CREATING REPOSITORY ==="
echo "Run these commands:"
echo ""
echo "git remote add origin https://github.com/LatinGeek/latingeek-portfolio.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
echo "=== DEPLOYMENT ==="
echo "After pushing, deploy to Vercel:"
echo "1. Go to: https://vercel.com/new"
echo "2. Import from GitHub"
echo "3. Select latingeek-portfolio"
echo "4. Deploy!"
echo ""
echo "Your portfolio will be live at: https://latingeek-portfolio.vercel.app"