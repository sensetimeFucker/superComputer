<template>
    <section>
      <title-chart title="城市GPU时"></title-chart>
      <div ref="chart-gpu" :style="{width: '18vw', height:'19vh'}"></div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
import TitleChart from '../TitleChart.vue'
import miment from 'miment'
export default {
  // 全局感知
  name: "ChartCityGPU",

  // 模板依赖
  components: {
    TitleChart
  },
  // 本地状态
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      gpuTime: 'getGpuTime',
      cityCode: 'getCityCode',
      dateTime: 'getDateTime'
    }),
    chartData: function () {
      if (this.gpuTime && this.gpuTime[this.cityCode]) {
        for (let x in this.gpuTime[this.cityCode]) {
          this.gpuTime[this.cityCode][x] = this.gpuTime[this.cityCode][x].replace(/\,/g, "")
        }
        return this.gpuTime[this.cityCode]
      }
      return ["501.88", "633.70", "967.08", "1099.86", "1241.98", "1237.93", "1182.43", "1076.49", "1084.68", "1028.05", "1170.88", "1137.35", "1006.98", "1081.60", "1205.99"]
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
      if (this.$route.name === 'index') {
        this.chartInit()
      }
    },
    XData: function () {
      if (this.$route.name === 'index') {
        this.chartInit()
      }
    }
  },
  mounted() {
    this.chartInit()
  },
  // 非响应式的属性
  methods: {
    chartInit () {
      let chart = this.$echarts.init(this.$refs['chart-gpu']);
      let dataAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
      let yMax = 500;
      let dataShadow = [];
      for (let i = 0; i < this.chartData.length; i++) {
        dataShadow.push(yMax);
      }
      let option = {
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          // 越往后的数据延迟越大
          return idx * 100;
        },
        tooltip: {
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          data: this.XData,
          // boundaryGap: false,
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
          show: true,
          // type: 'value',
          // data: [0, 10000, 20000, 30000, 40000, 50000],
          axisLine: {
            show: true,
            lineStyle:{
              color: '#6d7092'
            }
          },
          axisTick: {
            show: true,
            lineStyle:{
              color: '#6d7092'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#6d7092'
            }
          },
          splitLine:{
            show: false
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        grid:{
          x: '5%',
          y:'20%',
          x2:'5%',
          y2:'20%',
          containLabel: true
        },
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
          },
          {
            type: 'bar',
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
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: 'rgba(210,56,66,1)'},
                    {offset: 0.6, color: 'rgba(233,87,50,1)'},
                    {offset: 1, color: 'rgba(210,56,66,0.3)'}
                  ]
                )
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: 'rgba(210,56,66,1)'},
                    {offset: 0.6, color: 'rgba(233,87,50,1)'},
                    {offset: 1, color: 'rgba(210,56,66,0.3)'}
                  ]
                )
              }
            },
            data: this.chartData,
            animationDurationUpdate: function (idx) {
              return idx * 100;
            }
          }
        ]
      };
      chart.setOption(option, true);
    }
  }
}
</script>

<style scoped>

</style>
