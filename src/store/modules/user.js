// 和用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit';
import { request } from '@/utils/request';
import { setToken as _setToken,getToken } from '@/utils';
const userStore = createSlice({
  name: 'user',
  // 数据状态 
  initialState: { token: getToken() || ''},
  // 同步修改方法
  reducers: {
    setToken(state, action) { // 添加 setToken 方法
      state.token = action.payload;
      //localStorage
      _setToken(action.payload)
    },
  },
});

// 解构出 actionCreator
const {setToken } = userStore.actions;

// 获取 reducer 函数
const userReducer = userStore.reducer;

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    try {
      const res = await request.post('/authorizations', loginForm)
      dispatch(setToken(res.data.token))
    } catch (error) {
      console.error('请求失败', error);
      // 处理错误
    }
  }
}


//go
const httpPizhe = (pz, url) => {
  return async (dispatch) => {
    try {
      const res = await request.post(url, pz);
      // 这里可以选择 dispatch 一个动作，或者返回结果
      return res.data; // 或者 dispatch 相应的动作
    } catch (error) {
      console.error('请求失败', error);
      // 处理错误
    }
  }
}


export {setToken, fetchLogin, httpPizhe };
export default userReducer;
