<template>
    <section :style="{marginTop: city ==='index'? '0vh' : '5vh'}">
      <title-chart icon="icon6" title="数据流量(MB/s)"></title-chart>
      <div class="chart-data fy-flex" :class="[classType == 'column' ? 'fy-flex__column':'']">
        <div class="fy-flex fy-flex__column chart-data-mb-item" :style="{marginTop: city !=='index'? '50px' : '20px', marginLeft: city !== 'index'? '-40px' : '30px'}">
          <div class="fy-flex data-title">吞吐量<p>{{receivedDataFlowFinal}}</p></div>
          <div id="chart-data-mb0" :style="{width: '9vw', height:'17.25vh'}">
            <div class="data-bg" :style="{width: city !== 'index'? '2rem' : '1.448rem', height: city !== 'index'? '1rem' : '.68rem'}">
              <div class="data-content">
                <div :style="{'transform': `rotate(${rotatelFinal}deg)`,'-webkit-transform': `rotate(${rotatelFinal}deg)`}">
                  <img src="../../assets/img/data.png" :style="{'transform': `rotate(${-rotatelFinal}deg)`,'-webkit-transform': `rotate(${-rotatelFinal}deg)`}"/>
                </div>
              </div>
              <div class="data-indicating" :style="{'transform': `rotate(${rotatelFinal + 90}deg)`,'-webkit-transform': `rotate(${rotatelFinal + 90}deg)`}">
                <img class="circle" src="../../assets/img/circle.png"/>
                <img class="indicating" src="../../assets/img/indicating.png"/>
              </div>
            </div>
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
  name: "ChartDataMB",
  // 模板依赖
  components: {
    TitleChart
  },
  filters: {},
  // 接口
  props: {
    classType: String,
    city: {
      type: String,
      default () {
        return 'index'
      }
    }
  },
  computed: {
    ...mapGetters({
      // indexAll: 'getIndexAll',
      // cityRelevantInfo: 'getCityRelevantInfo'
      cityFlow: 'getCityFlow',
      flowInfo: 'getFlowInfo'
    }),
    tempData () {
      let tempData = {}
      if (this.city === 'index') {
        tempData = this.cityFlow
      } else {
        tempData = this.flowInfo
      }
      return tempData
    },
    totalNumber () {
      let tempData = 1000000
      if (this.city === 'index') {
        tempData = 2000000
      } else {
        tempData = 1000000
      }
      return tempData
    },
    // 吞吐量
    rotatel () {
      if (this.tempData.hasOwnProperty('receivedDataFlow') && this.tempData.hasOwnProperty('sendDataFlow')) {
        let currNumber = parseInt(this.tempData.receivedDataFlow) + parseInt(this.tempData.sendDataFlow)
        let percent = (currNumber / this.totalNumber) * 180
        percent = percent > 180 ? 180 : percent
        return percent - 180
      }
      return -90
    },
    receivedDataFlow () {
      if (this.tempData.hasOwnProperty('receivedDataFlow') && this.tempData.hasOwnProperty('sendDataFlow')) {
        return this.$numberFormat(parseFloat(this.tempData.receivedDataFlow) + parseFloat(this.tempData.sendDataFlow), 0)
      }
      return '51,000'
    }
  },
  data () {
    return {
      rotatelFinal: -90,
      receivedDataFlowFinal: '51,000',
      intervalTag: null
    }
  },
  mounted () {
    this.changeNumber()
  },
  methods: {
    changeNumber () {
      this.intervalTag = setInterval(() => {
        let currNumber = parseFloat(this.tempData.receivedDataFlow) + parseFloat(this.tempData.sendDataFlow)
        currNumber = currNumber + Math.floor(Math.random() * (this.totalNumber / 10) - (this.totalNumber / 20))
        if (currNumber > 2000000 || currNumber < 100000) {
          currNumber = parseFloat(this.tempData.receivedDataFlow) + parseFloat(this.tempData.sendDataFlow)
        }
        let percent = (currNumber / this.totalNumber) * 180
        if (percent > 180 || percent < 0) {
          percent = 180
        }
        percent = percent - 180
        this.rotatelFinal = percent
        this.receivedDataFlowFinal = this.$numberFormat(currNumber, 0)
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .chart-data{
    color: #d5d5d5;
  }
  .chart-data .data-title{
    color: #d5d5d5;
    font-size: .15rem;
  }
  .chart-data p{
    margin: 0 .05rem;
    color: white;
    font-size: .2rem;
  }

  .data-bg{
    position: relative;
    margin: .05rem auto;
    width: 1.448rem;
    height: .68rem;
    background-image: url("../../assets/img/data_bg.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    .data-content{
      position: absolute;
      bottom: 1px;
      left: 9%;
      width: 82%;
      height: 82%;
      overflow: hidden;
      div{
        position: relative;
        width: 100%;
        height: 100%;
        transition: all 3s;
        transform-origin: 50% 100%;
        -webkit-transform-origin: 50% 100%;
        overflow: hidden;
        img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: all 3s;
          transform-origin: 50% 100%;
          -webkit-transform-origin: 50% 100%;
        }
      }
    }
    .data-indicating{
      position: absolute;
      left: calc(50% - .05rem);
      width: .1rem;
      height: 100%;
      transition: all 3s;
      transform-origin: 50% 100%;
      -webkit-transform-origin: 50% 100%;
      img{
        position: absolute;
      }
      .circle{
        top: -.05rem;
        left: 0;
        width: .1rem;
        height: .1rem;
      }
      .indicating{
        bottom: -.05rem;
        left: 0;
        width: .1rem;
        height: .7rem;
      }
    }
  }
  .chart-data-mb-item{
    margin-left: 30px;
  }
</style>
