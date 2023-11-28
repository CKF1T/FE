<template>
  <div>
    <header>
      <div class="d-flex justify-content-between align-items-center fs-5 pt-3">
        <RouterLink class="h3 text-dark link-offset-2 link-underline link-underline-opacity-0" to="/video">CKFiT</RouterLink>
        <div>
          <div class="btn-group" role="group" v-if="ssafitStore.isLogin">
            <a class="btn btn-outline-danger" @click="logout" style="cursor:pointer;">로그아웃</a>
            <a v-if="ssafitStore.isSubscribe" class="btn btn-warning" @click="unsubscribe" style="cursor:pointer;">
              <img src="/bell-fill.svg" />
              알림
            </a>
            <a v-else class="btn btn-outline-warning" @click="subscribe" style="cursor:pointer;">
              <img src="/bell-slash-fill.svg" />
              알림
            </a>
          </div>
          <div class="btn-group" role="group" v-if="!ssafitStore.isLogin">
            <RouterLink class="btn btn-outline-primary" :to="{ name: 'login' }">로그인</RouterLink>
            <RouterLink class="btn btn-outline-secondary" :to="{ name: 'signup' }">회원가입</RouterLink>
          </div>
        </div>
      </div>
      <hr>
    </header>
  </div>
</template>

<script setup>
import { useSsafitStore } from '@/stores/ssafit';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const ssafitStore = useSsafitStore();
const router = useRouter();

const logout = () => {
  ssafitStore.logout();
};

const subscribe = () => {
  ssafitStore.isSubscribe = true
  ssafitStore.subscribe()
}

const unsubscribe = () => {
  ssafitStore.isSubscribe = false
  ssafitStore.unsubscribe()
}

onMounted(() => {
  if (ssafitStore.isLogin) {
    ssafitStore.checkFCMToken()
  }
})
</script>  

<style scoped>
</style>