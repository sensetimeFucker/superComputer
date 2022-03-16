<template>
    <section>
      <title-chart icon="icon7" title="近24小时GPU温度峰值(℃)"></title-chart>
      <div ref='chart-hour__c' :style="{width: '16vw', height:'18.5vh'}">
      </div>
      <div class="chart-img fy-flex fy-flex__center">
        <img src="../../assets/img/hot.png"/>
      </div>
    </section>
</template>

<script>
import TitleChart from '../TitleChart.vue'
import {mapGetters} from 'vuex'
import miment from 'miment'
export default {
  // 全局感知
  name: "ChartHourC",
  // 模板依赖
  components: {TitleChart},
  computed: {
    ...mapGetters({
      gpuTemperature: 'getGpuTemperature',
      dateTime: 'getDateTime'
    }),
    chartData: function () {
      let returnData = ["36.52", "36.68", "36.87", "37.03", "36.04", "36.20", "36.38", "36.55", "36.78", "36.31", "36.44", "36.55", "36.68", "36.85", "36.37", "36.53", "36.71", "36.85", "37.05", "36.55", "36.69", "36.80", "36.95", "37.12"]
      if (this.gpuTemperature.hasOwnProperty('gpuTemperature')) {
        returnData = []
        let tempData = this.gpuTemperature.gpuTemperature
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
  methods: {
    chartInit () {
      let chart = this.$echarts.init(this.$refs['chart-hour__c']);
      let base = +new Date(1968, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let date = [];

      let data = [Math.random() * 300];

      for (let i = 1; i < 24; i++) {
        let now = new Date(base += oneDay);
        date.push([now.getMonth() + 1, now.getDate()].join('/'));
        let datarandom = Math.round((Math.random() - 0.5) * 20 + data[i - 1]);
        data.push(datarandom > 0 ? datarandom : -datarandom);
      }

      let option = {
        tooltip: {
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%',
          right: '5%',
          bottom: '10%',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
            return Math.floor(value.min - 3)
          },
          max: function(value) {
            return Math.floor(value.max + 3)
          },
          boundaryGap: [0, '100%'],
          axisLabel: {
            formatter: '{value} ℃',
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
            sampling: 'average',
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
                  '{text|{c}}℃',
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
                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                  offset: 0,
                  color: '#51181f'
                }, {
                  offset: 0.5,
                  color: '#832b39'
                }, {
                  offset: 1,
                  color: '#c18839'
                }])
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(83, 27, 36, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(83, 27, 35, 0)'
                }])
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
      //   dataIndex: 10
      // })
      // // 鼠标移入
      // chart.on('mouseover', function (a) {
      //   chart.dispatchAction({
      //     type: 'downplay',
      //     dataIndex: 10
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
  section{
    position: relative;
  }
  .chart-img{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 10%;
    height: 18.5vh;
  }
  .chart-img img{
    width: 0.07rem;
    height: 60%;
  }
</style>
