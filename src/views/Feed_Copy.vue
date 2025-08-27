<script setup>
import loadingImg from '@/assets/loading.gif';
import { reactive, onMounted, onUnmounted } from 'vue';
import { useFeedStore } from '@/stores/feed';
import FeedCard from '@/components/FeedCard.vue';
import { getFeedList } from '@/services/feedService';
import { bindEvent } from '@/utils/commonUtils';

const feedStore = useFeedStore();

const state = reactive({    
    isLoading: false,
    isFinish: false    
});

const handleScroll = () => { bindEvent(state, window, getData) };

onMounted(() => {
    feedStore.setPage(1);
    feedStore.setProfileUserId(0);
    window.addEventListener('scroll', handleScroll);
    getData();
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    feedStore.clearList();
});


const getData = async () => {
    state.isLoading = true;
    const params = {
        page: data.page++,
        row_per_page: data.rowPerPage
    }
    const res = await getFeedList(params);
    if(res.status === 200) {
        const result = res.data.result;
        if(result && result.length > 0) {
            feedStore.addFeedList(result);            
        }
        if(result.length < data.rowPerPage) {
            state.isFinish = true
        }        
    }
    state.isLoading = false;
}

</script>

<template>
    <section class="back_color">
        <div class="container d-flex flex-column align-items-center">
            <feed-card v-for="item in feedStore.feedList" :key="item.feedId" :item="item"></feed-card>
            <div v-if="state.isLoading" class="loading display-none"><img :src="loadingImg"/></div>
        </div>
    </section>    
</template>

<style scoped>
.back_color { background-color: #fafafa; }
</style>