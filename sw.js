const CACHE_NAME = 'panel-jcduranm-v1';
const urlsToCache = [
  '/',
  'https://panel.jcduranm.com/',
  'https://fonts.googleapis.com/css?family=Roboto'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
