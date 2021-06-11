<template>
  <div class="login">
    登入中...
  </div>
</template>

<script>
export default {
  name: 'Login',
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
        console.log('[Login.vue] > methods > ready()')
      }
    },
    // 取得網址GET的TOKEN去更新TOKEN
    refreshToken () {
      const that = this
      if (that.debug === true) {
        console.log('[Login.vue] > methods > urlQuery()')
      }
      // Vuex.呼叫.Actions > store\index.js > getTokenRefresh()
      that.$store.dispatch('getTokenRefresh')
    }
  },
  computed: {
    loginCode: {
      get () {
        return this.$store.getters.getLoginCode
      }
    }
  },
  watch: {
    // 監聽
    loginCode: function (newVal, oldVal) {
      // console.log('有更新')
      switch (newVal) {
        case 200:
          // 跳轉
          this.$router.push({ name: 'Index' })
          break
        case 401:
        case 403:
          // 跳轉
          this.$router.push({ name: 'Logout' })
          break
        default:
          break
      }
    }
  },
  data () {
    return {
      debug: false
    }
  },
  beforeCreate () {
    const that = this
    if (that.debug === true) {
      console.log('[Login.vue] > beforeCreate()')
    }
    const token = this.$route.query.token
    // const time = new Date().getTime()
    window.localStorage.setItem('AccessToken', token)
    that.$store.commit('setAccessToken', token)
    // 時效
    // window.localStorage.setItem('AccessTokenExpires', time + (apiData.data.expires_in * 500))
  },
  created () {},
  beforeMount () {
    const that = this
    if (that.debug === true) {
      console.log('[Login.vue] > beforeMount()')
    }
    that.refreshToken()
  },
  mounted () {
    const that = this
    if (that.debug === true) {
      console.log('[Login.vue] > mounted()')
    }
    that.ready()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {
    // Socket.$off('message', this.handleGetMessage)
  },
  destroyed () {}
}
</script>
