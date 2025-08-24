# 🚀 Quick Start: GitHub Pages ACDC Schema Hosting

## 5-Minute Setup

### 1. Copy Files to GitHub
```bash
# Upload these files to a new GitHub repository named 'travlr-schemas':
- index.html
- travel-preferences.json  
- employee-credential.json
- README.md
```

### 2. Enable GitHub Pages
- Go to repository **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: **main** / **(root)**
- Click **Save**

### 3. Wait 5 minutes, then test:
```bash
# Replace YOUR-USERNAME with your GitHub username
curl https://YOUR-USERNAME.github.io/travlr-schemas/travel-preferences.json
```

### 4. Update Your App
```typescript
// In GlobalSchemaRegistry.ts, replace localhost with GitHub URLs:
'travel-preferences': {
  alias: 'travlr-travel-preferences',
  url: 'https://YOUR-USERNAME.github.io/travlr-schemas/travel-preferences.json',
  said: 'EKsru4fmoUeRiFYmYB120spiQkosYW1al14kPnXh158h'
}
```

### 5. Test ACDC Creation
```javascript
// This will now work with production GitHub URLs!
const oobiOp = await client.oobis().resolve(
  'https://YOUR-USERNAME.github.io/travlr-schemas/travel-preferences.json'
);
await client.operations().wait(oobiOp);

const credential = await client.credentials().issue(aidName, {
  ri: registryId,
  s: 'EKsru4fmoUeRiFYmYB120spiQkosYW1al14kPnXh158h',
  a: { /* your credential data */ }
});
```

## ✅ That's It!

Your ACDC schemas are now hosted on GitHub's production infrastructure:
- **Free** hosting
- **Global CDN** 
- **HTTPS** enabled
- **99.9% uptime**

## 🔧 Automated Setup (Optional)

If you prefer automation:

**Windows:**
```powershell
cd github-pages-setup
.\setup-github-pages.ps1
```

**Mac/Linux:**
```bash
cd github-pages-setup
chmod +x setup-github-pages.sh
./setup-github-pages.sh
```

## 📋 File Structure
```
travlr-schemas/                    ← GitHub repository
├── index.html                     ← Schema browser/documentation  
├── travel-preferences.json        ← ACDC schema with SAID
├── employee-credential.json       ← ACDC schema with SAID
└── README.md                      ← Documentation
```

## 🌐 Your Production URLs
```
Website:     https://YOUR-USERNAME.github.io/travlr-schemas/
Schema 1:    https://YOUR-USERNAME.github.io/travlr-schemas/travel-preferences.json
Schema 2:    https://YOUR-USERNAME.github.io/travlr-schemas/employee-credential.json
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**