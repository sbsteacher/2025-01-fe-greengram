<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';
import FeedCard from '@/components/FeedCard.vue';
import { getFeedList, postFeed } from '@/services/feedService';


const modalCloseButton = ref(null);

const authenticationStore = useAuthenticationStore();

const state = reactive({
    list: [],
    isLoading: false,
    feed: {
        location: '',
        contents: '',
        pics: []
    }
});

const data = {
    page: 1,
    rowPerPage: 20,
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
        row_per_page: data.rowPerPage
    }
    const res = await getFeedList(params);
    if(res.status === 200) {
        const result = res.data.result;
        if(result && result.length > 0) {
            state.list = [...state.list, ...result];
        }
        
    }
}

const handlePicChanged = e => {
  state.feed.pics = e.target.files;
}

const saveFeed = async () => {
    console.log('state.feed.pics: ', state.feed.pics);
    //사진 있는지 확인    
    if(state.feed.pics.length === 0) { 
        alert('사진을 선택해 주세요.');
        return;
    }

    const params = {
        contents: state.feed.contents,
        location: state.feed.location
    }

    const formData = new FormData();
    formData.append('req', new Blob([JSON.stringify(params)], { type: 'application/json' }));
    for(let i=0; i<state.feed.pics.length; i++) {
        formData.append('pic', state.feed.pics[i])
    }

    const res = await postFeed(formData);
    if(res.status === 200) {
        const result = res.data.result;

        const item = {
            ...params,
            feedId: result.feedId,
            pics: result.pics,
            writerId: authenticationStore.state.signedUser.userId,
            writerNm: authenticationStore.state.signedUser.nickName,
            writerPic: authenticationStore.state.signedUser.pic,
            createdAt: getCurrentTimestamp(),
            comment: {
                moreComment: false,
                commentList: []
            }  
        };

        state.list.unshift(item);

        modalCloseButton.value.click(); //모달창 닫기
    }
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
    <div class="modal fade" id="newFeedModal" tabIndex="-1" aria-labelledby="newFeedModalLabel" aria-hidden="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content" id="newFeedModalContent">
                <div class="modal-header">
                    <h5 class="modal-title" id="newFeedModalLabel">새 게시물 만들기</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="modalCloseButton"></button>
                </div>
                <div class="modal-body" id="id-modal-body">                            
                    <div>location: <input type="text" name="location" placeholder="위치" v-model="state.feed.location"/></div>
                    <div>contents: <textarea name="contents" placeholder="내용" v-model="state.feed.contents"></textarea></div>
                    <div><label>pic: <input name="pics" type="file" multiple accept="image/*" @change="handlePicChanged"/></label></div>
                    <div><button @click="saveFeed">전송</button></div>
                </div>
            </div>
        </div>                
    </div> 
</template>

<style scoped>
.back_color { background-color: #fafafa; }
</style>