<template>
    <section>
      <title-chart title="Lustre近15天存储可用容量比率趋势"></title-chart>
      <div ref="chart-lustre__day" :style="{width: '16vw', height:'18.5vh'}"></div>
    </section>
</template>

<script>
import TitleChart from '../TitleChart.vue'
import {mapGetters} from 'vuex'
import miment from 'miment'
export default {
  // 全局感知
  name: "ChartDayLustre",

  // 模板依赖
  components: {TitleChart},
  filters: {},

  // 接口
  props: {},

  // 本地状态
  data() {
      return {};
  },
  computed: {
    ...mapGetters({
      lustreInfo: 'getLustreInfo',
      dateTime: 'getDateTime'
    }),
    chartData: function () {
      let returnData = ["967344.92", "963444.84", "2416724.59", "2404392.90", "2401721.38", "2395265.37", "2387296.10", "2383082.39", "2389276.31", "2382365.21", "1913315.54", "2373487.37", "2370784.88", "2366114.61", "2361130.13"]
      if (this.lustreInfo.hasOwnProperty('lustreInfo')) {
        returnData = []
        for (let x in this.lustreInfo.lustreInfo) {
          returnData.push(this.lustreInfo.lustreInfo[x].replace(/\,/g, ''))
        }
      }
      return returnData
    },
    XData: function () {
      if (this.dateTime.date) {
        return this.dateTime.date
      } else {
        let returnData = []
        for (let i = 0; i < 15; i++) {
          returnData.push(miment().add((0 - i), 'DD').format('MM/DD'))
        }
        return returnData.reverse()
      }
    }
  },
  // 事件
  watch: {
    chartData: function () {
      this.chartInit()
    },
    Xdata: function () {
      this.chartInit()
    }
  },
  mounted() {
    this.chartInit()
  },
  // 非响应式的属性
  methods: {
    chartInit() {
      let xAxisData = []
      let data1 = []
      // 环形数据
      let data2 = []
      for (let i = 1; i < 50; i++) {
        xAxisData.push(i<31?'7/' + i:'8/' + (i-30))
        // data1.push(200 + (100 - i) - (Math.sin(i / 5) * (i / 5 ) + i / 6) * 5)
        // data2.push(200 + (100 - i) - (Math.cos(i / 5) * (i / 5 ) + i / 6) * 5)
      }
      let chart = this.$echarts.init(this.$refs['chart-lustre__day'])

      let option = {
        tooltip: {
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        boundaryGap: false,
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          // data: xAxisData,
          data: this.XData,
          silent: false,
          axisLabel: {
            minInterval: 0,
            textStyle: {
              color: '#6d7092'
            },
            interval: (index, value) => {
              let retrunData = false
              if (index === 0 || index === 4 || index === 9 || index === 14) {
                retrunData = true
              }
              return retrunData
            }
          },
          axisTick: {
            show: true,
            lineStyle:{
              color: '#6d7092'
            }
          },
          axisLine: {
            show: true,
            lineStyle:{
              color: '#6d7092'
            }
          }
        },
        yAxis: {
          min: function(value) {
            return Math.floor(value.min - 5)
          },
          max: function(value) {
            return Math.floor(value.max + 5)
          },
          axisLabel: {
            formatter: '{value} %',
            textStyle: {
              color: '#6d7092'
            }
          },
          axisTick: {
            show: true,
            lineStyle:{
              color: '#6d7092'
            }
          },
          axisLine: {
            show: true,
            lineStyle:{
              color: '#6d7092'
            }
          },
          splitLine:{
            show: false
          }
        },
        series: [{
          type: 'bar',
          // data: data1,
          data: this.chartData,
          label: {
            // show: true,
            emphasis: {
              show: true,
              position: 'top',
              textStyle: {
                  color: '#fff',
                  fontSize: 16
              },
              distance: -1,
              formatter: [
                '{text|{c}%}',
                '{point|}'
              ].join('\n'),
              rich: {
                text: {
                  color: '#fff',
                  align: 'center',
                  fontSize: 18,
                  marginBottom: 10
                },
                point: {
                  height: 10,
                  width: 10,
                  align: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 10
                }
              }
            }
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 1,
                color: 'rgba(228, 71, 82, 1)'
              }, {
                offset: 0,
                color: 'rgba(228, 71, 82, 0)'
              }])
            }
          },
          animationDelay: function (idx) {
            return idx * 10;
          },
        }, {
          data: data2,
          type:'line',
          smooth:true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
              normal: {
                color: 'rgba(133, 27, 29, 0)'
              }
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(77, 32, 39, 1)'
              }, {
                offset: 1,
                color: 'rgba(77, 32, 39, 0)'
              }])
            }
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      }
      chart.setOption(option, true)
      // chart.dispatchAction({
      //   type: 'highlight',
      //   dataIndex: 14
      // })
      // // 鼠标移入
      // chart.on('mouseover', function (a) {
      //   chart.dispatchAction({
      //     type: 'downplay',
      //     dataIndex: 14
      //   })
      // })
      // // 鼠标移出
      // chart.on('mouseout', function (a) {
      //   chart.dispatchAction({
      //     type: 'highlight',
      //     dataIndex: 14
      //   })
      // })
    }
  }
}
</script>

<style scoped>

</style>
