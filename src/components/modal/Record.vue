<template>
  <div class="modal fade bd-example-modal-lg-a" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ $t('menu.record.title') }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="list-group mb-3">
            <li class="list-group-item" v-for="(item, index) in bettingRecord" :key="index">
              <div class="row align-items-center">
                <div class="col">{{ item.id }}</div>
                <div class="col">{{ item.id }}</div>
                <div class="col">{{ item.value }}</div>
                <div class="col">{{ item.amount }}</div>
                <div class="col">{{ item.profit }}</div>
                <div class="col">{{ item.win_user }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Record',
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
        console.log('[components/modal/Record.vue] > methods > ready()')
      }
    }
  },
  computed: {
    bettingRecord: {
      get () {
        // Vuex.獲取.Getters > store\modules\user.js > getRecordBetting
        return this.$store.getters['storeUser/getRecordBetting']
      }
    }
  },
  watch: {
    bettingRecord: function (newVal, oldVal) {
      console.log('監聽資料')
    }
  },
  data () {
    return {
      debug: false
    }
  },
  beforeCreate () {},
  created () {
    console.log('紀錄資料換頁：還沒做')
  },
  beforeMount () {},
  mounted () {
    const that = this
    if (that.debug === true) {
      console.log('[components/modal/Record.vue] > mounted()')
    }
    that.ready()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
