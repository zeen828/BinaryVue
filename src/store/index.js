import Vue from 'vue'
import Vuex from 'vuex'
// Models
import storeUser from '@/store/modules/user.js'
import storeBinary from '@/store/modules/binary.js'
import storeBetting from '@/store/modules/betting.js'
// API Lib
import ajaxBinary from '@/api/Binary.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登入狀態(''未處理，''成功，''失敗)
    loginCode: '',
    // 登入錯誤次數
    loginError: 0,
    // 授權
    accessToken: '',
    // 簽章
    signature: '',
    // 右上彈出訊息
    toast: {
      info: 'info',
      success: 'success',
      warning: 'warning',
      error: 'error'
    },
    // API設定
    apiCallCount: 0, // API呼叫計數器
    // 語系
    lang: null,
    // 除錯
    debug: false
  },
  mutations: {
    setLoginCode (state, val) {
      state.loginCode = val
    },
    setLoginError (state, val) {
      state.loginError = val
    },
    addLoginError (state, val) {
      state.loginError++
    },
    setAccessToken (state, val) {
      // console.log('Vuex Store index setAccessToken')
      state.accessToken = val
    },
    setSignature (state, val) {
      state.signature = val
    },
    setToastInfo (state, val) {
      state.toast.info = val
    },
    setToastSuccess (state, val) {
      state.toast.success = val
    },
    setToastWarning (state, val) {
      state.toast.warning = val
    },
    setToastError (state, val) {
      state.toast.error = val
    },
    apiCall (state) {
      // console.log('呼叫API')
      state.apiCallCount++
    },
    apiOver (state) {
      // console.log('結束API')
      state.apiCallCount--
    },
    setLang (state, val) {
      state.lang = val
    },
    // 除錯
    setDebug (state, val) {
      state.debug = val
    }
  },
  getters: {
    getLoginCode (state) {
      return state.loginCode
    },
    getLoginError (state) {
      return state.loginError
    },
    getAccessToken (state) {
      return state.accessToken
    },
    getSignature (state) {
      return state.signature
    },
    getToastInfo (state) {
      return state.toast.info
    },
    getToastSuccess (state) {
      return state.toast.success
    },
    getToastWarning (state) {
      return state.toast.warning
    },
    getToastError (state) {
      return state.toast.error
    },
    getLoading (state) {
      // console.log('API運作檢查')
      if (state.apiCallCount <= 0) {
        // state.setApiCallCount = 0
        return false
      } else {
        return true
      }
    },
    getLang (state) {
      return state.lang
    },
    // 除錯
    getDebug (state) {
      return state.debug
    }
  },
  actions: {
    ready (context) {
      console.log('Vuex Store Index Action.ready()')
    },
    // 登入/註冊(getAccessToken改名停用)
    async oldgetAccessToken (context, callback) {
      // console.log('Vuex Store Index Action.getAccessToken()', '\nCallback：', callback)
      try {
        // 算過期時間用
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || accessTokenExpires === null || accessTokenExpires === 'null' || time >= accessTokenExpires) {
          // 使用axios整理後的API。
          const ret = await ajaxBinary.getToken()
          if (ret.status === 200 && ret.request.readyState === 4 && ret.data !== null) {
            const apiData = ret.data
            // 寫入回傳code
            context.commit('setLoginCode', apiData.code)
            if (apiData.success === true) {
              // console.log('授權紀錄！')
              window.localStorage.setItem('AccessToken', apiData.data.access_token)
              context.commit('setAccessToken', apiData.data.access_token)
              // 時效(1000是1秒 3600 * 1000 = 1小時，3600 * 500 = 30分鐘)
              window.localStorage.setItem('AccessTokenExpires', time + (apiData.data.expires_in * 500))
            } else {
              // 錯誤
              context.commit('addLoginError', 1)
              return false
            }
          }
        }
        // 呼叫CalllBack
        // console.log('呼叫CalllBack：', callback)
        if (callback !== undefined) {
          await context.dispatch(callback)
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 更新Token(維持使用getAccessToken名稱減少改程式)
    async getAccessToken (context, callback) {
      // console.log('Vuex Store Index Action.getAccessToken()', '\nCallback：', callback)
      try {
        // 算過期時間用
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || accessTokenExpires === null || accessTokenExpires === 'null' || time >= accessTokenExpires) {
          // 使用axios整理後的API。
          const ret = await ajaxBinary.getRefreshToken()
          console.log('AJAX：', ret)
          if (ret.status === 200 && ret.request.readyState === 4 && ret.data !== null) {
            const apiData = ret.data
            // 寫入回傳code
            context.commit('setLoginCode', apiData.code)
            if (apiData.success === true) {
              // console.log('授權紀錄！')
              window.localStorage.setItem('AccessToken', apiData.data.access_token)
              context.commit('setAccessToken', apiData.data.access_token)
              // 時效(1000是1秒 3600 * 1000 = 1小時，3600 * 500 = 30分鐘)
              window.localStorage.setItem('AccessTokenExpires', time + (apiData.data.expires_in * 500))
            } else {
              // 錯誤
              console.log('%c 登入錯誤', 'font-size: 24px;color: red;')
              context.commit('addLoginError', 1)
              return false
            }
          }
        }
        // 呼叫CalllBack
        // console.log('呼叫CalllBack：', callback)
        if (callback !== undefined) {
          await context.dispatch(callback)
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 更新Token(強制)
    async getTokenRefresh (context, callback) {
      // console.log('Vuex Store Index Action.getTokenRefresh()', '\nCallback：', callback)
      try {
        // 算過期時間用
        const time = new Date().getTime()
        // 使用axios整理後的API。
        const ret = await ajaxBinary.getRefreshToken()
        if (ret.status === 200 && ret.request.readyState === 4 && ret.data !== null) {
          const apiData = ret.data
          // 寫入回傳code
          context.commit('setLoginCode', apiData.code)
          if (apiData.success === true) {
            // console.log('授權紀錄！')
            window.localStorage.setItem('AccessToken', apiData.data.access_token)
            context.commit('setAccessToken', apiData.data.access_token)
            // 時效(1000是1秒 3600 * 1000 = 1小時，3600 * 500 = 30分鐘)
            window.localStorage.setItem('AccessTokenExpires', time + (apiData.data.expires_in * 500))
          } else {
            // 錯誤
            console.log('%c 登入錯誤', 'font-size: 24px;color: red;')
            context.commit('addLoginError', 1)
            return false
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 登出
    logout (context) {
      console.log('Vuex Store Index Action.logout()')
      // 授權清除
      // window.localStorage.removeItem('AccessToken')
      window.localStorage.clear()
      context.commit('setAccessToken', '')
      context.commit('setSignature', '')
      context.commit('storeUser/setUser', '')
      context.commit('storeBinary/setCurrency', '')
    }
  },
  modules: {
    storeUser,
    storeBinary,
    storeBetting
  }
})
