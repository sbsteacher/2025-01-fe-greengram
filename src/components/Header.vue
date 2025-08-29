<script setup>

import logo from '@/assets/logo.png';
import ProfileImg from './ProfileImg.vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { signOut } from '@/services/userService';
import { reactive, watch } from 'vue';
import { getKeywordList } from '@/services/feedService';
import { useFeedStore } from '@/stores/feed';
import { useRoute } from 'vue-router';
import { postPayReady } from '@/services/payService';

const route = useRoute();
const feedStore = useFeedStore();
const authenticationStore = useAuthenticationStore();

const state = reactive({
    search: '',
    searchList: []
})


const doSignOut = async () => {    
    const res = await signOut();
    if(res.status === 200) {
        await authenticationStore.signOut()

        //window.location.href = 'https://kauth.kakao.com/oauth/logout?client_id=23cc7564b5c5007c60f5088a24f32fbe&logout_redirect_uri=http://localhost:5173/sign-in';        
    }
}

let debounceTimer = null;
const onTyping = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        console.log('검색');
        getSearchKeyword();
    }, 400);
}

const getSearchKeyword = async () => {
    state.searchList = [];
    if(!state.search) { return; }

    const params = {
        keyword: state.search
    }
    const res = await getKeywordList(params);
    if(res.status === 200) {
        const data = res.data.result;
        state.searchList = data;
    }
}

const getFeedData = async () => {
    feedStore.setKeyword(state.search);
    feedStore.clearList();
    feedStore.setPage(1);
    feedStore.setReLoading(true);
}

const buy = async () => {
    const res = await postPayReady();

    if(res.status === 200) {
        const data = res.data.result;

        window.location.href = data.next_redirect_pc_url;
    }
}

watch(() => route.fullPath, () => {    
    state.search = '';    
});
</script>

<template>    
<header class="container py-3" v-if="authenticationStore.state.isSigned">
    <div id="globalConst">
        <div class="d-flex flex-column flex-md-row align-items-center">
            <div class="d-inline-flex flex-grow-1 flex-shrink-0">
                <router-link to="/"><img :src="logo" class="h24 w24" /></router-link>
            </div>
            <div class="d-inline-flex flex-grow-1 flex-shrink-0">
                <b-form-input list="search-list-id" @input="onTyping" @keyup.enter="getFeedData" v-model="state.search"/>
                <datalist id="search-list-id">                    
                    <option v-for="item in state.searchList">{{ item }}</option>
                </datalist>
                <b-button variant="outline-secondary" class="ms-3" size="sm" @click="getFeedData">Search</b-button>
            </div>
            <div class="d-inline-flex flex-grow-1 flex-shrink-0">
                <nav class="d-flex flex-grow-1 flex-column flex-md-row justify-content-end">
                    <div class="d-inline-flex">
                        <a href="#" id="newFeedModalBtn" data-bs-toggle="modal" data-bs-target="#newFeedModal">
                            <svg aria-label="새로운 게시물"  class="_8-yf5" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"  strokeWidth="2">
                                </path>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"  strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001">
                                </line>
                                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"  strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455">
                                </line>
                            </svg>
                        </a>
                    </div>
                    <div class="d-inline-flex dropdown">
                        <a href="#" role="button" id="navDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"  class="header_profile">
                            <profile-img :userId="authenticationStore.state.signedUser.userId" :pic="authenticationStore.state.signedUser.pic" :size="24" :clsValue="'pointer profile'" />
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navDropdownMenuLink">
                            <li>
                                <router-link :to="`/profile/${authenticationStore.state.signedUser.userId}`">
                                    <span class="dropdown-item">
                                        <span>
                                            <svg aria-label="프로필"  class="_8-yf5 " color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16">
                                                <circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"  strokeWidth="2"></circle><path d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"></path><circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10"  strokeWidth="2">
                                                </circle>
                                            </svg>
                                        </span>&nbsp;
                                        <span>프로필</span>
                                    </span>
                                </router-link>
                            </li>          
                            <li>
                                <span class="dropdown-item pointer" @click="buy">
                                    <span>
                                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.58" height="16" width="16">
                                            <title>product</title><path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z"/>
                                        </svg>
                                    </span>&nbsp;
                                    <span>구매</span>
                                </span>
                            </li>       
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><span class="dropdown-item pointer" @click="doSignOut">Sign out</span></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>

    
</header>
</template>

<style scoped>

nav { align-items: center; gap: 20px; }
</style>