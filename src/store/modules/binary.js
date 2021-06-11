// API Lib
import ajaxBinary from '@/api/Binary.js'

export default {
  namespaced: true,
  // 用來資料共享資料儲存
  state: {
    binary: {
      // 期權 - 選擇
      select: 1,
      // 期權
      data: [
        {
          id: 1,
          name: '',
          description: '',
          order: '',
          at: ''
        }
      ]
    },
    currency: {
      // 期權 - 幣種 - 選擇
      select: 1,
      // 期權 - 幣種
      data: [
        {
          binary_id: 1,
          binary_currency_id: 1,
          name: '',
          code: '',
          description: '',
          currency_name: '',
          currency_code: '',
          logo: 'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg'
          // period: '20210408',
          // trend: '5341.65'
        }
      ]
    },
    trend: {
      // 期權 - 幣種 - 走勢 - 每分鐘
      minute: [
        {
          trend_id: 1,
          binary_currency_id: 1,
          period: '',
          draw_at: '',
          trend: '0000.00'
        }
      ],
      // 期權 - 幣種 - 走勢 - 開獎
      draw: []
    },
    chart: {
      // 期權 - 幣種 - 圖表 - 走勢
      trend: [
        {
          name: '00:00:00',
          value: [
            '2021-01-01 00:00:00',
            100.00
          ]
        },
        {
          name: '00:01:00',
          value: [
            '2021-01-01 00:01:00',
            139.78
          ]
        }
      ],
      // 期權 - 幣種 - 圖表 - K線圖
      k: [
        {
          date: '2021-01-01',
          open: 10,
          close: 50,
          high: 150,
          low: 45
        }
      ]
    },
    // 除錯
    debug: false
  },
  // 用來註冊改變資料狀態
  mutations: {
    setBinarySelect (state, val) {
      state.binary.select = val
    },
    // 期權 - 清單
    setBinary (state, val) {
      state.binary.data = val
    },
    setCurrencySelect (state, val) {
      state.currency.select = val
    },
    // 期權 - 清單
    setCurrency (state, val) {
      state.currency.data = val
    },
    // 期權 - 走勢 - 每分鐘
    setTrendMinute (state, val) {
      state.trend.minute = val
    },
    // 期權 - 走勢 - 開獎
    setTrendDraw (state, val) {
      state.trend.draw = val
    },
    // 期權 - 圖表 - 走勢
    setChartTrend (state, val) {
      state.chart.trend = val
    },
    // 期權 - 圖表 - K線圖
    setChartK (state, val) {
      state.chart.k = val
    },
    // 除錯
    setDebug (state, val) {
      state.debug = val
    }
  },
  // 用來對共享資料進行過濾操作
  getters: {
    getBinarySelect (state) {
      return state.binary.select
    },
    // 期權 - 清單
    getBinary (state) {
      return state.binary.data
    },
    getCurrencySelect (state) {
      return state.currency.select
    },
    // 期權 - 清單
    getCurrency (state) {
      return state.currency.data
    },
    // 期權 - 走勢 - 每分鐘
    getTrendMinute (state) {
      return state.trend.minute
    },
    // 期權 - 走勢 - 開獎
    getTrendDraw (state) {
      return state.trend.draw
    },
    // 期權 - 圖表 - 走勢
    getChartTrend (state) {
      return state.chart.trend
    },
    // 期權 - 圖表 - K線圖
    getChartK (state) {
      return state.chart.k
    },
    // 除錯
    getDebug (state) {
      return state.debug
    }
  },
  // 解決非同步改變共享資料
  actions: {
    ready (context) {
      console.log('Vues-store使用: model(storeBinary).action.ready()')
    },
    // 期權 - 清單
    async getBinary (context) {
      // console.log('Vues-store使用: model(storeBinary).action.getBinary()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeBinary/getBinary', { root: true })
        } else {
          // console.log('驗證')
          const ret = await ajaxBinary.getBinary()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setBinary！', apiData)
              window.localStorage.setItem('Binary', JSON.stringify(apiData.data))
              context.commit('setBinary', apiData.data)
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 期權 - 清單
    async getBinaryCurrency (context) {
      // console.log('Vues-store使用: model(storeBinary).action.getBinaryCurrency()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeBinary/getBinaryCurrency', { root: true })
        } else {
          // console.log('驗證')
          const ret = await ajaxBinary.getBinaryCurrency()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setCurrency！', apiData)
              window.localStorage.setItem('Currency', JSON.stringify(apiData.data))
              context.commit('setCurrency', apiData.data)
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 期權 - 走勢 - 每分鐘
    async getBinaryCurrencyTrendMinute (context) {
      // console.log('Vues-store使用: model(storeBinary).action.getBinaryCurrencyTrendMinute()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeBinary/getBinaryCurrencyTrendMinute', { root: true })
        } else {
          // console.log('驗證')
          const ret = await ajaxBinary.getBinaryCurrencyTrendMinute()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setTrendMinute！', apiData)
              context.commit('setTrendMinute', apiData.data)
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 期權 - 走勢 - 開獎
    async getBinaryCurrencyTrendDraw (context) {
      // console.log('Vues-store使用: model(storeBinary).action.getBinaryCurrencyTrendDraw()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeBinary/getBinaryCurrencyTrendDraw', { root: true })
        } else {
          // console.log('驗證')
          const ret = await ajaxBinary.getBinaryCurrencyTrendDraw()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setTrendDraw！', apiData)
              context.commit('setTrendDraw', apiData.data)
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 期權 - 圖表 - 走勢
    async getBinaryCurrencyChartTrend (context) {
      // console.log('Vues-store使用: model(storeBinary).action.getBinaryCurrencyChartTrend()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeBinary/getBinaryCurrencyChartTrend', { root: true })
        } else {
          // console.log('驗證')
          const ret = await ajaxBinary.getBinaryCurrencyChartTrend()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setChartTrend！', apiData)
              // 改多筆結構，取第一筆就好
              // context.commit('setChartTrend', apiData.data.shift())
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 期權 - 圖表 - K線圖
    async getBinaryCurrencyChartK (context) {
      // console.log('Vues-store使用: model(storeBinary).action.getBinaryCurrencyChartK()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeBinary/getBinaryCurrencyChartK', { root: true })
        } else {
          // console.log('驗證')
          const ret = await ajaxBinary.getBinaryCurrencyChartK()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setChartK！', apiData)
              context.commit('setChartK', apiData.data)
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
