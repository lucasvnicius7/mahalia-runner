const CACHE_NAME = 'mahalia-jogo-v2'; // Mudei para v2 para forçar o navegador a esquecer as .jpg e baixar as .png

// Lista de arquivos que o celular deve salvar para jogar offline
const assetsToCache = [
    './',
    './index.html',
    './manifest.json',
    './mahalia.png',
    './mango.png',
    './benny.png',
    './daphy.png',
    './lucas.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Arquivos salvos para modo offline!');
                return cache.addAll(assetsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna o arquivo salvo offline, ou tenta baixar da internet se não tiver
                return response || fetch(event.request);
            })
    );
});