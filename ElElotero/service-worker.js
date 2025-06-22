const CACHE_NAME = 'alberca-reservas-v1';
const urlsToCache = [
  './',
  './index.html', // o el nombre real de tu archivo HTML si aplica
  'https://fonts.googleapis.com/css2?family=Segoe+UI&display=swap',
  'https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/ElElotero/El%20Elotero%20(192%20x%20192%20px).png',
  'https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/ElElotero/El%20Elotero%20(512%20x%20512%20px).png'
];

// Instalar el SW y guardar en cache los archivos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Archivos cacheados');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activar y limpiar caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Borrando cache antiguo:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Interceptar las peticiones y responder con cache si está disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna cache o hace fetch si no está en cache
        return response || fetch(event.request);
      })
      .catch(() => {
        // Fallback si falla todo (ej. sin conexión y recurso no cacheado)
        return new Response('Contenido no disponible sin conexión.', {
          headers: { 'Content-Type': 'text/plain' }
        });
      })
  );
});
