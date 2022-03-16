<template>
    <section>
      <title-chart title="近24小时集群功率变化趋势"></title-chart>
      <div ref='chart-power__hour' :style="{width: '16vw', height:'18.5vh'}"></div>
    </section>
</template>

<script>
import TitleChart from '../TitleChart.vue'
import {mapGetters} from 'vuex'
import miment from 'miment'
export default {
  // 全局感知
  name: "ChartHourPower",
  // 模板依赖
  components: {TitleChart},
  computed: {
    ...mapGetters({
      clusterPower: 'getClusterPower',
      dateTime: 'getDateTime'
    }),
    chartData: function () {
      let returnData = ["36.52", "36.68", "36.87", "37.03", "36.04", "36.20", "36.38", "36.55", "36.78", "36.31", "36.44", "36.55", "36.68", "36.85", "36.37", "36.53", "36.71", "36.85", "37.05", "36.55", "36.69", "36.80", "36.95", "37.12"]
      if (this.clusterPower.hasOwnProperty('gpuInfo')) {
        returnData = []
        let tempData = this.clusterPower.gpuInfo
        for (let x in tempData) {
          returnData.push(tempData[x].replace(/\,/, '').split('.')[0])
        }
      }
      return returnData
    },
    Xdata: function () {
      if (this.dateTime.time.length !== 0) {
        return this.dateTime.time
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
      let chart = this.$echarts.init(this.$refs['chart-power__hour']);
      let base = +new Date(1968, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let date = [];

      let data = [Math.random() * 300];

      for (let i = 1; i < 100; i++) {
        let now = new Date(base += oneDay);
        date.push([now.getMonth() + 1, now.getDate()].join('/'));
        let datarandom = Math.round((Math.random() - 0.5) * 20 + data[i - 1]);
        data.push(datarandom > 0 ? datarandom : -datarandom);
      }

      let option = {
        tooltip: {
          trigger: 'axis',
          confine: true
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
          // data: date,
          data: this.Xdata,
          axisLabel: {
            textStyle: {
              color: '#6d7092'
            },
            interval: (index, value) => {
              let retrunData = false
              if (index === 0 || index === 360 || index === 720 || index === 1080 ||index === 1439) {
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
            return Math.floor(value.min - 10000)
          },
          max: function(value) {
            return Math.floor(value.max + 10000)
          },
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: function (value) {
              let returnNumber = 0
              returnNumber = Math.floor(value / 1000)
              return returnNumber + 'KW'
            },
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
            smooth:true,
            symbol: 'none',
            // sampling: 'average',
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
                  '{text|{c}W}',
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
                color: 'rgba(0,0,0,0)'
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: 'rgba(177,32,39,1)'},
                  {offset: 0.5, color: 'rgba(210,56,66,0.8)'},
                  {offset: 1, color: 'rgba(210,56,66,0.3)'}
                ])
              }
            },
            // data: data
            data: this.chartData
          }
        ]
      };
      chart.setOption(option, true)
      // chart.dispatchAction({
      //   type: 'highlight',
      //   dataIndex: 1000
      // })
      // // 鼠标移入
      // chart.on('mouseover', function (a) {
      //   chart.dispatchAction({
      //     type: 'downplay',
      //     dataIndex: 1000
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
