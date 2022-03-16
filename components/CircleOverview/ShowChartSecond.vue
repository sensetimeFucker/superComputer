<template>
  <div class="show-chart-second">
    <div ref="showChartSecond" :style="{width: '800px', height: '300px'}">
    </div>
    <div class="tags">
      <div>
        <div class="tags-item">
          <img src="../../../static/circleOverview/dialog/1-2.png"/>
          <span>train/loss_bbox</span>
        </div>
        <div class="tags-item">
          <img src="../../../static/circleOverview/dialog/2-2.png"/>
          <span>train/loss_cls_rpn</span>
        </div>
        <div class="tags-item">
          <img src="../../../static/circleOverview/dialog/3-2.png"/>
          <span>train/loss_cls</span>
        </div>
        <div class="tags-item">
          <img src="../../../static/circleOverview/dialog/4-2.png"/>
          <span>train/loss_bbox_rpn</span>
        </div>
      </div>
      <div>
        <div class="tags-item">
          <img src="../../../static/circleOverview/dialog/5-2.png"/>
          <span>val/loss_bbox</span>
        </div>
        <div class="tags-item">
          <img src="../../../static/circleOverview/dialog/6-2.png"/>
          <span>val/loss_cls_rpn</span>
        </div>
        <div class="tags-item">
          <img src="../../../static/circleOverview/dialog/7-2.png"/>
          <span>val/loss_cls</span>
        </div>
        <div class="tags-item">
          <img src="../../../static/circleOverview/dialog/8-2.png"/>
          <span>val/loss_bbox_rpn</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
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
      let chart = this.$echarts.init(this.$refs.showChartSecond)
      let option = {
        legend: {
            data:['train/loss_bbox','train/loss_cls_rpn','train/loss_cls','train/loss_bbox_rpn','val/loss_bbox', 'val/loss_cls_rpn', 'val/loss_cls', 'val/loss_bbox_rpn']
        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                color: '#262935'
              }
            }
        },
        yAxis: {
            type: 'value',
            position: 'right',
            splitLine: {
              lineStyle: {
                color: '#262935'
              }
            }
        },
        series: [
          // 1
          {
            type:'line',
            data: this.chartData.train_loss_bbox,
            symbol: 'image://static/circleOverview/dialog/1-1.png',
            symbolSize: 8,
            lineStyle:{
              color:'#f39800'
            }
          },
          // 2
          {
            type:'line',
            data: this.chartData.train_loss_cls_rpn,
            symbol: 'image://static/circleOverview/dialog/2-1.png',
            symbolSize: 8,
            lineStyle:{
              color:'#7ecef4'
            }
          },
          // 3
          {
            type:'line',
            data: this.chartData.train_loss_cls,
            symbol: 'image://static/circleOverview/dialog/3-1.png',
            symbolSize: 8,
            lineStyle:{
              color:'#cb4a4b'
            }
          },
          // 4
          {
            type:'line',
            data: this.chartData.train_loss_bbox_rpn,
            symbol: 'image://static/circleOverview/dialog/4-1.png',
            symbolSize: 8,
            lineStyle:{
              color:'#4da74d'
            }
          },
          // 5
          {
            type:'line',
            data: this.chartData.val_loss_bbox,
            symbol: 'image://static/circleOverview/dialog/5-1.png',
            symbolSize: 8,
            lineStyle:{
              color:'#943fee'
            }
          },
          // 6
          {
            type:'line',
            data: this.chartData.val_loss_cls_rpn,
            symbol: 'image://static/circleOverview/dialog/6-1.png',
            symbolSize: 8,
            lineStyle:{
              color:'#bd9b33'
            }
          },
          // 7
          {
            type:'line',
            data: this.chartData.val_loss_cls,
            symbol: 'image://static/circleOverview/dialog/7-1.png',
            symbolSize: 8,
            lineStyle:{
              color:'#9dc0dd'
            }
          },
          // 8
          {
            type:'line',
            data: this.chartData.val_loss_bbox_rpn,
            symbol: 'image://static/circleOverview/dialog/8-1.png',
            symbolSize: 8,
            lineStyle:{
              color:'#a32424'
            }
          }
        ]
      }
      chart.setOption(option, true)
    }
  }
}
</script>
<style lang="scss" scoped>
.tags{
  margin-top: 10px;
  font-size: 12px;
  color: #575c6a;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding:0 3%;
  &>div{
    display: flex;
    justify-content: space-between;
    .tags-item{
      display: flex;
      width: 120px;
      align-items: center;
      justify-content: flex-start;
      img{
        width: 20px;
        margin-right: 5px;
      }
    }
  }
}
</style>


