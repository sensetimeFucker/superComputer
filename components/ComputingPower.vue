<template>
    <section class="fy-flex computing-power">
      <img class="computing-power__img" src="../assets/img/icon1.png"/>
      <div class="title-trapezium"></div>
      <div class="computing-power__str">{{title}}</div>
      <div class="computing-power_title computing-power_bg fy-flex">
        <!-- <img class="bg_icon" src="../assets/img/bg_icon.png"/> -->
        <img class="bg_icon" src="../../static/homeImg/bg_icon.gif"/>
        <div class="computing-power_gradients fy-flex">
          <div class="computing-power_num" v-for="(num, index) in computingPowerList" :key="index">
            <ul class="computing-power_ul" :style="{'margin-top': num * -.5 + 'rem'}">
              <li>
                <img src="../assets/img/num_0.png"/>
              </li>
              <li>
                <img src="../assets/img/num_1.png"/>
              </li>
              <li>
                <img src="../assets/img/num_2.png"/>
              </li>
              <li>
                <img src="../assets/img/num_3.png"/>
              </li>
              <li>
                <img src="../assets/img/num_4.png"/>
              </li>
              <li>
                <img src="../assets/img/num_5.png"/>
              </li>
              <li>
                <img src="../assets/img/num_6.png"/>
              </li>
              <li>
                <img src="../assets/img/num_7.png"/>
              </li>
              <li>
                <img src="../assets/img/num_8.png"/>
              </li>
              <li>
                <img src="../assets/img/num_9.png"/>
              </li>
            </ul>
          </div>
        </div>
        <span class="word-content">亿次/秒</span>
      </div>
    </section>
</template>

<script>
import {mapGetters} from 'vuex'
//算力
export default {
  // 全局感知
  name: "ComputingPower",
  // 模板依赖
  components: {},
  filters: {},
  // 接口
  props: {
    title: String,
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
      // computingPowerData: 7002050001,
      computingPowerList: []
    };
  },
  computed: {
    ...mapGetters({
      indexAll: 'getIndexAll',
      cityRelevantInfo: 'getCityRelevantInfo',
      cityCode: 'getCityCode'
    }),
    computingPowerData: function () {
      let returnData = 9000000000
      if (this.city === 'index') {
        // 首页总算力
        if (this.indexAll.hasOwnProperty('totalCalculationForce')) {
          returnData = this.indexAll.totalCalculationForce
        }
      } else {
        // 城市总算力
        if (this.cityRelevantInfo.hasOwnProperty('totalCalculationForce')) {
          if (this.cityCode === 'sz' || this.cityCode === 'sh') {
            returnData = this.cityRelevantInfo.totalCalculationForce * 10
          } else {
            returnData = this.cityRelevantInfo.totalCalculationForce
          }
        }
      }
      return returnData
    }
  },
  // 事件
  watch: {
    computingPowerData() {
      this.initComputingPowerList();
    }
  },
  mounted() {
    for (let i = 0; i < `${this.computingPowerData}`.length;i++) {
      this.computingPowerList.push(0)
    }
    setTimeout(this.initComputingPowerList, 1500);
    // setInterval(()=>{
    //   this.computingPowerData += Math.floor(Math.random()*10000)-5000
    // },5000)
  },
  // 非响应式的属性
  methods: {
    initComputingPowerList() {
      this.computingPowerList = `${this.computingPowerData}`.split("");
    }
  }
}
</script>

<style scoped>
  .title-trapezium {
    margin: 0 .1rem;
    width: 0;
    height: .1rem;
    background-color:rgba(255, 0, 0, 0);

    border-top: .04rem solid rgba(255, 0, 0, 0);
    border-right: .01rem solid rgba(255, 0, 0, 0);
    border-bottom: .04rem solid rgba(255, 0, 0, 0);
    border-left: .05rem solid #aa2f2d;
  }
  .computing-power__img{
    width: .3rem;
  }
  .computing-power__str{
    margin-right: .1rem;
    color: #cacaca;
    font-size: 32px;
  }
  .computing-power_bg{
    padding: 0.08rem .18rem;
    font-size: .3rem;
    text-align: center;
    background-image: url("../assets/img/bg0.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
  .bg_icon{
    margin-right: .1rem;
    height: .4rem;
  }
  .computing-power_title span{
    margin-left: .1rem;
    padding-top: .35rem;
    /* font-size: .15rem; */
    line-height: .15rem;
    color: white;
  }
  .computing-power_gradients{
    background-image: url("../assets/img/num_bg.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
  .computing-power_num {
    height: .5rem;
    overflow: hidden;
    /*border-radius: .5rem;*/
    /*box-shadow: 4px 6px 8px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  }
  .computing-power_ul {
    transition: all 1s;
  }
  .computing-power_num li{
    height: .5rem;
  }
  .computing-power_num img{
    height: .5rem;
  }
  .word-content{
    width: 45px;
    font-size: 13px;
    display: inline-block;
  }
</style>
