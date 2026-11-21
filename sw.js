/* Petit Dodo — service worker (DevLabs - A. Giraud)
   Change CACHE à chaque mise à jour publiée : les téléphones afficheront « Nouvelle version disponible ». */
const CACHE = 'petitdodo-v2.0.0';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'firebase-config.js', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
const FB = 'https://www.gstatic.com/firebasejs/';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'skip-waiting') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  // Bibliothèques Firebase (versionnées) : cache d'abord
  if (url.href.startsWith(FB)) {
    e.respondWith(caches.open(CACHE).then(async c => (await c.match(req)) || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; })));
    return;
  }
  // Polices Google : cache d'abord
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(CACHE).then(async c => (await c.match(req)) || fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => new Response('', { status: 504 }))));
    return;
  }
  if (url.origin !== location.origin) return; // Firestore, authentification… : jamais en cache
  // Page et configuration : réseau d'abord (pour les mises à jour), cache si hors connexion
  if (req.mode === 'navigate' || url.pathname.endsWith('firebase-config.js')) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req.mode === 'navigate' ? 'index.html' : req, copy)); return r; })
      .catch(async () => (await caches.match(req.mode === 'navigate' ? 'index.html' : req)) || caches.match('./')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) caches.open(CACHE).then(c => c.put(req, r.clone())); return r; })));
});
