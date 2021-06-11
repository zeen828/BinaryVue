<template>
  <div class="matte" v-show="loading">
    <div class="text-center">
      <div class="spinner-border text-warning loading-size" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
  </div>
</template>

<script>
// 遮片(鎖定用)
// 使用vuex的狀態管理(src\store\index.js)
export default {
  name: 'Matte',
  computed: {
    loading: {
      get () {
        return this.$store.getters.getLoading
      }
    }
  }
}
</script>

<style lang="scss">
.matte {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100vh;
  line-height: 100vh;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 500;
}
.loading-size {
  width: 10rem !important;
  height: 10rem !important;
  z-index: 600 !important;
}
.visually-hidden {
  position: fixed;
  z-index: 600;
}
</style>
