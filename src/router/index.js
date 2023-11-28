import { createRouter, createWebHistory } from 'vue-router'
import VideoView from '@/views/VideoView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import LandingPage from '@/views/LandingPage.vue'

import VideoList from '@/components/video/VideoList.vue'
import videoDetail from '@/components/video/videoDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/video',
      name: 'video',
      component: VideoView,
      children: [
        {
          path: "",
          name: "videoList",
          component: VideoList
        },
        {
          path: ":idx",
          name: "videoDetail",
          component: videoDetail
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/',
      name: 'landingpage',
      component: LandingPage, 
    },
  ],
  scrollBehavior () {
    return { top: 0, behavior: 'instant' }
  }
})

export default router
