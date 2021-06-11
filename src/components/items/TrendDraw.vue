<template>
  <ul class="list-group mb-3">
    <li class="list-group-item list-group-item-secondary">{{ showCurrency.period }}期</li>
    <li class="list-group-item">
      <div class="row align-items-center">
        <div class="col col-md-2">
          <img :src="showCurrency.logo" :alt="showCurrency.binary" class="img-logo" />
        </div>
        <div class="col col-md-6">{{ showCurrency.binary }}</div>
        <div class="col col-md-4">{{ showCurrency.trend }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TrendDraw',
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
        console.log('[components/items/TrendDraw.vue] > methods > ready()')
      }
      that.update()
    },
    update () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/TrendDraw.vue] > methods > update()')
      }
      // 物件比對欄位資料挑選
      const currencyItem = that.globalCurrency.filter(function (obj) {
        return obj.currency_id === that.globalCurrencySelectId
      })
      that.showCurrency = currencyItem.shift()
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
      }
    }
  },
  watch: {
    // 監聽
    globalCurrency: function (newVal, oldVal) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/TrendDraw.vue] > watch > globalCurrency')
      }
      that.update()
    },
    // 監聽
    globalCurrencySelectId: function (newVal, oldVal) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/TrendDraw.vue] > watch > globalCurrencySelectId')
      }
      that.update()
    }
  },
  data () {
    return {
      showCurrency: {
        binary: '期權',
        logo: 'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg',
        period: '期數',
        trend: '0000.00'
      },
      debug: false
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    const that = this
    if (that.debug === true) {
      console.log('[components/items/TrendDraw.vue] > mounted()')
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
.img-logo {
  min-width: 40px;
  max-width: 2vw;
  min-height: 40px;
  max-height: 2vw;
}
</style>
