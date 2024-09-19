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
    const res = await request.post('/authorizations', loginForm);
    dispatch(setToken(res.data.token)); // 使用 setToken 方法
  };
};

export {setToken, fetchLogin };
export default userReducer;
