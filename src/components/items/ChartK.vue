<template>
  <ul class="list-group mb-3">
    <li class="list-group-item list-group-item-secondary" @click="updataData()">30日K線</li>
    <li class="list-group-item">
      <div id="kChart" style="height: 40vh;"></div>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
export default {
  name: 'ChartK',
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
        console.log('[components/items/ChartK.vue] > methods > ready()')
      }
      that.loadData()
      that.createChart()
      // that.mergeDataToKChart()
      that.updateChart()
    },
    // 讀取資料
    loadData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartK.vue] > methods > loadData()')
      }
      // that.$store.dispatch('storeBinary/getBinaryCurrencyChartK')
    },
    // 更新資料
    updataData () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartK.vue] > methods > updataData()')
      }
      // that.chartData
      that.showChartOption.series[0].data = that.workData.lineData
      // K線圖資料
      that.workData.lineData = []
      that.workData.xAxisData = []
      that.workData.seriesData = []
      // Vuex資料整理
      that.chartData.forEach(function (value) {
        // console.log('value：', value)
        that.workData.lineData.push(value.close)
        that.workData.xAxisData.push(value.date)
        var tmp = []
        tmp.push(value.open)
        tmp.push(value.close)
        tmp.push(value.low)
        tmp.push(value.high)
        // console.log('tmp：', tmp)
        that.workData.seriesData.push(tmp)
        tmp = []
      })
      that.mergeDataToKChart()
    },
    // 整理資料給圖表
    mergeDataToKChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartK.vue] > methods > mergeDataToKChart()')
      }
      // 曲線圖資料
      that.showChartOption.series[0].data = that.workData.lineData
      // K線圖資料
      that.showChartOption.xAxis.data = that.workData.xAxisData
      that.showChartOption.series[1].data = that.workData.seriesData
      // 更新-K線圖表
      that.updateChart()
    },
    // 創建-圖表
    createChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartK.vue] > methods > createKChart()')
      }
      // 基于准备好的dom，初始化echarts实例
      that.domChart = echarts.init(document.getElementById('kChart'))
    },
    // 更新-圖表
    updateChart () {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartK.vue] > methods > updateKChart()')
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
        return this.$store.getters['storeBinary/getChartK']
      }
    }
  },
  watch: {
    chartData: function (newVal, oldVal) {
      const that = this
      if (that.debug === true) {
        console.log('[components/items/ChartK.vue] > watch > chartData')
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
        title: { text: 'K線圖' },
        tooltip: {},
        // 图例
        legend: {
          data: ['销量', 'K線圖']// 此处图例名与series中的name须保持一致
        },
        // 图表背景样式
        // backgroundColor:'#ffffff',
        // X轴
        xAxis: {
          data: []
        },
        // Y轴
        yAxis: {},
        series: [
          { name: '销量', type: 'line', data: [] },
          { name: 'K線圖', type: 'candlestick', data: [] }
        ]
      },
      // 工作資料
      workData: {
        // 曲線圖
        lineData: [0],
        // K線圖
        xAxisData: ['1997-01-01'],
        seriesData: [
          [0, 0, 0, 0]
        ]
      },
      debug: false
    }
  },
  beforeCreate () {},
  created () {
    window.addEventListener('resize', this.eventResize)
  },
  beforeMount () {},
  mounted () {
    const that = this
    if (that.debug === true) {
      console.log('[components/items/ChartK.vue] > mounted()')
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
