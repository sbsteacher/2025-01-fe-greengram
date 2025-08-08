import { reactive } from 'vue'
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

        return { state, addFeedList, addFeedUnshift };
    }
)