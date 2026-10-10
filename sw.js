const CACHE='loop-v44';
const ASSETS=['./','index.html','amina.html','richard.html','learn-vietnamese.html','privacy.html','styles.css?v=38','supabase-config.js?v=34','frequency-data.js?v=34','sentence-data.js?v=34','context-data.js?v=34','english-russian-data.js?v=36','russian-dutch-data.js?v=1','app.js?v=42','i18n.js?v=36','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));

