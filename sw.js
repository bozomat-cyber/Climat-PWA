const CACHE_NAME = 'climat-v5-2a2f9a58a227';
const BASE = '/Climat-PWA/';
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const manifestResponse = await fetch(BASE + 'precache-manifest.json', { cache: 'no-store' });
    if (!manifestResponse.ok) throw new Error('Precache manifest missing');
    const assets = await manifestResponse.json();
    const cache = await caches.open(CACHE_NAME);
      const urls = [...new Set([BASE, BASE + 'index.html', BASE + 'manifest.webmanifest', BASE + 'sw.js', ...assets.map((name) => BASE + name)])];
      await cache.addAll(urls);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith('climat-v5-') && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || event.request.method !== 'GET' || !url.pathname.startsWith(BASE)) return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return withIsolationHeaders(cached);
    try {
      const response = await fetch(event.request);
      if (response.ok) (await caches.open(CACHE_NAME)).put(event.request, response.clone());
      return withIsolationHeaders(response);
    } catch {
      const fallback = await caches.match(BASE + 'index.html');
      return fallback ? withIsolationHeaders(fallback) : Response.error();
    }
  })());
});

function withIsolationHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
