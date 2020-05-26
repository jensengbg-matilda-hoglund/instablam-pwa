import saveSubscription from "./js/push-notifications";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["index.html", "js/index.js", "offline.html"]);
    })
  );
  self.skipWaiting();
  console.log("SW installed at: ", new Date().toLocaleTimeString());
});

self.addEventListener("activate", () => {
  self.skipWaiting();
  console.log("SW activated at: ", new Date().toLocaleTimeString());
});

self.addEventListener("fetch", (event) => {
  console.log(event.request.url);
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        console.log("RESPONSE: ", response);
        if (response) {
          return response;
        } else {
          return caches.match(new Request("offline.html"));
        }
      })
    );
  } else {
    if (event.request.method === "GET") {
      return updateCache(event.request);
    } else {
      saveSubscription();
    }
  }
});

const updateCache = async (request) => {
  return fetch(request).then((response) => {
    return caches.open("v1").then((cache) => {
      return cache.put(request, response.clone()).then(() => {
        return response;
      });
    });
  });
};
