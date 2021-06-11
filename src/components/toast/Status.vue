<template>
  <Toasts></Toasts>
</template>

<script>
// 參考：https://www.npmjs.com/package/vue-bootstrap-toasts
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
        console.log('[components/toast/Status.vue] > methods > ready()')
      }
      // console.log('測試變數', that.toastType, that.toastTitle, that.toastMessage)
    },
    toastRoule (type, title) {
      // 整合toast
      if (title === '' || title === null) {
        return false
      }
      const strAry = title.split('|')
      const msg = strAry.shift()
      // console.log('strAry：', strAry, msg)
      switch (type) {
        case 'success':
          this.$toast.success(msg)
          break
        case 'warning':
          this.$toast.warning(msg)
          break
        case 'error':
          this.$toast.error(msg)
          break
        default:
          this.$toast.info(msg)
          break
      }
    }
  },
  computed: {
    globalToastInfo: {
      get () {
        // Vuex.獲取.Getters > store\index.js > getToastInfo
        return this.$store.getters.getToastInfo
      }
    },
    globalToastSuccess: {
      get () {
        // Vuex.獲取.Getters > store\index.js > getToastSuccess
        return this.$store.getters.getToastSuccess
      }
    },
    globalToastWarning: {
      get () {
        // Vuex.獲取.Getters > store\index.js > getToastWarning
        return this.$store.getters.getToastWarning
      }
    },
    globalToastError: {
      get () {
        // Vuex.獲取.Getters > store\index.js > getToastError
        return this.$store.getters.getToastError
      }
    }
  },
  watch: {
    globalToastInfo: function (newVal, oldVal) {
      // console.log('[components/toast/Status.vue] > watch > globalToastInfo()', newVal, oldVal)
      this.toastRoule('info', newVal)
    },
    globalToastSuccess: function (newVal, oldVal) {
      // console.log('[components/toast/Status.vue] > watch > globalToastSuccess()', newVal, oldVal)
      this.toastRoule('success', newVal)
    },
    globalToastWarning: function (newVal, oldVal) {
      // console.log('[components/toast/Status.vue] > watch > globalToastWarning()', newVal, oldVal)
      this.toastRoule('warning', newVal)
    },
    globalToastError: function (newVal, oldVal) {
      // console.log('[components/toast/Status.vue] > watch > globalToastError()', newVal, oldVal)
      this.toastRoule('error', newVal)
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
      console.log('[components/toast/Status.vue] > mounted()')
    }
    that.ready()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
