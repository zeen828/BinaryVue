// API Lib
import ajaxBinary from '@/api/Binary.js'

export default {
  namespaced: true,
  // 用來資料共享資料儲存
  state: {
    rule: {
      // 規則-類型
      type: [
        {
          rule_id: 1,
          name: '大小',
          description: null,
          sort: 1
        }
      ],
      // 規則-幣種
      currency: [
        {
          rule_currency_id: 1,
          name: '大小',
          option: [
            {
              rule_currency_id: 1,
              title: '大',
              value: 'max'
            },
            {
              rule_currency_id: 1,
              title: '小',
              value: 'min'
            }
          ],
          odds: 0.960,
          sort: 1
        },
        {
          rule_currency_id: 2,
          name: '單雙',
          option: [
            {
              rule_currency_id: 2,
              title: '單',
              value: 'odd'
            },
            {
              rule_currency_id: 2,
              title: '雙',
              value: 'even'
            }
          ],
          odds: 0.960,
          sort: 1
        }
      ],
      // 規則-金額
      price: {
        butTen: 10,
        butHundred: 100,
        butHundredFive: 500,
        butThousand: 1000
      }
    },
    betting: {
      // 規則
      rule_id: 1,
      // 規則值
      rule_value: '',
      // 數量
      quantity: 1,
      // 金額
      amount: 10
    },
    // 除錯
    debug: false
  },
  // 用來註冊改變資料狀態
  mutations: {
    // 規則-類型
    setRuleType (state, val) {
      state.rule.type = val
    },
    // 規則-幣種
    setRuleCurrency (state, val) {
      state.rule.currency = val
    },
    // 規則-金額
    setRulePrice (state, val) {
      state.rule.price = val
    },
    // 下注 - 規則
    setBetRuleId (state, val) {
      state.betting.rule_id = val
    },
    // 下注 - 規則 - 數值
    setBetRuleValue (state, val) {
      state.betting.rule_value = val
    },
    // 下注 - 數量
    setBetQuantity (state, val) {
      state.betting.quantity = val
    },
    // 下注 - 金額
    setBetAmount (state, val) {
      state.betting.amount = val
    },
    // 除錯
    setDebug (state, val) {
      state.debug = val
    }
  },
  // 用來對共享資料進行過濾操作
  getters: {
    // 規則-類型
    getRuleType (state) {
      return state.rule.type
    },
    // 規則-幣種
    getRuleCurrency (state) {
      return state.rule.currency
    },
    // 規則-金額
    getRulePrice (state) {
      return state.rule.price
    },
    // 下注 - 規則
    getBetRuleId (state, val) {
      return state.betting.rule_id
    },
    // 下注 - 規則 - 數值
    getBetRuleValue (state, val) {
      return state.betting.rule_value
    },
    // 下注 - 數量
    getBetQuantity (state, val) {
      return state.betting.quantity
    },
    // 下注 - 金額
    getBetAmount (state, val) {
      return state.betting.amount
    },
    // 除錯
    getDebug (state) {
      return state.debug
    }
  },
  // 解決非同步改變共享資料
  actions: {
    ready (context) {
      console.log('Vues-store使用: model(storeBetting).action.ready()')
    },
    // 投注 - 規則
    async getRuleType (context) {
      // console.log('Vues-store使用: model(storeBetting).action.getRuleType()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeBetting/getRuleType', { root: true })
        } else {
          // console.log('投注 - 規則')
          const ret = await ajaxBinary.getRuleType()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setRuleType！', apiData)
              context.commit('setRuleType', apiData.data)
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 投注 - 規則
    async getRuleCurrency (context) {
      // console.log('Vues-store使用: model(storeBetting).action.getRuleCurrency()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          // console.log('未驗證')
          context.dispatch('getAccessToken', 'storeBetting/getRuleCurrency', { root: true })
        } else {
          // console.log('投注 - 規則')
          const ret = await ajaxBinary.getRuleCurrency()
          if (ret.status === 200 && ret.request.readyState === 4) {
            const apiData = ret.data
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！setRuleCurrency！', apiData)
              context.commit('setRuleCurrency', apiData.data)
            }
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    // 投注 - 下注
    async postBettingBet (context) {
      // console.log('Vues-store使用: model(storeBetting).action.postBettingBet()')
      try {
        const time = new Date().getTime()
        const accessToken = window.localStorage.getItem('AccessToken')
        const accessTokenExpires = window.localStorage.getItem('AccessTokenExpires')
        if (accessToken === null || accessToken === 'null' || time >= accessTokenExpires) {
          console.log('未驗證')
          context.dispatch('getAccessToken', 'storeBetting/postBettingBet', { root: true })
        } else {
          // console.log('投注 - 下注')
          context.commit('setToastInfo', '下注' + '|' + time, { root: true })
          const ret = await ajaxBinary.postBettingBet()
          // console.log('ret：', ret)
          if (ret.status === 201 && ret.request.readyState === 4) {
            const apiData = ret.data
            // console.log('apiData：', apiData)
            if (apiData !== null && apiData.success === true) {
              // console.log('紀錄！BettingBet！', apiData)
              context.commit('storeUser/setUserPoint', apiData.data.point, { root: true })
              context.commit('setToastSuccess', '下注成功' + '|' + time, { root: true })
              // console.log('下注成功')
              // 刷新下注紀錄
              context.dispatch('storeUser/getUserRecordBetting', null, { root: true })
            } else {
              // console.log('222-1')
              context.commit('setToastError', apiData.msg + '|' + time, { root: true })
            }
          } else {
            // console.log('222-2')
            context.commit('setToastError', ret.data.data.msg + '|' + time, { root: true })
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
