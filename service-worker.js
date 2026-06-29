const CACHE_NAME = "svenadventure-static-v11";
const CORE_ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "src/styles.css",
  "src/session-report.js",
  "src/ambient-system.js",
  "src/scene-effects.js",
  "src/app.js",
  "src/audio-config.js",
  "Levels/manifest.js",
  "assets/branding/launch-hero.png",
  "assets/branding/icon-180.png",
  "assets/branding/icon-192.png",
  "assets/branding/icon-512.png",
  "assets/guides/minnie.png",
  "assets/guides/moose.png",
  "assets/audio/guides/cat_purr_minnie1.mp3",
  "assets/audio/guides/cat_purr_minnie2.mp3",
  "assets/audio/guides/cat_purr_moose1.mp3",
  "assets/audio/guides/cat_purr_moose2.mp3",
  "assets/sven-stage.png",
  "assets/audio/music/menu.mp3",
  "assets/audio/music/leonardo-level.mp3",
  "assets/audio/ambience/leonardo/rome.mp3",
  "assets/audio/ambience/leonardo/proceno.mp3",
  "assets/audio/ambience/leonardo/umbria.mp3",
  "assets/audio/ambience/leonardo/marche.mp3",
  "assets/audio/ambience/leonardo/florence.mp3",
  "assets/audio/ambience/leonardo/vinci.mp3",
  "Levels/LVL-0001/assets/level-1-wide-world.png",
  "Levels/LVL-0004/assets/nautilus-harbor.png",
  "Levels/LVL-0021/assets/rome.png",
  "Levels/LVL-0021/assets/leonardo-da-vinci.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).searchParams.get("dev") === "editor") return;
  if (event.request.url.includes("/__dev/")) return;

  const url = new URL(event.request.url);
  const refreshable = /\/Levels\/[^/]+\/level\.js$/.test(url.pathname) ||
    /\/assets\/ambient\//.test(url.pathname) ||
    /\/assets\/guides\/(?:minnie_blink|moose_blink)\.png$/.test(url.pathname);

  if (refreshable) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response.ok && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response.ok || response.type !== "basic") return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
