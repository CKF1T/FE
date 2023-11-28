<template>
    <div class="card mb-4">
        <div class="card-header">
            <p class="h4 p-2">리뷰 등록</p>
        </div>
        <div class="card-body form-group pb-3">
            <textarea type="text" class="form-control mb-3" id="review-form" rows="3" v-model="content" />
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" @click="addReview">등록</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSsafitStore } from '../../stores/ssafit';
import { ref } from 'vue'

const ssafitStore = useSsafitStore()
const content = ref("")

const addReview = function () {
    ssafitStore.addReview(content.value, ssafitStore.selectedVideo.idx, ssafitStore.loginUser.idx)
    content.value = ""
}

</script>

<style scoped>

</style>