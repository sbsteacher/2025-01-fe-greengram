<script setup>
import loadingImg from '@/assets/loading.gif';
import FeedCard from '@/components/FeedCard.vue';
import { reactive, onMounted, onUnmounted, watch } from 'vue';
import { useFeedStore } from '@/stores/feed';
import { bindEvent } from '@/utils/commonUtils';
import { getFeedList, deleteFeed } from '@/services/feedService';

const feedStore = useFeedStore();

const props = defineProps({
    ynDel: Boolean
});

const state = reactive({
    isLoading: false,
    isFinish: false
});

const handleScroll = () => { bindEvent(state, window, getData) };

onMounted(() => {    
    window.addEventListener('scroll', handleScroll);    
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    feedStore.init();
});

const getData = async () => {
    
    state.isLoading = true;
    const params = {
        page: feedStore.page,
        row_per_page: feedStore.rowPerPage        
    }
    if(feedStore.profileUserId) {
        params.profile_user_id = feedStore.profileUserId
    }
    if(feedStore.keyword) {
        params.keyword = feedStore.keyword
    }
    
    const res = await getFeedList(params);
    if(res.status === 200) {
        feedStore.setPage(feedStore.page + 1);
        const result = res.data.result;
        if(result && result.length > 0) {
            feedStore.addFeedList(result);                        
        }
        if(result.length < feedStore.rowPerPage) {
            state.isFinish = true
        }        
    }
    state.isLoading = false;
}


//피드 삭제
const doDeleteFeed = async (feedId, idx) => {
    if(!confirm('삭제하시겠습니까?')) { return; }

    console.log('feedId:', feedId);
    console.log('idx:', idx);
    
    const params = { 'feed_id': feedId }

    const res = await deleteFeed(params);
    if(res.status === 200) {
        //state.list.splice(idx, 1);
        feedStore.deleteFeedByIdx(idx);
    }
}

watch(() => feedStore.reLoading, newVal => {
    console.log('newVal:', newVal)

    if(newVal === true) {        
        getData();
        feedStore.setReLoading(false);
    }
});

// feedStore.$subscribe((mutation, state) => {
//     console.log('mutation: ', mutation)
//     //if(mutation.reLoading)
// }, { detached: true });
</script>

<template>    
    <feed-card v-for="item in feedStore.feedList" :key="item.feedId" :item="item" :yn-del="props.ynDel" @on-delete-feed="doDeleteFeed(item.feedId, idx)" />
    <div v-if="state.isLoading" class="loading"><img :src="loadingImg"/></div>    
</template>

<style scoped>

</style>