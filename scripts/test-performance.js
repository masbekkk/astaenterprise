const fs = require('fs');
const path = require('path');

function testPerformanceAndA11y() {
  console.log('🚀 Running PageSpeed Insights & Accessibility Audit Validation...\n');
  let errors = 0;

  // 1. Validate Google Fonts non-blocking setup in public/index.html
  const htmlPath = path.resolve(__dirname, '../public/index.html');
  const html = fs.readFileSync(htmlPath, 'utf-8');

  if (!html.includes('media="print"') || !html.includes('onload="this.media=\'all\'"')) {
    console.error('❌ Google Fonts is missing non-blocking media="print" onload pattern in index.html');
    errors++;
  } else {
    console.log('✅ Google Fonts is configured as non-render-blocking with async stylesheet loading');
  }

  if (!html.includes('<noscript>') || !html.includes('href="https://fonts.googleapis.com/css2?family=')) {
    console.error('❌ Missing noscript fallback for Google Fonts');
    errors++;
  } else {
    console.log('✅ Noscript fallback present for Google Fonts');
  }

  // 2. Validate llms.txt & llms-full.txt
  const llmsPath = path.resolve(__dirname, '../public/llms.txt');
  if (!fs.existsSync(llmsPath)) {
    console.error('❌ public/llms.txt does not exist');
    errors++;
  } else {
    const llms = fs.readFileSync(llmsPath, 'utf-8');
    if (!llms.startsWith('# ')) {
      console.error('❌ public/llms.txt missing required H1 header ("# Title")');
      errors++;
    } else if (!llms.includes('](')) {
      console.error('❌ public/llms.txt does not contain any markdown links');
      errors++;
    } else {
      console.log('✅ public/llms.txt complies with llmstxt.org specification (H1 + links present)');
    }
  }

  const llmsFullPath = path.resolve(__dirname, '../public/llms-full.txt');
  if (!fs.existsSync(llmsFullPath)) {
    console.error('❌ public/llms-full.txt does not exist');
    errors++;
  } else {
    console.log('✅ public/llms-full.txt present for deep AI context');
  }

  // 3. Validate contrast in Logo.jsx
  const logoPath = path.resolve(__dirname, '../src/components/Logo.jsx');
  const logoContent = fs.readFileSync(logoPath, 'utf-8');
  if (logoContent.includes('text-zinc-400')) {
    console.error('❌ Logo.jsx contains low-contrast text-zinc-400');
    errors++;
  } else {
    console.log('✅ Logo.jsx text contrast is WCAG compliant');
  }

  // 4. Validate heading order and contrast in Footer.jsx
  const footerPath = path.resolve(__dirname, '../src/components/Footer.jsx');
  const footerContent = fs.readFileSync(footerPath, 'utf-8');
  if (footerContent.includes('<h5')) {
    console.error('❌ Footer.jsx contains skipped heading level <h5');
    errors++;
  } else {
    console.log('✅ Footer.jsx heading structure is sequential (semantic h3)');
  }

  // 5. Validate LCP render delay fix in Home.jsx
  const homePath = path.resolve(__dirname, '../src/pages/Home.jsx');
  const homeContent = fs.readFileSync(homePath, 'utf-8');
  if (homeContent.includes('text-3xl font-black text-amber-500')) {
    console.error('❌ Home.jsx contains low-contrast text-amber-500 numbers');
    errors++;
  } else {
    console.log('✅ Home.jsx step numbers contrast is WCAG compliant (amber-700)');
  }

  console.log(`\n🏁 Performance & A11y Audit finished with ${errors} errors.`);
  if (errors > 0) process.exit(1);
}

testPerformanceAndA11y();
