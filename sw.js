const C='tet2a-v4';const F=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put('./index.html',cp));return res;}return caches.match('./index.html').then(x=>x||res);}).catch(()=>caches.match('./index.html').then(x=>x||caches.match('./'))));return;}
 e.respondWith(caches.match(r).then(x=>x||fetch(r).then(res=>{if(res.ok&&r.url.startsWith(self.location.origin)){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;}).catch(()=>new Response('',{status:504}))));});
