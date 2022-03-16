<template>
  <div class="show-chart-first">
    <div class="chart-title">
      <img class="chart-title-left" src="../../../static/circleOverview/dialog/dialog_title-icon.png" />
      <div class="chart-title-right">
        <span>latest:train/accuracy_top1=0.8992;</span>
        <span>best:train/accuracy_top1=0.9078; </span>
        <span>perf:1087ms/iter,iter300000 at Sat,June 10,2017 5:27 AM,iter 400000 at Sun,June 11,2017 11:38 AM</span>
      </div>
    </div>
    <div ref="showChartFirst" :style="{width: '800px', height: '300px'}"></div>
    <div class="tags">
      <div class="tags-item">
        <div class="yellow-radius"></div>
        <span>val/accuracy_top1</span>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      now: null,
      oneDay: null,
      value: null
    }
  },
  computed: {
    ...mapGetters({
      chartData: 'getParrots'
    })
  },
  watch: {
    chartData: function () {
      this.chartInit()
    }
  },
  mounted () {
    this.chartInit()
  },
  methods: {
    chartInit () {
      let chart = this.$echarts.init(this.$refs.showChartFirst);
      let option = {
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
          scale: true,
          splitLine: {
            lineStyle: {
              color: '#262935'
            }
          }
        },
        yAxis: {
          position: 'right',
          splitLine: {
            lineStyle: {
              color: '#262935'
            }
          }
        },
        series: [{
          data: this.chartData.val_loss_bbox_rpn,
          type: 'line',
          symbol: 'none',
          itemStyle: {
            borderWidth: 0
          },
          lineStyle:{
            color:'#f39800'
          },
          smooth: true
        }]
      };
      chart.setOption(option, true)
    },
    randomData: function () {
      this.now = new Date(+this.now + this.oneDay);
      this.value = this.value + Math.random() * 21 - 10;
      return {
          name: this.now.toString(),
          value: [
              [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
              Math.round(this.value)
          ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.show-chart-first{
  width: 100%;
  display: inline-block;
}
.chart-title{
  display: flex;
  box-sizing: border-box;
  padding-left: 3%;
  .chart-title-left{
    height: 26px;
    display: inline-block;
    width: 7px;
    margin-right: 10px;
  }
  .chart-title-right{
    font-size: 12px;
    color: #575c6a;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
.tags{
  margin-top: 10px;
  font-size: 12px;
  color: #575c6a;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  padding:0 3%;
  .tags-item{
    display: flex;
    align-items: center;
    .yellow-radius{
      width: 10px;
      height: 10px;
      margin-right: 5px;
      border-radius: 50%;
      background-color: #f39800
    }
  }
}
</style>

