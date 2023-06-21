var cacheName = "coursework-v1";
var cacheFiles = [
    'index.html',
    'products.js',
    'coursework1.webmanifest',
    'images/biology.jpeg',
    'images/chemistry.png',
    'images/computer.jpg',
    'images/economics.png',
    'images/english.png',
    'images/history.jpg',
    'images/icon-store-512.png',
    'images/literature.png',
    'images/math.png',
    'images/music.png',
    'images/physics.png',
]

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching app shell');
            return cache.addAll(cacheFiles);
        })
    );
});

// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fetching resources', e.request.url);
//             return r
//         })
//     );
    
// });

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            })
        })
    );
    
});