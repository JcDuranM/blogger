// sw.js - Service Worker

const CACHE_NAME = 'panel-reparacion-cache-v1';
const urlsToCache = [
  '/',
  'https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/Panel%20Reparaci%C3%B3n/index.html',
  'https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/Panel%20Reparaci%C3%B3n/manifest.json',
  'https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/Panel%20Reparaci%C3%B3n/icon-192.png',
  'https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/Panel%20Reparaci%C3%B3n/icon-512.png',
  // Agregar cualquier otro archivo relevante, como HTML, CSS o JS adicionales
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Archivos en caché durante la instalación del service worker');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});
