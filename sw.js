const CACHE_NAME = 'climat-v5-72726cc30c91';
const BASE = '/Climat-PWA/';
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const manifestResponse = await fetch(BASE + 'precache-manifest.json', { cache: 'no-store' });
    if (!manifestResponse.ok) throw new Error('Precache manifest missing');
    const assets = await manifestResponse.json();
    const cache = await caches.open(CACHE_NAME);
      const urls = [...new Set([BASE, BASE + 'index.html', BASE + 'manifest.webmanifest', BASE + 'sw.js', ...assets.map((name) => BASE + name)])];
      await cache.addAll(urls);
    const wasmAssets = assets.filter((name) => name.endsWith('.wasm'));
    if (!wasmAssets.length) throw new Error('WASM asset missing from precache manifest');
    for (const name of wasmAssets) {
      const wasm = await cache.match(BASE + name);
      if (!wasm || !(await isValidWasmResponse(wasm))) throw new Error('Invalid WebAssembly asset in precache: ' + name);
    }
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
    const isNavigation = event.request.mode === 'navigate' || url.pathname === BASE || url.pathname === BASE + 'index.html';
    if (isNavigation) {
      try {
        const fresh = await fetch(event.request, { cache: 'no-store' });
        if (fresh.ok) (await caches.open(CACHE_NAME)).put(BASE + 'index.html', fresh.clone());
        return withIsolationHeaders(fresh);
      } catch {
        const fallback = await caches.match(BASE + 'index.html') || await caches.match(BASE);
        return fallback ? withIsolationHeaders(fallback) : Response.error();
      }
    }
    const cached = await caches.match(event.request);
    if (cached) {
      if (url.pathname.endsWith('.wasm') && !(await isValidWasmResponse(cached.clone()))) return Response.error();
      return withIsolationHeaders(cached);
    }
    try {
      const response = await fetch(event.request);
      if (url.pathname.endsWith('.wasm') && !(await isValidWasmResponse(response.clone()))) return Response.error();
      if (response.ok) (await caches.open(CACHE_NAME)).put(event.request, response.clone());
      return withIsolationHeaders(response);
    } catch {
      // Never return the HTML shell for a missing script, database or WebAssembly asset.
      return Response.error();
    }
  })());
});

async function isValidWasmResponse(response) {
  if (!response.ok || !/^application\/wasm(?:\s*;|$)/i.test(response.headers.get('content-type') || '')) return false;
  const buffer = new Uint8Array(await response.arrayBuffer());
  return buffer.byteLength >= 4 && buffer[0] === 0x00 && buffer[1] === 0x61 && buffer[2] === 0x73 && buffer[3] === 0x6d;
}

function withIsolationHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
