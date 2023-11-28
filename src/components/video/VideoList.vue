<template>
    <div>
        <div class="row g-3 d-flex justify-content-end mb-3">
            <div class="dropdown col-auto">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ keyName }}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" @click="title">제목</a></li>
                    <li><a class="dropdown-item" @click="part">운동부위</a></li>
                </ul>
            </div>
            <div class="col-auto">
                <input v-if="keyName === '제목'" class="form-control" type="text" v-model="inputString"
                    placeholder="검색어를 입력하세요" @keyup.enter="search" />
                <div class="dropdown" v-else>
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {{ partName }}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" @click="partAll">전체</a></li>
                        <li><a class="dropdown-item" @click="partUpper">상체</a></li>
                        <li><a class="dropdown-item" @click="partLower">하체</a></li>
                        <li><a class="dropdown-item" @click="partAbdomen">복부</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-auto">
                <button v-if="keyName === '제목'" class="btn btn-primary" @click="search">검색</button>
            </div>
        </div>
        <table class="table text-center align-middle">
            <thead>
                <tr class="table-primary nowrap">
                    <th class="w-25 p-3">제목</th>
                    <th class="p-3">영상</th>
                    <th class="p-3">채널명</th>
                    <th class="p-3">운동 부위</th>
                    <th class="p-3">조회수</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="video in ssafitStore.videoList" :key="video.id">
                    <td class="p-3">
                        <RouterLink class="link-offset-2 link-underline link-underline-opacity-0"
                            :to="`/video/${video.idx}`">{{ video.title }}</RouterLink>
                    </td>
                    <td class="iframeContainer iframe16To9">
                        <iframe :src="`${video.url}`" :title="`${video.title}`" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </td>
                    <td class="p-3">{{ video.channelName }}</td>
                    <td class="p-3">{{ video.part }}</td>
                    <td class="p-3">{{ video.viewCnt }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script setup>
import { useSsafitStore } from '@/stores/ssafit';
import { ref, onMounted } from 'vue';

const ssafitStore = useSsafitStore();
const keyName = ref("제목")
const key = ref("title")
const inputString = ref("")
const partName = ref("전체")
const partValue = ref("")

const search = function () {
    if (keyName.value === "제목") {
        ssafitStore.getVideoList(key.value, inputString.value)
    } else {
        ssafitStore.getVideoList(key.value, partValue.value)
    }
}

const title = () => {
    keyName.value = "제목"
    key.value = "title"
}

const part = () => {
    keyName.value = "운동 부위"
    key.value = "part"
}

const partAll = () => {
    partName.value = "전체"
    partValue.value = ""
    search()
}

const partUpper = () => {
    partName.value = "상체"
    partValue.value = "상체"
    search()
}

const partLower = () => {
    partName.value = "하체"
    partValue.value = "하체"
    search()
}

const partAbdomen = () => {
    partName.value = "복부"
    partValue.value = "복부"
    search()
}

onMounted(() => {
    ssafitStore.getVideoList(key.value, inputString.value)
})

</script>
  
<style scoped>
.iframeContainer {
    position: relative;
    width: 100%;
}

.iframe16To9 {
    padding-top: 35%;
}

.iframeContainer iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 20px;
}

.nowrap {
    white-space: nowrap;
}
</style>