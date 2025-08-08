<script setup>
import ProfileImg from './ProfileImg.vue';
const props = defineProps({
    item: Object
});
</script>

<template>
<div class="cmtItemCont">
    <div class="cmtItemProfile">
        <profile-img clsValue="profile pointer" :size="24" pic={props.writerPic} userId={props.writerId} />
        {
            userInfo.userId === props.writerUserId &&
            <i class="fa fa-trash pointer" onClick={delComment}></i>
        }
    </div>
    <div class="cmtItemCtnt">
        <div class="pointer">{props.writerNm}</div>
        <div>{props.comment}</div>
    </div>
</div>
</template>

<style scoped>

</style>