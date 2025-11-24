const STATIC_CACHE = 'static-cache-v1';
const IMAGE_CACHE = 'image-cache-v1';
const BUILD_ID_URL = '/build-id.txt';

async function readBuildId() {
  try {
    const r = await fetch(BUILD_ID_URL, { cache: 'no-store' });
    if (!r.ok) return null;
    return await r.text();
  } catch (e) {
    return null;
  }
}

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const newBuildId = await readBuildId();
      const meta = await caches.open(STATIC_CACHE).then((c) => c.match('/.build-meta'));
      let oldBuildId = null;
      if (meta) {
        try {
          oldBuildId = await (await meta.text()).trim();
        } catch {}
      }
      if (oldBuildId !== newBuildId) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
        const c = await caches.open(STATIC_CACHE);
        await c.put(
          '/.build-meta',
          new Response(newBuildId || '', { headers: { 'Content-Type': 'text/plain' } })
        );
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  if (
    url.pathname.startsWith('/platforms/') ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|avif|svg)$/)
  ) {
    e.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cached = await cache.match(e.request);
        const networkFetch = fetch(e.request)
          .then((res) => {
            if (res && res.ok) cache.put(e.request, res.clone());
            return res;
          })
          .catch(() => null);
        return cached || networkFetch || new Response('', { status: 504 });
      })
    );
    return;
  }

  if (url.pathname.match(/\.(js|css|woff2|woff|ttf|mp4)$/)) {
    e.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const r = await cache.match(e.request);
        if (r) return r;
        const net = await fetch(e.request);
        if (net && net.ok) cache.put(e.request, net.clone());
        return net;
      })
    );
    return;
  }

  if (url.pathname === '/' || url.pathname.endsWith('.html')) {
    e.respondWith(
      (async () => {
        try {
          const net = await fetch(e.request);
          if (net && net.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(e.request, net.clone());
          }
          return net;
        } catch {
          const cached = await caches.open(STATIC_CACHE).then((c) => c.match(e.request));
          return cached || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }
});
