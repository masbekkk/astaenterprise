const {chromium}=require('D:/Repos/asta-platform/node_modules/playwright');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const results=[];
 for (const [lang,width,height] of [['id',390,844],['en',768,1024],['id',1440,1000]]) {
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
  await page.goto('http://127.0.0.1:3100/'+(lang==='en'?'en/':''));
  await page.waitForTimeout(500);
  await page.keyboard.press('Tab');
  const skip=await page.evaluate(()=>({text:document.activeElement.textContent,visible:getComputedStyle(document.activeElement).clip==='auto'}));
  await page.keyboard.press('Enter');
  const skipTarget=await page.evaluate(()=>document.activeElement.id);
  await page.locator('#pricing').scrollIntoViewIfNeeded();
  const pricing=await page.getByTestId('pricing-status').innerText();
  await page.screenshot({path:path.join(__dirname,`after-${lang}-${width}-pricing.png`)});
  const screenshotLink=await page.locator('#gallery a[href$=".webp"]').first().getAttribute('href');
  const emptyGold=await page.locator('#gold-reference').innerText();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  let menu=null;
  if(width<1280){
   const toggle=page.locator('button[aria-controls="mobile-navigation"]');
   await toggle.click(); await page.keyboard.press('Escape');
   menu={closed:await toggle.getAttribute('aria-expanded')==='false',focus:await toggle.evaluate(e=>document.activeElement===e)};
   await toggle.click();
   const duplicateControls=await page.locator('#mobile-navigation [data-testid="language-switcher"]').evaluate(e=>getComputedStyle(e.parentElement).display!=='none');
   menu.mobileControlsVisible=duplicateControls;
   await page.screenshot({path:path.join(__dirname,`after-${lang}-${width}-menu.png`)});
  }
  results.push({lang,width,skip,skipTarget,pricing,screenshotLink,emptyGold,overflow,menu,errors});
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 await page.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
 await page.goto('http://127.0.0.1:3100/');
 await page.locator('nav a[href="#pricing"]').click();
 await page.waitForTimeout(250);
 await page.getByTestId('language-switcher').first().getByRole('button',{name:'EN',exact:true}).click();
 await page.waitForTimeout(500);
 const anchor=await page.evaluate(()=>({hash:location.hash,y:scrollY,targetY:document.getElementById('pricing').getBoundingClientRect().top}));
 fs.writeFileSync(path.join(__dirname,'after.json'),JSON.stringify({results,anchor},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
