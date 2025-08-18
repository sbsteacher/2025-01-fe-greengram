import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFeedStore = defineStore('feed', 
    () => {
        const state = reactive({
            feedList: []
        })

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

        return { feedList, addFeedList, addFeedUnshift, deleteFeedByIdx, clearList };
    }
)