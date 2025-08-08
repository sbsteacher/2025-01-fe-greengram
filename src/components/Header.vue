<script setup>
import logo from '@/assets/logo.png';
import ProfileImg from './ProfileImg.vue';
import { reactive } from 'vue';
import { useAuthenticationStore } from '@/stores/authentication';
import { signOut } from '@/services/userService';

const authenticationStore = useAuthenticationStore();
const state = reactive({
    feed: {
        location: '',
        contents: '',
        pics: []
    }
});

const doSignOut = async () => {    
    const res = await signOut();
    if(res.status === 200) {
        await authenticationStore.signOut()
    }
}

const handlePicChanged = e => {
  state.feed.pics = e.target.files;
}

const saveFeed = () => {
    console.log('state.feed.pics: ', state.feed.pics);
    //사진 있는지 확인    
    if(state.feed.pics.length === 0) { 
        alert('사진을 선택해 주세요.');
        return;
    }
}
</script>

<template>
<header class="container py-3" v-if="authenticationStore.state.isSigned">
    <div id="globalConst">
        <div class="d-flex flex-column flex-md-row align-items-center">
            <div class="d-inline-flex flex-grow-1 flex-shrink-0">
                <router-link to="/"><img :src="logo" class="h24 w24" /></router-link>
            </div>
            <div class="d-inline-flex flex-grow-1 flex-shrink-0"></div>
            <div class="d-inline-flex flex-grow-1 flex-shrink-0">
                <nav class="d-flex flex-grow-1 flex-column flex-md-row justify-content-end">
                    <div class="d-inline-flex me-3">
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

                    <div class="d-inline-flex me-3"></div>

                    <div class="d-inline-flex dropdown">
                        <a href="#" role="button" id="navDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"  class="header_profile">
                            <profile-img :userId="authenticationStore.state.signedUser.userId" :pic="authenticationStore.state.signedUser.pic" :size="24" :clsValue="`pointer profile`" />
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
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><span class="dropdown-item pointer" @click="doSignOut">Sign out</span></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>

    <div class="modal fade" id="newFeedModal" tabIndex="-1" aria-labelledby="newFeedModalLabel" aria-hidden="false">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content" id="newFeedModalContent">
                <div class="modal-header">
                    <h5 class="modal-title" id="newFeedModalLabel">새 게시물 만들기</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="id-modal-body">                            
                    <div>location: <input type="text" name="location" placeholder="위치" v-model="state.feed.location"/></div>
                    <div>contents: <textarea name="contents" placeholder="내용" v-model="state.feed.contents"></textarea></div>
                    <div><label>pic: <input name="pics" type="file" multiple accept="image/*" @change="handlePicChanged"/></label></div>
                    <div><button @click="saveFeed">전송</button></div>
                </div>
            </div>
        </div>                
    </div> 
</header>
</template>

<style scoped>
a { text-decoration: none; color: black; }
</style>