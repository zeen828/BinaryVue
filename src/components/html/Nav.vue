<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">{{ $t('menu.binary.title') }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Menu" aria-controls="Menu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="Menu" class="collapse navbar-collapse">
      <div class="navbar-nav">
        <a class="nav-item nav-link active" href="#">{{ $t('menu.home.title') }}</a>
        <a class="nav-item nav-link" href="#" data-toggle="modal" data-target=".bd-example-modal-lg-a">{{ $t('menu.record.title') }}</a>
        <a class="nav-item nav-link" href="#" data-toggle="modal" data-target=".bd-example-modal-lg-b">{{ $t('menu.introduction.title') }}</a>
        <router-link class="nav-item nav-link" :to="{ name: 'Logout' }">{{ $t('menu.logout.title') }}</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
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
        console.log('[components/html/Nav.vue] > methods > ready()')
      }
    }
  },
  computed: {},
  watch: {},
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
      console.log('[components/html/Nav.vue] > mounted()')
    }
    that.ready()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
