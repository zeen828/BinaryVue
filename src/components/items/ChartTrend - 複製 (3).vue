<template>
  <ul class="list-group mb-3">
    <li class="list-group-item list-group-item-secondary">走勢圖</li>
    <li class="list-group-item">
      <div id="trendChart" style="height: 40vh;"></div>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
export default {
  name: 'ChartTrend',
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
        console.log('[components/items/ChartTrend.vue] > methods > ready()')
      }
      that.createTrendChart()
      that.loadData()
    },
    // 3.讀取遠端資料
    loadData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > loadData()')
      }
      // that.$store.dispatch('storeBinary/getBinaryCurrencyChartTrend')
    },
    // 5.資料整理
    updataData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > updataData()')
      }
      // 整理
      // JSON資料轉換成物件&陣列
      const forecast = JSON.parse(that.chartData.forecast)
      // 存放容器判斷
      if (that.trendChart.tmpUseData.length === 0) {
        // API資料存放-暫存使用區
        that.trendChart.tmpUseData = forecast.trend
      } else {
        // API資料存放-暫存備用區
        that.trendChart.tmpSpareData = forecast.trend
      }
      // 執行時機
      if (that.trendChart.chartData.length === 0) {
        // console.log('第一次執行')
        // 整理10筆資料
        that.mergeChartData(10)
        // 打開動態
        // that.updateTrendChart()
      } else {
        // console.log('非第一次執行')
      }
    },
    // 取資料
    mergeChartData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > mergeChartData()')
      }
      // 補資料 & 備用區搬移 判斷
      switch (that.trendChart.tmpUseData.length) {
        case 0:
          // console.log('備用區搬移')
          that.trendChart.tmpUseData = that.trendChart.tmpSpareData
          that.trendChart.tmpSpareData = []
          break
        case 10:
          // console.log('補資料')
          that.loadData()
          break
        default:
          break
      }
      // 需不需要刪除第一筆
      if (that.trendChart.chartData.length >= that.trendChart.quantity) {
        // 去除第一筆
        that.trendChart.chartData.shift()
      }
      // console.log('len, quantity', that.trendChart.chartData.length, that.trendChart.quantity, that.trendChart.chartData)
      // 自動產生出最大筆數
      while (that.trendChart.chartData.length < that.trendChart.quantity) {
        // console.log('轉移資料', that.trendChart.tmpUseData)
        const NewData = that.trendChart.tmpUseData.shift()
        if (NewData !== undefined) {
          that.trendChart.chartData.push(NewData)
        }
      }
    },
    // 處理封盤區塊用
    mergeAreaData (areaData) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > mergeAreaData()')
      }
      console.log('areaData：', areaData)
      // const tmp = [
      //   { name: '停止下注', xAxis: forecast.markArea.start }, { xAxis: forecast.markArea.end }
      // ]
      // that.trendChart.chart.setOption(that.trendChart.updateOptionArea)
    },
    // 2.DOM建立圖表
    createTrendChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > createTrendChart()')
      }
      // 指定DOM物件，初始化圖表實例
      that.trendChart.chart = echarts.init(document.getElementById('trendChart'))
      // 圖表實例設定資料
      that.trendChart.option && that.trendChart.chart.setOption(that.trendChart.option)
    },
    // 更新-走勢圖
    updateTrendChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > updateTrendChart()')
      }
      // 獲取當下秒數
      that.trendChart.quantity = new Date().getSeconds()
      // 迴圈(1000=1s)
      that.myLoop = setInterval(function () {
        that.mergeChartData()
        that.trendChart.updateOption.series[0].data = that.trendChart.chartData
        that.trendChart.chart.setOption(that.trendChart.updateOption)
      }, 1000)
    }
  },
  computed: {
    chartData: {
      get () {
        return this.$store.getters['storeBinary/getChartTrend']
      }
    }
  },
  watch: {
    // 4.資料更新
    chartData: function (newVal, oldVal) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > watch > chartData！New Val：', newVal)
      }
      // that.updataData()
    }
  },
  data () {
    return {
      // 開關
      switch: false,
      // 圖表上顯示資料筆數
      trendChart: {
        // 圖表
        chart: null,
        // 圖表資料筆數
        quantity: 10,
        // 圖表-選項
        option: {
          title: { text: '走勢圖' },
          // 圖表顯示model區塊
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: true
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: true
            }
          },
          // 曲線圖名稱，要對應series的資料
          legend: { data: ['目前走勢'] },
          series: [{
            name: '目前走勢',
            type: 'line',
            showSymbol: true,
            // 區塊
            markArea: {
              silent: true,
              itemStyle: {
                color: 'rgba(175,43,117,0.2)'
              },
              data: []
            },
            data: [
              // { name: '11', value: ['1997/01/01 01:01:01', 100] },
              // { name: '22', value: ['1997/01/01 01:01:02', 150] }
            ]
          }]
        },
        // 更新用區塊
        updateOptionArea: {
          series: [
            {
              markArea: {
                data: []
              }
            }
          ]
        },
        // 更新用
        updateOption: {
          series: [
            { data: [] }
          ]
        },
        // 圖表-資料
        chartData: [],
        // 圖表-暫存-使用
        tmpUseData: [],
        // 圖表-暫存-備用
        tmpSpareData: []
      },
      // 迴圈
      myLoop: null,
      debug: false
    }
  },
  beforeCreate () {},
  created () {
    // 主程式會統一接收WS在做資料處理
    //     判斷WS內的資料是不是該前端目前選擇的
    // 畫面上固定30個點，沒資料的只給X座標就好
    // 圖表資料是本身的資料+Vuex收集的資料=更新圖表
    // # 設計一組共用資料格式，可以合併本體資料產生圖表
    // # 缺資料，假資料的走勢沒資料
    // # 後端開獎工具還沒寫
    console.log('使用WebSocket處理完的Vuex資料')
    console.log('主程式會去連接WS，有通知會去更新Vuex')
    console.log('後端每秒傳資訊過來')
    console.log('多種幣種怎麼區分開WS?')
    console.log('後端分幣種多次傳通知')
    console.log('主程式會使用傳來的Cid判斷前端目前選項的Cid相不相符，決定更新資料')
    console.log('每次30個點')
    console.log('監聽Vuex異動做更新')
  },
  beforeMount () {},
  mounted () {
    const that = this
    if (that.debug === true) {
      console.log('[components/items/ChartTrend.vue] > mounted()')
    }
    that.ready()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {
    const that = this
    if (that.debug === true) {
      console.log('[components/items/ChartTrend.vue] > beforeDestroy()')
    }
    // 清除迴圈
    clearInterval(that.myLoop)
  },
  destroyed () {}
}
</script>
