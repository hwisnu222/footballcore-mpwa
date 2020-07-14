// import library workbox
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);
// check workbox load
if (workbox) {
  console.log("workbox berhasil dimuat");
} else {
  console.log("workbox gagal dimuat");
}
// precaching app shell
workbox.precaching.precacheAndRoute(
  [
    { url: "/index.html", revision: "2" },
    { url: "/detailScheduled.html", revision: "2" },
    { url: "/manifest.json", revision: "2" },
    { url: "/registerServiceWorker.js", revision: "2" },
    { url: "/service-worker.js", revision: "2" },
    { url: "/pages/about.html", revision: "2" },
    { url: "/pages/home.html", revision: "2" },
    { url: "/pages/jadwalPertandingan.html", revision: "2" },
    { url: "/pages/saved.html", revision: "2" },
    { url: "/css/materialize.min.css", revision: "2" },
    { url: "/css/style.css", revision: "2" },
    { url: "/js/api.js", revision: "2" },
    { url: "/js/db.js", revision: "2" },
    { url: "/js/idb.js", revision: "2" },
    { url: "/js/materialize.min.js", revision: "2" },
    { url: "/js/navbar.js", revision: "2" },
    { url: "/images/icon/icon192x192.png", revision: "2" },
    { url: "/images/icon/icon512x512.png", revision: "2" },
    { url: "/images/banner.svg", revision: "2" },
    { url: "/components/navbar.html", revision: "2" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

// Caching stale while revalidate untuk pages
workbox.routing.registerRoute(
  new RegExp("/pages/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "football-pages",
  })
);

// Caching stale while revalidate untuk images
workbox.routing.registerRoute(
  new RegExp("/images/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "football-images",
  })
);

// Caching stale while revalidate untuk css
workbox.routing.registerRoute(
  new RegExp("/css/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "football-stylesheet",
  })
);

// caching CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

//caching untuk pages API
workbox.routing.registerRoute(
  /^https:\/\/cors-site\.herokuapp\.com\/https:\/\/api\.football-data\.org\/v2\/teams\/65\/matches/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "link-football-API",
  })
);

// fungsi untuk push notification
self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
