// 和用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit';
import { http } from '@/utils/request';

const userStore = createSlice({
  name: 'user',
  // 数据状态 
  initialState: { token: localStorage.getItem('token_key') || '', userInfo: {} },
  // 同步修改方法
  reducers: {
    setToken(state, action) { // 添加 setToken 方法
      state.token = action.payload;
      //localStorage
      localStorage.setItem('token_key',action.payload)
    },
  },
});

// 解构出 actionCreator
const { setUserInfo, setToken } = userStore.actions;

// 获取 reducer 函数
const userReducer = userStore.reducer;

// 异步方法封装
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', loginForm);
    dispatch(setToken(res.data.token)); // 使用 setToken 方法
  };
};

export { setUserInfo, setToken, fetchLogin };
export default userReducer;
