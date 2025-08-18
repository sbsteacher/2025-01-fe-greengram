import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthenticationStore = defineStore(
    "authentication", 
    () => {
        const state = reactive({            
            signedUser: {
                userId: 0,
                nickName: '',
                pic: null
            },            
            isSigned: false
        });

        const setSignedUser = signedUser => {
            state.isSigned = true;
            state.signedUser = signedUser                       
        }

        const setSigndUserPic = pic => {
            state.signedUser.pic = pic;
        }

        const signOut = async () => {
            console.log('signOut 처리')
            state.isSigned = false;
            state.signedUser = null;            
            await router.push('/sign-in')
        }

        return { state, setSignedUser, setSigndUserPic, signOut };
    }, 
    { persist: true }
);
