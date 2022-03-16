<template>
    <section>
      <title-chart icon="icon3" title="近15天Inode可用率变化趋势"></title-chart>
      <div ref='chart-inode__day' :style="{width: '16vw', height:'18.5vh'}"></div>
    </section>
</template>

<script>
import TitleChart from '../TitleChart.vue'
import {mapGetters} from 'vuex'
import miment from 'miment'
export default {
  // 全局感知
  name: "ChartDayInode",
  // 模板依赖
  components: {TitleChart},
  computed: {
    ...mapGetters({
      inodeInfo: 'getInodeInfo',
      dateTime: 'getDateTime'
    }),
    chartData: function () {
      let returnData = []
      if (this.inodeInfo.hasOwnProperty('inodeInfo')) {
        let tempData = this.inodeInfo.inodeInfo
        for (let x in tempData) {
          returnData.push(tempData[x].replace(/\,/g, '').split('.')[0])
        }
      }
      return returnData
    },
    Xdata: function () {
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
      let chart = this.$echarts.init(this.$refs['chart-inode__day']);
      let base = +new Date(1968, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let date = [];

      let data = [Math.random() * 300];

      for (let i = 1; i < 50; i++) {
        let now = new Date(base += oneDay);
        date.push([now.getMonth() + 1, now.getDate()].join('/'));
        let datarandom = Math.round((Math.random() - 0.5) * 20 + data[i - 1]);
        data.push(datarandom > 0 ? datarandom : -datarandom);
      }

      let option = {
        tooltip: {
          show: true,
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
          type: 'value',
          min: function(value) {
            return Math.floor(value.min - 5)
          },
          max: function(value) {
            return Math.floor(value.max + 5)
          },
          boundaryGap: [0, '100%'],
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
        series: [
          {
            type:'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            label: {
              emphasis: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                },
                offset: [-2, 0],
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
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                  offset: 1,
                  color: '#4c4950'
                },{
                  offset: 0.5,
                  color: '#c84334'
                }, {
                  offset: 0,
                  color: '#c12026'
                }])
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(73, 28, 35, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(73, 28, 35, 0)'
                }])
              }
            },
            // data: data
            data: this.chartData
          }
        ]
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
