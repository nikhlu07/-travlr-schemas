# 🚀 GitHub Pages ACDC Schema Hosting Setup

## Step-by-Step Instructions

### 1. Create GitHub Repository
```bash
# Go to github.com and create new repository:
# Repository name: travlr-schemas
# Description: ACDC schemas for Travlr-ID
# Public repository (required for GitHub Pages)
# Add README file: ✓
```

### 2. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/travlr-schemas.git
cd travlr-schemas

# Copy all files from this directory
# Copy: index.html, travel-preferences.json, employee-credential.json
```

### 3. Edit index.html
```bash
# Replace YOUR-USERNAME with your actual GitHub username
# Line 43: https://YOUR-USERNAME.github.io/travlr-schemas/travel-preferences.json
# Line 53: https://YOUR-USERNAME.github.io/travlr-schemas/employee-credential.json
```

### 4. Commit and Push
```bash
git add .
git commit -m "Add ACDC schemas for production"
git push origin main
```

### 5. Enable GitHub Pages
```bash
# Go to your repository on GitHub
# Settings → Pages
# Source: Deploy from a branch
# Branch: main / (root)
# Click Save
```

### 6. Wait and Test (5-10 minutes)
```bash
# Your schemas will be available at:
https://YOUR-USERNAME.github.io/travlr-schemas/
https://YOUR-USERNAME.github.io/travlr-schemas/travel-preferences.json
https://YOUR-USERNAME.github.io/travlr-schemas/employee-credential.json

# Test with curl:
curl https://YOUR-USERNAME.github.io/travlr-schemas/travel-preferences.json
```

## 🔧 Update Your App Code

### GlobalSchemaRegistry.ts
```typescript
// Replace localhost URLs with GitHub Pages URLs
private readonly SCHEMAS: Record<string, SchemaDefinition> = {
  'travel-preferences': {
    alias: 'travlr-travel-preferences',
    url: 'https://YOUR-USERNAME.github.io/travlr-schemas/travel-preferences.json',
    said: 'EKsru4fmoUeRiFYmYB120spiQkosYW1al14kPnXh158h'
  },
  'employee-credential': {
    alias: 'travlr-employee-credential',
    url: 'https://YOUR-USERNAME.github.io/travlr-schemas/employee-credential.json',
    said: 'EJzStfcj5F0NQdI2uqfXmmGMeAhb6qW1MBEkS_OO_XNg'
  }
};
```

### Test ACDC Creation
```javascript
// This should now work in production!
const oobiOp = await client.oobis().resolve(
  'https://YOUR-USERNAME.github.io/travlr-schemas/travel-preferences.json'
);

// Wait for OOBI resolution
await client.operations().wait(oobiOp);

// Create ACDC credential
const credential = await client.credentials().issue(aidName, {
  ri: registryId,
  s: 'EKsru4fmoUeRiFYmYB120spiQkosYW1al14kPnXh158h',
  a: {
    i: identity.prefix,
    employeeId: 'EMP001',
    seatPreference: 'window',
    mealPreference: 'vegetarian',
    airlines: 'GitHub Airways',
    emergencyContact: 'Emergency Contact',
    allergies: 'None'
  }
});

console.log('🎉 ACDC Credential Created:', credential.acdc.sad.d);
```

## 🔍 Troubleshooting

### CORS Issues
GitHub Pages automatically serves with proper CORS headers, so KERIA can fetch schemas.

### 404 Not Found
- Wait 5-10 minutes for GitHub Pages to deploy
- Check repository is public
- Check file names match exactly (case-sensitive)

### OOBI Resolution Timeout
- Verify schema URLs are accessible in browser
- Check SAID matches exactly
- Ensure KERIA can reach the internet

## 🎯 Benefits of GitHub Pages

✅ **Free** - No cost for public repositories  
✅ **Reliable** - GitHub's CDN infrastructure  
✅ **HTTPS** - Built-in SSL certificates  
✅ **Global** - Fast loading worldwide  
✅ **Simple** - Just static file serving  
✅ **Version Control** - Schema changes tracked in git  

## 📈 Next Steps

1. **Custom Domain** (optional): Point `schemas.travlr-id.com` to GitHub Pages
2. **Schema Updates**: Update files → commit → push → automatic deployment
3. **Monitoring**: Add uptime monitoring for your schema URLs
4. **Backup**: Consider mirroring to multiple GitHub accounts

**That's it! Your ACDC schemas are now hosted on production-grade infrastructure for free.**