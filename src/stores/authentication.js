import { reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthenticationStore = defineStore(
    "authentication", 
    () => {
        const state = reactive({            
            signedUser: null,
            isSigned: false
        });

        const setSignedUser = val => {
            state.signedUser = val;
            state.isSigned = true;
        }

        const signOut = async () => {
            console.log('signOut 처리')
            state.signedUser = null;
            state.isSigned = false;
            
            await router.push('/sign-in')
        }

        return { state, setSignedUser, signOut };
    }, 
    { persist: true }
);
