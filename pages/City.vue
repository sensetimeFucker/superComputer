<template>
  <section @mousewheel="pageScorll($event)">
    <div class="img-bg-total">
      <img class="img-bg" :style="{width: bgWidth + '%', height: bgHeight + '%'}" :hidden="activeCity != 0" src="../assets/beijing_3d.jpg"/>
      <img class="img-bg" :style="{width: bgWidth + '%', height: bgHeight + '%'}" :hidden="activeCity != 1" src="../assets/shanghai_3d.jpg"/>
      <img class="img-bg" :style="{width: bgWidth + '%', height: bgHeight + '%'}" :hidden="activeCity != 2" src="../assets/shenzhen_3d.jpg"/>
      <img class="img-bg" :style="{width: bgWidth + '%', height: bgHeight + '%'}" :hidden="activeCity != 3" src="../assets/xianggang_3d.jpeg"/>
    </div>
    <div class="color-bg" style="background: rgba(0,0,0,0.55)"></div>
    <!-- <div class="rain-flow">
      <rain-flow v-if="showCharts" :rainNumber="300"></rain-flow>
      <rain-flow v-if="!showCharts" :rainNumber="600"></rain-flow>
    </div> -->
    <div class="nav fy-flex">
      <div class="nav-left"></div>
      <ul class="nav-content fy-flex fy-flex__center" style="color: white">
        <li  v-for="(city, index) in list" :key="index">
          <div :class="[activeCity == index ? 'container-city__active':'']"  @click="changeCityIndex(index)">{{city.name}}</div>
          <div class="hover-content"></div>
        </li>
      </ul>
      <div class="nav-right fy-flex fy-flex__center" @click="back" style="cursor: pointer;color: white;font-size: .2rem">
        <img src="../assets/img/back.png"/>
      </div>
    </div>
    <div class="container">
      <div class="header">
        <computing-power class="fy-flex__center computing-power" :city="city.code" title="城市总算力"  v-show="showCharts"></computing-power>
      </div>
      <div class="content fy-flex" style="background: rgba(255,255,0,0)" v-show="!showCharts">
        <div class="content-change fy-flex fy-flex__center">
          <img  @click="changeCity(-1)" src="../assets/img/change0.png"/>
        </div>
        <div style="flex: 1"></div>
        <div class="content-change fy-flex fy-flex__center">
          <img @click="changeCity(1)" src="../assets/img/change1.png"/>
        </div>
      </div>
      <div class="content fy-flex" v-show="showCharts">
        <div class="content-change fy-flex fy-flex__center">
            <img  @click="changeCity(-1)" src="../assets/img/change0.png"/>
        </div>
        <div class="content-chart-total">
          <div class="content-chart" style="width: 10vw;">
            <chart-day-g-b chartHeight="9" :city="city.code"></chart-day-g-b>
            <chart-city-inode chartHeight="9" :city="city.code"></chart-city-inode>
            <chart-month-g-p-u :city="city.code"></chart-month-g-p-u>
            <chart-sum-g-p-u :city="city.code"></chart-sum-g-p-u>
          </div>
          <div class="content-chart">
            <chart-day-lustre :city="city.code"></chart-day-lustre>
            <chart-hour-g-p-u :city="city.code"></chart-hour-g-p-u>
          </div>
          <div class="content-chart">
            <chart-day-inode :city="city.code"></chart-day-inode>
            <chart-hour-power :city="city.code"></chart-hour-power>
          </div>
          <div class="content-chart">
            <chart-hour-r-a-m :city="city.code"></chart-hour-r-a-m>
            <chart-hour-c :city="city.code"></chart-hour-c>
          </div>
          <div class="content-chart" :style="{width: '8vw'}">
            <chart-memory-usage :city="city.code"></chart-memory-usage>
            <chart-data-m-b classType="column" :city="city.code"></chart-data-m-b>
          </div>
        </div>
        <div class="content-change fy-flex fy-flex__center">
            <img @click="changeCity(1)" src="../assets/img/change1.png"/>
        </div>
      </div>
    </div>
    <div class="footer fy-flex fy-flex__center" :style="{background: showCharts ? '#13151b':'rgba(89, 94, 130, 0)'}">
      <div style="color: white; font-size: .2rem;cursor: pointer" @click="showCharts = !showCharts">
        <img :hidden="showCharts" src="../assets/img/full.png"/>
        <img :hidden="!showCharts" src="../assets/img/full_back.png"/>
      </div>
    </div>
  </section>
</template>

<script>
import ComputingPower from '../components/ComputingPower.vue'
import ChartDayGB from '../components/MonthInfo/ChartDayGB.vue'
import ChartCityInode from '../components/CityInfo/ChartCityInode.vue'
import ChartMonthGPU from '../components/MonthInfo/ChartMonthGPU.vue'
import ChartSumGPU from '../components/MonthInfo/ChartSumGPU.vue'
import ChartDayLustre from '../components/HourInfo/ChartDayLustre.vue'
import ChartHourGPU from '../components/HourInfo/ChartHourGPU.vue'
import ChartDayInode from '../components/HourInfo/ChartDayInode.vue'
import ChartHourPower from '../components/HourInfo/ChartHourPower.vue'
import ChartHourRAM from '../components/HourInfo/ChartHourRAM.vue'
import ChartHourC from '../components/HourInfo/ChartHourC.vue'
import ChartMemoryUsage from '../components/HourInfo/ChartMemoryUsage.vue'
import ChartDataMB from '../components/MonthInfo/ChartDataMB.vue'
import {mapActions} from 'vuex'
import * as api from '@/api'
import miment from 'miment'
export default {
  // 全局感知
  name: "City",

  // 模板依赖
  components: {
    ComputingPower,
    ChartDayGB,
    ChartCityInode,
    ChartMonthGPU,
    ChartSumGPU,
    ChartDayLustre,
    ChartHourGPU,
    ChartDayInode,
    ChartHourPower,
    ChartHourRAM,
    ChartHourC,
    ChartMemoryUsage,
    ChartDataMB,
    // 下雨特效
    rainFlow: () => import('@/components/SpecialEffect/Rain')
  },
  // 本地状态
  data() {
    return {
      activeCity: 0,
      bgHeight: 100,
      bgWidth: 100,
      dateTimeTag: null,
      city: {
        name: '北京',
        id: '0',
        code: 'bj',
        value: [116.584556, 40.080111]
      },
      list: [
        {
          name: '北京',
          id: '0',
          code: 'bj',
          value: [116.584556, 40.080111]
        },
        {
          name: '上海',
          id: '1',
          code: 'sh',
          value: [121.336319, 31.197875]
        },
        {
          name: '深圳',
          id: '2',
          code: 'sz',
          value: [114.027203, 22.607058]
        },
        {
          name: '香港',
          id: '3',
          code: 'xg',
          value: [114.15, 22.15]
        }
      ],
      showCharts: true
    };
  },
  computed: {
    rainNumber: function () {
      let numberCount = 300
      if (this.showCharts) {
        numberCount = 300
      } else {
        numberCount = 1000
      }
      return numberCount
    }
  },
  // 事件
  watch: {
    '$route': function (value) {
      if (value.name !== 'index') {
        this.city = this.list[Number(this.$route.params.id)||0];
        this.activeCity = this.city.id;
        // this.setCityCode(this.city.code)
        this.dataList()
      }
    }
  },
  mounted () {
    this.city = this.list[Number(this.$route.params.id)||0];
    this.setCityCode(this.city.code)
    this.activeCity = this.city.id;
    this.dataList()
    this.setDateTimeFun()
    this.dateTimeTag = setInterval(() => {
      // 获取数据
      this.dataList()
      // 更新时间轴
      this.setDateTimeFun()
    }, 60000)
  },
  // 非响应式的属性
  methods: {
    ...mapActions([
      'setCityRelevantInfo',
      'setClusterPower',
      'setGpuInfo',
      'setGpuTemperature',
      'setInodeInfo',
      'setLustreInfo',
      'setMemoryInfo',
      'setCityCode',
      'setDateTime',
      'setFlowInfo'
    ]),
    back() {
      clearInterval(this.dateTimeTag)
      this.$router.push('/')
    },
    pageScorll ($event) {
      if ($event.deltaY < 0) {
        // 向上滚轮
        this.bgWidth += 10
        this.bgHeight += 10
      } else {
        // 向下滚轮
        this.bgWidth =  this.bgWidth < 110 ? 100 : this.bgWidth -10
        this.bgHeight =  this.bgHeight < 110 ? 100 : this.bgHeight -10
      }
    },
    changeCity(val) {
      this.activeCity = Number(this.activeCity) + Number(val);
      this.activeCity > this.list.length-1 ?
      this.activeCity = 0 :
      this.activeCity < 0 ? this.activeCity = this.list.length-1 : this.activeCity;
      this.changeCityIndex(this.activeCity)
    },
    // 设置日期时间
    setDateTimeFun () {
      let returnData = {
        time: [],
        date: [],
        hour: []
      }
      // 24小时时间
      for (let i = 0; i < 24; i++) {
        returnData.hour.push(miment().add((0 - i), 'hh').format('hh:00'))
      }
      // 1440分钟
      for (let i = 0; i < 1440; i++) {
        returnData.time.push(miment().add((0 - i), 'mm').format('hh:mm'))
      }
      returnData.time.reverse()
      // 15天时间
      for (let i = 0; i < 15; i++) {
        returnData.date.push(miment().add((0 - i), 'DD').format('MM/DD'))
      }
      returnData.date.reverse()
      this.setDateTime(returnData)
    },
    dataList () {
      // 获取日存储容量、月度GP时、GPU核数、内存使用量、数据流量等数据
      api.cityRelevantInfo({city: this.city.code})
        .then(data => {
          if (data.code === '0000' && data.data) {
            this.setCityRelevantInfo(data.data)
          }
        })
      // 获取近24小时内存使用率
      api.memoryInfo({city: this.city.code})
        .then(data => {
          if (data.code === '0000' && data.data) {
            this.setMemoryInfo(data.data)
          }
        })
      // 获取Lustre近15天存储可用容容量比例趋势
      api.lustreInfo({city: this.city.code})
        .then(data => {
          if (data.code === '0000' && data.data) {
            this.setLustreInfo(data.data)
          }
        })
      // 获取近24小时集群功率变化趋势
      api.clusterPower({city: this.city.code})
        .then(data => {
          if (data.code === '0000' && data.data) {
            this.setClusterPower(data.data)
          }
        })
      // 获取近24小时GPU时趋势
      api.gpuInfo({city: this.city.code})
        .then(data => {
          if (data.code === '0000' && data.data) {
            this.setGpuInfo(data.data)
          }
        })
      // 获取近24小时GUP温度变化趋势
      api.gpuTemperature({city: this.city.code})
        .then(data => {
          if (data.code === '0000' && data.data) {
            this.setGpuTemperature(data.data)
          }
        })
      // 获取inode近15天存储可用容容量比例趋势
      api.inodeInfo({city: this.city.code})
        .then(data => {
          if (data.code === '0000' && data.data) {
            this.setInodeInfo(data.data)
          }
        })
       // 获取城市流量
      api.flowInfo({city: this.city.code})
        .then(data => {
          if (data.code === '0000' && data.data) {
            this.setFlowInfo(data.data)
          }
        })
    },
    // 顶部导航切换城市
    changeCityIndex (index) {
      this.activeCity = index
      this.city = this.list[index]
      this.setCityCode(this.city.code)
      this.dataList()
    }
  }
}
</script>

<style scoped>
  section{
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .img-bg-total {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -2;
  }
  .img-bg{
    position: absolute;
  }
  .color-bg{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: -1;
  }
  .nav {
    width: 100vw;
    height: 10vh;
    /*background: saddlebrown;*/
  }
  .nav-content{
    width: 60vw;
  }
  .nav-content, .nav-right, .nav-left{
    position: relative;
    height: 100%;
  }
  .nav-right, .nav-left{
    width: 20vw;
  }
  .nav-right img{
    width: .3rem;
    /* cursor: pointer; */
  }
  .nav-right img:hover{
    opacity: 0.7;
  }
  .nav ul li{
    margin: 0 .2rem;
    float:left;
    list-style-type:none;
  }
  .nav ul li div{
    margin: 0 .1rem;
    padding: .2rem auto;
    /* cursor: pointer; */
    border-bottom: .02rem solid rgba(255, 0, 0, 0);

    color: #595e82;
    font-size: .25rem;
  }
  .nav ul li .container-city__active{
    color: white;
    border-bottom: .02rem solid red;
  }
  .container{
    width: 100vw;
    height: 80vh;
    /*background: darkblue;*/
  }
  .container .header{
    width: 100vw;
    height: 31vh;
  }
  .container .computing-power{
    position: relative;
    height: 100%;
  }
  .container .content{
    background-image: url("../assets/img/city_total_bg.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
  .container .content-change{
    width: 10vw;
    height: 50vh;
  }
  .container .content-chart{
    width: 17vw;
    height: 50vh;
  }
  .container .content-change img{
    margin-top: -20vh;
    width: 4vw;
    /* cursor: pointer; */
  }
  .container .content-change img:hover{
    opacity: 0.7;
  }


  .footer{
    width: 100vw;
    height: 10vh;
    opacity: 0.96;
  }
  .footer img{
    height: 5vh;
    /* cursor: pointer; */
  }
  .footer img:hover{
    opacity: 0.7;
  }
  .rain-flow{
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
  }
  .content-chart-total{
    width: 80vw;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
  }
</style>
