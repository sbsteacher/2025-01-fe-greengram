<script setup>
import Header from './components/Header.vue';
import { ref, reactive } from 'vue';
import { useMessageModalStore } from '@/stores/messageModal'
import { useAuthenticationStore } from '@/stores/authentication';
import { postFeed } from '@/services/feedService';
import { useFeedStore } from '@/stores/feed';


const feedStore = useFeedStore();

const messageModal = useMessageModalStore();

const modalCloseButton = ref(null);

const authenticationStore = useAuthenticationStore();

const state = reactive({
  feed: {
    location: '',
    contents: '',
    pics: [],    
  },
   previewPics: []
});

const handlePicChanged = e => {
    for(let i=0; i<e.target.files.length; i++) {
        const pic = e.target.files[i];
        state.feed.pics.push(pic);
        state.previewPics.push(URL.createObjectURL(pic));
    }    
}

const deletePreviewPic = idx => {
    state.feed.pics.splice(idx, 1);
    state.previewPics.splice(idx, 1);
}


const saveFeed = async () => {
    console.log('state.feed.pics: ', state.feed.pics);
    const MAX_PIC_COUNT = 10;
    //사진 있는지 확인    
    if(state.feed.pics.length === 0) { 
        alert('사진을 선택해 주세요.');
        return;
    } else if(state.feed.pics.length > MAX_PIC_COUNT) {
        alert(`사진은 ${MAX_PIC_COUNT}장까지 선택 가능합니다.`);
        return;
    }

    const params = {
        contents: state.feed.contents.length === 0 ? null : state.feed.contents,
        location: state.feed.location.length === 0 ? null : state.feed.location
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
            writerNickName: authenticationStore.state.signedUser.nickName,
            writerPic: authenticationStore.state.signedUser.pic,
            createdAt: getCurrentTimestamp(),
            comment: {
                moreComment: false,
                commentList: []
            }  
        };

        //state.list.unshift(item);
        feedStore.addFeedUnshift(item)
        initInputs();
        modalCloseButton.value.click(); //모달창 닫기
    }
}

const initInputs = () => {
    state.feed.contents = '';
    state.feed.location = '';
    state.feed.pics = [];
}

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

</script>

<template>  
    <Header />  
    <router-view></router-view>  
    <b-modal v-model="messageModal.state.isShow" ok-only>{{ messageModal.state.message }}</b-modal>
    <div class="modal fade" id="newFeedModal" tabIndex="-1" aria-labelledby="newFeedModalLabel" aria-hidden="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content" id="newFeedModalContent">
                <div class="modal-header">
                    <h5 class="modal-title" id="newFeedModalLabel">새 게시물 만들기</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="modalCloseButton"></button>
                </div>
                <div class="modal-body" id="id-modal-body">                            
                    <div class="mt-3">location: <input type="text" name="location" placeholder="위치" v-model="state.feed.location"/></div>
                    <div class="mt-3">contents: <textarea name="contents" placeholder="내용" v-model="state.feed.contents"></textarea></div>
                    <div class="mt-3"><label>pic: <input name="pics" type="file" multiple accept="image/*" @change="handlePicChanged" /></label></div>                    
                    <div class="d-flex flex-wrap gap-3 mt-3">
                        <div class="preview-container" v-for="(item, idx) in state.previewPics" :key="idx">
                            <img class="preview-img" :src="item"></img>
                            <i class="fa fa-trash pointer preview-img-delete" @click="deletePreviewPic(idx)"></i>
                        </div>
                    </div>                    
                    <div class="mt-3"><button @click="saveFeed">전송</button></div>
                </div>
            </div>
        </div>                
    </div>
</template>

<style>
.preview-container { position: relative; }
.preview-img { width: 150px; height: 150px; object-fit: cover; }
.preview-img-delete { color: red; position:absolute; top: 10px; right: 10px; }
a { text-decoration: none !important; color: black !important; }
.swiper-wrapper { align-items: center; }
</style>
