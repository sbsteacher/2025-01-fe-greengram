<script setup>
import ProfileImg from './ProfileImg.vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { reactive } from 'vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const state = reactive({    
    modules: [Navigation, Pagination, Scrollbar, A11y]
});

const props = defineProps({
  item: {
    writerUserId: Number,    
    writerPic: String,
    writerNm: String,
    location: String,
    ynDel: Boolean,
    pics: Array,
    contents: String
  },
});


const toggleLike = () => {
  console.log('toggleLike click!');
}
</script>

<template>
  <div class="item mb-3 p-3 w400">
    <div class='d-flex flex-row ps-3 pe-3'>
      <div class="d-flex flex-column justify-content-center">
        <router-link :to="`/profile/${props.item.writerUserId}`">
          <profile-img :userId="props.item.writerUserId" :pic="props.item.writerPic" size="30" clsValue="pointer profile"></profile-img>
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
    </div>
    
    <swiper navigation 
            :modules="state.modules"
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: true }"
            :slides-per-view="1"
            :space-between="50">
        <swiper-slide v-for="(item, idx) in props.item.pics" :virtualIndex="idx" :key="idx">
          <img :src="`${baseUrl}/api/greengram/pic/item/${item.id}/${item.imgPath}`" :alt="`이미지`" :aria-label="`이미지`" class="w614">
        </swiper-slide>
    </swiper>
    <div class="favCont p-2 d-flex flex-row">
      <i :class="`${isLike ? 'fas':'far'} fa-heart pointer rem1_2 me-3 color-red`" @click={toggleLike}></i>                
    </div>    
    <div class="itemCtnt p-2">
      {{ props.item.contents }}
    </div>
  </div>
</template>

<style scoped>
.item { border: 1px solid #9f9e9e; width: 600px; }
.w614 { width: 614px; }
</style>