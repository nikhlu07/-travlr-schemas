#!/bin/bash

# 🚀 Automated GitHub Pages Setup for ACDC Schemas
# This script sets up schema hosting on GitHub Pages

echo "🚀 GitHub Pages ACDC Schema Setup"
echo "================================="

# Check if we're in the right directory
if [ ! -f "travel-preferences.json" ] || [ ! -f "employee-credential.json" ]; then
    echo "❌ Schema files not found! Make sure you're in the github-pages-setup directory."
    exit 1
fi

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME
if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required!"
    exit 1
fi

echo "📝 Setting up for user: $GITHUB_USERNAME"

# Update index.html with actual username
sed -i "s/YOUR-USERNAME/$GITHUB_USERNAME/g" index.html
echo "✅ Updated index.html with your username"

# Initialize git repository
echo "📦 Initializing git repository..."
git init
git add .
git commit -m "Initial commit: Add ACDC schemas for Travlr-ID"

# Set up remote origin
REPO_URL="https://github.com/$GITHUB_USERNAME/travlr-schemas.git"
git remote add origin $REPO_URL
echo "✅ Added remote origin: $REPO_URL"

# Instructions for user
echo ""
echo "🎯 NEXT STEPS:"
echo "============="
echo "1. Go to github.com and create a new repository:"
echo "   - Repository name: travlr-schemas"
echo "   - Make it PUBLIC (required for GitHub Pages)"
echo "   - Don't add README (we have files already)"
echo ""
echo "2. After creating the repository, run:"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to repository Settings → Pages"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main / (root)"
echo "   - Click Save"
echo ""
echo "4. Your schemas will be available at:"
echo "   https://$GITHUB_USERNAME.github.io/travlr-schemas/travel-preferences.json"
echo "   https://$GITHUB_USERNAME.github.io/travlr-schemas/employee-credential.json"
echo ""
echo "5. Test with:"
echo "   curl https://$GITHUB_USERNAME.github.io/travlr-schemas/travel-preferences.json"
echo ""
echo "🔧 UPDATE YOUR APP CODE:"
echo "Replace localhost URLs with:"
echo "   'https://$GITHUB_USERNAME.github.io/travlr-schemas/travel-preferences.json'"
echo "   'https://$GITHUB_USERNAME.github.io/travlr-schemas/employee-credential.json'"
echo ""
echo "✅ Setup complete! Follow the steps above to deploy."