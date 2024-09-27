// 和用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit';
import { setToken as _setToken,getToken, removeToken } from '@/utils';
import { getProfileAPI, loginAPI } from '@/apis/user';
const userStore = createSlice({
  name: 'user',
  // 数据状态 
  initialState: { 
    token: getToken() || '',
    userInfo:{}
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) { // 添加 setToken 方法
      state.token = action.payload;
      //localStorage
      _setToken(action.payload)
    },
    setUserInfo(state,action){
      state.userInfo = action.payload
    },
    clearUserInfo(state){
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  },
});

// 解构出 actionCreator
const {setToken , setUserInfo ,clearUserInfo} = userStore.actions;

// 获取 reducer 函数
const userReducer = userStore.reducer;

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    try {
      const res = await loginAPI(loginForm)
      dispatch(setToken(res.data.token))
    } catch (error) {
      console.error('请求失败', error);
      // 处理错误
    }
  }
}
//获取个人用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    try {
     const res = await getProfileAPI()
     dispatch(setUserInfo(res.data))
    } catch (error) {
      console.error('请求失败', error);
      // 处理错误
    }
  }
}
export {setToken, fetchLogin , fetchUserInfo,clearUserInfo};
export default userReducer;
