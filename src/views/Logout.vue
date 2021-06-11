<template>
  <div class="logout">
    <img :src="logoutImg" />
  </div>
</template>

<script>
export default {
  name: 'Logout',
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
        console.log('[views/Logout.vue] > methods > ready()')
      }
    },
    // Logout.vue > 0.登出
    logout () {
      const that = this
      if (that.debug === true) {
        console.log('[views/Logout.vue] > methods > logout()')
      }
      // Vuex.呼叫.Actions > store\index.js > logout()
      that.$store.dispatch('logout')
    }
  },
  computed: {},
  watch: {},
  data () {
    return {
      logoutImg: require('@/assets/img/logout.gif'),
      debug: false
    }
  },
  beforeCreate () {},
  created () {},
  beforeMount () {
    const that = this
    if (that.debug === true) {
      console.log('[views/Logout.vue] > beforeMount()')
    }
    that.logout()
  },
  mounted () {
    const that = this
    if (that.debug === true) {
      console.log('[views/Logout.vue] > mounted()')
    }
    that.ready()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
