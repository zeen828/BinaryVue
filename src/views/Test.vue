<template>
  <main>
  </main>
</template>

<script>
// import qs from 'qs'
import VChart from '../ECharts'
// import * as echarts from 'echarts/core'
import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart
} from 'echarts/charts'
import {
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent
} from 'echarts/components'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
// const { use, registerMap, registerTheme } = echarts
use([
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart,
  GridComponent,
  PolarComponent,
  GeoComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DatasetComponent,
  CanvasRenderer,
  SVGRenderer
])
// import 'echarts-liquidfill'
// import logo from './data/logo'
// import getBar from './data/bar'
// import pie from './data/pie'
// import polar from './data/polar'
// import scatter from './data/scatter'
// import map from './data/map'
// import { c1, c2 } from './data/connect'
// custom theme
// import theme from './theme.json'
// Map of China
// import chinaMap from './china.json'
// import worldMap from './world.json'
// registering map data
// registerMap('china', chinaMap)
// registerMap('world', worldMap)
// registering custom theme
// registerTheme('ovilia-green', theme)
export default {
  components: {
    VChart
  },
  data () {
    // const options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {}
  },
  methods: {},
  watch: {},
  mounted () {}
}
</script>

<style>
</style>
