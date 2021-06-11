import Api from '@/api/Base'
import Store from '@/store/index.js'

export default {
  debug: false,
  // 對接會員 - 平台
  getToken () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getToken()')
    }
    // http://127.0.0.1:8000/api/v1/docking/platform?iv=platform&key=$2y$10$H70vhHfsMe/QOlhxdlf2Ze2M1jAsdT34VUfY2lmTAnS.lvOQLlNYu&signature=123signature
    // console.log('IV：', process.env.VUE_APP_DEALER_IV)
    // console.log('KEY：', process.env.VUE_APP_DEALER_KEY)
    var dealerKey = '$2y$10$H70vhHfsMe/QOlhxdlf2Ze2M1jAsdT34VUfY2lmTAnS.lvOQLlNYu'
    return Api().get('api/v1/docking/platform', { params: { iv: process.env.VUE_APP_DEALER_IV, key: dealerKey, signature: 'test_signature' } })
  },
  // 對接會員 - 更新Token
  getRefreshToken () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getRefreshToken()')
    }
    return Api().put('/api/v1/docking/token/refresh')
  },
  // 會員 - 資訊
  getUser () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getUser()')
    }
    return Api(false).get('api/v1/user/info')
  },
  // 會員 - 紀錄 - 訂單
  getUserRecordOrder () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getUserRecordOrder()')
    }
    return Api().get('api/v1/user/record/order')
  },
  // 會員 - 紀錄 - 投注
  getUserRecordBetting () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getUserRecordBetting()')
    }
    return Api().get('api/v1/user/record/betting')
  },
  // 期權
  getBinary () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getBinary()')
    }
    return Api().get('api/v1/binary/list')
  },
  // 期權 - 幣種 - 清單
  getBinaryCurrency () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getBinaryCurrency()')
    }
    return Api(false).get('api/v1/currency/list')
  },
  // 期權 - 幣種 - 走勢 - 每分鐘
  getBinaryCurrencyTrendMinute () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getBinaryCurrencyTrendMinute()')
    }
    const id = Store.getters['storeBinary/getCurrencySelect']
    return Api().get('api/v1/currency/trend/minute', { params: { currency_id: id } })
  },
  // 期權 - 幣種 - 走勢 - 開獎
  getBinaryCurrencyTrendDraw () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getBinaryCurrencyTrendDraw()')
    }
    const id = Store.getters['storeBinary/getCurrencySelect']
    return Api().get('api/v1/currency/trend/draw', { params: { currency_id: id } })
  },
  // 期權 - 幣種 - 圖表 - 走勢
  getBinaryCurrencyChartTrend () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getBinaryCurrencyChartTrend()')
    }
    const id = Store.getters['storeBinary/getCurrencySelect']
    const at = '2021-04-01 01:01:00'
    console.log('ID---', id)
    return Api().get('api/v1/currency/chart/trend', { params: { currency_id: id, draw_at: at } })
  },
  // 期權 - 幣種 - 圖表 - K線圖
  getBinaryCurrencyChartK () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getBinaryCurrencyChartK()')
    }
    const id = Store.getters['storeBinary/getCurrencySelect']
    return Api().get('api/v1/currency/chart/k', { params: { currency_id: id } })
  },
  // 規則 - 類型
  getRuleType () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getRuleType()')
    }
    return Api().get('api/v1/betting/rule/type')
  },
  // 規則 - 幣種
  getRuleCurrency () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> getRuleCurrency()')
    }
    const id = Store.getters['storeBinary/getCurrencySelect']
    return Api().get('api/v1/betting/rule/currency', { params: { currency_id: id } })
  },
  // 投注 - 下注
  postBettingBet () {
    if (this.debug === true) {
      console.log('API調用：Binary.js -> postBettingBet()')
    }
    const formData = new FormData()
    // const id = Store.getters['storeBinary/getCurrencySelect']
    formData.append('currency_id', Store.getters['storeBinary/getCurrencySelect'])
    formData.append('rule_id', Store.getters['storeBetting/getBetRuleId'])
    formData.append('rule_value', Store.getters['storeBetting/getBetRuleValue'])
    formData.append('quantity', Store.getters['storeBetting/getBetQuantity'])
    formData.append('amount', Store.getters['storeBetting/getBetAmount'])
    return Api().post('api/v1/betting/bet', formData)
  }
}
