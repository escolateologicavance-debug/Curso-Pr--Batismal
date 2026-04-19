const CACHE_NAME = 'avance-v1';
const assets = [
  'index.html',
  '1.html',
  '2.html',
  '3.html',
  '4.html',
  '5.html',
  '6.html',
  'manifest.json',
  'logo-192.png',
  'logo-512.png',
  '1-img.png',
  '2-img.png',
  '3-img.png',
  '4-img.png',
  '5-img.png',
  '6-img.png',
    'a-felicidade.mp3'
];

self.addEventListener('fetch', event => {
  // Se for áudio, tenta rede primeiro para evitar erro de Range Request do cache
  if (event.request.url.endsWith('.mp3')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
