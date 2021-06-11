<template>
  <ul class="list-group mb-3">
    <li class="list-group-item list-group-item-secondary">收盤價(每分鐘更新)</li>
    <li v-for="(item, index) in globalCurrency" :key="index" class="list-group-item">
      <div class="row align-items-center mouse" @click="currencySelect(item.currency_id)">
        <div class="col col-md-2">
          <img :src="item.logo" :alt="item.binary" class="img-logo" />
        </div>
        <div class="col col-md-6">{{ item.binary }}</div>
        <div class="col col-md-4">{{ item.trend }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TrendMinute',
  components: {},
  mixins: {},
  props: {},
  inheritAttrs: {},
  directives: {},
  filters: {},
  methods: {
    ready () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/TrendMinute.vue] > methods > ready()')
      }
      that.loadData()
      // that.myLoop = setInterval(that.loadData, 10000)
      // 1000=1s,10000=10s,30000=30s
    },
    loadData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/TrendMinute.vue] > methods > loadData()')
      }
      that.$store.dispatch('storeBinary/getBinaryCurrency')
    },
    currencySelect (id) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/TrendMinute.vue] > methods > selectOption()')
      }
      that.globalCurrencySelectId = id
    }
  },
  computed: {
    globalCurrency: {
      get () {
        return this.$store.getters['storeBinary/getCurrency']
      }
    },
    globalCurrencySelectId: {
      get () {
        return this.$store.getters['storeBinary/getCurrencySelect']
      },
      set (val) {
        this.$store.commit('storeBinary/setCurrencySelect', val)
      }
    }
  },
  watch: {},
  data () {
    return {
      // 迴圈
      myLoop: null,
      debug: false
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    const that = this
    if (that.debug === true) {
      console.log('[components/items/TrendMinute.vue] > mounted()')
    }
    that.ready()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {
    const that = this
    if (that.debug === true) {
      console.log('[components/items/TrendMinute.vue] > beforeDestroy()')
    }
    // 清除迴圈
    clearInterval(that.myLoop)
  },
  destroyed () {}
}
</script>

<style lang="scss">
/* 滑鼠指標 */
.mouse {
  cursor: pointer;
}
.img-logo {
  min-width: 40px;
  max-width: 2vw;
  min-height: 40px;
  max-height: 2vw;
}
</style>
