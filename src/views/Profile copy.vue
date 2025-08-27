<script setup>
import ProfileImg from '@/components/ProfileImg.vue';
import FeedCard from '@/components/FeedCard.vue';
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useFeedStore } from '@/stores/feed';
import { useAuthenticationStore } from '@/stores/authentication';
import {
  getUserProfile,
  patchUserProfilePic,
  deleteUserProfilePic,
} from '@/services/userService';
import { postUserFollow, deleteUserFollow } from '@/services/followService';
import { getFeedList, deleteFeed } from '@/services/feedService';
import { bindEvent } from '@/utils/commonUtils';

const feedStore = useFeedStore();
const fileInput = ref(null);
const authenticationStore = useAuthenticationStore();
const route = useRoute(); //PathVariable 데이터 가져오기 위한 용도

const data = {
  profileUserId: '0',
  page: 1,
  rowPerPage: 20,
};

const state = reactive({
  isMyProfile: false,
  isLoading: false,
  isFinish: false,
  userProfile: null,
});

const init = (userId) => {
  state.isFinish = false;
  state.userProfile = {
    userId: '0',
    uid: '',
    pic: '',
    nickName: '',
    createdAt: '',
    feedCount: 0,
    allFeedLikeCount: 0,
    followerCount: 0,
    followingCount: 0,
    followState: 0,
  };
  feedStore.clearList();

  data.page = 1;
  data.profileUserId = userId;

  state.isMyProfile =
    data.profileUserId === authenticationStore.signedUser.userId;
};

init(route.params.userId);
console.log('route.params.userId:', route.params.userId);

/*
팔로우 상태
0: 서로 팔로우 안 한 상태
1: 나만 상대방을 팔로우 한 상태
2: 상대방만 나를 팔로우 한 상태
3: 서로 팔로우 한 상태
*/
const getFollowStateText = (followState) => {
  console.log(`followState : ${followState}`);
  switch (followState) {
    case 0:
      return '팔로우';
    case 1:
    case 3:
      return '팔로우 취소';
    case 2:
      return '맞팔로우';
  }
};

const getUserData = async () => {
  const params = {
    profile_user_id: data.profileUserId,
  };
  const res = await getUserProfile(params);

  if (res.status === 200) {
    const result = res.data.result;
    state.userProfile = result;
  }
};

const getFeedData = async () => {
  state.isLoading = true;
  const params = {
    page: data.page++,
    row_per_page: data.rowPerPage,
    profile_user_id: data.profileUserId,
  };
  const res = await getFeedList(params);
  if (res.status === 200) {
    const result = res.data.result;
    if (result && result.length > 0) {
      feedStore.addFeedList(result);
    }
    if (result.length < data.rowPerPage) {
      state.isFinish = true;
    }
  }
  state.isLoading = false;
};

const removeUserPic = async () => {
  console.log('프로파일 이미지 삭제');

  const res = await deleteUserProfilePic();
  if (res.status === 200) {
    state.userProfile.pic = null;
    authenticationStore.setSigndUserPic(null);
  }
};

//피드 삭제
const doDeleteFeed = async (feedId, idx) => {
  if (!confirm('삭제하시겠습니까?')) {
    return;
  }

  console.log('feedId:', feedId);
  console.log('idx:', idx);

  const params = { feed_id: feedId };

  const res = await deleteFeed(params);
  if (res.status === 200) {
    //state.list.splice(idx, 1);
    feedStore.deleteFeedByIdx(idx);
  }
};

const onClickProfileImg = () => {
  if (state.isMyProfile) {
    fileInput.value.click();
  }
};

const handlePicChanged = async (e) => {
  if (!e.target.files[0]) {
    return;
  }

  const formData = new FormData();
  formData.append('pic', e.target.files[0]);

  const res = await patchUserProfilePic(formData);
  if (res.status === 200) {
    const changedPic = res.data.result;
    state.userProfile.pic = changedPic;

    authenticationStore.setSigndUserPic(changedPic);
  }
};

const handleScroll = () => {
  bindEvent(state, window, getFeedData);
};

const getData = () => {
  getUserData();
  getFeedData();
};

//팔로우 버튼 클릭시
const onClickFollow = async () => {
  switch (state.userProfile.followState) {
    case 0:
    case 2: //post
      const postRes = await postUserFollow({ toUserId: data.profileUserId });
      if (postRes.status === 200) {
        state.userProfile.followState += 1;
        state.userProfile.followerCount += 1;
      }
      break;
    default: //delete
      const deleteRes = await deleteUserFollow({
        to_user_id: data.profileUserId,
      });
      if (deleteRes.status === 200) {
        state.userProfile.followState -= 1;
        state.userProfile.followerCount -= 1;
      }
      break;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  getData();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  feedStore.clearList();
});

onBeforeRouteUpdate((to, from) => {
  console.log('onBeforeRouteUpdate: to', to);
  console.log('to.params.userId:', to.params.userId);
  const toUserId = to.params.userId;
  if (toUserId !== data.profileUserId) {
    init(toUserId);
    getData();
  }
});
</script>

<template>
  <section>
    <div class="item_container">
      <div>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>게시물</td>
              <td>{{ state.userProfile.feedCount }}</td>
              <td class="pl_10">좋아요</td>
              <td>{{ state.userProfile.allFeedLikeCount }}</td>
              <td class="pointer follower pl_10">팔로워</td>
              <td class="pointer follower">
                {{ state.userProfile.followerCount }}
              </td>
              <td class="pointer follow pl_10">팔로우</td>
              <td class="pointer follow">
                {{ state.userProfile.followingCount }}
              </td>
              <td class="pl_10" v-if="!state.isMyProfile">
                <input
                  type="button"
                  class="instaBtn"
                  :value="getFollowStateText(state.userProfile.followState)"
                  @click="onClickFollow" />
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <div class="d-inline-flex" @click="onClickProfileImg">
            <profile-img
              :clsValue="`profile ${state.isMyProfile ? 'pointer' : ''}`"
              :size="300"
              :pic="state.userProfile.pic"
              :userId="state.userProfile.userId" />
          </div>
          <div
            className="d-inline-flex item_container width-50"
            v-if="state.isMyProfile && state.userProfile.pic">
            <i
              className="fa fa-minus-square color-red pointer"
              @click="removeUserPic" />
          </div>
          <input
            hidden
            type="file"
            accept="image/*"
            ref="fileInput"
            @change="handlePicChanged" />
        </div>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <th>name</th>
              <td>
                {{
                  state.userProfile.nickName
                    ? state.userProfile.nickName
                    : state.userProfile.uid
                }}
              </td>
            </tr>
            <tr>
              <th>reg date</th>
              <td>{{ state.userProfile.createdAt }}</td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>

      <div class="item_container mt-3">
        <feed-card
          v-for="(item, idx) in feedStore.feedList"
          :key="item.feedId"
          :item="item"
          :yn-del="true"
          @on-delete-feed="doDeleteFeed(item.feedId, idx)"></feed-card>
      </div>

      <div class="loading display-none" v-if="state.isLoading">
        <img :src="loadingImg" />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-follow {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.87);
}
.modal-follow > div {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-follow .container {
  position: relative;
  height: 400px;
  width: 400px;
  background-color: white;
  border-radius: 10px;
}
.modal-follow .container > div.top {
  height: 33px;
}
.modal-follow .container #title {
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}
.modal-follow .container i {
  position: absolute;
  right: 15px;
  top: 5px;
  font-size: 25px;
  color: #5a5959;
}
.modal-follow .container .followCont {
  overflow-y: auto;
  height: 367px;
  border-top: 1px solid #d3d3d3;
}
.modal-follow .container .followCont .follow-item {
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
  margin-top: 8px;
}
.modal-follow .container .followCont .follow-item > div {
  flex-grow: 1;
  margin-left: 5px;
}

.modal-img .swiper-container {
  height: 40vw;
  width: 90vw;
}
.modal-img .swiper-slide {
  display: flex;
  justify-content: center;
}

.modal-img .swiper-slide .no-main-profile {
  font-size: 30px;
}
.modal-img .swiper-slide img {
  object-fit: contain;
  height: 480px;
}

.instaBtn {
  background: white;
  border-color: #7f7e7e;
  border-radius: 3px;
  color: #7f7e7e;
}
.instaBtnEnable {
  background: #0095f6;
  border-color: #0095f6;
  color: white;
}
</style>
