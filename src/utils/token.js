// 封装存取方法

const TOKENKEY = 'token_key'
//存
function setToken (token) {
  return localStorage.setItem(TOKENKEY, token)
}
//取
function getToken () {
  return localStorage.getItem(TOKENKEY)
}
//删
function removeToken () {
  return localStorage.removeItem(TOKENKEY)
}

export {
  setToken,
  getToken,
  removeToken
}