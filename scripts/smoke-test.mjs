// Optional browser smoke test. Run with a server running on TEST_URL (default 3100).
// Install Playwright separately with `npm install -D playwright` and `npx playwright install chromium`.
import {createRequire} from 'node:module';
const {chromium}=createRequire(import.meta.url)('playwright');
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:3100';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}});const pageErrors=[];page.on('pageerror',e=>pageErrors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});assert.match(await page.title(),/Ceylon Journal/);assert.equal(await page.locator('h1').count(),1);
 await page.locator('img').first().evaluate(img=>img.decode());
 if(process.env.SCREENSHOT_DIR)await page.screenshot({path:`${process.env.SCREENSHOT_DIR}/home.png`});
 await page.getByRole('button',{name:'Ella',exact:true}).click();assert.equal(await page.locator('.map-info h3').textContent(),'Ella');
 await page.goto(base+'/journeys');await page.getByRole('button',{name:'Wildlife',exact:true}).click();assert.equal(await page.locator('.journey-card').count(),1);
 await page.locator('.journey-card').first().click();await page.waitForURL('**/journeys/wild-ceylon');await page.getByRole('button',{name:/Day 4–6/}).click();assert.match(await page.getByRole('button',{name:/Day 4–6/}).getAttribute('aria-expanded'),/true/);
 await page.locator('.inquiry-sidebar a').click();await page.waitForURL('**/plan-your-journey?journey=wild-ceylon');
 await page.getByRole('button',{name:'Continue'}).click();await page.getByRole('button',{name:'Wildlife',exact:true}).click();await page.getByRole('button',{name:'Continue'}).click();await page.getByRole('button',{name:'Continue'}).click();
 await page.getByLabel('Full name').fill('Demo Tester');await page.getByLabel('Email address').fill('tester@example.com');await page.getByLabel('Country (optional)').fill('Australia');await page.getByRole('checkbox').check();await page.getByRole('button',{name:'Submit sample inquiry'}).click();await page.getByText('Your sample inquiry has been saved.').waitFor();
 assert.match(await page.locator('.reference').textContent(),/Reference: [0-9a-f-]{36}/);
 const invalid=await page.request.post(base+'/api/inquiries',{data:{name:'Invalid'}});assert.equal(invalid.status(),400);
 const dashboard=await page.request.get(base+'/admin');assert.ok([401,503].includes(dashboard.status()));
 if(process.env.TEST_ADMIN_PASSWORD){const admin=await page.request.get(base+'/admin',{headers:{authorization:'Basic '+Buffer.from('staff:'+process.env.TEST_ADMIN_PASSWORD).toString('base64')}});assert.equal(admin.status(),200);assert.match(await admin.text(),/Demo Tester/);}
 await page.setViewportSize({width:390,height:844});await page.goto(base,{waitUntil:'networkidle'});await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Journeys',exact:true}).click();await page.waitForURL('**/journeys');assert.equal(await page.locator('body').evaluate(e=>e.scrollWidth<=window.innerWidth),true);
 await page.goto(base,{waitUntil:'networkidle'});if(process.env.SCREENSHOT_DIR)await page.screenshot({path:`${process.env.SCREENSHOT_DIR}/mobile.png`});assert.equal(await page.locator('body').evaluate(e=>e.scrollWidth<=window.innerWidth),true);
 assert.deepEqual(pageErrors,[]);console.log('PASS: homepage, image, map, filters, tour, accordion, inquiry, API validation, admin protection, mobile navigation.');
} finally{await browser.close()}
