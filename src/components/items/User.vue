<template>
  <ul class="list-group mb-3">
    <li class="list-group-item">
      <v-icon name="user"></v-icon>：{{ user.name }}
      <router-link :to="{ name: 'Logout' }">
        <v-icon name="door-open"></v-icon>
      </router-link>
    </li>
    <li class="list-group-item">
      <v-icon name="gem"></v-icon>：{{ user.point }}
    </li>
    <li class="list-group-item">
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="globalBetAmount" placeholder="Search">
        <div class="input-group-append">
          <button type="button" class="btn btn-secondary" @click="changeRules(1)"><v-icon name="exchange-alt"></v-icon>切換{{ showChangeRule.name }}</button>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group" role="group" aria-label="First group">
          <button type="button" class="btn btn-secondary" @click="changePrice(globalRulePrice.butTen)">{{ globalRulePrice.butTen }}</button>
        </div>
        <div class="input-group">
          <button type="button" class="btn btn-secondary" @click="changePrice(globalRulePrice.butHundred)">{{ globalRulePrice.butHundred }}</button>
        </div>
        <div class="input-group">
          <button type="button" class="btn btn-secondary" @click="changePrice(globalRulePrice.butHundredFive)">{{ globalRulePrice.butHundredFive }}</button>
        </div>
        <div class="input-group">
          <button type="button" class="btn btn-secondary" @click="changePrice(globalRulePrice.butThousand)">{{ globalRulePrice.butThousand }}</button>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <div class="row align-items-center">
        <div class="col-6">
          <button type="button" class="btn btn-success" @click="betting(showUseRule.option[0].rule_currency_id, showUseRule.option[0].value)">{{ showUseRule.option[0].title }} {{ 1 + parseFloat(showUseRule.odds) }}</button>
        </div>
        <div class="col-6">
          <button type="button" class="btn btn-danger" @click="betting(showUseRule.option[1].rule_currency_id, showUseRule.option[1].value)">{{ showUseRule.option[1].title }} {{ 1 + parseFloat(showUseRule.odds) }}</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)
export default {
  name: 'User',
  components: {
    'v-icon': Icon
  },
  mixins: {},
  props: {},
  inheritAttrs: {},
  directives: {},
  filters: {},
  methods: {
    ready () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/User.vue] > methods > ready()')
      }
      that.loadData()
      // that.myLoop = setInterval(that.loadData, 30000)
      // 1000=1s,10000=10s,30000=30s
    },
    loadData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/User.vue] > methods > loadData()')
      }
      that.$store.dispatch('storeUser/getUser')
    },
    // 切換金額
    changePrice (val) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/User.vue] > methods > changePrice()')
      }
      that.globalBetAmount = val
    },
    // 切換規則
    changeRules (id) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/User.vue] > methods > changeRules()')
      }
      that.tmpeRuleCurrency = []
      // 1.使用中的規則
      if (that.apiRuleCurrency.length !== 0) {
        that.showUseRule = that.apiRuleCurrency.shift()
      }
      // 2.準備切換的規則
      if (that.apiRuleCurrency.length !== 0) {
        that.showChangeRule = that.apiRuleCurrency.shift()
        // 3.暫存-準備切換的回塞
        that.tmpeRuleCurrency.push(that.showChangeRule)
      }
      // 迴圈
      if (that.apiRuleCurrency.length !== 0) {
        that.apiRuleCurrency.forEach(function (item) {
          // 循環(準備切換的, 還未用的1, 還未用的2, 使用中的)
          // 4.暫存-還未用的回塞
          that.tmpeRuleCurrency.push(item)
        })
      }
      // 5.暫存-使用中的回塞
      that.tmpeRuleCurrency.push(that.showUseRule)
      // 6.回存
      that.apiRuleCurrency = []
      that.apiRuleCurrency = that.tmpeRuleCurrency
    },
    // 下注
    betting (ruleId, ruleVal) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/User.vue] > methods > betting()')
      }
      // console.log('ruleId：', ruleId, ' ruleVal', ruleVal)
      that.globalBetRuleId = ruleId
      that.globalBetRuleValue = ruleVal
      that.$store.dispatch('storeBetting/postBettingBet')
    }
  },
  computed: {
    // 會員 - 資訊
    user: {
      get () {
        return this.$store.getters['storeUser/getUser']
      }
    },
    // 規則 - 幣種
    globalRuleCurrency: {
      get () {
        return this.$store.getters['storeBetting/getRuleCurrency']
      },
      set (val) {
        this.$store.commit('storeBetting/setRuleCurrency', val)
      }
    },
    // 規則 - 可下注金額
    globalRulePrice: {
      get () {
        return this.$store.getters['storeBetting/getRulePrice']
      }
    },
    // 下注 - 規則
    globalBetRuleId: {
      get () {
        return this.$store.getters['storeBetting/getBetRuleId']
      },
      set (val) {
        this.$store.commit('storeBetting/setBetRuleId', val)
      }
    },
    // 下注 - 規則 - 數值
    globalBetRuleValue: {
      get () {
        return this.$store.getters['storeBetting/getBetRuleValue']
      },
      set (val) {
        this.$store.commit('storeBetting/setBetRuleValue', val)
      }
    },
    // 下注 - 數量
    globalBetQuantity: {
      get () {
        return this.$store.getters['storeBetting/getBetQuantity']
      },
      set (val) {
        this.$store.commit('storeBetting/setBetQuantity', val)
      }
    },
    // 下注 - 金額
    globalBetAmount: {
      get () {
        return this.$store.getters['storeBetting/getBetAmount']
      },
      set (val) {
        this.$store.commit('storeBetting/setBetAmount', val)
      }
    }
  },
  watch: {
    // 監聽 > 自訂.二元期權ID(global:全域,custom:自訂)
    globalRuleCurrency: function (newVal, oldVal) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/User.vue] > watch > globalRuleCurrency', newVal)
      }
      // 新資料更新道作業變數
      if (newVal.length >= 1) {
        that.apiRuleCurrency = newVal
        // 切換規則
        that.changeRules()
      }
    }
  },
  data () {
    return {
      // 金額
      showPrice: 10,
      // 使用中的規則
      showUseRule: {
        rule_currency_id: 1,
        name: '規則',
        option: [
          {
            rule_currency_id: 1,
            title: '規則A',
            value: 'typeA'
          },
          {
            rule_currency_id: 1,
            title: '規則B',
            value: 'typeB'
          }
        ],
        odds: 0.960,
        sort: 1
      },
      // 要切換的規則
      showChangeRule: {
        name: '規則'
      },
      // Api的規則
      apiRuleCurrency: [],
      // 暫存的規則
      tmpeRuleCurrency: [],
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
      console.log('[components/items/User.vue] > mounted()')
    }
    that.ready()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {
    const that = this
    if (that.debug === true) {
      console.log('[components/items/User.vue] > beforeDestroy()')
    }
    // 清除迴圈
    clearInterval(that.myLoop)
  },
  destroyed () {}
}
</script>
