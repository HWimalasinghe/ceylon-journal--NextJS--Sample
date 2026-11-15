// Requires a running Next.js server. This script uses fictional data only.
import assert from 'node:assert/strict';
const base=process.env.TEST_URL||'http://127.0.0.1:3100';
const paths=['/','/journeys','/journeys/wild-ceylon','/destinations','/destinations/ella','/experiences','/experiences/into-the-wild','/stays','/stays/coastal-villas','/journal','/journal/first-journey','/about','/contact','/faq','/travel-guide','/privacy','/terms','/plan-your-journey','/sitemap.xml','/robots.txt','/images/hero.webp','/images/tea.webp','/images/coast.webp','/images/wildlife.webp'];
for(const path of paths){const r=await fetch(base+path);assert.equal(r.status,200,path);console.log('PASS',path);}
assert.equal((await fetch(base+'/not-a-page')).status,404);
const request={arrival:'',duration:'11–14 days',travelers:2,interests:['Wildlife'],budget:'Flexible',stay:'Flexible',name:'Demo Tester',email:'tester@example.com',country:'Australia',notes:'Automated test only',journey:'wild-ceylon',consent:true,website:''};
const post=data=>fetch(base+'/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify(data)});
assert.equal((await post({name:'Invalid'})).status,400);
const valid=await post(request);assert.equal(valid.status,201);const body=await valid.json();assert.match(body.id,/^[0-9a-f-]{36}$/);console.log('PASS inquiry validation and submission');
const unauthorized=await fetch(base+'/admin');assert.ok([401,503].includes(unauthorized.status));
if(process.env.TEST_ADMIN_PASSWORD){const authorized=await fetch(base+'/admin',{headers:{Authorization:'Basic '+Buffer.from('staff:'+process.env.TEST_ADMIN_PASSWORD).toString('base64')}});assert.equal(authorized.status,200);assert.match(await authorized.text(),/Demo Tester/);console.log('PASS protected admin and persistence');}
console.log('All HTTP smoke checks passed.');
