<script setup>
import { ref, reactive, onMounted } from 'vue';
// import { getFeedList } from '@/services/feedService';
import FeedCard from '@/components/FeedCard.vue';

const state = reactive({
    list: [],
    isLoading: false
});

const data = {
    page: 0,
    itemPerCount: 20,
};

onMounted(() => {
    getData()
})

const getCurrentTimestamp = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    const hours = ('0' + today.getHours()).slice(-2); 
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2); 

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const getData = async () => {
    const params = {
        page: data.page++,
        size: data.itemPerCount
    }
    //state.list = await getFeedList(params);
}
</script>

<template>
    <section class="back_color">
        <div class="container d-flex flex-column align-items-center">
            <feed-card v-for="item in state.list" :key="item.id" :item="item"></feed-card>
            <p v-if="state.isLoading">
                Loading...
            </p>
        </div>
    </section>
</template>

<style scoped>
.back_color { background-color: #fafafa; }
</style>