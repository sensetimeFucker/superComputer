<template>
    <section>
      <title-chart icon="icon4" title="月度GPU时"></title-chart>
      <div class="title-gpu fy-flex" :style="{width: '18vw', height:'8vh'}">
        <div>{{monthGpuTime}}<span>GPU时</span></div>
      </div>
    </section>
</template>

<script>
import TitleChart from '../TitleChart.vue'
import {mapGetters} from 'vuex'
export default {
  // 全局感知
  name: "ChartMonthGPU",
  // 模板依赖
  components: {
    TitleChart
  },
  // 接口
  props: {
    city: {
      type: String,
      default () {
        return 'index'
      }
    }
  },
  // 本地状态
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      indexAll: 'getIndexAll',
      cityRelevantInfo: 'getCityRelevantInfo'
    }),
    monthGpuTime: function () {
      let tempData = {}
      if (this.city === 'index') {
        tempData = this.indexAll
      } else {
        tempData = this.cityRelevantInfo
      }
      if (tempData.hasOwnProperty('monthGpuTime')) {
        let returnData = this.$numberFormat(tempData.monthGpuTime, 0)
        return returnData
      }
      return '23,435,712'
    }
  },
  // 事件
  watch: {}
}
</script>

<style scoped>
  .title-gpu{
    margin-left: 1vw;
    color: white;
    text-align: left;
    margin-top: -1vh;
  }
  .title-gpu div{
    padding: 0.08rem .18rem;
    font-size: .3rem;
    text-align: center;
    background-image: url("../../assets/img/bg2.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
  .title-gpu div span{
    margin-left: .1rem;
    font-size: .15rem;
  }
</style>
