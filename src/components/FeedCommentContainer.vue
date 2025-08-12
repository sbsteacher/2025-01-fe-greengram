<script setup>
import FeedCommentCard from './FeedCommentCard.vue';
import { reactive } from 'vue';
import { postComment, getCommentList, deleteComment } from '@/services/feedCommentService';
import { useAuthenticationStore } from '@/stores/authentication';

const props = defineProps({
    feedId: Number,
    comments: Object
});

const authenticationStore = useAuthenticationStore();

const state = reactive({
    isLoading: false,
    comment: '',
    moreComment: props.comments?.moreComment,
    commentList: props.comments?.commentList
    // moreComment: true,
    // commentList: [
    //     {         
    //         feedCommentId: 1,
    //         comment: '테스트',
    //         writerUserId: 3,
    //         writerNickName: null,
    //         writerUid: 'mic23',
    //         writerPic: '181c59ba-cd2d-4439-8809-c6982c477136.jpg'
    //     },
    //     {            
    //         feedCommentId: 1,
    //         comment: '테스트2',
    //         writerUserId: 3,
    //         writerNickName: null,
    //         writerUid: 'mic23',
    //         writerPic: '181c59ba-cd2d-4439-8809-c6982c477136.jpg'
    //     }
    // ]
});

//댓글 등록
const onPostComment = async () => {
    if(state.comment.trim().length === 0) {
        alert('댓글 내용을 작성해 주세요.')
        return;
    }

    const data = {
        feedId: props.feedId,
        comment: state.comment
    }

    const res = await postComment(data);
    if(res.status === 200) {
        const result = res.data.result;

        const commentItem = {
            feedCommentId: result,
            writerUserId: authenticationStore.state.signedUser.userId,
            writerNm: authenticationStore.state.signedUser.nickName,
            writerPic: authenticationStore.state.signedUser.pic,
            comment: state.comment
        }

        state.commentList.unshift(commentItem);

        state.comment = '';
    }
}

const getMoreComment = async () => {
    console.log('getMoreComment clicked');
    state.isLoading = true;
    const params = { 
        feed_id: props.feedId,
        start_idx: state.commentList.length
    }
    const res = await getCommentList(params)
    if(res.status === 200) {
        const moreCommentList = res.data.result;
        if(moreCommentList.length > 0) {
            state.commentList = [...state.commentList, ...moreCommentList]
        }
    }
    state.isLoading = false;
}

//댓글 삭제
const onDeleteComment = async (feedCommentId, idx) => {
    console.log('onDeleteComment');
    console.log('feedCoomentId: ', feedCommentId);
    console.log('idx: ', idx);
    
    if(!confirm('댓글을 삭제하시겠습니까?')) { return; }

    const params = { feedCommentId }
    
    const res = await deleteComment(params);
    if(res.status === 200) {    
        state.commentList.splice(idx, 1);
    }
}
</script>

<template>
<div>
    <div class="overflow-y-auto max-height-240">
        <div v-if="state.isLoading">Loading...</div>
        <feed-comment-card v-for="(item, idx) in state.commentList" :key="item.feedCommentId" :item="item" @on-delete-comment="onDeleteComment(item.feedCommentId, idx)"/>
        <div v-if="state.moreComment" class="mt-3 mb-3">
            <span class="pointer" @click="getMoreComment">댓글 더보기</span>
        </div>
    </div>
    <div class="p-2 d-flex flex-row div-top">
        <input type="text" name="commentValue" class="flex-grow-1 my_input back_color" placeholder="댓글을 입력하세요..." 
                v-model="state.comment" @keyup.enter="onPostComment" />
        <button class="btn btn-outline-primary" @click="onPostComment">등록</button>
    </div>
</div>
</template>

<style scoped>

</style>