// var cacheName = 'hello-pwa';
// var filesToCache = [
//   '/',
//   '/css/style.css',
//   '/js/main.js'
// ];

/* Start the service worker and cache all of the app's content */
// self.addEventListener('install', function(e) {
//   e.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       return cache.addAll(filesToCache);
//     })
//   );
//   self.skipWaiting();
// });

// /* Serve cached content when offline */
// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });
self.addEventListener('install', function(event) {
  console.info('Event: Install');
  event.waitUntil(
    caches.open("static-cache")
    .then((cache) => {
      return cache.addAll([
        "./"
      ])
      .then(() => {
        console.info('All files are cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache', error);
      })
    })
  );
});

/* Serve cached content when offline */
// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });
self.addEventListener('fetch', (event) => {
  console.info('Event: Fetch');

  var request = event.request;

  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(request).then((response) => {
        var responseToCache = response.clone();
        caches.open("static-cache").then((cache) => {
          cache.put(request, responsibleToCache).catch((err) => {
            console.warn(request.url + ': ' + err.message);
          });
        });

        return response;
      })
    })
  )
})

self.addEventListener('activate', (event) => {
  console.info('Event: Activate');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== "static-cache") {
            return caches.delete(cache);
          }
        })
      )
    })
  )
})