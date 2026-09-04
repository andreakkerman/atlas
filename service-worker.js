const CACHE_NAME = "svenadventure-static-v128";
const CORE_ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "src/styles.css",
  "src/session-report.js",
  "src/ambient-system.js",
  "src/asset-readiness.js",
  "src/scene-effects.js",
  "src/webgpu-capabilities.js",
  "src/voxel-renderer.js",
  "src/character-appearance.js",
  "src/emissive-glow.js",
  "src/cinematic-settings.js",
  "src/cinematic-shaders.js",
  "src/cinematic-renderer.js",
  "src/cinematic-editor.js",
  "src/atlas-world.js",
  "src/locomotion.js",
  "src/app.js",
  "src/audio-config.js",
  "Levels/manifest.js",
  "Levels/world-config.js",
  "assets/characters/manifest.js",
  "assets/characters/sven/idle/frame_001.png",
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
  "assets/audio/music/egypt_adventure.mp3",
  "assets/audio/ambience/leonardo/rome.mp3",
  "assets/audio/ambience/leonardo/proceno.mp3",
  "assets/audio/ambience/leonardo/umbria.mp3",
  "assets/audio/ambience/leonardo/marche.mp3",
  "assets/audio/ambience/leonardo/florence.mp3",
  "assets/audio/ambience/leonardo/vinci.mp3",
  "Levels/LVL-0001/assets/level-1-wide-world.png",
  "Levels/LVL-0004/assets/nautilus-harbor.png",
  "Levels/LVL-0021/assets/rome.png",
  "Levels/LVL-0021/assets/leonardo-da-vinci.png",
  "Levels/LVL-0027/level.js",
  "Levels/LVL-0027/assets/cairo_museum.png",
  "Levels/LVL-0027/assets/nebu.png"
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
  const requestUrl = new URL(event.request.url);
  const referrerUrl = event.request.referrer ? new URL(event.request.referrer) : null;
  if (requestUrl.searchParams.get("dev") === "editor" || referrerUrl?.searchParams.get("dev") === "editor") return;
  if (event.request.url.includes("/__dev/")) return;

  const url = new URL(event.request.url);
  const refreshable = /\/Levels\/[^/]+\/level\.js$/.test(url.pathname) ||
    /\/Levels\/world-config\.js$/.test(url.pathname) ||
    /\/assets\/characters\/manifest\.js$/.test(url.pathname) ||
    /\/assets\/characters\/[^/]+\/(?:portrait\.png|idle(?:_animation_[1-9]\d*|_to_pass)?\/)/.test(url.pathname) ||
    /\/assets\/ambient\//.test(url.pathname) ||
    /\/assets\/guides\/(?:minnie_blink|moose_blink)\.png$/.test(url.pathname);

  if (refreshable) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" }).then((response) => {
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
