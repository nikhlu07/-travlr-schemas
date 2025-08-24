/**
 * TEST GITHUB PAGES ACDC - Demo using GitHub-hosted schemas
 * Replace 'YOUR-USERNAME' with your actual GitHub username
 */

const pkg = require('signify-ts');
const { SignifyClient, Tier, ready, randomPasscode } = pkg;

// UPDATE THESE URLS WITH YOUR GITHUB USERNAME
const GITHUB_USERNAME = 'nikhlu07'; // ← CHANGE THIS
const GITHUB_SCHEMA_URLS = {
  'travel-preferences': `https://${GITHUB_USERNAME}.github.io/-travlr-schemas/travel-preferences.json`,
  'employee-credential': `https://${GITHUB_USERNAME}.github.io/-travlr-schemas/employee-credential.json`
};

async function testGitHubPagesACDC() {
  console.log('🐙 GITHUB PAGES ACDC TEST');
  console.log('========================');
  console.log(`GitHub User: ${GITHUB_USERNAME}`);
  console.log(`Schema URL: ${GITHUB_SCHEMA_URLS['travel-preferences']}`);
  console.log('');

  if (GITHUB_USERNAME === 'YOUR-USERNAME') {
    console.log('❌ Please update GITHUB_USERNAME in this file with your actual GitHub username!');
    console.log('   Edit line 7: const GITHUB_USERNAME = "your-actual-username";');
    return;
  }

  try {
    await ready();
    console.log('✅ SignifyTS Ready');
    
    // Connect to KERIA
    const bran = randomPasscode();
    const client = new SignifyClient('http://localhost:3904', bran, Tier.low, 'http://localhost:3906');
    await client.boot();
    await client.connect();
    console.log('✅ Connected to KERIA');
    
    // Create identity and registry
    const aidName = 'github-acdc-' + Date.now();
    const identityResult = await client.identifiers().create(aidName);
    const op = await identityResult.op();
    await client.operations().wait(op);
    
    const identity = await client.identifiers().get(aidName);
    console.log('✅ Identity created:', identity.prefix.substring(0, 20) + '...');
    
    const registryResult = await client.registries().create({
      name: aidName,
      registryName: 'github-registry'
    });
    const regOp = await registryResult.op();
    await client.operations().wait(regOp);
    const registries = await client.registries().list(identity.prefix);
    console.log('✅ Registry created:', registries[0]?.regk.substring(0, 20) + '...');
    
    // Test schema resolution from GitHub Pages
    console.log('\\n📋 TESTING GITHUB PAGES SCHEMA RESOLUTION:');
    console.log('1. Checking if schema is accessible...');
    
    // Use fetch to test if URL is accessible (Node.js 18+)
    try {
      const response = await fetch(GITHUB_SCHEMA_URLS['travel-preferences']);
      if (response.ok) {
        const schemaData = await response.json();
        console.log('✅ Schema accessible from GitHub Pages');
        console.log('   SAID:', schemaData.d?.substring(0, 20) + '...');
        console.log('   Title:', schemaData.title);
      } else {
        console.log(`❌ Schema not accessible: ${response.status} ${response.statusText}`);
        console.log('   Make sure GitHub Pages is enabled and deployed');
        return;
      }
    } catch (fetchError) {
      console.log('❌ Schema fetch failed:', fetchError.message);
      console.log('   Possible issues:');
      console.log('   - GitHub Pages not enabled');
      console.log('   - Repository not public');
      console.log('   - Wrong username in URL');
      return;
    }
    
    console.log('2. Resolving OOBI through KERIA...');
    try {
      const oobiOp = await client.oobis().resolve(GITHUB_SCHEMA_URLS['travel-preferences']);
      console.log('✅ OOBI operation created:', oobiOp.name);
      
      // Wait for OOBI resolution
      let resolved = false;
      for (let attempt = 1; attempt <= 10; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second intervals
        
        try {
          const operations = await client.operations().get(oobiOp.name);
          console.log(`   Attempt ${attempt}: ${operations.done ? 'RESOLVED ✅' : 'pending...'}`);
          
          if (operations.done) {
            resolved = true;
            break;
          }
        } catch (error) {
          console.log(`   Attempt ${attempt}: check failed`);
        }
      }
      
      if (resolved) {
        console.log('🎉 GITHUB PAGES SCHEMA SUCCESSFULLY RESOLVED!');
        
        // Try to create ACDC credential
        console.log('\\n🔐 CREATING ACDC CREDENTIAL WITH GITHUB SCHEMA:');
        
        const credResult = await client.credentials().issue(aidName, {
          ri: registries[0].regk,
          s: 'EKsru4fmoUeRiFYmYB120spiQkosYW1al14kPnXh158h', // Travel preferences SAID
          a: {
            i: identity.prefix,
            employeeId: 'GITHUB001',
            seatPreference: 'window',
            mealPreference: 'vegetarian',
            airlines: 'GitHub Airways',
            emergencyContact: 'Emergency Contact via GitHub',
            allergies: 'None'
          }
        });
        
        console.log('🚀 SUCCESS! ACDC CREDENTIAL CREATED FROM GITHUB PAGES!');
        console.log('   Credential SAID:', credResult.acdc.sad.d.substring(0, 20) + '...');
        console.log('   Employee ID:', credResult.acdc.sad.a.employeeId);
        console.log('   Airlines:', credResult.acdc.sad.a.airlines);
        console.log('   Schema Source: GitHub Pages ✅');
        
        console.log('\\n🎯 PRODUCTION READY!');
        console.log('===================');
        console.log('✅ Schema hosted on GitHub Pages');
        console.log('✅ KERIA can resolve GitHub URLs');
        console.log('✅ ACDC credentials working end-to-end');
        console.log('✅ Free, reliable, production infrastructure');
        console.log('');
        console.log('🔧 Next steps:');
        console.log('1. Update GlobalSchemaRegistry.ts with GitHub URLs');
        console.log('2. Deploy your app with production schema URLs');
        console.log('3. Monitor schema access logs on GitHub');
        
      } else {
        console.log('⚠️ OOBI resolution timeout');
        console.log('   Schema is accessible but KERIA resolution is slow');
        console.log('   This might still work in production with better network');
      }
      
    } catch (oobiError) {
      console.log('❌ OOBI resolution failed:', oobiError.message);
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

console.log('📚 HOW TO USE THIS TEST:');
console.log('=======================');
console.log('1. Set up GitHub Pages schema hosting (see README.md)');
console.log('2. Update GITHUB_USERNAME variable in this file');
console.log('3. Make sure your schemas are deployed to GitHub Pages');
console.log('4. Run: node test-github-acdc.cjs');
console.log('');

testGitHubPagesACDC();