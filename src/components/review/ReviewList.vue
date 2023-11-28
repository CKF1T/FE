<template>
    <div class="card mb-4">
        <div class="card-header d-flex ">
            <p class="h4 p-2">리뷰 리스트</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="review in reviewList" component-to-re-render :key="review.idx">
                <ReviewItem  :review="review"></ReviewItem>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useSsafitStore } from '@/stores/ssafit';
import ReviewItem from './ReviewItem.vue';

const ssafitStore = useSsafitStore();

const reviewList = computed(() => ssafitStore.reviewList)

</script>
<style scoped></style>
