# 🚀 Automated GitHub Pages Setup for ACDC Schemas (Windows PowerShell)

Write-Host "🚀 GitHub Pages ACDC Schema Setup" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "travel-preferences.json") -or !(Test-Path "employee-credential.json")) {
    Write-Host "❌ Schema files not found! Make sure you're in the github-pages-setup directory." -ForegroundColor Red
    exit 1
}

# Get GitHub username
$GITHUB_USERNAME = Read-Host "Enter your GitHub username"
if ([string]::IsNullOrEmpty($GITHUB_USERNAME)) {
    Write-Host "❌ GitHub username is required!" -ForegroundColor Red
    exit 1
}

Write-Host "📝 Setting up for user: $GITHUB_USERNAME" -ForegroundColor Yellow

# Update index.html with actual username
(Get-Content index.html) -replace 'YOUR-USERNAME', $GITHUB_USERNAME | Set-Content index.html
Write-Host "✅ Updated index.html with your username" -ForegroundColor Green

# Initialize git repository
Write-Host "📦 Initializing git repository..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial commit: Add ACDC schemas for Travlr-ID"

# Set up remote origin
$REPO_URL = "https://github.com/$GITHUB_USERNAME/travlr-schemas.git"
git remote add origin $REPO_URL
Write-Host "✅ Added remote origin: $REPO_URL" -ForegroundColor Green

# Instructions for user
Write-Host ""
Write-Host "🎯 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "=============" -ForegroundColor Cyan
Write-Host "1. Go to github.com and create a new repository:"
Write-Host "   - Repository name: travlr-schemas"
Write-Host "   - Make it PUBLIC (required for GitHub Pages)"
Write-Host "   - Don't add README (we have files already)"
Write-Host ""
Write-Host "2. After creating the repository, run:"
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Enable GitHub Pages:"
Write-Host "   - Go to repository Settings → Pages"
Write-Host "   - Source: Deploy from a branch"
Write-Host "   - Branch: main / (root)"
Write-Host "   - Click Save"
Write-Host ""
Write-Host "4. Your schemas will be available at:" -ForegroundColor Green
Write-Host "   https://$GITHUB_USERNAME.github.io/travlr-schemas/travel-preferences.json" -ForegroundColor Green
Write-Host "   https://$GITHUB_USERNAME.github.io/travlr-schemas/employee-credential.json" -ForegroundColor Green
Write-Host ""
Write-Host "5. Test with:"
Write-Host "   curl https://$GITHUB_USERNAME.github.io/travlr-schemas/travel-preferences.json" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔧 UPDATE YOUR APP CODE:" -ForegroundColor Magenta
Write-Host "Replace localhost URLs with:"
Write-Host "   'https://$GITHUB_USERNAME.github.io/travlr-schemas/travel-preferences.json'"
Write-Host "   'https://$GITHUB_USERNAME.github.io/travlr-schemas/employee-credential.json'"
Write-Host ""
Write-Host "✅ Setup complete! Follow the steps above to deploy." -ForegroundColor Green