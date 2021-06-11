<template>
  <div id="app">
    <div class="container-fluid">
      <HtmlNav></HtmlNav>
      <div class="row d-md-block">
        <div class="col-12 col-md-3 float-md-left d-flex flex-wrap p-0">
          <div class="col-12 order-2 order-md-1">
            <TrendDraw></TrendDraw>
          </div>
          <div class="col-12 order-1 order-md-2">
            <User></User>
          </div>
        </div>
        <div class="col-12 col-md-9 float-md-right p-0">
          <div class="col-12">
            <ChartTrend></ChartTrend>
          </div>
          <div class="col-12">
            <ChartK></ChartK>
          </div>
        </div>
        <div class="col-12 col-md-3 float-md-left p-0">
          <div class="col-12">
            <TrendMinute></TrendMinute>
          </div>
        </div>
      </div>
    </div>
    <div id="toast">
      <ToastStatus></ToastStatus>
    </div>
    <div id="modal">
      <ModalBinary></ModalBinary>
      <ModalRecord></ModalRecord>
    </div>
  </div>
</template>

<script>
import HtmlNav from '@/components/html/Nav.vue'
import TrendDraw from '@/components/items/TrendDraw.vue'
import User from '@/components/items/User.vue'
import TrendMinute from '@/components/items/TrendMinute.vue'
import ChartTrend from '@/components/items/ChartTrend.vue'
import ChartK from '@/components/items/ChartK.vue'
import ToastStatus from '@/components/toast/Status.vue'
import ModalBinary from '@/components/modal/Binary.vue'
import ModalRecord from '@/components/modal/Record.vue'
export default {
  name: 'Index',
  components: {
    HtmlNav,
    TrendDraw,
    User,
    TrendMinute,
    ChartTrend,
    ChartK,
    ToastStatus,
    ModalBinary,
    ModalRecord
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
        console.log('[views/Index.vue] > methods > ready()')
      }
      that.loadData()
      that.loadLinkData()
    },
    // Index.vue > 1. 取得不需要經常性更新資料
    loadData () {
      const that = this
      if (that.debug === true) {
        console.log('[views/Index.vue] > methods > loadData()')
      }
      // Docking
      // that.$store.dispatch('getAccessToken')
      // that.$store.dispatch('logout')
      // User
      // that.$store.dispatch('storeUser/getUser')// 要迴圈處理，放在原件(src\components\items\User.vue)上運作
      that.$store.dispatch('storeUser/getUserRecordOrder')
      that.$store.dispatch('storeUser/getUserRecordBetting')
      // Binary
      that.$store.dispatch('storeBinary/getBinary')
      // that.$store.dispatch('storeBinary/getBinaryCurrency')// 要迴圈處理，放在原件(src\components\items\TrendMinute.vue)上運作
      // that.$store.dispatch('storeBinary/getBinaryCurrencyTrendMinute')
      // that.$store.dispatch('storeBinary/getBinaryCurrencyTrendDraw')
      // that.$store.dispatch('storeBinary/getBinaryCurrencyChartTrend')
      // that.$store.dispatch('storeBinary/getBinaryCurrencyChartK')
      // Betting
      that.$store.dispatch('storeBetting/getRuleType')
      // that.$store.dispatch('storeBetting/getRuleCurrency')
      // that.$store.dispatch('storeBetting/getBettingBet')
    },
    // Index.vue > 2. 取得需要連動資料
    loadLinkData () {
      const that = this
      if (that.debug === true) {
        console.log('[views/Index.vue] > methods > loadLinkData()')
      }
      // Binary
      that.$store.dispatch('storeBinary/getBinaryCurrencyTrendMinute')
      that.$store.dispatch('storeBinary/getBinaryCurrencyTrendDraw')
      // 改用WebSocket取走勢圖資料
      // that.$store.dispatch('storeBinary/getBinaryCurrencyChartTrend')
      that.$store.dispatch('storeBinary/getBinaryCurrencyChartK')
      // Betting
      that.$store.dispatch('storeBetting/getRuleCurrency')
    }
  },
  computed: {
    loginCode: {
      get () {
        return this.$store.getters.getLoginCode
      }
    },
    // 幣種選擇ID(global:全域,custom:自訂)
    globalCurrencySelectId: {
      get () {
        return this.$store.getters['storeBinary/getCurrencySelect']
      }
    }
  },
  watch: {
    // 監聽
    loginCode: function (newVal, oldVal) {
      console.log('有更新')
      switch (newVal) {
        case 401:
        case 403:
          // 跳轉
          this.$router.push({ name: 'Logout' })
          break
        default:
          break
      }
    },
    // 監聽
    // Index.vue > 3. 監聽選擇`連動資料`更新
    globalCurrencySelectId: function (newVal, oldVal) {
      const that = this
      if (that.debug === true) {
        console.log('[views/Index.vue] > watch > globalCurrencySelectId', newVal)
      }
      that.loadLinkData()
    }
  },
  data () {
    return {
      debug: false
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    const that = this
    if (that.debug === true) {
      console.log('[views/Index.vue] > mounted()')
    }
    that.ready()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
