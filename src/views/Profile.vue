<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthenticationStore } from '@/stores/authentication';

const authenticationStore = useAuthenticationStore();
const route = useRoute(); //PathVariable 데이터 가져오기 위한 용도
console.log('route.params.userId:', route.params.userId);

 const getFollowStateText = followState => {
    console.log(`followState : ${followState}`);
    switch(followState) {
        case 0:
            return '팔로우';
        case 1:
        case 3:
            return '팔로우 취소';
        case 2:
            return '맞팔로우';
    }
}
</script>

<template>
    <section>
        <div class="flexContainer">
            <div>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>게시물</td>
                            <td></td>
                            <td class="pl_10">좋아요</td>
                            <td></td>
                            <td class="pointer follower pl_10">팔로워</td>
                            <td class="pointer follower"></td>
                            <td class="pointer follow pl_10">팔로우</td>
                            <td class="pointer follow"></td>
                            <td class="pl_10">
                                <input type="button" class="instaBtn" :value="getFollowStateText('')"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<style scoped>
section { display: flex; flex-direction: column; align-items: center; }


.modal-follow { height: 100%; width: 100%; position: fixed; left:0; top: 0; z-index: 100; background-color: rgba(0, 0, 0, 0.87);}
.modal-follow > div { height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; }
.modal-follow .container { position: relative; height: 400px; width: 400px; background-color: white; border-radius: 10px; }
.modal-follow .container > div.top { height: 33px; }
.modal-follow .container #title { text-align: center; padding-top: 5px; padding-bottom: 5px; }
.modal-follow .container i { position: absolute; right: 15px; top: 5px; font-size: 25px; color: #5a5959; }
.modal-follow .container .followCont { overflow-y: auto; height: 367px; border-top: 1px solid #d3d3d3; }
.modal-follow .container .followCont .follow-item { display: flex; padding-left: 8px; padding-right: 8px; margin-top: 8px; }
.modal-follow .container .followCont .follow-item > div { flex-grow: 1; margin-left: 5px; }

.modal-img .swiper-container { height: 40vw; width: 90vw; }
.modal-img .swiper-slide { display: flex; justify-content: center; }

.modal-img .swiper-slide .no-main-profile { font-size: 30px; }
.modal-img .swiper-slide img { object-fit: contain; height: 480px; }

.instaBtn { background: white; border-color: #7f7e7e; border-radius: 3px; color: #7f7e7e; }
.instaBtnEnable { background: #0095f6; border-color: #0095f6; color: white; }
</style>