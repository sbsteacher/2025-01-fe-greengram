<script setup>
import ProfileImg from './ProfileImg.vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, reactive } from 'vue';
import { getDateTimeInfo } from '@/utils/feedUtils';

import { toggleFeedLike } from '@/services/feedLikeService';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const baseUrl = ref(import.meta.env.VITE_BASE_URL);

const authenticationStore = useAuthenticationStore();

const props = defineProps({
  item: {
    feedId: Number,
    writerUserId: Number,
    writerPic: String,
    writerNm: String,
    location: String,    
    pics: Array,
    contents: String,
    isLike: Boolean,
    comment: Object
  },
  ynDel: Boolean
});

const state = reactive({
  modules: [Navigation, Pagination, Scrollbar, A11y],
  isLike: props.item.isLike
});

const toggleLike = async () => {
  console.log('toggleLike click!');
  const data = { feedId: props.item.feedId }
  const res = await toggleFeedLike(data);
  if(res.status === 200) {
    state.isLike = res.data.result;
  }
};

const deleteFeed = () => {

}
</script>

<template>
  <div class="item mb-3 p-3 w400">
    <div class="d-flex flex-row ps-3 pe-3">
      <div class="d-flex flex-column justify-content-center">
        <router-link :to="`/profile/${props.item.writerUserId}`">
          <profile-img :userId="props.item.writerUserId" :pic="props.item.writerPic" :size="30" :clsValue="'pointer profile'"/>
        </router-link>
      </div>
      <div class="p-3 flex-grow-1">
        <div>
          <router-link :to="`/profile/${props.item.writerUserId}`">
            <span class="pointer">{{ props.item.writerNm }}</span>
          </router-link>
        </div>        
        <div>{{ props.item.location }}</div>
      </div>
      <div v-if="props.ynDel && props.item.writerUserId === authenticationStore.state.signedUser.userId">
        <div className="d-flex flex-column justify-content-center">
            <i className="fa fa-trash pointer color-red" @click="deleteFeed"></i>
        </div>
      </div>
    </div>

    <swiper
      navigation
      :modules="state.modules"
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
      :slides-per-view="1"
      :space-between="50">
      <swiper-slide v-for="(item, idx) in props.item.pics" :virtualIndex="idx" :key="idx">
        <img :src="`${baseUrl}/pic/feed/${props.item.feedId}/${item}`" :alt="`이미지`" :aria-label="`이미지`" class="w614" />
      </swiper-slide>
    </swiper>
    <div class="favCont p-2 d-flex flex-row">
      <i :class="`${state.isLike ? 'fas' : 'far'} fa-heart pointer rem1_2 me-3 color-red`" @click="toggleLike"></i>
    </div>
    <div class="itemCtnt p-2" v-if="props.item.contents">{{ props.item.contents }}</div>

  </div>
</template>

<style scoped>
.item { border: 1px solid #9f9e9e; width: 600px; }
.w614 { width: 614px; }
</style>
