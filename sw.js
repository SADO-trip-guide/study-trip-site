// Cache version identifier
const CACHE_NAME = 'study-trip-v1.2.1';

// List of all static assets to pre-cache for offline access
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './manifest.json',
  './pages/jionji-detail.html',
  './pages/jionji-terrace-detail.html',
  './pages/kumano-detail.html',
  './pages/zoshunkaku-detail.html',
  './pages/hoppou-detail.html',
  './pages/gokoku-detail.html',
  './images/慈恩寺.jpeg',
  './images/慈恩寺テラス.jpg',
  './images/慈恩寺テラス内観.jpeg',
  './images/七日町ワシントンホテル.jpeg',
  './images/熊野大社.jpeg',
  './images/蔵春閣.jpeg',
  './images/村上館.jpeg',
  './images/北方博物館外観.jpeg',
  './images/北方博物館内観.jpeg',
  './images/護国神社1.jpeg',
  './images/護国神社2.jpg',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Service Worker Installation: Cache all essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching all offline assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Service Worker Activation: Clean up old caches if version updates
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Interception: Serve cached response first, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Dynamically cache any newly fetched valid response
        if (event.request.method === 'GET' && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      // Fallback response when completely offline and resource is not in cache
      return caches.match('./index.html');
    })
  );
});