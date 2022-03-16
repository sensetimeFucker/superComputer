<template>
  <div class="sub-item">
    <!-- 前端开发 -->
    <div class="web-developer-top" :style="{animationPlayState: animationRuning}">
      <div class="web-developer" :style="{animationPlayState: animationRuning}" @mouseover="animationHandle(false)"  @mouseout="animationHandle(true)" @click="showDialog('webDeveloper')">
        <span :style="{animationPlayState: animationRuning}">前端</span>
        <img src="../../../static/circleOverview/subItem/web_developer.png"/>
      </div>
    </div>
    <!-- python -->
    <div class="python-top" :style="{animationPlayState: animationRuning}">
      <div class="python" :style="{animationPlayState: animationRuning}" @mouseover="animationHandle(false)"  @mouseout="animationHandle(true)" @click="showDialog('python')">
        <span :style="{animationPlayState: animationRuning}">PYTHON库</span>
        <img src="../../../static/circleOverview/subItem/python.png"/>
      </div>
    </div>
    <!-- 基础组件 -->
    <div class="base-component-top" :style="{animationPlayState: animationRuning}">
      <div class="base-component" :style="{animationPlayState: animationRuning, cursor: 'default'}" @mouseover="animationHandle(false)"  @mouseout="animationHandle(true)" @click="showDialog('baseComponent')">
        <span :style="{animationPlayState: animationRuning}">基础组件</span>
        <img src="../../../static/circleOverview/subItem/base_component.png"/>
      </div>
    </div>
    <!-- 通用中间表示 -->
    <div class="common-middle-top" :style="{animationPlayState: animationRuning}">
      <div class="common-middle" :style="{animationPlayState: animationRuning}" @mouseover="animationHandle(false)"  @mouseout="animationHandle(true)" @click="showDialog('commonMiddle')">
        <span :style="{animationPlayState: animationRuning}">通用中间表示</span>
        <img src="../../../static/circleOverview/subItem/common_middle.png"/>
      </div>
    </div>
    <!-- 计算库 -->
    <div class="computing-lib-top" :style="{animationPlayState: animationRuning}">
      <div class="computing-lib" :style="{animationPlayState: animationRuning}" @mouseover="animationHandle(false)"  @mouseout="animationHandle(true)" @click="showDialog('computingLib')">
        <span :style="{animationPlayState: animationRuning}">计算库</span>
        <img src="../../../static/circleOverview/subItem/computing_lib.png"/>
      </div>
    </div>
    <!-- 通信库 -->
    <div class="communication-lib-top" :style="{animationPlayState: animationRuning}">
      <div class="communication-lib" :style="{animationPlayState: animationRuning}" @mouseover="animationHandle(false)"  @mouseout="animationHandle(true)" @click="showDialog('communicationLib')">
        <span :style="{animationPlayState: animationRuning}">通信库</span>
        <img src="../../../static/circleOverview/subItem/communication_lib.png"/>
      </div>
    </div>
    <!-- 可视化工具 -->
    <div class="visualization-tool-top" :style="{animationPlayState: animationRuning}">
      <div class="visualization-tool" :style="{animationPlayState: animationRuning}" @mouseover="animationHandle(false)"  @mouseout="animationHandle(true)" @click="showDialog('visualizationTool')">
        <span :style="{animationPlayState: animationRuning}">可视化工具</span>
        <img src="../../../static/circleOverview/subItem/visualization_tool.png"/>
      </div>
    </div>
    <!-- 监控 -->
    <div class="watch-control-top" :style="{animationPlayState: animationRuning}">
      <div class="watch-control" :style="{animationPlayState: animationRuning}" @mouseover="animationHandle(false)"  @mouseout="animationHandle(true)" @click="showDialog('watchControl')">
        <span :style="{animationPlayState: animationRuning}">监控</span>
        <img src="../../../static/circleOverview/subItem/watch_control.png"/>
      </div>
    </div>
    <div class="machine-learn" @click="showDialog('machineLearn')">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      animationRuning: 'running'
    }
  },
  methods: {
    animationHandle (tag) {
      if (tag) {
        this.animationRuning = 'running'
      } else {
        this.animationRuning = 'paused'
      }
    },
    showDialog (tag) {
      if (tag !== 'baseComponent') {
        this.$emit('showDialog', tag)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 自转速度
$imgSpeed: 7s;
$speed: 50s;
// 圆半径
$radius: -600px;
// 椭圆幅度
$radiusT: 400px;
// 转圈动画
@keyframes animation-circle
{
  0%   {-webkit-transform: rotate(90deg) translate($radius); transform: rotate(90deg) translate($radius);}
  25%  {-webkit-transform: rotate(180deg) translate($radius); transform: rotate(180deg) translate($radius);}
  50%  {-webkit-transform: rotate(270deg) translate($radius); transform: rotate(270deg) translate($radius);}
  75%  {-webkit-transform: rotate(360deg) translate($radius); transform: rotate(360deg) translate($radius);}
  100% {-webkit-transform: rotate(450deg) translate($radius); transform: rotate(450deg) translate($radius);}
}
// 文字反向旋转动画
@keyframes animation-circle-span
{
  0%   {-webkit-transform: rotate(-90deg); transform: rotate(-90deg);}
  25%  {-webkit-transform: rotate(-180deg); transform: rotate(-180deg); }
  50%  {-webkit-transform: rotate(-270deg); transform: rotate(-270deg); }
  75%  {-webkit-transform: rotate(-360deg); transform: rotate(-360deg); }
  100% {-webkit-transform: rotate(-450deg); transform: rotate(-450deg); }
}
// 左右拉椭圆动画
@keyframes leftRight
{
  0%   {-webkit-transform: translateX(0px); transform: translateX(0px);}
  25%  {-webkit-transform: translateX($radiusT); transform: translateX($radiusT);}
  50%  {-webkit-transform: translateX(0px); transform: translateX(0px);}
  75%  {-webkit-transform: translateX(-$radiusT); transform: translateX(-$radiusT);}
  100% {-webkit-transform: translateX(0px); transform: translateX(0px)}
}
// 图片自转动画
@keyframes imgScorll
{
  0%   {transform: rotate(0deg);}
  50%  {transform: rotate(180deg);}
  100% {transform: rotate(360deg);}
}
.sub-item{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 11;
  div{
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
  span{
    position: absolute;
    display: inline-block;
    width: 100%;
    color: #fff;
    font-size: 22px;
    text-align: center;
  }
  img{
    width: 100%;
    position: absolute;
    animation: imgScorll $imgSpeed linear infinite;
  }
  span{
    transform: rotate(-90deg);
    animation: animation-circle-span $speed linear infinite;
  }
  .web-developer-top, .python-top, .base-component-top, .common-middle-top, .computing-lib-top, .communication-lib-top, .visualization-tool-top, .watch-control-top{
    animation: leftRight ease-in-out infinite;
    animation-duration: $speed;
  }
  .web-developer, .python, .base-component, .common-middle, .computing-lib, .communication-lib, .visualization-tool, .watch-control{
    // cursor: pointer;
    transform: rotate(90deg) translate(-250px);
    animation: animation-circle $speed linear infinite;
  }
  // 一前端开发
  .web-developer-top{
    .web-developer{
      $size: 280px;
      width: $size;
      height: $size;
      margin-left: -$size/2;
      margin-top: -$size/2;
      span{
        line-height: $size;
      }
    }
  }
  // 二python
  .python-top{
    $index: 1;
    animation-delay:-($speed/8) * $index;
    .python{
      $size: 250px;
      width: $size;
      height: $size;
      margin-left: -$size/2;
      margin-top: -$size/2;
      animation-delay:-($speed/8) * $index;
      span{
        line-height: $size;
        animation-delay:-($speed/8) * $index;
      }
    }
  }
  // 三基础组件
  .base-component-top{
    $index: 2;
    animation-delay:-($speed/8) * $index;
    .base-component{
      $size: 225px;
      width: $size;
      height: $size;
      margin-left: -$size/2;
      margin-top: -$size/2;
      animation-delay:-($speed/8) * $index;
      span{
        line-height: $size;
        animation-delay:-($speed/8) * $index;
      }
    }
  }
  // 四通用中间件表示
  .common-middle-top{
    $index: 3;
    animation-delay:-($speed/8) * $index;
    .common-middle{
      $size: 250px;
      width: $size;
      height: $size;
      margin-left: -$size/2;
      margin-top: -$size/2;
      animation-delay:-($speed/8) * $index;
      span{
        line-height: $size;
        animation-delay:-($speed/8) * $index;
      }
    }
  }
  // 五计算库
  .computing-lib-top{
    $index: 4;
    animation-delay:-($speed/8) * $index;
    .computing-lib{
      $size: 240px;
      width: $size;
      height: $size;
      margin-left: -$size/2;
      margin-top: -$size/2;
      animation-delay:-($speed/8) * $index;
      span{
        line-height: $size;
        animation-delay:-($speed/8) * $index;
      }
    }
  }
  // 六通讯库
  .communication-lib-top{
    $index: 5;
    animation-delay:-($speed/8) * $index;
    .communication-lib{
      $size: 260px;
      width: $size;
      height: $size;
      margin-left: -$size/2;
      margin-top: -$size/2;
      animation-delay:-($speed/8) * $index;
      span{
        line-height: $size;
        animation-delay:-($speed/8) * $index;
      }
    }
  }
  // 七可视化工具
  .visualization-tool-top{
    $index: 6;
    animation-delay:-($speed/8) * $index;
    .visualization-tool{
      $size: 200px;
      width: $size;
      height: $size;
      margin-left: -$size/2;
      margin-top: -$size/2;
      animation-delay:-($speed/8) * $index;
      span{
        line-height: $size;
        animation-delay:-($speed/8) * $index;
      }
    }
  }
  // 八监控
  .watch-control-top{
    $index: 7;
    animation-delay:-($speed/8) * $index;
    .watch-control{
      $size: 280px;
      width: $size;
      height: $size;
      margin-left: -$size/2;
      margin-top: -$size/2;
      animation-delay:-($speed/8) * $index;
      span{
        line-height: $size;
        animation-delay:-($speed/8) * $index;
      }
    }
  }
  // 正中间空的深度机器学习
  .machine-learn{
    $width: 180px;
    width: $width;
    height: $width;
    border-radius: 50%;
    // cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>

