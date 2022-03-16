<template>
    <section>
      <title-chart icon="icon6" title="内存使用量(MB)"></title-chart>
      <div id="chart-memory__usage" class="fy-flex fy-flex__center" :style="{width: '8vw', height:'18.5vh'}">
        <div class="chart fy-flex fy-flex__center">
          <div class="memory-chart circle-progress_wrapper">
            <div class="wrapper">
              <div class="wrapper__left" :style="{'transform': `rotate(${-rotateL_m}deg)`,'-webkit-transform': `rotate(${-rotateL_m}deg)`}">
                <img src="../../assets/img/usage.png" :style="{'transform': `rotate(${rotateL_m+8}deg)`,'-webkit-transform': `rotate(${rotateL_m+8}deg)`}"/>
              </div>
            </div>
            <div class="wrapper">
              <div class="wrapper__right" :style="{'transform': `rotate(${-rotateR_m}deg)`,'-webkit-transform': `rotate(${-rotateR_m}deg)`}">
                <img src="../../assets/img/usage.png" :style="{'transform': `rotate(${rotateR_m+8}deg)`,'-webkit-transform': `rotate(${rotateR_m+8}deg)`}"/>
              </div>
            </div>
          </div>
          <div class="usage-chart circle-progress_wrapper">
            <div class="wrapper">
              <div class="wrapper__left" :style="{'transform': `rotate(${-rotateL_u}deg)`,'-webkit-transform': `rotate(${-rotateL_u}deg)`}">
                <img src="../../assets/img/usage_h.png" :style="{'transform': `rotate(${rotateL_u}deg)`,'-webkit-transform': `rotate(${rotateL_u}deg)`}"/>
              </div>
            </div>
            <div class="wrapper">
              <div class="wrapper__right" :style="{'transform': `rotate(${-rotateR_u}deg)`,'-webkit-transform': `rotate(${-rotateR_u}deg)`}">
                <img src="../../assets/img/usage_h.png" :style="{'transform': `rotate(${rotateR_u}deg)`,'-webkit-transform': `rotate(${rotateR_u}deg)`}"/>
              </div>
            </div>
          </div>
          <div class="usage-chart__title">
            <h3>内存总容量</h3>
            <p>{{totalMemoryCapacity}}</p>
          </div>
          <img class="chart__v" src="../../assets/img/usage_v.png"/>
          <img class="chart__u" src="../../assets/img/circle_u.png"/>
          <img style="width: .4rem;z-index: 11" src="../../assets/img/usage_c.png"/>
        </div>
        <div class="chart-title">
          <h3>{{usedMemoryCapacity}}</h3>
          <p>使用量</p>
          <h3 class="chart-title-usage">{{usage}}%</h3>
          <p>占比</p>
        </div>
      </div>
    </section>
</template>

<script>
import TitleChart from '../TitleChart.vue'
import {mapGetters} from 'vuex'
export default {
  // 全局感知
  name: "ChartMemoryUsage",

  // 模板依赖
  components: {TitleChart},
  // 本地状态
  data() {
    return {
      memory: 67,
      rotateL_m: 120,
      rotateR_m: 0,
      // usage: 100,
      rotateL_u: 181,
      rotateR_u: 0,
    };
  },
  computed: {
    ...mapGetters({
      cityRelevantInfo: 'getCityRelevantInfo'
    }),
    // 内存总量
    totalMemoryCapacity: function () {
      let retrunData = '63352'
      if (this.cityRelevantInfo.hasOwnProperty('totalMemoryCapacity')) {
        retrunData = this.cityRelevantInfo.totalMemoryCapacity
      }
      return this.$numberFormat(retrunData, 0)
    },
    // 内存使用量
    usedMemoryCapacity: function () {
      let returnData = '41369'
      if (this.cityRelevantInfo.hasOwnProperty('usedMemoryCapacity')) {
        returnData = this.cityRelevantInfo.usedMemoryCapacity.replace(/\,/g, '').split('.')[0]
      }
      return this.$numberFormat(returnData, 0)
    },
    usage: function () {
      let returnData = '36.09'
      // if (this.cityRelevantInfo.hasOwnProperty('usedMemoryProportion')) {
      //   returnData = this.cityRelevantInfo.usedMemoryProportion.replace(/\,/g, '').split('.')[0]
      // }
      if (this.cityRelevantInfo.hasOwnProperty('totalMemoryCapacity') && this.cityRelevantInfo.hasOwnProperty('usedMemoryCapacity')) {
        returnData = Math.floor((this.cityRelevantInfo.usedMemoryCapacity.replace(/\,/g, '').split('.')[0] / this.cityRelevantInfo.totalMemoryCapacity) * 100)
      }
      return returnData
    }
  },
  // 事件
  watch: {
    memory(curVal,oldVal) {
      this.initDataMemory(curVal,oldVal)
    },
    usage(curVal,oldVal) {
      this.initDataUsage(curVal,oldVal)
    }
  },
  mounted() {
//          this.memory = 55;
    // this.usage = 10;
//     setInterval(()=>{
// //            this.memory = Math.floor(Math.random()*40)+30;
//       this.usage = Math.floor(Math.random()*(this.memory-50))+20;
//     },15000)
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
    initDataMemory(curVal,oldVal) {
      if (curVal > 50) {
        if (oldVal < 50) {
          setTimeout(()=>{
            this.rotateL_m = 180 - 180 * (curVal/100);
          },3000);
        } else {
          this.rotateL_m = 180 - 180 * (curVal/100);
        }
        this.rotateR_m = 0;
      } else {
        if (oldVal > 50) {
          setTimeout(()=>{
            this.rotateR_m = 180 - 180 * (curVal/50);
          },3000);
        } else {
          this.rotateR_m = 180 - 180 * (curVal/50);
        }
        this.rotateL_m = 180;
      }
    },
    initDataUsage(curVal,oldVal) {
      if (curVal > 50) {
        if (oldVal < 50) {
          setTimeout(()=>{
            // this.rotateL_u = 180 - 180 * (curVal/100);
          },3000);
        } else {
          // this.rotateL_u = 180 - 180 * (curVal/100);
        }
        this.rotateR_u = 0;
      } else {
        if (oldVal > 50) {
          setTimeout(()=>{
            this.rotateR_u = 180 - 180 * (curVal/50);
          },3000);
        } else {
          this.rotateR_u = 180 - 180 * (curVal/50);
        }
        // this.rotateL_u = 180;
      }
      // this.rotateL_u = -180
    }
  }
}
</script>

<style lang="scss" scoped>
  .chart{
    position: relative;
    width: 1.9rem;
    height: 1.9rem;
  }
  .chart .memory-chart{
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    transform: rotate(-8deg);
    -webkit-transform: rotate(-8deg);
  }
  .chart .usage-chart{
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
  }
  .circle-progress_wrapper{
    position: absolute;
    top: 5.5%;
    left: 5.5%;
    width: 89%;
    height: 89%;
    .wrapper{
      position: relative;
      width: 50%;
      height: 100%;
      overflow: hidden;
      float: left;
      .wrapper__left{
        position: relative;
        width: 100%;
        height: 100%;
        transition: all 3s linear;
        transform-origin: 100% 50%;
        -webkit-transform-origin: 100% 50%;
        overflow: hidden;
      }
      .wrapper__right{
        position: relative;
        width: 100%;
        height: 100%;
        margin-right: 0;
        transition: all 3s linear;
        transform-origin: 0% 50%;
        -webkit-transform-origin: 0% 50%;
        overflow: hidden;
        img{
          margin-left: -100%;
        }
      }
      img{
        transition: all 3s linear;
        width: 200%;
        height: 100%;
      }
    }
  }
  .usage-chart__title{
    position: absolute;
    top: .6rem;
    left: 0;
    color: white;
    h3{
      font-size: .15rem;
      text-align: left;
    }
    p{
      font-size: .13rem;
      text-align: left;
    }
  }
  .chart-title{
    margin-top: .25rem;
    align-self:flex-start;
    color: white;
    h3{
      font-size: .2rem;
    }
    p{
      font-size: .15rem;
    }
  }
  .chart__v{
    position: absolute;
    top: .22rem;
    left: 50%;
    width: .1rem;
  }
  .chart__u{
    position: absolute;
    top: .1rem;
    right: 20%;
    width: .2rem;
  }
  .chart-title-usage{
    margin-top: 5px;
  }
</style>
