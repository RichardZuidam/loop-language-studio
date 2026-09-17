const CACHE='loop-v22';
const ASSETS=['./','index.html','learn-vietnamese.html','privacy.html','styles.css?v=22','supabase-config.js?v=22','frequency-data.js?v=22','sentence-data.js?v=22','context-data.js?v=22','app.js?v=22','i18n.js?v=22','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));

