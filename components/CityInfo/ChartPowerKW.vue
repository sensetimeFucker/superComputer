<template>
    <section>
      <title-chart icon="icon7" title="超算实时功率和温度"></title-chart>
      <div class="fy-flex">
        <div id="chart-kw" class="fy-flex fy-flex__column" :style="{width: '9vw', height:'18.5vh'}">
          <h3 class="data-title ">超算实时功率(KW)</h3>
          <div class="power fy-flex fy-flex__center">
            <div class="line"></div>
            <img class="power-bg" src="../../assets/img/power_bg.png"/>
            <!--<div class="point"></div>-->
            <div class="circle-progress_wrapper">
              <div class="wrapper">
                <div class="wrapper__left" :class="[animationTag? 'wrapper__left_ts' : '']" :style="{'transform': `rotate(${rotateL_kw}deg)`}">
                  <img src="../../assets/img/power.png" :class="[animationTag? 'img_ts' : '']" :style="{'transform': `rotate(${-rotateL_kw}deg)`}"/>
                </div>
              </div>
              <div class="wrapper">
                <div class="wrapper__right" :class="[animationTag? 'wrapper__right_ts' : '']" :style="{'transform': `rotate(${rotateR_kw}deg)`}">
                  <img src="../../assets/img/power.png" :class="[animationTag? 'img_ts' : '']" :style="{'transform': `rotate(${-rotateR_kw}deg)`}"/>
                </div>
              </div>
            </div>
            <h3>{{power}}<span>KW</span></h3>
          </div>
        </div>
        <div id="chart-c"  class="fy-flex fy-flex__column" :style="{width: '9vw', height:'18.5vh'}">
          <h3 class="data-title">温度(℃)</h3>
          <div class="temperature fy-flex fy-flex__center">
            <div class="line"></div>
            <img class="temperature-bg" src="../../assets/img/temperature_bg.png"/>
            <!--<div class="point"></div>-->
            <div class="circle-progress_wrapper">
              <div class="wrapper">
                <div class="wrapper__left" :class="[animationTag? 'wrapper__left_ts' : '']" :style="{'transform': `rotate(${rotateL_c}deg)`}">
                  <img src="../../assets/img/temperature.png" :class="[animationTag? 'img_ts' : '']" :style="{'transform': `rotate(${-rotateL_c}deg)`}"/>
                </div>
              </div>
              <div class="wrapper">
                <div class="wrapper__right" :class="[animationTag? 'wrapper__right_ts' : '']" :style="{'transform': `rotate(${rotateR_c}deg)`}">
                  <img src="../../assets/img/temperature.png" :class="[animationTag? 'img_ts' : '']" :style="{'transform': `rotate(${-rotateR_c}deg)`}"/>
                </div>
              </div>
            </div>
            <h3>{{temperature}}<span>℃</span></h3>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
import TitleChart from '../TitleChart.vue'
export default {
  // 全局感知
  name: "ChartPowerKW",
  // 模板依赖
  components: {
    TitleChart
  },
  // 本地状态
  data() {
      return {
        rotateL_kw: 180,
        rotateR_kw: 180,
        rotateL_c: 180,
        rotateR_c: 180,
        kwInter: null,
        animationTag: true
      };
  },
  computed: {
    ...mapGetters({
      powerTemperature: 'getPowerTemperature'
    }),
    power: function () {
      if (this.powerTemperature.hasOwnProperty('power')) {
        let currNumber = this.powerTemperature.power.replace(/\,/g, '')
        return parseInt(currNumber / 1000)
      }
      return 70
    },
    temperature: function () {
      if (this.powerTemperature.hasOwnProperty('temperature')) {
        return Math.floor(this.powerTemperature.temperature)
      }
      return 65
    }
  },
  // 事件
  watch: {
    power(curVal, oldVal) {
      let tempData = 0
      if (!(curVal > 180 || curVal < 0)) {
        tempData = curVal
      }
      this.animationTag = false
      this.rotateL_kw = 180
      this.rotateR_kw = 180
      setTimeout(() => {
        this.animationTag = true
        this.initDataKW(tempData)
      }, 100)
    },
    temperature(curVal, oldVal) {
      let tempData = 0
      if (!(curVal > 100 || curVal < 0)) {
        tempData = Math.floor(180 - (curVal / 100) * 180)
      }
      this.animationTag = false
      this.rotateR_c = 180
      this.rotateL_c = 180
      setTimeout(() => {
        this.animationTag = true
        this.initDataC(tempData)
      }, 100)
    }
  },
  mounted() {
    this.initDataKW(0)
    this.initDataC(0)
  },
  // 非响应式的属性
  methods: {
    initDataKW(value) {
      if (this.rotateL_kw === 0) {
        this.rotateR_kw = value
      } else {
        this.rotateL_kw = 0
        setTimeout(() => {
          this.rotateR_kw = value
        }, 2000)
      }
    },
    initDataC(value) {
      if (this.rotateL_c === 0) {
        this.rotateR_c = value
      } else {
        this.rotateL_c = 0
        setTimeout(() => {
          this.rotateR_c = value
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#chart-kw, #chart-c{
  margin-top: 2vh;
}
  .data-title{
    color: #6d7092;
    font-size: .15rem;
  }
  .power{
    position: relative;
    width: 1.9rem;
    height: 1.9rem;
    .power-bg{
      position: absolute;
      top: 10%;
      left: 10%;
      width: 80%;
      height: 80%;
    }
    h3{
      color: white;
      font-size: .3rem;
      z-index: 11;
      span{
        font-size: .2rem;
      }
    }
  }
  .temperature{
    position: relative;
    width: 1.8rem;
    height: 1.8rem;
    .temperature-bg{
      position: absolute;
      top: 13.1%;
      left: 13.1%;
      width: 73.4%;
      height: 73.4%;
    }
    .circle-progress_wrapper{
      top: 8%;
      left: 8%;
      width: 84%;
      height: 84%;
    }
    .line{
      top: 8%;
    }
    h3{
      color: white;
      font-size: .25rem;
      z-index: 11;
      span{
        font-size: .15rem;
      }
    }
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
        transform-origin: 100% 50%;
        -webkit-transform-origin: 100% 50%;
        overflow: hidden;
      }
      .wrapper__left_ts{
        transition: all 2s linear;
      }
      .wrapper__right{
        position: relative;
        width: 100%;
        height: 100%;
        margin-right: 0;
        transform-origin: 0% 50%;
        -webkit-transform-origin: 0% 50%;
        overflow: hidden;
        img{
          margin-left: -100%;
        }
      }
      .wrapper__right_ts{
        transition: all 2s linear;
      }
      img{
        width: 200%;
        height: 100%;
      }
      .img_ts{
        transition: all 2s linear;
      }
    }
  }
  .line{
    position: absolute;
    top: 6%;
    left: 50%;
    margin-left: -1px;
    width: 1px;
    height: 8%;
    opacity: .7;
    background: #4d4f58;
  }
  // @keyframes circleAnimation
  // {
  //   0%   {background: red;}
  //   25%  {background: yellow;}
  //   50%  {background: blue;}
  //   100% {background: green;}
  // }
</style>
