const CACHE_NAME = 'avance-v2';

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
  '6-img.png'
  // ⚠️ NÃO colocar mp3 aqui
];

// 📦 INSTALAÇÃO
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// 🔄 ATIVAÇÃO (limpa cache antigo)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 🌐 FETCH
self.addEventListener('fetch', event => {
  const request = event.request;

  // 🔊 ÁUDIO (MP3) → SEM CACHE (evita erro de Range)
  if (request.url.endsWith('.mp3')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response('Erro ao carregar áudio', { status: 404 });
      })
    );
    return;
  }

  // 📄 OUTROS ARQUIVOS → CACHE FIRST
  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request);
    })
  );
});
