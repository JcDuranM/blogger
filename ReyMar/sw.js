const CACHE_NAME = 'reserva-alberca-v1';
const urlsToCache = [
  '/',
  'https://fonts.googleapis.com/css?family=Segoe+UI',
  'https://albarca-reymar.blogspot.com/' // reemplaza esto con la URL real de tu blog si quieres precargarlo
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
