<template>
    <section>
      <title-chart icon="icon5" title="GPU核数"></title-chart>
      <div class="title-gpu fy-flex" :style="{width: '18vw', height:'8vh'}">
        <div class="title-gpu__content">
          <div class="fy-flex fy-flex__center">
            <!-- <img class="bg_icon" src="../../assets/img/bg_icon.png"/> -->
            <img class="bg_icon" src="../../../static/homeImg/bg_icon.gif"/>
          </div>
          {{gpuKernelNumber}}<span>个</span>
        </div>
      </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
import TitleChart from '../TitleChart.vue'
export default {
  // 全局感知
  name: "ChartSumGPU",

  // 模板依赖
  components: {
    TitleChart
  },
  filters: {},

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
    gpuKernelNumber: function () {
      let tempData = {}
      if (this.city === 'index') {
        tempData = this.indexAll
      } else {
        tempData = this.cityRelevantInfo
      }
      if (tempData.hasOwnProperty('gpuKernelNumber')) {
        return this.$numberFormat(tempData.gpuKernelNumber, 0)
      }
      return '23,435,713'
    }
  },
  // 事件
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  // 非响应式的属性
  methods: {}
}
</script>

<style scoped>
  .title-gpu{
    margin-left: 1vw;
    color: white;
    text-align: left;
    margin-top: -1vh;
  }
  .title-gpu .title-gpu__content{
    padding: 0.02rem .15rem .02rem .1rem;
    height: .4rem;
    font-size: .3rem;
    line-height: .4rem;
    text-align: center;
    background-image: url("../../assets/img/bg1.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
  .title-gpu__content div{
    float: left;
    height: 100%;
  }
  .bg_icon{
    margin: 0.05rem;
    height: .3rem;
  }
  .title-gpu .title-gpu__content span{
    margin-left: .05rem;
    font-size: .15rem;
  }
</style>
