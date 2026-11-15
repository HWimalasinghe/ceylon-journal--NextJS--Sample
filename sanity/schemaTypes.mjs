// Copy into your separate Sanity Studio project's schemaTypes folder.
const string=(name,title=name)=>({name,title,type:'string'});
const text=(name,title=name)=>({name,title,type:'text'});
const strings=(name,title=name)=>({name,title,type:'array',of:[{type:'string'}]});
const slug={name:'slug',title:'Slug',type:'slug',options:{source:'title'}};
const image={name:'image',title:'Illustration',type:'image',options:{hotspot:true}};
const base=[string('title','Title'),slug,string('category','Category'),image,text('description','Description')];
const story=(name,title)=>({name,title,type:'document',fields:[...base,strings('body','Article paragraphs')]});
export const schemaTypes=[{name:'journey',title:'Journey',type:'document',fields:[...base,{name:'days',type:'number',title:'Duration (days)'},{name:'price',type:'number',title:'Indicative USD per person'},strings('destinations','Destination slugs'),strings('highlights','Highlights'),{name:'itinerary',type:'array',title:'Itinerary',of:[{type:'object',fields:[string('day'),string('title'),text('description')]}]}]},{name:'destination',title:'Destination',type:'document',fields:[string('name','Name'),{...slug,options:{source:'name'}},string('region','Region'),image,text('description'),{name:'x',type:'number',title:'Illustrative map X (0–100)'},{name:'y',type:'number',title:'Illustrative map Y (0–100)'},strings('highlights'),text('season')]},story('experience','Experience'),story('stay','Stay'),story('article','Article')];
