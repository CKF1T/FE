<template>
  <div class="container">
    <TheHeaderNav></TheHeaderNav>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import TheHeaderNav from './common/TheHeaderNav.vue';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useSsafitStore } from './stores/ssafit';

const ssafitStore = useSsafitStore()

navigator.serviceWorker
  .register("sw.js")
  .then(function (registration) {
    console.log("Service worker successfully registered.");
    return registration;
  })
  .catch(function (err) {
    console.error("Unable to register service worker.", err);
  });

const API_KEY = import.meta.env.VITE_FCM_API_KEY
const AUTH_DOMAIN = import.meta.env.VITE_FCM_AUTH_DOMAIN
const PROJECT_ID = import.meta.env.VITE_FCM_PROJECT_ID
const STORAGE_BUCKET = import.meta.env.VITE_FCM_STORAGE_BUCKET
const MESSAGING_SENDER_ID = import.meta.env.VITE_FCM_MESSAGING_SENDER_ID
const APP_ID = import.meta.env.VITE_FCM_APP_ID
const MEASUREMENT_ID = import.meta.env.VITE_FCM_MEASUREMENT_ID
const WEB_PUSH_KEY = import.meta.env.VITE_FCM_WEB_PUSH_KEY

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

//#1. 파이어베이스 접속
const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);

//#2. 알림 권한 요청
const permission = Notification.permission

if (permission !== 'granted') {
  Notification.requestPermission()
    .then((permission) => {
      console.log("permission :", permission)
    })
}

getToken(messaging, {
  vapidKey: WEB_PUSH_KEY,
})
  .then((token) => {
    console.log('해당 브라우저에서의 토큰 : ' + token);
    ssafitStore.fcmToken = token
  })
  .catch((err) => {
    console.log("토큰 가져오는 중 에러 발생 : ", err);
  });

//#3. 파이어베이스 메시징 기능 사용 적용
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  const arr = payload.data.link.split('/')

  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration
          .showNotification(ssafitStore.loginUser.nickName + "님! " + payload.data.title, {
            body: payload.data.body,
            icon: "/favicon.ico",
            actions: [{
              title: "지금 운동하러 가기",
              action: 'newTab',
            }],
            data: "https://ssafit-9c18a.web.app/video/" + arr[arr.length - 1]
          })
          .finally((arg) => console.log(arg));
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//#4. 브라우저 백그라운드 진입시 사용할 파일 적용
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("ServiceWorker registration successful with scope: ");
    })
    .catch(function (err) {
      console.log("serviceWorker 등록 에러 : " + err)
    });
}
</script>

<style scoped></style>