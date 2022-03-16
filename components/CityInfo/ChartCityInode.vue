<template>
  <section>
    <title-chart icon="icon3" title="城市可用Inode总数"></title-chart>
    <div id="chart-inode__city" :style="{width: '18vw', height: chartHeight ? chartHeight + 'vh':'17vh'}">
      <div class="inode fy-flex" :style="{paddingLeft: '38px'}">
        <!-- <div class="fy_y fy-flex">
          <div>{{startHour1}}</div>
          <div>{{startHour2}}</div>
          <span>:</span>
          <div>{{startMinute1}}</div>
          <div>{{startMinute2}}</div>
        </div> -->
        <div class="fy_chart"
             :style="{width: chartHeight ? '.825rem':'1.65rem', height: chartHeight ? '.85rem':'1.7rem'}">
          <div class="inode_pointers">
            <img 
              src="../../assets/img/inode.png"
              :style="{'transform': `rotate(${rotateScroll}deg)`,'-webkit-transform': `rotate(${rotateScroll}deg)`}"
              :class="[animationTag? 'img-ts' : '']"/>
          </div>
          <p>{{inodeTotalNum}}<span>个</span></p>
        </div>
        <div class="fy_x fy-flex">
          <div>
              <number-scroll :number="endHour1"></number-scroll>
            </div>
            <div>
              <number-scroll :number="endHour2"></number-scroll>
            </div>
          <span>:</span>
          <div>
            <number-scroll :number="endMinute1"></number-scroll>
          </div>
          <div>
            <number-scroll :number="endMinute2"></number-scroll>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import miment from 'miment'
import {mapGetters} from 'vuex'
import TitleChart from '../TitleChart.vue'
import NumberScroll from '@/components/SpecialEffect/NumberScroll'
export default {
  // 全局感知
  name: "ChartCityInode",
  // 模板依赖
  components: {
    TitleChart,
    NumberScroll
  },
  // 接口
  props: {
    chartHeight: String,
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
      totalNumber: 6000000000,
      startHour1: 1,
      startHour2: 0,
      startMinute1: 0,
      startMinute2: 0,
      endHour1: 1,
      endHour2: 0,
      endMinute1: 0,
      endMinute2: 0,
      rotateScroll: -90,
      animationTag: true
    };
  },
  computed: {
    ...mapGetters({
      inodeInfo: 'getInodeInfoCount',
      cityCode: 'getCityCode',
      cityRelevantInfo: 'getCityRelevantInfo'
    }),
    inodeTotalNum: function () {
      let returnNumber = '9107460'
      if (this.city === 'index' && this.inodeInfo.hasOwnProperty(`inodeTotalNum_${this.cityCode}`)) {
        returnNumber = this.inodeInfo[`inodeTotalNum_${this.cityCode}`].split('.')[0]
      } else {
        if (this.inodeInfo.hasOwnProperty(`inodeTotalNum_${this.city}`)) {
          returnNumber = this.inodeInfo[`inodeTotalNum_${this.city}`].split('.')[0]
        }
      }
      return this.$numberFormat(returnNumber, 0)
    },
    rotate: function () {
      let currCityCode = 'bj'
      if (this.city === 'index') {
        currCityCode = this.cityCode
      } else {
        currCityCode = this.city
      }
      if (this.inodeInfo.hasOwnProperty(`inodeTotalNum_${currCityCode}`)) {
        let numberArr = this.inodeInfo[`inodeTotalNum_${currCityCode}`].split(',')
        let numberStr = ''
        for (let x in numberArr) {
          numberStr += numberArr[x]
        }
        let currNumber = parseFloat(numberStr)
        let percent = (currNumber / this.totalNumber) * 90
        percent = percent > 90 ? 90 : percent
        return percent - 90
      }
      return -45
    }
  },
  mounted() {
    this.chartInit()
    this.timeCompute()
    setInterval(() => {
      this.timeCompute()
    }, 60000)
  },
  watch: {
    inodeTotalNum: function (value) {
      this.animationTag = false
      this.rotateScroll = -90
      setTimeout(() => {
        this.animationTag = true
        this.rotateScroll = this.rotate
      }, 100)
    }
  },
  // 非响应式的属性
  methods: {
    chartInit () {
      this.animationTag = false
      this.rotateScroll = -90
      setTimeout(() => {
        this.animationTag = true
        this.rotateScroll = this.rotate
      }, 100)
    },
    timeCompute () {
      // this.startHour1 = miment().format('hh').substr(0, 1)
      // this.startHour2 = miment().format('hh').substr(1, 1)
      // this.startMinute1 = miment().format('mm').substr(0, 1)
      // this.startMinute2 = miment().format('mm').substr(1, 1)
      this.endHour1 = miment().format('hh').substr(0, 1)
      this.endHour2 = miment().format('hh').substr(1, 1)
      this.endMinute1 = miment().format('mm').substr(0, 1)
      this.endMinute2 = miment().format('mm').substr(1, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  #chart-inode__city {
    padding-top: .05rem;
    display: flex;
    align-items: center;
    margin-top: -1vh;
  }

  #chart-inode__city .inode {
    align-items: flex-start;
  }

  .fy_x, .fy_y {
    color: #575c6a;
    font-size: .12rem;
    // div {
    //   padding: 0 .01rem;
    //   color: white;
    //   border: 1px solid #575c6a;
    // }
  }

  .fy_y {
    div, span {
      margin-left: .05rem;
    }
  }

  .fy_x {
    align-self: flex-end;
    div, span {
      margin-right: .05rem;
    }
  }

  .fy_chart {
    position: relative;
    /*width: 16.5rem;*/
    /*height: 17rem;*/
    background-image: url("../../assets/img/inodeXY.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    .inode_pointers {
      position: relative;
      margin-left: 7.88%;
      margin-top: 13.9%;
      width: 75.7%;
      height: 78.5%;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: left bottom;
        -webkit-transform-origin: left bottom;
      }
    }
    p {
      position: absolute;
      left: 100%;
      top: 32.34%;
      color: white;
      font-size: .2rem;
      white-space: nowrap;
      span {
        font-size: .1rem;
      }
    }
  }
  .img-ts{
    transition: all 3s;
  }
</style>
