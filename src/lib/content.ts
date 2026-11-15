import 'server-only';
import {createClient} from '@sanity/client';
import {journeys,destinations,experiences,stays,articles,type Journey,type Destination,type Story} from './data';
const projectId=process.env.SANITY_PROJECT_ID;
const client=projectId?createClient({projectId,dataset:process.env.SANITY_DATASET||'production',apiVersion:'2025-01-01',useCdn:true}):null;
async function content<T>(type:string,fallback:T[]):Promise<T[]>{
 if(!client)return fallback;
 try{const records=await client.fetch<T[]>(`*[_type == $type && defined(slug.current)] | order(title asc) {..., "slug":slug.current, "image":coalesce(imageUrl,image.asset->url)}`,{type});return records.length?records:fallback;}catch(error){console.error('CMS unavailable, using demo content',error);return fallback;}
}
export const getJourneys=()=>content<Journey>('journey',journeys);
export const getDestinations=()=>content<Destination>('destination',destinations);
export const getExperiences=()=>content<Story>('experience',experiences);
export const getStays=()=>content<Story>('stay',stays);
export const getArticles=()=>content<Story>('article',articles);
