const { chromium } = require('D:/Repos/asta-platform/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({headless:true, channel:'msedge'});
  const results = [];
  for (const [lang, width, height] of [['id',1440,1000],['id',390,844],['en',390,844],['en',768,1024]]) {
    const page = await browser.newPage({viewport:{width,height}, reducedMotion:'reduce'});
    const errors=[];
    page.on('pageerror', e=>errors.push(e.message));
    await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    await page.goto('http://127.0.0.1:3100/'+(lang==='en'?'en':''));
    await page.waitForTimeout(1200);
    await page.screenshot({path:path.join(__dirname,`${lang}-${width}-hero.png`)});
    const base = await page.evaluate(()=>({
      width:innerWidth, scrollWidth:document.documentElement.scrollWidth, pageHeight:document.documentElement.scrollHeight,
      headings:[...document.querySelectorAll('h1,h2')].map(e=>e.textContent),
      forms:document.querySelectorAll('form').length,
      ctas:[...document.querySelectorAll('a')].filter(e=>e.href.includes('start-trial')).map(e=>({text:e.textContent,href:e.href})),
      brokenImages:[...document.images].filter(e=>e.loading!=='lazy'&&!e.naturalWidth).map(e=>e.src)
    }));
    await page.locator('#pricing').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(__dirname,`${lang}-${width}-pricing.png`)});
    const pricing=await page.locator('#pricing').innerText();
    await page.locator('#faq button').first().click();
    const faq=await page.locator('#faq button').first().getAttribute('aria-expanded');
    await page.locator('#gallery button').nth(1).click();
    const gallery=await page.locator('#gallery button').nth(1).getAttribute('aria-pressed');
    let menu;
    if(width<1280){
      const toggle=page.locator('button[aria-controls="mobile-navigation"]');
      await toggle.click(); await page.keyboard.press('Escape');
      menu={escapeCloses:await toggle.getAttribute('aria-expanded')==='false'};
      await page.screenshot({path:path.join(__dirname,`${lang}-${width}-menu.png`)});
      await toggle.click();
    }
    await page.goto('http://127.0.0.1:3100/'+(lang==='en'?'en':''));
    await page.keyboard.press('Tab');
    const firstFocus=await page.evaluate(()=>({tag:document.activeElement.tagName,text:document.activeElement.textContent,outline:getComputedStyle(document.activeElement).outline}));
    results.push({lang,...base,pricing,faq,gallery,menu,firstFocus,errors});
    await page.close();
  }
  fs.writeFileSync(path.join(__dirname,'observations.json'),JSON.stringify(results,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
