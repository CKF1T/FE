<template>
    <div class="card mb-4">
        <div class="card-header">
            <p class="h4 p-2">
                {{ ssafitStore.selectedVideo.title }}
            </p>
        </div>
        <div class="card-body">
            <div class="iframeContainer iframe16To9">
                <iframe :src="`${ssafitStore.selectedVideo.url}`" :title="`${ssafitStore.selectedVideo.title}`" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>
            
    
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center p-3">
            <p class="h6">운동 부위 : {{ ssafitStore.selectedVideo.part }}</p>
            <p class="h6">조회수 : {{ ssafitStore.selectedVideo.viewCnt }}</p>
        </div>
    </div>
    <ReviewList></ReviewList>
    <ReviewForm v-if="ssafitStore.isLogin"></ReviewForm>
    <div class="mb-5"></div>
</template>

<script setup>
import { useSsafitStore } from '@/stores/ssafit';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ReviewForm from '../review/ReviewForm.vue';
import ReviewList from '../review/ReviewList.vue';

const ssafitStore = useSsafitStore()
const route = useRoute()

onMounted(() => {
    ssafitStore.getVideoById(route.params.idx)
    ssafitStore.getReview(route.params.idx)
})
</script>

<style scoped>
.iframeContainer {
  position: relative;
  width: 100%;
}

.iframe16To9 {
  padding-top: 56.25%;
}

.iframeContainer iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

</style>