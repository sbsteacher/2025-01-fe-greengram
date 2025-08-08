import { createRouter, createWebHistory } from 'vue-router'
import { useAuthenticationStore } from '@/stores/authentication';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'feed',
      component: () => import('../views/Feed.vue')
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    
  ],
})

//로그인 하지 않아도 이용할 수 있는 Path들
const unSignedPathList = ['/sign-in', '/sign-up']


//navigation guard
router.beforeEach((to, from) => {
  const authentcationStore = useAuthenticationStore();  
  console.log(`router: from: ${from.path} ==> to: ${to.path}`);
  console.log('unSignedPathList.includes(to.path):', unSignedPathList.includes(to.path));
  console.log('authentcationStore.state: ', authentcationStore.state);

  if(unSignedPathList.includes(to.path) && authentcationStore.state.isSigned) {
    //로그인 상태에서 /sign-in, /sign-up 경로로 이동하려고 하면
    return { path: '/' }
  } else if(!authentcationStore.state.isSigned && !unSignedPathList.includes(to.path)) {
    console.log('로그아웃 상태에서 /sign-in, /sign-up 경로가 아닌 경우')
    //로그아웃 상태에서 /sign-in, /sign-up 경로가 아닌 경우
    return { path: '/sign-in' }
  }  
});


export default router
