<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthenticationStore } from '@/stores/authentication';

const route = useRoute(); //쿼리스트링 받기 위해 사용
const router = useRouter(); //라우팅 처리를 위해 사용

const authentication = useAuthenticationStore();

onMounted(async () => {

    const error = route.query.error;
    const userId = route.query.user_id;

    console.log('error:', error);
    console.log('userId:', userId);

    if(error || !userId) { //error 쿼리스트링이 있거나 userId 쿼리스트링이 없다면
        if(error) {
            alert(error);
        }
        await router.push('/sign-in'); // sign-in으로 라우팅
    }
    //error 쿼리스트링 없었고, userId값 있다면
    const nickName = route.query.nick_name;
    const pic = route.query.pic;

    const signedUser = { userId, nickName, pic }

    console.log('signedUser: ', signedUser);

    authentication.setSignedUser(signedUser); //로그인 처리 하고
    await router.push('/'); //루트로 라우팅
})
</script>

<template>
    <div>
        <h1>소셜 로그인 처리 중...</h1>
    </div>
</template>

<style scoped>

</style>