<script setup>
import FeedCommentCard from './FeedCommentCard.vue';
import { reactive } from 'vue';
import { postComment, getCommentList, deleteComment } from '@/services/feedCommentService';

const props = defineProps({
    commentList: Array
});

const state = reactive({
    comment: '',
    commentList: props.commentList
});

//댓글 등록
const postComment = async () => {
    if(state.comment.trim().length === 0) {
        alert('댓글 내용을 작성해 주세요.')
        return;
    }

    const data = {
        feedId: 0,
        comment: state.comment
    }

    const res = await postComment(data);
    if(res.status === 200) {
        const result = res.data.result;
    }
}

//댓글 삭제
const deleteComment = (feedCommentId, idx) => {

}
</script>

<template>
<div>
    <div class="overflow-y-auto max-height-240">
        <feed-comment-card v-for="(item, idx) in state.commentList" :key="item.feedCommentId" :item="item" />
    </div>
    <div class="p-2 d-flex flex-row div-top">
        <input type="text" name="commentValue" class="flex-grow-1 my_input back_color" placeholder="댓글을 입력하세요..." 
                v-model="state.comment" @keyup.enter="postComment" />
        <button class="btn btn-outline-primary" @click="postComment">등록</button>
    </div>
</div>
</template>

<style scoped>

</style>