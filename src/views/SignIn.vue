<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { signIn } from '@/services/userService';
import { useAuthenticationStore } from '@/stores/authentication';
import { checkValidation } from '@/utils/validation';

const router = useRouter();

const authentication = useAuthenticationStore();

const state = reactive({
  form: {
    uid: 'mic2',
    upw: 'aaaa1212!!',
  },
});

const submit = async () => {
  //유효성 체크
  if (checkValidation()) {
    return;
  }

  const res = await signIn(state.form);
  console.log('Login.vue - submit() - res: ', res);
  if (res.status === 200) {
    const signedUser = res.data.result;
    console.log('signedUser:', signedUser);
    authentication.setSignedUser(signedUser);
    await router.push('/');
  }
};
</script>

<template>
  <div class="login">
    <div class="container">
      <form class="py-5 d-flex flex-column gap-3" @submit.prevent="submit">
        <h1 class="h5 mb-3">로그인</h1>

        <div class="form-floating">
          <input
            type="text"
            class="form-control valid"
            id="uid"
            placeholder="아이디"
            v-model="state.form.uid"
            not-null-message="아이디는 필수로 입력하셔야 합니다."
            regexp="^[A-Za-z0-9_]{4,50}$"
            regexp-message="아이디는 영어, 숫자, 언더바로만 구성되어야 하며 4~50자까지 작성할 수 있습니다." />
          <label for="uid">아이디</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control valid"
            id="upw"
            placeholder="비밀번호"
            v-model="state.form.upw"
            autocomplete="off"
            not-null-message="비밀번호는 필수로 입력하셔야 합니다."
            regexp="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&amp;*()_+\-=\[\]{};':&quot;\\|,.&lt;&gt;\/?])[A-Za-z\d!@#$%^&amp;*()_+\-=\[\]{};':&quot;\\|,.&lt;&gt;\/?]{10,}$"
            regexp-message="비밀번호는 영문자, 숫자, 특수기호로 구성되며 10자 이상이어야 합니다." />
          <label for="upw">비밀번호</label>
        </div>
        <button class="w-100 h6 btn py-3 btn-primary">로그인</button>
      </form>
      <div>
        <router-link to="/sign-up"><span>회원가입</span></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 576px;
}
</style>
