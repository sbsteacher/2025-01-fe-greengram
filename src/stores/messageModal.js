import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useMessageModalStore = defineStore(
    "messageModal",
    () => {
        const state = reactive({
            message: null,
            isShow: false
        });

        const setMessage = val => { 
            console.log('messageModalStore-setMessage-val:', val);
            state.message = val; 
            state.isShow = true;
        };

        return { state, setMessage }
    }
);