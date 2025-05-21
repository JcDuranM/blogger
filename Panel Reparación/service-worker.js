const CACHE_NAME = "panel-reparacion-v1";
const urlsToCache = [
  "https://panel.jcduranm.com/",  // tu página principal
  "https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/Panel%20Reparaci%C3%B3n/manifest.json",
  "https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/Panel%20Reparaci%C3%B3n/icon-192.png",
  "https://cdn.jsdelivr.net/gh/JcDuranM/blogger@main/Panel%20Reparaci%C3%B3n/icon-512.png"
];


// Instalar SW
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activar SW
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
});

// Interceptar peticiones
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
