const fs = require('fs');
const path = require('path');

function testSeoFiles() {
  console.log('🧪 Starting Technical SEO and Schema Validation Tests...\n');
  let errors = 0;

  // 1. Validate public/robots.txt
  const robotsPath = path.resolve(__dirname, '../public/robots.txt');
  if (!fs.existsSync(robotsPath)) {
    console.error('❌ Missing public/robots.txt');
    errors++;
  } else {
    const robots = fs.readFileSync(robotsPath, 'utf-8');
    if (!robots.includes('https://berkahemas.web.id/sitemap.xml')) {
      console.error('❌ Sitemap missing in robots.txt');
      errors++;
    } else {
      console.log('✅ robots.txt valid and contains sitemap');
    }
  }

  // 2. Validate public/sitemap.xml
  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ Missing public/sitemap.xml');
    errors++;
  } else {
    const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
    if (!sitemap.includes('https://berkahemas.web.id/') || !sitemap.includes('https://berkahemas.web.id/en')) {
      console.error('❌ Sitemap missing required URLs');
      errors++;
    } else {
      console.log('✅ sitemap.xml valid and contains ID + EN landing URLs');
    }
  }

  // 3. Validate IndexNow Key file
  const keyPath = path.resolve(__dirname, '../public/c4a9b8f2d1e04753a8123efb092147ac.txt');
  if (!fs.existsSync(keyPath)) {
    console.error('❌ Missing IndexNow key file');
    errors++;
  } else {
    console.log('✅ IndexNow key file present');
  }

  // 4. Validate build/index.html (ID) JSON-LD @graph
  const buildIdPath = path.resolve(__dirname, '../build/index.html');
  if (fs.existsSync(buildIdPath)) {
    const idHtml = fs.readFileSync(buildIdPath, 'utf-8');
    const match = idHtml.match(/<script id="structured-data-graph" type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!match) {
      console.error('❌ build/index.html missing structured-data-graph script');
      errors++;
    } else {
      try {
        const json = JSON.parse(match[1]);
        if (!json['@graph'] || !Array.isArray(json['@graph'])) {
          console.error('❌ JSON-LD @graph is not an array');
          errors++;
        } else {
          const types = json['@graph'].map(t => t['@type']);
          console.log(`✅ build/index.html @graph JSON-LD valid with types: ${types.join(', ')}`);
        }
      } catch (err) {
        console.error('❌ build/index.html JSON-LD parse error:', err.message);
        errors++;
      }
    }
  }

  // 5. Validate build/en/index.html (EN) JSON-LD @graph
  const buildEnPath = path.resolve(__dirname, '../build/en/index.html');
  if (fs.existsSync(buildEnPath)) {
    const enHtml = fs.readFileSync(buildEnPath, 'utf-8');
    const match = enHtml.match(/<script id="structured-data-graph" type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!match) {
      console.error('❌ build/en/index.html missing structured-data-graph script');
      errors++;
    } else {
      try {
        const json = JSON.parse(match[1]);
        if (!json['@graph'] || !Array.isArray(json['@graph'])) {
          console.error('❌ EN JSON-LD @graph is not an array');
          errors++;
        } else {
          const types = json['@graph'].map(t => t['@type']);
          console.log(`✅ build/en/index.html @graph JSON-LD valid with types: ${types.join(', ')}`);
        }
      } catch (err) {
        console.error('❌ build/en/index.html JSON-LD parse error:', err.message);
        errors++;
      }
    }
  }

  console.log(`\n🏁 Test finished with ${errors} errors.`);
  if (errors > 0) process.exit(1);
}

testSeoFiles();
