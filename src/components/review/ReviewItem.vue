<template>
    <div class="p-3">
        <p class="text-secondary">{{ review.nickName }} | {{ createdAt }}</p>
        <div v-if="editMode">
            <textarea class="form-control mb-2" rows="3" v-model="review.content"></textarea> 
        </div>
        <div v-else>
            <p class="h5">{{ review.content }}</p> 
        </div>
        <div class="d-flex justify-content-end" v-if="canEdit">
            <div v-if="editMode">
                <button class="btn btn-outline-primary me-2" @click="updateReview">수정</button>
            </div>
            <div v-else>
                <button class="btn btn-outline-primary me-2" @click="changeEditMod">수정</button>
                <button class="btn btn-outline-danger" @click="removeReview">삭제</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSsafitStore } from '../../stores/ssafit';

const ssafitStore = useSsafitStore()
const review = ref("")
const canEdit = ref(false)
const editMode = ref(false)
const createdAt = ref("")

const props = defineProps({
    review: Object
})

const removeReview = function () {
    ssafitStore.removeReview(props.review.idx)
}

const updateReview = function () {
    ssafitStore.updateReview(props.review.idx, review.value.content)
    editMode.value = !editMode.value
}

const changeEditMod = () => {
    editMode.value = !editMode.value
}

onMounted(() => {
    review.value = props.review
    createdAt.value = `${props.review.createdAt[0]}.${props.review.createdAt[1]}.${props.review.createdAt[2]}`

    if (ssafitStore.loginUser.idx === props.review.userIdx) {
        canEdit.value = true
    }
})
</script>

<style  scoped>
</style>