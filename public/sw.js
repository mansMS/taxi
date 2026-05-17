const CACHE_NAME = "app-cache-v2";
const ASSET_CACHE = "asset-cache-v2";

const PRECACHE_URLS = ["/", "/offline", "/icons/icon-192x192.png", "/icons/icon-512x512.png"];

function isSameOriginRequest(request) {
  return new URL(request.url).origin === self.location.origin;
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== ASSET_CACHE) {
            return caches.delete(key);
          }
          return null;
        }),
      ),
    ),
  );
  self.clients.claim();
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(request);
  if (!response || response.status !== 200 || response.type !== "basic") {
    return response;
  }

  const cache = await caches.open(ASSET_CACHE);
  cache.put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return caches.match("/offline");
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  if (!isSameOriginRequest(request)) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  const requestUrl = new URL(request.url);
  if (requestUrl.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (
    request.destination === "image" ||
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font"
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(caches.match(request).then((cachedResponse) => cachedResponse || fetch(request)));
});
