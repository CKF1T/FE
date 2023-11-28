self.addEventListener("install", function (event) {
  console.log("installed - sw.js");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("activated - sw.js");
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', function (event) {
  console.log('포그라운드 알림 클릭', event)
  const url = event.notification.data
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
})