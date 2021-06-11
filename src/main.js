import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// i18n - 多國語系
import VueI18n from 'vue-i18n'// 引入 Vue I18n
import zh from './i18n/zh'// 存放中文語系檔
import en from './i18n/en'// 存放英文語系檔
// Bootstrap - Toasts
import VueBootstrapToasts from 'vue-bootstrap-toasts'

// i18n - 多國語系
Vue.use(VueI18n)
// 預設使用的語系
let locale = 'zh'
// 檢查 localStorage 是否已有保存使用者選用的語系資訊
if (localStorage.getItem('website-lang')) {
  locale = localStorage.getItem('website-lang')
  store.commit('setLang', locale)
} else {
  localStorage.setItem('website-lang', locale)
  store.commit('setLang', locale)
}
const i18n = new VueI18n({
  locale: locale,
  messages: {
    zh: zh,
    en: en
  }
})

// Bootstrap - Toasts
Vue.use(VueBootstrapToasts)

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
