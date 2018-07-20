var cacheName = 'rbrander.ca';
var filesToCache = [
  '/index.html'
];
self.addEventListener('install', function(e) {
  // [ServiceWorker] Install
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      // [ServiceWorker] Caching app shell
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
