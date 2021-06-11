<template>
  <div id="app">
    <router-view/>
    <ToolsMatte></ToolsMatte>
  </div>
</template>

<script>
// import Socket from '@/api/Socket.js'
import $ from 'jquery'
import ToolsMatte from '@/components/html/Matte.vue'
export default {
  name: 'Home',
  components: {
    ToolsMatte
  },
  mixins: {},
  props: {},
  inheritAttrs: {},
  directives: {},
  filters: {},
  methods: {
    ready () {
      const that = this
      if (that.debug === true) {
        console.log('[App.vue] > methods > ready()')
      }
      that.runWebSocket()
      that.queryJQuery()
    },
    // App.vue > 1.讀取token
    loadToken () {
      const that = this
      if (that.debug === true) {
        console.log('[App.vue] > methods > loadToken()')
      }
      // Vuex.呼叫.Actions > store\index.js > getAccessToken()
      that.$store.dispatch('getAccessToken')
    },
    // App.vue > 2.避免資料一值重複打API，把一些比較不需要一值刷新的資料存起來取緩存取用
    localStorage () {
      const that = this
      if (that.debug === true) {
        console.log('[App.vue] > methods > localStorage()')
      }
      // 緩存處理 > 會員資料
      const User = window.localStorage.getItem('User')
      if (User !== null && User !== 'null') {
        if (that.debug === true) {
          console.log('[App.vue] > localStorage() > User：', User)
        }
        // Vuex.寫入.Mutations > store\modules\user.js > setUser()
        that.$store.commit('storeUser/setUser', JSON.parse(User))
      }
      // 緩存處理 > 二元幣種
      const Currency = window.localStorage.getItem('Currency')
      if (Currency !== null && Currency !== 'null') {
        if (that.debug === true) {
          console.log('[App.vue] > localStorage() > Currency：', Currency)
        }
        // Vuex.寫入.Mutations > store\modules\binary.js > setCurrency()
        that.$store.commit('storeBinary/setCurrency', JSON.parse(Currency))
      }
    },
    // WS:圖表資料
    runWebSocket () {
      const that = this
      that.wsConnection = new WebSocket(process.env.VUE_APP_WS_URL)
      // 開啟
      that.wsConnection.onopen = function (event) {
        // console.log('onopen', event)
      }
      // 有訊息
      that.wsConnection.onmessage = function (event) {
        // console.log('onmessage', event)
        // console.log('event.data', event.data)
        const tmpData = JSON.parse(event.data)
        // console.log('tmpData：', tmpData)
        that.$store.commit('storeBinary/setChartTrend', tmpData)
        // that.$store.commit('storeBinary/setChartTrend', tmpData.forecast)
      }
      // 關閉
      that.wsConnection.onclose = function (event) {
        // console.log('onclose', event)
      }
    },
    // 查詢jQuery版本
    queryJQuery () {
      const that = this
      if (that.debug === true) {
        console.log('[App.vue] > methods > queryJQuery() > JQuery：', $().jquery)
      }
    }
  },
  computed: {
    globalCurrencySelectId: {
      get () {
        return this.$store.getters['storeBinary/getCurrencySelect']
      }
    }
  },
  watch: {
    // 監聽
    globalCurrencySelectId: function (newVal, oldVal) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/TrendDraw.vue] > watch > globalCurrencySelectId')
      }
      that.wsConnection.send('{"changeCurrency":' + newVal + '}')
    }
  },
  data () {
    return {
      wsConnection: null,
      debug: false
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {
    const that = this
    if (that.debug === true) {
      console.log('[App.vue] > beforeMount()')
    }
    that.localStorage()
    // 註冊換地方處理(Login.vue)
    // that.loadToken()
  },
  mounted () {
    const that = this
    if (that.debug === true) {
      console.log('[App.vue] > mounted()')
    }
    that.ready()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
