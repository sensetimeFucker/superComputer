<template>
    <section>
      <title-chart title="日存储容量(TB)"></title-chart>
      <div id="chart" class="fy-flex rccrl" :style="{width: '18vw', height: chartHeight ? chartHeight + 'vh':'18vh'}">
        <div class="day-store" :style="{width: chartHeight ? '1.416rem':'2.2519rem', height: chartHeight ? '1.032rem':'1.6412rem'}">
          <!-- <div class="scroll-img">
            <img src="../../../static/homeImg/memory_scroll.png"/>
          </div> -->
          <div class="circle-progress_wrapper">
            <div class="wrapper">
              <div class="circle-progress left-circle" ref="leftCircle" :style="{border:chartHeight ?'.125rem solid red':'.2rem solid red','transform': `rotate(${rotateL}deg)`,'-webkit-transform': `rotate(${rotateL}deg)`}"></div>
            </div>
            <div class="wrapper right-wrapper">
              <div class="circle-progress right-circle" ref="rightCircle" :style="{border:chartHeight ?'.125rem solid red':'.2rem solid red','transform': `rotate(${rotateR}deg)`,'-webkit-transform': `rotate(${rotateR}deg)`}"></div>
            </div>
          </div>
          <div class="day-store-c fy-flex fy-flex__center">
            <div class="day-store__title">
              <h3 :style="{ 'font-size': chartHeight ? '.15rem':'.2rem'}">{{storageCapacity}}</h3>
              <p :style="{ 'font-size': chartHeight ? '.1rem':'.15rem'}">存储总容量</p>
            </div>
          </div>
          <img src="../../assets/img/store.png"/>
        </div>
        <div class="day-store-r fy-flex fy-flex__column" style="margin-left:.1rem;align-items: flex-start;">
          <div class="day-store__title">
            <h3>{{storageUsedCapacity}}</h3>
            <p>使用量</p>
          </div>
          <div style="flex: 1"></div>
          <div class="day-store__title">
            <h3>{{rotate}}%</h3>
            <p>可用比例</p>
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
  name: "ChartDayGB",
  // 模板依赖
  components: {
    TitleChart
  },
  // 接口
  props: {
    chartHeight: String,
    animationTag: Boolean,
    city: {
      type: String,
      default () {
        return 'index'
      }
    }
  },
  // 本地状态
  data() {
      return {
        rotateL: 225,
        rotateR: 225
      };
  },
  computed: {
    ...mapGetters({
      indexAll: 'getIndexAll',
      cityRelevantInfo: 'getCityRelevantInfo'
    }),
    // 日存储总容量
    storageCapacity: function () {
      let returnNumber = '1000'
      if (this.city === 'index' && this.indexAll.hasOwnProperty('storageCapacity')) {
        returnNumber = this.indexAll.storageCapacity.split('.')[0]
        // 数字缩小1000
        returnNumber = Math.round(parseInt(returnNumber.replace(/\,/g, '')) / 1000)
      } else {
        if (this.cityRelevantInfo.hasOwnProperty('storageCapacity')) {
          returnNumber = this.cityRelevantInfo.storageCapacity.split('.')[0]
          // 数字缩小1000
          returnNumber = Math.round(parseInt(returnNumber.replace(/\,/g, '')) / 1000)
        }
      }
      return this.$numberFormat(returnNumber, 0)
    },
    // 存储使用容量
    storageUsedCapacity: function () {
      let returnNumber = '500'
      if (this.city === 'index' && this.indexAll.hasOwnProperty('storageUsedCapacity')) {
        returnNumber = this.indexAll.storageUsedCapacity.split('.')[0]
        returnNumber = Math.round(parseInt(returnNumber.replace(/\,/g, '')) / 1000)
      } else {
        if (this.cityRelevantInfo.hasOwnProperty('storageUsedCapacity')) {
          returnNumber = this.cityRelevantInfo.storageUsedCapacity.split('.')[0]
          returnNumber = Math.round(parseInt(returnNumber.replace(/\,/g, '')) / 1000)
        }
      }
      return this.$numberFormat(returnNumber, 0)
    },
    // 存储可用比例
    rotate: function () {
      let returnNumber = 65
      if (this.city === 'index' && this.indexAll.hasOwnProperty('storageUsedCapacity') && this.indexAll.hasOwnProperty('storageCapacity')) {
        returnNumber = Math.floor((this.indexAll.storageUsedCapacity.replace(/\,/g, '').split('.')[0] / this.indexAll.storageCapacity.replace(/\,/g, '').split('.')[0]) * 100)
      } else {
        if (this.cityRelevantInfo.hasOwnProperty('storageAvailableProportion')) {
          returnNumber = Math.floor((this.cityRelevantInfo.storageUsedCapacity.replace(/\,/g, '').split('.')[0] / this.cityRelevantInfo.storageCapacity.replace(/\,/g, '').split('.')[0]) * 100)
        }
      }
      return 100 - returnNumber
      // return 57
    }
  },
  // 事件
  watch: {
    rotate(val, oldValue) {
      this.rotateInit(val, oldValue)
    }
  },
  mounted () {
    this.rotateInit(this.rotate, 0)
  },
  // 非响应式的属性
  methods: {
    rotateInit (newValue, oldValue) {
      let that = this
      // if (newValue <= 50 && oldValue < 50) {
      //   that.rotateR = 225
      //   that.rotateL = 225 - 180 * (that.rotate/50)
      // }
      // if (newValue <= 50 && oldValue > 50) {
      //   that.rotateR = 225
      //   that.$refs.rightCircle.addEventListener('transitionend', function () {
      //     console.log('大到小')
      //     that.rotateL = 225 - 180 * (that.rotate/50)
      //     that.$refs.rightCircle.removeEventListener('transitionend')
      //   })
      // }
      // if (newValue > 50 && oldValue < 50) {
      //   that.rotateL = 45
      //   that.$refs.leftCircle.addEventListener('transitionend', function () {
      //     console.log('小到大')
      //     that.rotateR = 225 - 180 * ((that.rotate -50)/50)
      //     that.$refs.leftCircle.removeEventListener('transitionend')
      //   })
      // }
      // if (newValue > 50 && oldValue > 50) {
      //   that.rotateR = 225 - 180 * ((that.rotate -50)/50)
      // }
      if (that.rotate > 50) {
        that.rotateL = 45;
        setTimeout(() => {
          that.rotateR = 225 - 180 * ((that.rotate -50) / 50)
        }, 2000)
      } else {
        that.rotateR = 225;
        setTimeout(() => {
          that.rotateL = 225 - 180 * (that.rotate/50)
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
.rccrl{
  margin-left: 1vw;
}
  .circle-progress_wrapper{
    position: absolute;
    top: 2.1622%;
    left: 3%;
    width: 70%;
    height: 95.6757%;
  }
  .wrapper{
    position: relative;
    width: 50%;
    height: 100%;
    overflow: hidden;
    float: left;
  }
  .right-wrapper{
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg)
  }
  .left-circle{
    border-top-color:transparent!important;
    border-right-color:transparent!important;
    border-radius: 50%;
  }
  .right-circle{
    margin-right: 0;
    border-top-color:transparent!important;
    border-right-color:transparent!important;
    border-radius: 50%;
  }
  .circle-progress{
    transition: all 2s;
    position: relative;
    width: 200%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
  }

  .day-store{
    position: relative;
    background-image: url("../../assets/img/store_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }
  .day-store img{
    position: absolute;
    top: 2.1622%;
    left: 3%;
    width: 70%;
    height: 95.6757%;
  }
  .day-store-c{
    position: absolute;
    top: 2.1622%;
    left: 3%;
    width: 70%;
    height: 95.6757%;
  }
  .day-store-r{
    position: relative;
  }
  .day-store-r p, .day-store-r h3{
    text-align: left;
  }

  .day-store__title h3{
    color: white;
    font-size: .2rem;
  }
  .day-store__title p{
    color: white;
    font-size: .15rem;
  }
</style>
