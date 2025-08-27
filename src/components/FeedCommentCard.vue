<script setup>
import ProfileImg from './ProfileImg.vue';
import { useAuthenticationStore } from '@/stores/authentication';

const authenticationStore = useAuthenticationStore();

const props = defineProps({
  item: Object,
});
</script>

<template>
  <div class="cmtItemCont mt-1">
    <div class="cmtItemProfile">
      <router-link :to="`/profile/${props.item.writerUserId}`">
        <profile-img
          :clsValue="'profile pointer'"
          :size="24"
          :pic="props.item.writerPic"
          :userId="props.item.writerUserId" />
      </router-link>
      <template v-if="authenticationStore.state.signedUser.userId === props.item.writerUserId">
        <i class="fa fa-trash pointer" @click="$emit('onDeleteComment')"></i>
      </template>
    </div>
    <router-link :to="`/profile/${props.item.writerUserId}`">
      <div class="cmtItemCtnt">
        <div class="pointer">
          {{
            props.item.writerNickName
              ? props.item.writerNickName
              : props.item.writerUid
          }}
        </div>
        <div>{{ props.item.comment }}</div>
      </div>
    </router-link>
  </div>
</template>

<style scoped></style>
