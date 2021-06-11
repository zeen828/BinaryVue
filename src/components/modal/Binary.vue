<template>
  <div class="modal fade bd-example-modal-lg-b" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ $t('menu.introduction.title') }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group col-md-4">
            <select id="inputState" class="form-control" v-model="customBinaryId">
              <option v-for="(item, index) in globalCurrency" :key="index" :value="item.currency_id"> {{ item.binary }}</option>
            </select>
          </div>
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img :src="showCurrency.logo" :alt="showCurrency.name" class="img-logo" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ showCurrency.binary }}</h5>
                  <p class="card-text">{{ showCurrency.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Binary',
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
        console.log('[components/modal/Binary.vue] > methods > ready()')
      }
    },
    // 更新資訊
    updateInfo () {
      const that = this
      if (that.debug === true) {
        console.log('[components/modal/Binary.vue] > methods > update()')
      }
      // 針對物件去比對，回傳對應的資料
      const currencyItem = that.globalCurrency.filter(function (obj) {
        return obj.currency_id === that.customBinaryId
      })
      that.showCurrency = currencyItem.shift()
    }
  },
  computed: {
    globalCurrency: {
      get () {
        // Vuex.獲取.Getters > store\modules\binary.js > getCurrency
        return this.$store.getters['storeBinary/getCurrency']
      }
    }
  },
  watch: {
    // 監聽 > 自訂.二元期權ID(global:全域,custom:自訂)
    customBinaryId: function (newVal, oldVal) {
      const that = this
      if (that.debug === true) {
        console.log('[components/modal/Binary.vue] > watch > customBinaryId', newVal)
      }
      that.updateInfo()
    },
    // 產品資料讀取後執行
    globalCurrency: function (newVal, oldVal) {
      const that = this
      that.updateInfo()
    }
  },
  data () {
    return {
      showCurrency: {
        name: 'Bitcoin',
        description: 'Null',
        logo: 'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg'
      },
      customBinaryId: 1,
      debug: false
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    const that = this
    if (that.debug === true) {
      console.log('[components/modal/Binary.vue] > mounted()')
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
  max-width: 10vw;
  max-height: 10vw;
}
</style>
