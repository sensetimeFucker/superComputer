<template>
    <section>
      <title-chart icon="icon6" title="本月内存总容量(GB)"></title-chart>
      <div id="chart-month-gb" :style="{height:'5vh', width: '8vw'}">
        <div class="fy-chart fy-flex fy-flex__center">
          <div class="fy-y">
            {{month}}月
          </div>
          <div class="content fy-flex">
            <img style="width: 70%" src="../../assets/img/month-gb.png"/>
            <img src="../../assets/img/circle.png" style="margin-left: -.15rem"/>
            <img class="img-effect" src="../../../static/homeImg/memory_icon.png" />
            <p style="color: white;font-size: .15rem;margin-left: .1rem">{{totalMemoryCapacity}}</p>
          </div>
        </div>
        <div class="fy-x">
          GB
        </div>
      </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
import TitleChart from '../TitleChart.vue'
export default {
  // 全局感知
  name: "ChartMonthGB",
  // 模板依赖
  components: {
    TitleChart
  },
  filters: {},

  // 接口
  props: {},

  // 本地状态
  data() {
      return {
      };
  },
  computed: {
    ...mapGetters({
      indexAll: 'getIndexAll'
    }),
    month: function () {
      let today = new Date()
      return today.getMonth() + 1
    },
    totalMemoryCapacity: function () {
      if (this.indexAll.hasOwnProperty('totalMemoryCapacity')) {
        return this.$numberFormat(this.indexAll.totalMemoryCapacity, 0)
      }
      return '500,000'
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
    this.initData();
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
  methods: {
    initData() {

    }
  }
}
</script>

<style scoped>
  #chart-month-gb{
    margin-left: 1vw;
  }
  .chart-month-gb{
    padding: .25vh 2vw;
  }
  .fy-x, .fy-y{
    color: #d5d5d5;
    font-size: .15rem;
  }
  .fy-x{
    text-align: right;
  }
  .fy-chart .content{
    margin: .1rem;
    padding: .1rem 0;
    flex: 1;
    border-left: 1px solid #6d7092;
    border-bottom: 1px solid #6d7092;
  }
  .content img{
    height: .15rem;
  }
  .img-effect{
    position: absolute;
    left: 1vw;
    z-index: 999;
    opacity: 0;
    animation: imgEffect 3s 1s infinite;
  }
  @keyframes imgEffect {
    0% {transform: translateX(1.5vw); opacity: 0;}
    10% {opacity: 1;}
    50% {opacity: 1;}
    100% {transform: translateX(240%); opacity: 0;}
  }
</style>
