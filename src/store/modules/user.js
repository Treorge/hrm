import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUserInfo, login } from '@/api/user'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  // context上下文，传入参数
  async login(context, data) {
    // todo: 调用登录接口
    const token = await login(data)
    // 返回一个token 123456
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    const res = await getUserInfo()
    context.commit('setUserInfo', res)
  },
  async logout(context) {
    context.commit('removeToken')
    context.commit('setUserInfo', {})
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
