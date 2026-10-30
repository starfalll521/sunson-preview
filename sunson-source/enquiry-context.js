/* GitHub Pages project-prefix resolution. */
const __sunsonPreviewRoot=new URL("../",document.currentScript.src);
const __sunsonPreviewURL=value=>new URL(value.replace(/^\/+/,""),__sunsonPreviewRoot).href;
const enquiryContextData={"pages": {"P01": {"name": "Home", "file": __sunsonPreviewURL("narrative-draft/home.html")}, "P02": {"name": "Tailored biosolutions", "file": __sunsonPreviewURL("seo-hub-review/content.html")}, "P03": {"name": "Feed enzymes", "file": "feed.html"}, "P04": {"name": "Food processing enzymes", "file": "food-enzymes--juice-processing.html"}, "P05": {"name": "Enzymes for juice processing", "file": "food-enzymes--juice-processing.html"}, "P06": {"name": "Detergent enzymes", "file": "detergent-enzymes.html"}, "P07": {"name": "Thermostable phytase · PHY10G", "file": "feed-enzymes--thermostable-phytase.html"}, "P08": {"name": "Poultry multi-enzyme · SFQ-081", "file": "feed-enzymes--poultry-multi-enzyme.html"}, "P09": {"name": "Feed protease · SFP-MUL02", "file": "protease.html"}, "P10": {"name": "Enzymes for feed pelleting", "file": "feed-enzymes--feed-pelleting.html"}, "P11": {"name": "Phytase and phosphorus utilization", "file": "feed-enzymes--phosphorus-reduction.html"}, "P12": {"name": "Enzymes for poultry feed", "file": "feed-enzymes--poultry-feed-efficiency.html"}, "P13": {"name": "Pectinase for juice processing · SAD-016", "file": "food-enzymes--juice-processing--pectinase.html"}, "P14": {"name": "Juice clarification", "file": "clarification.html"}, "P15": {"name": "Enzymes and juice yield", "file": "food-enzymes--juice-processing--juice-yield.html"}, "P16": {"name": "Protease for detergent formulations", "file": "detergent-enzymes--protease.html"}, "P17": {"name": "Detergent multi-enzyme blends", "file": "detergent-enzymes--multi-enzyme-blends.html"}, "P18": {"name": "Detergent formulation support", "file": "detergent-enzymes--formulation-support.html"}, "P19": {"name": "Application and business support", "file": "solutions.html"}, "P20": {"name": "Application testing", "file": "solutions--application-testing.html"}, "P21": {"name": "Custom enzyme formulation", "file": "solutions--custom-formulation.html"}, "P22": {"name": "Distributor support", "file": "solutions--distributor-support.html"}, "P23": {"name": "Resources", "file": "resources.html"}, "P24": {"name": "Technical documents", "file": "resources--technical-documents.html"}, "P25": {"name": "Application guides", "file": "resources--application-guides.html"}, "P26": {"name": "About SUNSON", "file": "company.html"}, "P27": {"name": "Manufacturing and quality", "file": "company--manufacturing-quality.html"}, "P28": {"name": "Contact SUNSON", "file": "contact.html"}, "P29": {"name": "Request a sample", "file": "request-sample.html"}, "P30": {"name": "Request a quotation", "file": "request-quote.html"}, "P31": {"name": "Distributor enquiry", "file": "distributor-inquiry.html"}, "P32": {"name": "Privacy policy framework", "file": "privacy.html"}}, "products": {"PHY10G": {"page": "P07", "name": "PHY10G · thermostable phytase"}, "SFQ-081": {"page": "P08", "name": "SFQ-081 · poultry multi-enzyme"}, "SFP-MUL02": {"page": "P09", "name": "SFP-MUL02 · feed protease"}, "SAD-016": {"page": "P13", "name": "SAD-016 · pectinase"}, "20250306Y": {"page": "P16", "name": "Excellzyme Pro G25XLR · 20250306Y"}, "GDG-5041": {"page": "P16", "name": "Excellase Pro 1125 · GDG-5041"}, "GDG-5084": {"page": "P17", "name": "Multi Excellase 218 · GDG-5084"}, "GDG-5085": {"page": "P17", "name": "Multi Excellase 2189 · GDG-5085"}, "GDG-5089": {"page": "P17", "name": "Multi Excellzyme 4283 · GDG-5089"}}};
enquiryContextData.pages.T01={name:"Biosolutions for a better world",file:__sunsonPreviewURL("narrative-draft/enzyme-value.html")};
enquiryContextData.pages.R01={name:"Enzyme research and collaboration",file:"research-collaboration.html"};
enquiryContextData.pages.B00={name:"News",file:"../blog/index.html"};
enquiryContextData.pages.B01={name:"Site certificates and batch COAs",file:"../blog/site-certificates-and-batch-coas/"};
enquiryContextData.pages.B02={name:"Comparing enzyme activity values",file:"../blog/comparing-enzyme-activity-values/"};

// Consolidated content destinations; enquiry behaviour is unchanged.
enquiryContextData.pages.P11.file="feed-enzymes--thermostable-phytase.html#phosphorus-use";
enquiryContextData.pages.P12.file="feed-enzymes--poultry-multi-enzyme.html#poultry-application";
enquiryContextData.pages.P18.file="detergent-enzymes--multi-enzyme-blends.html#formulation-evaluation";
enquiryContextData.pages.P14.file="food-enzymes--juice-processing.html#clarification-use";
enquiryContextData.pages.P20.file="request-sample.html#sample-evaluation";
enquiryContextData.pages.P21.file="detergent-enzymes--multi-enzyme-blends.html#custom-blend";
enquiryContextData.pages.P22.file="distributor-inquiry.html#distribution-support";
enquiryContextData.pages.P23.file="resources--technical-documents.html#public-information";
enquiryContextData.pages.P25.file="request-sample.html#trial-comparison";
enquiryContextData.pages.P19.file=__sunsonPreviewURL("seo-hub-review/content.html#product-directory");
(()=>{
 const form=document.querySelector('main form');if(!form)return;
 form.addEventListener('submit',ev=>ev.preventDefault());
 const params=new URLSearchParams(location.search),source=params.get('from'),record=enquiryContextData.pages[source];if(!record)return;
 const code=params.get('product'),product=enquiryContextData.products[code],edited=params.get('context')==='edited';
 const chosen=!edited&&product&&product.page===source?product:null;
 const palatant=!!(chosen&&source==='P09'&&params.get('use')==='palatant');
 // Recognise only topics already used by the corresponding published-in-preview entry points.
 const topicCode=params.get('topic');
 const topicOptions=new Map([
  ['phosphorus',{pages:['P07'],name:'Phosphorus use in feed',initial:'Application: Phosphorus use in feed'}],
  ['detergent-formulation',{pages:['P16','P17'],name:'Detergent formulation',initial:'Application: Detergent formulation'}],
  ['custom-blend',{pages:['P17'],name:'Custom detergent enzyme blend',initial:'Application: Custom detergent enzyme blend'}],
  ['research',{pages:['R01'],name:'Research collaboration',initial:''}]
 ]);
 const candidate=topicOptions.get(topicCode);
 const topic=!edited&&candidate&&candidate.pages.includes(source)?candidate:null;
 const appPages=new Set(['P03','P05','P06','P10','P11','P12','P14','P15','P18','P20','P21']);
 const application=!edited&&!code&&appPages.has(source);
 const notice=document.createElement('div');notice.className='enquiry-context';
 const heading=document.createElement('p');heading.textContent=chosen?'Product selected: '+chosen.name:'You came from: '+record.name;notice.append(heading);
 const useLine=palatant?document.createElement('p'):null;
 if(useLine){useLine.textContent='Application: pet food palatant production. Processing instructions are separate from feed-diet use.';notice.append(useLine)}
 const topicLine=topic?document.createElement('p'):null;
 if(topicLine){topicLine.textContent='Enquiry topic: '+topic.name;notice.append(topicLine)}
 const helper=document.createElement('p');helper.textContent=source==='R01'?'Introduce your research question with a non-confidential summary. No product model has been selected automatically.':chosen?'The product field is filled below. You can change it or describe a different application.':(application||topic?.initial)?'Your application is filled below. No product model has been selected automatically.':'Choose a product reference or describe your application below. No model has been selected automatically.';notice.append(helper);
 const back=document.createElement('a');back.href=record.file+(palatant?'#palatant-production':'');back.textContent='Return to '+record.name;notice.append(back);form.prepend(notice);
 const label=[...form.querySelectorAll('label')].find(x=>/^(Product or reference|Product, company or site reference|Product or application|Product interests)/i.test(x.textContent.trim()));
 const field=label?.querySelector('input,textarea');
 const initial=chosen?chosen.name+(palatant?' — palatant production':''):(topic?.initial||(application?'Application: '+record.name:''));
 if(field&&initial&&!field.value){field.value=initial;const details=field.closest('details');if(details)details.open=true}
 const sourceField=document.createElement('input');sourceField.type='hidden';sourceField.name='source_page';sourceField.value=source;form.append(sourceField);
 const productField=document.createElement('input');productField.type='hidden';productField.name='source_product';form.append(productField);
 const useField=document.createElement('input');useField.type='hidden';useField.name='source_use';form.append(useField);
 const originalHeading=heading.textContent,originalHelper=helper.textContent;
 const destinations=new Set(['resources--technical-documents.html','request-sample.html','request-quote.html','distributor-inquiry.html','contact.html']);
 function updateLinks(){
  const changed=edited||!!(field&&field.value!==initial),keep=!!chosen&&!changed;productField.value=keep?code:'';useField.value=keep&&palatant?'palatant':'';
  document.querySelectorAll('header a,main a,footer a').forEach(a=>{const u=new URL(a.href,location.href);if(u.origin!==location.origin||!destinations.has(u.pathname.split('/').pop()))return;u.searchParams.delete('source');u.searchParams.set('from',source);if(keep)u.searchParams.set('product',code);else u.searchParams.delete('product');if(keep&&palatant)u.searchParams.set('use','palatant');else u.searchParams.delete('use');if(topic&&!changed)u.searchParams.set('topic',topicCode);else u.searchParams.delete('topic');if(changed)u.searchParams.set('context','edited');else u.searchParams.delete('context');a.href=u.href});
  if(changed){heading.textContent='Original source: '+record.name;helper.textContent='The product or application has changed. Other enquiry links keep the source page without reselecting the original product or application. Enter your revised requirements on the destination form.';}
  else {heading.textContent=originalHeading;helper.textContent=originalHelper;}
  if(topicLine)topicLine.textContent=(changed?'Original enquiry topic: ':'Enquiry topic: ')+topic.name;
  if(useLine)useLine.textContent=(changed?'Original application: ':'Application: ')+'pet food palatant production. Processing instructions are separate from feed-diet use.';
 }
 if(field)field.addEventListener('input',updateLinks);updateLinks();
})();
