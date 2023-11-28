import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/util/http-common.js'
import router from '@/router'

export const useSsafitStore = defineStore('ssafit', () => {
  const videoList = ref([])
  const selectedVideo = ref({})
  const loginUser = ref({})
  const isLogin = ref(false)
  const reviewList = ref([])
  const isSubscribe = ref(false)
  const fcmToken = ref("")

  const getVideoList = function (key, inputString) {
    let string = inputString
    if (inputString === null || inputString === 'undefined') {
      string = ''
    }
    const path = "videos/?key=" + key + "&inputString=" + string

    axios
      .get(path)
      .then((resp) => {
        videoList.value = resp.data
        videoList.value = videoList.value.sort((v1, v2) => {
          if (v1.viewCnt > v2.viewCnt) return -1;
          else if (v1.viewCnt < v2.viewCnt) return 1;
          return 0;
        })
      })
      .catch((err) => {
        console.log("getVideoList() 에러 :", err);
      })
  }

  const getVideoById = function (idx) {
    axios
      .get("videos/" + idx)
      .then((resp) => {
        console.log("getVideoById() 성공");
        selectedVideo.value = resp.data
      })
      .catch(() => {
        console.log("getVideoById() 에러");
      })
  }


  const login = function (id, password) {
    const user = {
      nickName: id,
      password: password
    }

    const data = {
      user: user,
      fcmToken: fcmToken.value
    }

    axios
      .post("users/login", data)
      .then((resp) => {
        console.log("login() 성공");
        loginUser.value = resp.data
        isLogin.value = true
        getVideoList("title", "")
        router.push("/video")
      })
      .catch((err) => {
        console.log("login() 에러 :", err);

        if (err.response.status === 400) {
          alert("아이디, 비밀번호는 공백일 수 없습니다")
        } else if (err.response.status === 500) {
          alert("아이디, 비밀번호를 확인해주세요")
        }
      })
  }

  const goSignup = function () {
    router.push({ name: 'signup' })
  }

  const signup = function (id, password) {
    const user = {
      nickName: id,
      password: password
    }

    const data = {
      user: user,
      fcmToken: fcmToken.value
    }

    axios
      .post("users/signup", data)
      .then(() => {
        console.log("signup() 성공");
        router.push({ name: 'login' })
      })
      .catch((err) => {
        console.log("signup() 에러");

        if (err.response.status === 400) {
          alert("아이디, 비밀번호는 공백일 수 없습니다")
        } else if (err.response.status === 400) {
          alert("이미 사용중인 아이디입니다")
        }
      })
  }

  const goLogin = function () {
    router.push({ name: 'login' })
  }

  const logout = function () {
    const data = {
      user: loginUser.value,
      fcmToken: fcmToken.value
    }

    axios
      .post("users/logout", data, {
        headers: {
          loginUser: loginUser.value.token
        }
      })
      .then(() => {
        console.log("logout() 성공");
        loginUser.value = {};
        isLogin.value = false;
        alert("로그아웃되었습니다")
        router.push("/")
      })
      .catch(() => {
        console.log("logout() 에러");
      })
  };

  const addReview = function (content, videoIdx, userIdx) {
    const review = {
      content: content,
      videoIdx: videoIdx,
      userIdx: userIdx,
      nickName: loginUser.value.nickName
    }

    axios
      .post("reviews", review, {
        headers: {
          loginUser: loginUser.value.token
        }
      })
      .then((resp) => {
        console.log("addReview() 성공");
        reviewList.value.push(resp.data);
      })
      .catch(() => {
        console.log("addReview() 에러");
      })
  }

  const removeReview = function (idx) {
    axios
      .delete("reviews/" + idx, {
        headers: {
          loginUser: loginUser.value.token
        }
      })
      .then(() => {
        console.log("removeReview() 성공");
        const index = reviewList.value.findIndex((r) => r.idx === idx)
        if (index !== -1) {
          reviewList.value.splice(index, 1)
        }
      })
      .catch(() => {
        console.log("removeReview() 에러");
      })
  }

  const updateReview = function (idx, content) {
    console.log("idx : " + idx);
    axios
      .post("reviews/" + idx, { content: content }, {
        headers: {
          loginUser: loginUser.value.token
        }
      })
      .then((resp) => {
        console.log("updateReview() 성공 :", resp);
        const index = reviewList.value.findIndex((r) => r.idx === idx)
        if (index !== -1) {
          reviewList.value[index] = resp.data
        }
      })
      .catch(() => {
        console.log("updateReview() 실패");
      })
  }

  const getReview = function (idx) {
    axios
      .get("reviews?videoIdx=" + idx)
      .then((resp) => {
        console.log("getReview() 성공 :", resp);
        reviewList.value = resp.data
      })
      .catch(() => {
        console.log("getReview() 에러");
      })
  }

  const subscribe = function () {
    const data = {
      user: loginUser.value,
      fcmToken: fcmToken.value
    }

    console.log(data);

    axios
      .post("users/subscribe", data, {
        headers: {
          loginUser: loginUser.value.token
        },
      })
      .then(() => {
        console.log("subscribe() 성공");
      })
      .catch(() => {
        console.log("subscribe() 에러");
      })
  }

  const unsubscribe = function () {
    axios
      .post("users/unsubscribe", null, {
        headers: {
          loginUser: loginUser.value.token
        }
      })
      .then(() => {
        console.log("unsubscribe() 성공");
      })
      .catch(() => {
        console.log("unsubscribe() 에러");
      })
  }

  const checkFCMToken = function () {
    console.log("checkFCMToken : " + fcmToken.value);
    
  }

  return {
    isLogin, reviewList, videoList, loginUser, selectedVideo,
    isSubscribe, fcmToken,
    addReview, getVideoList, getVideoById, removeReview, login,
    goSignup, signup, goLogin, logout, getReview,
    updateReview, subscribe, unsubscribe, checkFCMToken
  }
}, { persist: true })