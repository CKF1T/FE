<template>
    <div class="d-flex justify-content-center">
        <fieldset style="max-width: 400px;" class="w-50">
            <legend>회원가입</legend>
            <div class="form-group">
                <label for="id">아이디</label>
                <input type="text" class="form-control" id="id" v-model="id" @keyup.enter="$refs.pwd.focus()" />
            </div>
            <div>
                <label for="password">비밀번호</label>
                <input ref="pwd" type="password" class="form-control" id="password" v-model="password" />
            </div>
            <div class="d-flex justify-content-between mt-4">
                <button class="btn btn-primary" @click="signup">회원가입</button>
                <button class="btn btn-outline-primary" @click="goLogin">로그인 화면으로</button>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
import { useSsafitStore } from '@/stores/ssafit';
import { ref } from 'vue'

const id = ref("")
const password = ref("")
const ssafitStore = useSsafitStore()

const signup = function () {
    ssafitStore.signup(id.value, password.value)
}

const goLogin = function () {
    ssafitStore.goLogin()
}

</script>

<style scoped>

</style>