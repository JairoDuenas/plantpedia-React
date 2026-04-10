const CACHE_NAME = "fitopedia-v3";
const ASSETS = ["/", "/index.html", "/leaf.png", "/manifest.json"];

self.addEventListener("install", (event) => {
  console.log("SW: Installing...");
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("SW: Caching assets...");
        return cache.addAll(ASSETS);
      })
      .then(() => {
        console.log("SW: All assets cached successfully");
      })
      .catch((err) => {
        console.error("SW: Cache failed!", err);
      }),
  );
});

self.addEventListener("activate", (event) => {
  console.log("SW: Activated and claiming clients");
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
