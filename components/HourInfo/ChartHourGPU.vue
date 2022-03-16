<template>
  <section>
    <title-chart icon="icon4" title="近24小时GPU时趋势"></title-chart>
    <div ref='chart-hour__gpu' :style="{width: '16vw', height:'18.5vh'}"></div>
  </section>
</template>

<script>
import TitleChart from '../TitleChart.vue'
import miment from 'miment'
import { mapGetters } from 'vuex'
export default {
  // 全局感知
  name: "ChartHourGPU",
  // 模板依赖
  components: {TitleChart},
  computed: {
    ...mapGetters({
      gpuInfo: 'getGpuInfo',
      dateTime: 'getDateTime'
    }),
    chartData: function () {
      let returnData = ["36.52", "36.68", "36.87", "37.03", "36.04", "36.20", "36.38", "36.55", "36.78", "36.31", "36.44", "36.55", "36.68", "36.85", "36.37", "36.53", "36.71", "36.85", "37.05", "36.55", "36.69", "36.80", "36.95", "37.12"]
      if (this.gpuInfo.hasOwnProperty('gpuInfo')) {
        returnData = []
        let tempData = this.gpuInfo.gpuInfo
        for (let x in tempData) {
          returnData.push(tempData[x].replace(/\,/, '').split('.')[0])
        }
      }
      return returnData
    },
    Xdata: function () {
      if (this.dateTime.hour.length !== 0) {
        return this.dateTime.hour
      } else {
        let returnData = []
        for (let i = 0; i < 24; i++) {
          returnData.push(miment().add((0 - i), 'hh').format('hh:00'))
        }
        return returnData.reverse()
      }
    }
  },
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
    chartInit () {
      let chart = this.$echarts.init(this.$refs['chart-hour__gpu'])
      let option = {
        tooltip: {
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          // type: 'category',
          // data: ['22:00', '2:00', '6:00', '10:00', '14:00', '18:00', '22:00'],
          data: this.Xdata,
          axisLabel: {
            textStyle: {
              color: '#6d7092'
            },
            interval: (index, value) => {
              let retrunData = false
              if (index === 0 || index === 4 || index === 9 || index === 14 || index === 19 || index === 23) {
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
          type: 'value',
          min: function(value) {
            return Math.floor(value.min - 100)
          },
          max: function(value) {
            return Math.floor(value.max + 100)
          },
          axisLabel: {
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
        series: [
          {
            type:'line',
            step: 'start',
            // data:[120, 132, 101, 134, 90, 230, 210],
            data: this.chartData,
            symbol: 'none',
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
                  '{text|{c}}',
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
            itemStyle: {
              normal: {
                color: '#ef2125'
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(128, 27, 33, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(128, 27, 33, 0.4)'
                }])
              }
            },
          }
        ]
      };
      chart.setOption(option, true)
      // chart.dispatchAction({
      //   type: 'highlight',
      //   dataIndex: 23
      // })
      // // 鼠标移入
      // chart.on('mouseover', function (a) {
      //   chart.dispatchAction({
      //     type: 'downplay',
      //     dataIndex: 23
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
