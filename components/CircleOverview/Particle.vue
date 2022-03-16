<template>
  <canvas class="particle" ref="particle" :width="windowsInfo.width * multiple" :height="(windowsInfo.height - 4) * multiple" :style="{width: windowsInfo.width + 'px', height: (windowsInfo.height -4) + 'px'}">
    您的游览器暂时不支持canvas,请下载最新版Chrome
  </canvas>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      canvasCtx: null,
      multiple: 4, // 屏幕倍数，为了做Retina适配
      cicleColor: ['#1f3278', '#992023'],
      circleArray: [], // 圆点数据
      circleCount: 100,
      animationIndex: 1 // 动画标志
    }
  },
  computed: {
    ...mapGetters({
      windowsInfo: 'getWindows'
    }),
    canvasSize: function () {
      return {
        width: this.windowsInfo.width * this.multiple,
        height: this.windowsInfo.height * this.multiple
      }
    }
  },
  watch: {
    'windowsInfo.height': function () {
      this.init()
    }
  },
  mounted () {
    // canvas初始化
    this.init()
  },
  methods: {
    init () {
      this.canvasCtx = this.$refs.particle.getContext('2d');
      let ctx = this.canvasCtx
      // 生成小圆圈点数据
      for (let i = 0; i < this.circleCount; i++) {
        this.circleArray.push(this.initCircle())
      }
      window.requestAnimationFrame(this.drawCircle)
    },
    // 绘制圆点
    drawCircle () {
      let circleArray = this.circleArray
      let ctx = this.canvasCtx
       // 清空画布
      ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
      for (let x in circleArray) {
        // 开始绘制前保存当前状态
        ctx.save();
        // 画布偏移，起始点改到正中间
        ctx.translate(this.canvasSize.width/2, this.canvasSize.height/2)
        // 开始绘制
        ctx.beginPath();
        // 圆点颜色
        ctx.fillStyle = circleArray[x].color
        // 圆点半径
        let circleRadius = circleArray[x].radius
        // 圆点XY轴坐标
        let xy = this.circleXY(x)
        // 圆点Y轴距离
        ctx.arc(xy.x, xy.y, circleRadius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
        this.circleArray[x].line = this.circleArray[x].line + this.circleArray[x].speed
        if (Math.abs(this.circleArray[x].x) > this.canvasSize.width / 2 || Math.abs(this.circleArray[x].y) > this.canvasSize.height / 2) {
          this.circleArray[x] = this.initCircle()
        }
      }
      this.animationIndex++
      window.requestAnimationFrame(this.drawCircle)
    },
    // 根据一定速度计算圆形坐标点
    circleXY (index) {
      // index 圆形点数组索引
      // X轴  斜边*sin(角度)
      // Y轴  斜边*cos(角度)
      let circleData = this.circleArray[index]
      let subAngle = circleData.angle % 90
      let x = circleData.line * Math.sin(subAngle * Math.PI/180)
      let y = circleData.line * Math.cos(subAngle * Math.PI/180)
      if (circleData.angle > 270) {
        x = 0 - x
        y = 0 - y
      } else if (circleData.angle > 180){
        x = 0 - x
      } else if (circleData.angle > 90) {
      } else {
        y = 0 - y
      }
      this.circleArray[index].x = x
      this.circleArray[index].y = y
      return {
        x: x,
        y: y
      }
    },
    // 生成小圆点
    initCircle () {
      let circleObj = {
        x: 0,
        y: 0,
        line: 5 * this.multiple,
        speed: (Math.floor(Math.random() * 5) + 1) * this.multiple,
        color: this.cicleColor[Math.floor(Math.random() * 2)], // 填充颜色
        radius: (Math.floor(Math.random() * 3) + 1) * this.multiple, // 半径2-7px
        angle: Math.floor(Math.random() * 360) // 发散角度
      }
      return circleObj
    }
  }
}
</script>
<style lang="scss" scoped>
.particle{
  overflow: hidden;
}
</style>
