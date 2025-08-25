<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthenticationStore } from '@/stores/authentication';

const route = useRoute();
const router = useRouter();

const authentication = useAuthenticationStore();

onMounted(async () => {

    const error = route.params.error;
    const userId = route.params.user_id;

    if(error || !userId) {
        if(error) {
            alert(error);
        }
        await router.push('/sign-in');
    }
    
    const nickName = route.params.nick_name;
    const pic = route.params.pic;

    const signedUser = { userId, nickName, pic }

    authentication.setSignedUser(signedUser);
    await router.push('/');
})
</script>

<template>
    <div>
        <h1>소셜 로그인 처리 중...</h1>
    </div>
</template>

<style scoped>

</style>