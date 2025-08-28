import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFeedStore = defineStore('feed', 
    () => {
        const state = reactive({
            rowPerPage: 20,
            feedList: [],
            page: 1,            
            profileUserId: '',
            keyword: '',
            reLoading: false
        })

        const setPage = page => state.page = page;
        const setProfileUserId = userId => state.profileUserId = userId;
        const setKeyword = keyword => state.keyword = keyword;
        const setReLoading = reLoading => state.reLoading = reLoading;

        const init = () => {
            state.feedList = [];
            state.page = 1;
            state.profileUserId = '';
            state.keyword = '';
            state.reLoading = false;
        }

        const addFeedList = list => {
            state.feedList.push(...list);
        }

        const addFeedUnshift = item => {
            state.feedList.unshift(item);
        }

        const deleteFeedByIdx = idx => {
            state.feedList.splice(idx, 1)
        }

        const clearList = () => {
            state.feedList = []
        }

        const feedList = computed(() => state.feedList )

        const page = computed( () => state.page );
        const rowPerPage = computed( () => state.rowPerPage );
        const profileUserId = computed( () => state.profileUserId );
        const keyword = computed( () => state.keyword );
        const reLoading = computed( () => state.reLoading );

        return { feedList
                , page
                , rowPerPage
                , profileUserId
                , keyword
                , reLoading
                , setPage
                , setProfileUserId
                , setKeyword
                , setReLoading
                , init
                , addFeedList
                , addFeedUnshift
                , deleteFeedByIdx
                , clearList 
                };
    }
)