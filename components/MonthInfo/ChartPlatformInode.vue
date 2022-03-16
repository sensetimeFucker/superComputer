<template>
    <section>
      <title-chart icon="icon3" title="平台可用Inode总数"></title-chart>
      <div id="chart-inode__platform" :style="{width: '18vw', height:'17vh'}">
        <div class="inode fy-flex">
          <!-- <div class="fy_y fy-flex">
            <div>{{startHour1}}</div>
            <div>{{startHour2}}</div>
            <span>:</span>
            <div>{{startMinute1}}</div>
            <div>{{startMinute2}}</div>
          </div> -->
          <div class="fy_chart">
            <div class="inode_pointers">
              <img src="../../assets/img/inode.png" :style="{'transform': `rotate(${rotateFinall}deg)`,'-webkit-transform': `rotate(${rotateFinall}deg)`}"/>
            </div>
            <p>{{inodeTotalNumFinall}}<span>个</span></p>
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
            <!-- <div>{{endMinute2}}</div> -->
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
    name: "ChartPlatformInode",
    // 模板依赖
    components: {
      TitleChart,
      NumberScroll
    },
    // 本地状态
    data() {
      return {
        totalNumber: 110000000000,
        startHour1: 1,
        startHour2: 0,
        startMinute1: 0,
        startMinute2: 0,
        endHour1: 1,
        endHour2: 0,
        endMinute1: 0,
        endMinute2: 0,
        inodeTotalNumFinall: '91,079,127,993',
        rotateFinall: -45,
        intervalTag: null
      }
    },
    computed: {
      ...mapGetters({
        inodeInfo: 'getInodeInfoCount'
      }),
      inodeTotalNum: function () {
        if (this.inodeInfo.hasOwnProperty('inodeTotalNum')) {
          let returnData = this.inodeInfo.inodeTotalNum
          return returnData.split('.')[0]
        }
        return '91,079,127,993'
      },
      rotate: function () {
        if (this.inodeInfo.hasOwnProperty('inodeTotalNum')) {
          let numberArr = this.inodeInfo.inodeTotalNum.split(',')
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
    mounted () {
      this.timeCompute()
      setInterval(() => {
        this.timeCompute()
      }, 30000)
      this.changeNumber()
    },
    beforeDestroy () {
      clearInterval(this.intervalTag)
    },
    // 非响应式的属性
    methods: {
      timeCompute () {
        // this.startHour1 = miment().format('hh').substr(0, 1)
        // this.startHour2 = miment().format('hh').substr(1, 1)
        // this.startMinute1 = miment().format('mm').substr(0, 1)
        // this.startMinute2 = miment().format('mm').substr(1, 1)
        this.endHour1 = miment().format('hh').substr(0, 1)
        this.endHour2 = miment().format('hh').substr(1, 1)
        this.endMinute1 = miment().format('mm').substr(0, 1)
        this.endMinute2 = miment().format('mm').substr(1, 1)
      },
      changeNumber () {
        this.intervalTag = setInterval(() => {
          let currNumber = parseInt(this.inodeTotalNum.replace(/\,/g, '').split('.')[0])
          currNumber = currNumber + Math.random() * (this.totalNumber / 10) - (this.totalNumber / 20)
          if (currNumber > 120000000000 || currNumber < 80000000000) {
            currNumber = parseInt(this.inodeTotalNum.replace(/\,/g, '').split('.')[0])
          }
          let percent = (currNumber / this.totalNumber) * 90
          percent = percent > 90 ? 90 : percent - 90
          this.rotateFinall = percent
          this.inodeTotalNumFinall = this.$numberFormat(currNumber, 0)
        }, 1000)
      }
    }
}
</script>

<style lang="scss" scoped>
  #chart-inode__platform .inode{
    align-items: center;
  }
  #chart-inode__platform{
    display: flex;
    align-items: center;
    margin-top: -1vh;
    margin-left: 1vw;
  }
  .fy_x, .fy_y{
    color: #575c6a;
    font-size: .12rem;
    .div-border{
      padding: 0 .01rem;
      color: white;
      border: 1px solid #575c6a;
    }
  }
  .fy_y{
    div, span{
      margin-right: .05rem;
    }
  }
  .fy_x{
    align-self: flex-end;
    div, span{
      margin-left: .05rem;
    }
  }
  .fy_chart{
    position: relative;
    width: 1.65rem;
    height: 1.7rem;
    background-image: url("../../assets/img/inodeXY.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    .inode_pointers{
      position: relative;
      margin-left: 7.88%;
      margin-top: 13.9%;
      width: 75.7%;
      height: 78.5%;
      overflow: hidden;
      img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all 3s;
        transform-origin: left bottom;
        -webkit-transform-origin: left bottom;
      }
    }
    p{
      position: absolute;
      left: 1.65rem;
      top: .55rem;
      color: white;
      font-size: .2rem;
      white-space:nowrap;
      span{
        font-size: .1rem;
      }
    }
  }
</style>
