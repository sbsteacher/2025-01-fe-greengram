<script setup>
import { ref, computed } from 'vue';
import defaultProfileImg from '@/assets/defaultProfileImg.png';

const baseUrl = ref(import.meta.env.VITE_BASE_URL);

const props = defineProps({
    userId: Number,
    clsValue: String,
    size: Number,
    pic: String  
});

console.log('profileImg - props:', `${baseUrl.value}/pic/profile/${props.userId}/${props.pic}` )

//props값을 변수에 재할당해서 사용하는 경우 반응성이 사라짐. 이때는 computed를 사용하거나 toRefs 사용해야 함. 아래는 computed로 해결
const pic = computed( () => props.pic ? `${baseUrl.value}/pic/profile/${props.userId}/${props.pic}` : defaultProfileImg );

const handleImgError = e => {
    e.target.src = defaultProfileImg;
    e.target.onError = null;
}

</script>

<template>
    <div class="circleimg" :class="`${props.clsValue} w${props.size} h${props.size}`">
        <img :src="pic" @error="handleImgError" />
    </div>
</template>

<style scoped>
.w24 { width: 24px; }
.w30 { width: 30px; }
.w100 { width: 100px; }
.w250 { width: 250px; }
.w300 { width: 300px; }

.w800 { width: 800px; }

.circleimg { display: inline-block; overflow: hidden; border-radius: 50%; border: 1px solid #ecf0f1; vertical-align: top; }
.circleimg > img { width: 100%; height: 100%; object-fit: cover; vertical-align: top; }
</style>