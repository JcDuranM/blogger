const CACHE_NAME = "panel-reparacion-v1";
const urlsToCache = [
  "https://panel.jcduranm.com/",
  "https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/Panel%20Reparaci%C3%B3n/manifest.json",
  "https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/Panel%20Reparaci%C3%B3n/icon-192.png",
  "https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/Panel%20Reparaci%C3%B3n/icon-512.png"
];

// Instalar SW
self.addEventListener("install", event => {
  self.skipWaiting(); // activa inmediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activar SW y limpiar cachés antiguos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // toma el control de las páginas abiertas
});

// Interceptar peticiones
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return new Response("⚠️ Estás sin conexión.", {
          headers: { "Content-Type": "text/plain" }
        });
      });
    })
  );
});
