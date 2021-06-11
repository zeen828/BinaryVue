// API Lib
import ajaxBinary from '@/api/Binary.js'

export default {
  namespaced: true,
  // 用來資料共享資料儲存
  state: {
    // 會員 - 資訊
    user: {
      id: 1,
      name: '會員',
      point: 100
    },
    record: {
      // 會員 - 紀錄 - 訂單
      order: [
        {
          id: 1,
          title: '標題',
          quantity: 1,
          amount: '10.000',
          profit: '9.600',
          win_user: 0
        }
      ],
      // 會員 - 紀錄 - 投注
      betting: [
        {
          id: 4,
          value: 'even',
          quantity: 1,
          amount: '10.000',
          profit: '9.600',
          win_user: 0
        }
      ]
    },
    // 除錯
    debug: false
  },
  // 用來註冊改變資料狀態
  mutations: {
    // 會員 - 資訊
    setUser (state, val) {
      state.user = val
    },
    // 會員 - 更新點數
    setUserPoint (state, val) {
      state.user.point = val
    },
    // 會員 - 紀錄 - 訂單
    setRecordOrder (state, val) {
      state.record.order = val
    },
    // 會員 - 紀錄 - 投注
    setRecordBetting (state, val) {
      state.record.betting = val
    },
    // 除錯
    setDebug (state, val) {
      state.debug = val
    }
  },
  // 用來對共享資料進行過濾操作
  getters: {
    // 會員 - 資訊
    getUser (state) {
      return state.user
    },
    // 會員 - 紀錄 - 訂單
    getRecordOrder (state) {
      return state.record.order
    },
    // 會員 - 紀錄 - 投注
    getRecordBetting (state) {
      return state.record.betting
    },
    // 除錯
    getDebug (state) {
      return state.debug
    }
  },
  // 解決非同步改變共享資料
  actions: {
    ready (context) {
      console.log('Vues-store使用: model(storeUser).action.ready()')
    },
    // 會員 - 資訊
    async getUser (context) {
      // console.log('Vues-store使用: model(storeUser).action.getUser()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeUser/getUser', { root: true })
        } else {
          // console.log('驗證')
          const ret = await ajaxBinary.getUser()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setUser！', apiData)
              window.localStorage.setItem('User', JSON.stringify(apiData.data))
              context.commit('setUser', apiData.data)
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 會員 - 紀錄 - 訂單
    async getUserRecordOrder (context) {
      // console.log('Vues-store使用: model(storeUser).action.getUserRecordOrder()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeUser/getUserRecordOrder', { root: true })
        } else {
          // console.log('驗證')
          const ret = await ajaxBinary.getUserRecordOrder()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setRecordOrder！', apiData)
              context.commit('setRecordOrder', apiData.data)
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 會員 - 紀錄 - 投注
    async getUserRecordBetting (context) {
      // console.log('Vues-store使用: model(storeUser).action.getUserRecordBetting()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeUser/getUserRecordBetting', { root: true })
        } else {
          // console.log('驗證')
          const ret = await ajaxBinary.getUserRecordBetting()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setRecordBetting！', apiData)
              context.commit('setRecordBetting', apiData.data)
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
