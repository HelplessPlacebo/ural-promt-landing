const BUILD_ID_URL = '/build-id.txt';
const STATIC_PREFIX = 'static-cache-';
const IMAGE_CACHE = 'image-cache';
const FALLBACK_RESPONSE = new Response('Network error', { status: 504 });

async function fetchBuildId() {
  try {
    const r = await fetch(BUILD_ID_URL, { cache: 'no-store' });
    if (!r.ok) return null;
    return (await r.text()).trim();
  } catch (e) {
    return null;
  }
}

self.addEventListener('install', (evt) => {
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    (async () => {
      const newBuildId = await fetchBuildId();
      const newStaticCache = STATIC_PREFIX + (newBuildId || 'noid');

      const keys = await caches.keys();
      await Promise.all(
        keys.map(async (k) => {
          if (k !== newStaticCache && k !== IMAGE_CACHE) {
            await caches.delete(k);
          }
        })
      );

      const staticCache = await caches.open(newStaticCache);
      await staticCache.put(
        '/.build-meta',
        new Response(newBuildId || '', { headers: { 'Content-Type': 'text/plain' } })
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (evt) => {
  const req = evt.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  if (url.origin !== self.location.origin) return;

  if (
    url.pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|gif)$/) ||
    url.pathname.startsWith('/platforms/')
  ) {
    evt.respondWith(
      (async () => {
        const cache = await caches.open(IMAGE_CACHE);
        const cached = await cache.match(req);
        const network = fetch(req)
          .then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => null);
        return cached || network || FALLBACK_RESPONSE;
      })()
    );
    return;
  }

  if (url.pathname.match(/\.(js|css|woff2|woff|ttf)$/)) {
    evt.respondWith(
      (async () => {
        const buildId = await (async () => {
          const staticKeys = await caches.keys();
          return (
            staticKeys.find((k) => k.startsWith(STATIC_PREFIX))?.slice(STATIC_PREFIX.length) || null
          );
        })();
        const currentCacheName = STATIC_PREFIX + (buildId || 'noid');
        const cache = await caches.open(currentCacheName);
        const cached = await cache.match(req);
        if (cached) return cached;
        try {
          const net = await fetch(req);
          if (net && net.ok) await cache.put(req, net.clone());
          return net;
        } catch {
          return FALLBACK_RESPONSE;
        }
      })()
    );
    return;
  }
  if (req.headers.get('accept')?.includes('text/html')) {
    evt.respondWith(
      (async () => {
        try {
          const net = await fetch(req);
          if (net && net.ok) {
            const staticKeys = await caches.keys();
            const currentCacheName =
              staticKeys.find((k) => k.startsWith(STATIC_PREFIX)) || STATIC_PREFIX + 'noid';
            const cache = await caches.open(currentCacheName);
            await cache.put(req, net.clone());
          }
          return net;
        } catch {
          const staticKeys = await caches.keys();
          const currentCacheName = staticKeys.find((k) => k.startsWith(STATIC_PREFIX)) || null;
          if (!currentCacheName) return new Response('Offline', { status: 503 });
          const cache = await caches.open(currentCacheName);
          const cached = await cache.match(req);
          return cached || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }
});
