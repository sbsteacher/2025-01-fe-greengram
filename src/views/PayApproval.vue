<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPayApprove } from '@/services/payService';

const route = useRoute(); //쿼리스트링 받기 위해 사용
const router = useRouter(); //라우팅 처리를 위해 사용

onMounted(async () => {
    const pg_token = route.query.pg_token;
    if(!pg_token) { await router.push('/pay/fail'); }
    const params = { pg_token }

    const res = await getPayApprove(params);
    if(res.status === 200) {
        const data = res.data.result;

        if(data?.aid) {
            await router.push('/pay/completed');
        } else {
            await router.push('/pay/fail');
        }
    }
});

</script>

<template>
    <section  className="back_color">
        <h1>카카오페이 결제 준비 완료</h1>                            
    </section>
</template>

<style scoped>

</style>