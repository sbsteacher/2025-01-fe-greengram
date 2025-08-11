<script setup>
import Header from './components/Header.vue';
import { useMessageModalStore } from '@/stores/messageModal'

const messageModal = useMessageModalStore();
</script>

<template>
  <div>
    <Header />  
    <router-view></router-view>  
    <b-modal v-model="messageModal.state.isShow" ok-only>{{ messageModal.state.message }}</b-modal>
  </div>
</template>

<style scoped>

</style>
