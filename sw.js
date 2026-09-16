const CACHE='loop-v21';
const ASSETS=['./','index.html','learn-vietnamese.html','privacy.html','styles.css?v=21','supabase-config.js?v=21','frequency-data.js?v=21','sentence-data.js?v=21','context-data.js?v=21','app.js?v=21','i18n.js?v=21','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));

