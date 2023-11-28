importScripts("https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging-compat.js"
);
importScripts("../config/apikey.js")

self.addEventListener('notificationclick', function (event) {
  console.log('백그라운드 알림 클릭', event)
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

firebase.initializeApp({
  apiKey: FIREBASE_KEY.API_KEY,
  authDomain: FIREBASE_KEY.AUTH_DOMAIN,
  projectId: FIREBASE_KEY.PROJECT_ID,
  storageBucket: FIREBASE_KEY.STORAGE_BUCKET,
  messagingSenderId: FIREBASE_KEY.MESSAGING_SENDER_ID,
  appId: FIREBASE_KEY.APP_ID,
  measurementId: FIREBASE_KEY.MEASUREMENT_ID
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Message background received. ", payload);
  if (Notification.permission === "granted") {
    const arr = payload.data.link.split('/')

    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: "favicon.ico",
      actions: [{
        title: "지금 운동하러 가기",
        action: 'newTab',
      }],
      data: "https://ssafit-9c18a.web.app/video/" + arr[arr.length - 1]
    };

    self.registration.showNotification(
      notificationTitle, notificationOptions
    )
  }
});