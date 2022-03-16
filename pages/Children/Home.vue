<template>
  <section>
    <div class="home-index">
      <earth-fly class="earth-bg" v-show="earthTag"></earth-fly>
      <div class="bg"></div>
      <div class="header">
        <computing-power class="computing-power" title="超算平台本月总算力"></computing-power>
      </div>
      <div class="container fy-flex">
        <!-- 左侧首页图表 -->
        <div class="container-chart" style="margin: 0 0.2rem 0 0.4rem;">
          <chart-day-g-b :animationTag="leftAnimationTag"></chart-day-g-b>
          <chart-platform-inode :animationTag="leftAnimationTag"></chart-platform-inode>
          <chart-month-g-p-u :animationTag="leftAnimationTag"></chart-month-g-p-u>
          <chart-sum-g-p-u :animationTag="leftAnimationTag"></chart-sum-g-p-u>
          <chart-month-g-b :animationTag="leftAnimationTag"></chart-month-g-b>
          <chart-data-m-b classType="row" :animationTag="leftAnimationTag"></chart-data-m-b>
        </div>
        <!-- <div style="position:absolute;left:46%;width: 1px!important;height: 95%;background: #2f3148"></div> -->
        <!-- 右侧城市图表 -->
        <div class="container-right-swiper">
          <div v-for="item in [1]" :key="item" class="container-chart container-right-top" :style="{margin: '0 0.4rem 0 0.2rem', opacity: chartOpacity? '1' : '0', marginTop: item === 1? marginTop + 'vh' : '0vh'}">
            <chart-city-week-g-b></chart-city-week-g-b>
            <chart-city-inode></chart-city-inode>
            <chart-city-g-p-u></chart-city-g-p-u>
            <chart-power-k-w></chart-power-k-w>
          </div>
        </div>
        <div class="container-city">
          <div class="container-city__item0"></div>
          <ul class="fy-flex fy-flex__column fy-flex__center">
            <li class="fy-flex fy-flex__column fy-flex__center" v-for="(city, index) in list" :key="index" @click="changeCity(index, city.code)">
              <img :hidden="activeCity != index" :src="activeImg" />
              <div :class="[activeCity == index ? 'container-city__active':'']">{{city.name}}</div>
            </li>
          </ul>
          <div class="container-city__item1"></div>
        </div>
      </div>
      <div class="sidebar" @click="move">
        <div class="fy-flex fy-flex__column fy-flex__center">
          <img src="../../assets/img/Parrots.png" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as api from '@/api';
import { mapActions } from 'vuex';
import EarthFly from '../../components/EarthFly.vue';
import ComputingPower from '../../components/ComputingPower.vue';

import ChartDayGB from '../../components/MonthInfo/ChartDayGB.vue';
import ChartPlatformInode from '../../components/MonthInfo/ChartPlatformInode.vue';
import ChartMonthGPU from '../../components/MonthInfo/ChartMonthGPU.vue';
import ChartSumGPU from '../../components/MonthInfo/ChartSumGPU.vue';
import ChartMonthGB from '../../components/MonthInfo/ChartMonthGB.vue';
import ChartDataMB from '../../components/MonthInfo/ChartDataMB.vue';

import ChartCityWeekGB from '../../components/CityInfo/ChartCityWeekGB.vue';
import ChartCityInode from '../../components/CityInfo/ChartCityInode.vue';
import ChartCityGPU from '../../components/CityInfo/ChartCityGPU.vue';
import ChartPowerKW from '../../components/CityInfo/ChartPowerKW.vue';

import icon_b from '../../assets/img/icon_b.png';
import icon_h from '../../assets/img/icon_h.png';
import icon_s from '../../assets/img/icon_s.png';
import icon_t from '../../assets/img/icon_t.png';
import icon_g from '../../assets/img/icon_g.png';
import miment from 'miment'
export default {
  // 全局感知
  name: 'Home',
  // 模板依赖
  components: {
    EarthFly,
    ComputingPower,
    ChartDayGB,
    ChartPlatformInode,
    ChartMonthGPU,
    ChartSumGPU,
    ChartMonthGB,
    ChartDataMB,
    ChartCityWeekGB,
    ChartCityInode,
    ChartCityGPU,
    ChartPowerKW
  },
  // 本地状态
  data() {
    return {
      earthTag: true, // 延时加载
      cityChanging: true,
      leftAnimationTag: false,
      dateIntervalTag: null,
      timeId: null,
      activeCity: 0,
      activeCode: 'bj',
      nextCity: 0,
      nextCode: 'bj',
      activeImg: icon_b,
      chartShow: false,
      marginTop: 0,
      chartOpacity: true,
      list: [
        {
          name: '北京',
          code: 'bj',
          id: '0',
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
        // {
        //   name: '东京',
        //   id: '3',
        //   code: 'dj',
        //   value: [139.779694, 35.552258]
        // },
        {
          name: '香港',
          id: '3',
          code: 'xg',
          value: [114.080397, 22.436592]
        }
      ]
    };
  },
  watch: {
    $route: function (value) {
      if (value.name !== 'index') {
        clearInterval(this.timeId)
      }
    },
    activeCity(val) {
      switch (Number(val)) {
        case 0:
          this.activeImg = icon_b
          break
        case 1:
          this.activeImg = icon_h
          break
        case 2:
          this.activeImg = icon_s
          break
        case 3:
          this.activeImg = icon_t
          break
        case 4:
          this.activeImg = icon_g
          break
      }
      this.changeCity(this.activeCity, this.activeCode)
    },
    cityChanging(val) {}
  },
  created() {
    this.dataList()
    this.cityDataList()
  },
  mounted() {
    this.setDateTimeFun()
    this.timeId = setInterval(() => {this.switchCities()}, 15000)
    this.dateIntervalTag = setInterval(() => this.setDateTimeFun(), 15000)
  },
  beforeDestroy() {
    clearInterval(this.timeId)
    clearInterval(this.dateIntervalTag)
  },
  // 非响应式的属性
  methods: {
    ...mapActions([
      'setIndexAll',
      'setInodeInfoCount',
      'setCityRelevantInfo',
      'setCityCode',
      'setGpuTime',
      'setPowerTemperature',
      'setStorageAvailableCapacity',
      'setCityFlow',
      'setDateTime'
    ]),
    move() {
      this.$emit('move', 1)
    },
    switchCities() {
      this.chartShow = false
      this.chartShow = true
      const { activeCity, activeCode } = this
      const next = parseInt(activeCity) + 1
      const nextItem = this.list[next] || this.list[0]
      this.activeCity = nextItem.id
      this.activeCode = nextItem.code
      this.marginTop = next * -85

    },
    dataList() {
      // 总览数据
      api.all().then(data => {
        if (data.code === '0000') {
          this.setIndexAll(data.data)
        }
      })
      // Inode总数据
      api.inodeInfoCount().then(data => {
        if (data.code === '0000') {
          this.setInodeInfoCount(data.data)
        }
      })
      // 获取城市GPU时
      api.gpuTime().then(data => {
        if (data.code === '0000') {
          this.setGpuTime(data.data)
        }
      })
      // 获取存储可用容量
      api.storageAvailableCapacity()
        .then(data => {
          if (data.code === '0000') {
            this.setStorageAvailableCapacity(data.data)
          }
        })
      // 获取全国流量
      api.cityFlow()
        .then(data => {
          if (data.code === '0000') {
            this.setCityFlow(data.data)
          }
        })
    },
    // 获取城市数据
    cityDataList() {
      // 获取实时功率和温度
      api.powerTemperature({ city: this.activeCode }).then(data => {
        if (data.code === '0000' && data.data) {
          this.setPowerTemperature(data.data)
        } else {
          this.setPowerTemperature({})
        }
      });
    },
    changeCity(index, code) {
      this.chartShow = false
      this.chartShow = true
      // this.marginTop = index * -85
      this.marginTop = 0
      this.activeCity = index
      this.activeCode = code
      // this.setCityCode(code);
      // this.cityDataList();
      this.chartOpacity = false
      setTimeout(() => {
        this.chartOpacity = true
      }, 500)
      setTimeout(() => {
        this.setCityCode(code)
        this.cityDataList()
      }, 500)
      clearInterval(this.timeId)
      this.timeId = setInterval(() => this.switchCities(), 15000)
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
    }
  }
};
</script>

<style scoped>
.container-right-top{
  transition: all ease-in-out .5s
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 15vh;
  /*background: seagreen;*/
}
.header .computing-power {
  /* padding: 0 0.3rem; */
  margin-left: 4vw;
  width: 50vw;
  height: 15vh;
}

.container {
  position: absolute;
  top: 12vh;
  left: 4.4vw;
  width: 45vw;
  height: 94vh;
  /*background: #8b291e;*/
}
.sidebar {
  position: absolute;
  top: 15vh;
  right: 0;
  width: 10vw;
  height: 85vh;
  font-size: 0.15rem;
  color: white;
}
.sidebar div {
  margin-top: 15vh;
  margin-left: calc(10vw - 8vh);
  width: 8vh;
  height: 40vh;
  background-image: url('../../assets/img/left.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  /* cursor: pointer; */
}
.sidebar div:hover,
.sidebar div:active {
  background-image: url('../../assets/img/left_hover.png');
}
.sidebar img {
  margin-top: 0.15rem;
  position: relative;
  width: 40%;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 40vw;
  height: 100vh;
  background-image: url('../../assets/img/bg_1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

.container-chart {
  width: 12vw;
  height: 85vh;
}
.container-chart section {
  margin: 0.05rem auto;
}
.container-right-swiper{
  overflow: hidden;
  height: 85vh;
}

.container-city {
  width: 5vw;
  height: 86vh;
}

.container-city .container-city__item0,
.container-city .container-city__item1 {
  width: 2.5vw;
  height: 20vh;
  border-right: 1px solid #6d7092;
}
.container-city .container-city__item0 {
  border-top: 1px solid #6d7092;
}
.container-city .container-city__item1 {
  border-bottom: 1px solid #6d7092;
}
.container-city ul {
  width: 5vw;
  height: 38vh;
}
.container-city li {
  list-style-type: none;
  color: #6d7092;
  font-size: 0.1rem;
  flex: 1;
  padding: 0.02rem 0.08rem;
}
.container-city li img {
  height: 0.25rem;
}
.container-city li div {
  margin-top: 0.05rem;
  padding: 0.02rem 0.16rem;
  font-size: 0.15rem;
  color: #6d7092;
  /* cursor: pointer; */
}
.container-city li div:hover {
  opacity: 0.7;
}
.container-city .container-city__active {
  color: white;
  font-size: 0.2rem;
  background-image: url('../../assets/img/city_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.home-index{
  background-color: #13151c;
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
