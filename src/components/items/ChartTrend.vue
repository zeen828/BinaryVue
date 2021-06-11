<template>
  <ul class="list-group mb-3">
    <li class="list-group-item list-group-item-secondary" @click="updataData()">走勢圖</li>
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
      that.loadData()
      that.createChart()
      that.updateChart()
      // console.log('chartData：', that.chartData)
    },
    // 讀取資料
    loadData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > loadData()')
      }
      // that.$store.dispatch('storeBinary/getBinaryCurrencyChartTrend')
    },
    // 更新資料
    updataData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > updataData()')
      }
      that.mergeDataToKChart()
    },
    // 整理資料給圖表
    mergeDataToKChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > mergeDataToKChart()')
      }
      that.showChartOption.series[0].data = that.chartData.forecast
      that.showChartOption.series[0].markArea.data = that.chartData.area
      // that.showChartOption.series[0].markArea.data[0] = [{ xAxis: '2021-05-05 00:00:04' }, { xAxis: '2021-05-05 00:00:05' }]
      // that.showChartOption.series[0].markArea.data[1] = [{ xAxis: '2021-05-05 00:01:04' }, { xAxis: '2021-05-05 00:01:05' }]
      that.updateChart()
    },
    // 創建-圖表
    createChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > createKChart()')
      }
      // 基于准备好的dom，初始化echarts实例
      that.domChart = echarts.init(document.getElementById('trendChart'))
    },
    // 更新-圖表
    updateChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartTrend.vue] > methods > updateKChart()')
      }
      // 使用刚指定的配置项和数据显示图表。
      that.domChart.setOption(that.showChartOption)
    },
    // 更新視窗尺寸用
    eventResize () {
      var that = this
      that.domChart.resize()
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
      // 圖表Dom實例
      domChart: null,
      // 顯示的圖表設定資料
      showChartOption: {
        title: { text: '走勢圖' },
        // 圖表顯示model區塊
        tooltip: {
          // trigger: 'item'
          trigger: 'axis'
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
      // 工作資料
      workData: {
      },
      debug: false
    }
  },
  beforeCreate () {},
  created () {
    window.addEventListener('resize', this.eventResize)
    // 主程式會統一接收WS在做資料處理
    //     判斷WS內的資料是不是該前端目前選擇的
    // 畫面上固定30個點，沒資料的只給X座標就好
    // 圖表資料是本身的資料+Vuex收集的資料=更新圖表
    // # 設計一組共用資料格式，可以合併本體資料產生圖表
    // # 缺資料，假資料的走勢沒資料
    // # 後端開獎工具還沒寫
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
  beforeDestroy () {},
  destroyed () {
    window.removeEventListener('resize', this.eventResize)
  }
}
</script>
