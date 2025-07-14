const CACHE_NAME = "cookbook-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/styles/main.css",
  "/js/scripts/main.js",
  "/manifest.json",
  "/styles/assets/web-app-manifest-192x192.png",
  "/styles/assets/web-app-manifest-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
});
