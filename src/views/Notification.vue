<template>
    <div>
      <h1>{{ notificationTitle }}</h1>
      <p>{{ notificationBody }}</p>
      <video :src="notificationVideoUrl" controls></video>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notificationTitle: '',
        notificationBody: '',
        notificationVideoUrl: '',
      };
    },
    mounted() {
      const queryParams = new URLSearchParams(window.location.search);
      this.notificationTitle = queryParams.get('title') || '';
      this.notificationBody = queryParams.get('body') || '';
      this.notificationVideoUrl = queryParams.get('videoUrl') || '';
    },
  };
  </script>
  
  <style>
  </style>
  