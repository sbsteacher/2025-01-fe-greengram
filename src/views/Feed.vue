<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useFeedStore } from '@/stores/feed';
import FeedContainer from '@/components/FeedContainer.vue';

const feedStore = useFeedStore();

onMounted(() => {
    feedStore.init();
    feedStore.setReLoading(true);
});

</script>

<template>
    <section class="back_color">
        <div class="container d-flex flex-column align-items-center">
            <FeedContainer :yn-del="false" />
        </div>
    </section>    
</template>

<style scoped>
.back_color { background-color: #fafafa; }
</style>