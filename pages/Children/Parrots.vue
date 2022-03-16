<template>
  <div>
    <div class="circle-dialog" v-show="dialogShowTag">
      <circle-dialog @close="dialogShowTag = false" :showTag="dialogShowName" :dialogShow="dialogShow"></circle-dialog>
    </div>
    <div class="parrots-bg">
      <bg-points></bg-points>
    </div>
    <div class="canvas-circle">
      <canvas-circle></canvas-circle>
    </div>
    <div class="sub-item">
      <sub-item @showDialog="showDialog"></sub-item>
    </div>
    <div class="features">
      <div>
        <span class="features-title">Parrots</span>
        <span class="features-title">特性</span>
        <div class="features-line"></div>
      </div>
      <div>
        <img src="../../../static/circleOverview/features/performance.png"/>
        <span>高性能</span>
      </div>
      <div>
        <img src="../../../static/circleOverview/features/concurrent.png"/>
        <span>高并发</span>
      </div>
      <div>
        <img src="../../../static/circleOverview/features/flexible.png"/>
        <span>高灵活性</span>
      </div>
      <div>
        <img src="../../../static/circleOverview/features/productivity.png"/>
        <span>高生产力</span>
      </div>
    </div>
    <div class="parrots-logo">
      <div class="parrots-logo-icon">
        <img src="../../assets/img/Parrots.png" alt="">
      </div>
      <div class="parrots-logo-line"></div>
      <div class="parrots-logo-words">
        <div class="words-top">
          <span>开放</span>
          <span class="words-top-line"></span>
          <span>通用</span>
          <span class="words-top-line"></span>
          <span>工业级</span>
        </div>
        <div class="words-bottom">
          <span>人工智能训练平台</span>
        </div>
      </div>
    </div>
    <div class="back">
      <div class="right-arrow-bg" @click="move">
        <div class="right-arrow">
          <img src="../../../static/circleOverview/right_arrow.png"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as api from '@/api'
import {mapActions} from 'vuex'
export default {
  components: {
    // 粒子特效组件
    bgPoints: () => import('@/components/CircleOverview/Points'),
    // 中间圆环组件
    canvasCircle: () => import('@/components/CircleOverview/Circle'),
    // 8大类组件
    subItem: () => import('@/components/CircleOverview/SubItem'),
    // 弹窗
    circleDialog: () => import('@/components/CircleOverview/Dialog')
  },
  data () {
    return{
      dialogShowTag: false,
      dialogShowName: '',
      dialogShow: false // 用于解决连续2次点击可视化工具无响应问题
    }
  },
  mounted () {
    this.dataList()
  },
  methods: {
    ...mapActions([
      'setParrots',
    ]),
    dataList () {
      api.parrorts({city: 'sh'})
        .then(data => {
          if (data.code === '0000') {
            this.setParrots(data.data)
          }
        })
    },
    move() {
      this.$emit('move', 0);
    },
    showDialog (tag) {
      this.dialogShowName = tag
      this.dialogShowTag = true
      this.dialogShow = !this.dialogShow
    },
    closeDialog () {
      this.dialogShowTag = false
    }
  }
}
</script>
<style lang="scss" scoped>
.parrots-bg, .canvas-circle, .sub-item{
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.parrots-bg{
  // background: #13151c;
  // background: #fff;
  background-image: radial-gradient(#22262e, #1d2027, #161a1f);
}

.features{
  position: absolute;
  height: 50%;
  top: 50%;
  right: 1%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  &>div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    img{
      width: 30px;
      height: 30px;
      margin: 0 auto;
    }
    span {
      color: #fff;
      margin-top: 5px;
      font-size: 16px;
    }
    .features-title{
      font-size: 24px;
    }
  }
  .features-line{
    width: 40px;
    border-bottom: solid .5px #fff;
    height: 0px;
    margin: 0 auto;
    margin-top: 10px;
  }
}
.parrots-logo{
  display: flex;
  align-items: center;
  position: absolute;
  left: 50px;
  top: 50px;
  .parrots-logo-icon{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    img{
      width: 33px;
    }
  }
  .parrots-logo-line{
    height:40px;
    width: 0px;
    border: solid 0.5px #a2a2a2;
    margin: 0 30px;
  }
  .parrots-logo-words{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    .words-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .words-top-line{
        width: 0px;
        height: 10px;
        border: solid 1px #4a4848;
        margin: 0 10px;
      }
    }
    .words-bottom{
      letter-spacing: 4px;
      margin-top: 3px;
    }
  }
}
.back{
  position: absolute;
  top: 50%;
  transform: scale(-1,1) translateY(-50%);
  z-index: 999;
  // cursor: pointer;
  .right-arrow-bg{
    width: 8vh;
    height: 40vh;
    background-image: url("../../assets/img/left.png");
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    &:hover, &:active{
      background-image: url("../../assets/img/left_hover.png");
    }
    .right-arrow{
      position: absolute;
      top: 50%;
      left: 18px;
      transform: translateY(-50%);
      width: 40px;
      img{
        width: 47px;
      }
    }
  }
}
</style>


