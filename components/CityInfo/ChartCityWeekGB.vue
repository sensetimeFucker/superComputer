<template>
  <section>
    <title-chart title="本周城市存储可用容量(GB)"></title-chart>
    <div id="chart-week-gb" ref='chart-week-gb' :style="{width: '10vw', height:'18.5vh'}"></div>
    <img v-show="chartData.length !== 0" src="../../../static/chartImg/circle_point.png" class="circle-point">
  </section>
</template>

<script>
import TitleChart from '../TitleChart.vue'
import miment from 'miment'
import {mapGetters} from 'vuex'
export default {
  // 全局感知
  name: "ChartCityWeekGB",
  // 模板依赖
  components: {TitleChart},
  computed: {
    ...mapGetters({
      storageAvailableCapacity: 'getStorageAvailableCapacity',
      cityCode: 'getCityCode'
    }),
    chartData () {
      let returnData = []
      let minNumber = 0
      if (this.storageAvailableCapacity.hasOwnProperty(this.cityCode)) {
        returnData = []
        let tempData = this.storageAvailableCapacity[this.cityCode]
        for (let x in tempData) {
          if (minNumber > parseInt(tempData[x].replace(/\,/g, '').split('.')[0])) {
            minNumber = parseInt(tempData[x].replace(/\,/g, '').split('.')[0])
          }
          returnData.push(tempData[x].replace(/\,/g, '').split('.')[0])
        }
        for (let x in returnData) {
          returnData[x] = returnData[x] - minNumber
        }
      }
      return returnData
    }
  },
  // 事件
  watch: {
    chartData: function () {
      if (this.$route.name === 'index') {
        this.chartinit()
      }
    },
    cityCode: function () {
      if (this.$route.name === 'index') {
        this.chartinit()
      }
    }
  },
  mounted() {
    this.chartinit()
  },
  // 非响应式的属性
  methods: {
    chartinit () {
      let dateArr = []
      let data1 = this.chartData
      let data2 = []
      let data3 = []
      let data15 =[]
      for (let x in data1) {
        data15.push(Math.floor(data1[x] / 1.1))
        data2.push(Math.floor(data1[x] / 2))
        data3.push(Math.floor(data1[x] / 3))
      }
      for (let i = 0; i < 7; i++) {
        dateArr.push(miment().add((0 - i), 'DD').format('MM月DD日'))
      }
      const chart = this.$echarts.init(this.$refs['chart-week-gb'])
      let option = {
        tooltip: {
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          // 越往后的数据延迟越大
          return idx * 100;
        },
        angleAxis: {
          type: 'category',
          data: dateArr,
          triggerEvent: true,
          axisLine:{
            show:false,
          },
          axisTick:{
            show:false
          },
          axisLabel: {
            margin: 4,
            interval: 0,
            color:'#6d7092',
            fontSize: 10
          },
          splitLine: {
            show:false
          },
          z: 10
        },
        radiusAxis: {
          max: function (value) {
            return value.max
          },
          min: function (value) {
            return value.min - 10000
          },
          axisLine:{
            show:false,
          },
          axisTick:{
            show:false
          },
          axisLabel: {
            show:false
          },
          splitLine: {
            show:false
          }
        },
        polar: {
        },
        series: [
        //   {
        //   type: 'bar',
        //   data: data3,
        //   coordinateSystem: 'polar',
        //   stack: 'a',
        //   itemStyle: {
        //     normal:{color: '#422831'}
        //   },
        //   areaStyle: {

        //   }
        // }, {
        //   type: 'bar',
        //   data: data2,
        //   coordinateSystem: 'polar',
        //   stack: 'a',
        //   itemStyle: {
        //     normal:{color: '#aa464c'}
        //   },
        //   areaStyle: {

        //   }
        // }, {
        //   type: 'bar',
        //   data: data15,
        //   coordinateSystem: 'polar',
        //   stack: 'a',
        //   itemStyle: {
        //     normal:{color: '#e95732'}
        //   },
        //   areaStyle: {

        //   }
        // },
        {
          type: 'bar',
          data: data1,
          coordinateSystem: 'polar',
          stack: 'a',
          label: {
            // show: true,
            emphasis: {
              show: true,
              position: 'top',
              textStyle: {
                  color: '#fff',
                  fontSize: 16
              },
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
            // normal:{
            //   color: '#d93c43'
            // },
            normal: {
              color: new this.$echarts.graphic.RadialGradient(
                0, 1, 1.8,
                [
                  {offset: 0, color: '#422831'},
                  {offset: 1, color: '#d93c43'}
                ]
              )
            },
          },
          animationDurationUpdate: function (idx) {
            return idx * 100;
          },
          areaStyle: {

          }
        }],
      };
      chart.setOption(option, true);
    }
  }
}
</script>
<style lang="scss" scoped>
.circle-point{
  margin-top: -175px;
  position: absolute;
  width: 20px;
  margin-left: -55px;
}
</style>
