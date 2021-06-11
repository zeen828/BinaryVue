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
      // 獲取當下秒數
      that.seconds = new Date().getSeconds()
      that.createTrendChart()
      // that.mergeDataToTrendChart()
      that.loadData()
    },
    // 讀取資料
    loadData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > loadData()')
      }
      that.$store.dispatch('storeBinary/getBinaryChartTrend')
    },
    // 更新資料
    updataData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > updataData()')
      }
      // console.log('value----：', that.chartData)
      const forecast = JSON.parse(that.chartData.forecast)
      // console.log('value-forecast：', forecast)
      // 保留30筆,組合新資料
      that.trendChart.xAxisData = that.trendChart.xAxisData.concat(forecast.title)
      // that.trendChart.xAxisData = forecast.title
      that.trendChart.seriesData = that.trendChart.seriesData.concat(forecast.val)
      // that.trendChart.seriesData = forecast.val
      // 組合新區塊
      // [{ xAxis: '03:07:10' }, { xAxis: '03:07:59' }]
      that.trendChart.markAreaData = [
        {
          name: '停止下注',
          xAxis: forecast.markArea.start
        },
        { xAxis: forecast.markArea.end }
      ]
      that.mergeDataToTrendChart()
    },
    // 整理資料給走勢圖
    mergeDataToTrendChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > mergeDataToTrendChart()')
      }
      that.trendChart.option.xAxis.data = that.trendChart.xAxisData
      that.trendChart.option.series[0].data = that.trendChart.seriesData
      that.trendChart.option.series[0].markArea.data[0] = that.trendChart.markAreaData
      // console.log('option', that.trendChart.option)
      that.updateTrendChart()
    },
    // 創建-走勢圖
    createTrendChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > createTrendChart()')
      }
      // 基于准备好的dom，初始化echarts实例
      that.trendChart.chart = echarts.init(document.getElementById('trendChart'))
    },
    // 更新-走勢圖
    updateTrendChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > updateTrendChart()')
      }
      that.trendChart.chart.setOption(that.trendChart.option)
      console.log('that.trendChart.option：', that.trendChart.option)
      // 迴圈(1000=1s)
      that.myLoop = setInterval(function () {
        console.log('迴圈')
        // that.trendChart.option.xAxis.data = that.trendChart.xAxisData
        // that.trendChart.option.series[0].data = that.trendChart.seriesData
        // that.trendChart.option.series[0].markArea.data[0] = that.trendChart.markAreaData
        that.trendChart.chart.setOption({
          series: [{
            data: {
              name: '',
              value: [
                ['123', 123],
                ['123', 123],
                ['123', 123],
                ['123', 123]
              ]
            }
          }]
        })
      }, 1000)
    },
    // 更新-走勢圖
    updateTrendChartBBB () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > updateTrendChart()')
      }
      // 使用鋼指定的配置和數據顯示圖表
      that.trendChart.chart.setOption(that.trendChart.option)
      // 有多少條資料
      var xAxisDatalen = that.trendChart.option.xAxis.data.length// xAxisData.length;
      console.log('資料筆數：', xAxisDatalen)
      // 圖表上顯示資料筆數,len的值,可以根據你的數量量設定,不要超過xAxisDatalen的值,不然不會動
      var len = 10
      that.timer && clearInterval(that.timer)
      // 清除迴圈
      clearInterval(that.myLoop)
      // 迴圈(1000=1s)
      that.myLoop = setInterval(function () {
        console.log('1-', that.seconds)
        console.log('2-', xAxisDatalen)
        console.log('3-', len)
        console.log('4-', xAxisDatalen - len)
        if (that.seconds >= xAxisDatalen - len) {
          // 圖表末端
          // that.seconds = 0
          that.loadData()
        }
        that.trendChart.chart.dispatchAction({
          type: 'dataZoom',
          startValue: that.seconds,
          endValue: that.seconds + len
        })
        that.seconds++
        console.log('seconds++：', that.seconds)
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
    // 監聽
    chartData: function (newVal, oldVal) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > watch > chartData')
      }
      that.updataData()
    }
  },
  data () {
    return {
      // 秒數
      seconds: 0,
      // 圖表顯示
      quantity: 0,
      // 圖表上顯示資料筆數
      trendChart: {
        chart: null,
        option: {
          title: { text: '走勢圖' },
          tooltip: { trigger: 'axis' },
          dataZoom: [
            {
              type: 'slider',
              show: false,
              realtime: true,
              startValue: 0,
              endValue: 30,
              filterMode: 'none'
            }
          ],
          legend: { data: ['销量'] },
          xAxis: {
            show: true,
            boundaryGap: false,
            data: []
          },
          yAxis: { type: 'value' },
          series: [{
            name: '销量',
            type: 'line',
            data: [],
            // 區塊
            markArea: {
              silent: true,
              itemStyle: {
                color: 'rgba(175,43,117,0.2)'
              },
              data: []
            }
          }]
        },
        xAxisData: ['00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00'],
        seriesData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        markAreaData: [{ xAxis: '00:00:00' }, { xAxis: '00:00:00' }]
      },
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
