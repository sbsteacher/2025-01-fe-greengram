import axios from 'axios';
import { reissue } from '@/services/userService';
import { useAuthenticationStore } from '@/stores/authentication';
import { useMessageModalStore } from '@/stores/messageModal';

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/api/`;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.log('err: ', err);
    if (err.response) {
      console.log('err.response : ', err.response);
      const authenticationStore = useAuthenticationStore();
      if (err.response.status === 401 && authenticationStore.state.isSigned) {
        //401 UnAuthorized 에러인데 FE 로그인 처리 되어 있다면
        try {
          await reissue(); //AccessToken 재발행 시도

          // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
          return await axios.request(err.config);
        } catch (e) {
          authenticationStore.logout();
        }
      } else {
        const message = err.response.data?.message ? err.response.data?.message : err.response.data;

        const messageModalStore = useMessageModalStore();
        messageModalStore.setMessage(message);
      }
    }

    return Promise.reject(err);
  }
);

export default axios;
