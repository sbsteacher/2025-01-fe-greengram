<script setup>
import ProfileImg from './ProfileImg.vue';
import { useAuthenticationStore } from '@/stores/authentication';

const authenticationStore = useAuthenticationStore();

const props = defineProps({
    item: Object
});
</script>

<template>
<div class="cmtItemCont">
    <div class="cmtItemProfile">
        <profile-img :clsValue="'profile pointer'" :size="24" :pic="props.item.writerPic" :userId="props.item.writerUserId" />        
        <template v-if="authenticationStore.state.signedUser.userId === props.item.writerUserId">
            <i class="fa fa-trash pointer" @click="$emit('onDeleteComment')"></i>
        </template>
        
    </div>
    <div class="cmtItemCtnt">
        <div class="pointer">{{ props.item.writerNickName ? props.item.writerNickName : props.item.writerUid }}</div>
        <div>{{ props.item.comment }}</div>
    </div>
</div>
</template>

<style scoped>

</style>