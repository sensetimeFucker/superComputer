<template>
  <div class="color-top">
    <div class="color-left-hand" :style="{left: `${divLeft}%`, top: `${divTop}%`}">{{leftHandState}}</div>
    <div class="color-right-hand" :style="{left: `${rightHandLeft}%`, top: `${rightHandTop}%`}">{{rightHandState}}</div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import axios from 'axios'
export default {
  name: '',
  data() {
    return {
      url: 'http://mj.ngrok.xiaomiqiu.cn',
      // url: 'http://localhost:7001',
      leftHandleData: [],
      rightHandleData: [],
      leftHandState: 0, // 左手状态码
      rightHandState: 0, // 右手状态码
      divLeft: 200, // div块左手左偏移
      divTop: 100, // div块左手上偏移
      rightHandLeft: 0, // 右手右偏移
      rightHandTop: 0 // 右手上偏移
    }
  },
  mounted () {
    this.socketLink()
  },
  beforeDestroy () {
    axios.get(`${this.url}/shutdown`)
      .then(data => {
        console.log(data)
      })
  },
  methods: {
    startKinect () {
      axios.get(this.url)
        .then(data => {
          if (data.code === 1) {
          }
        })
    },
    socketLink () {
      let socket = io(this.url)
      socket.on('connect', msg => {
        console.log('#connect,', socket.id)
        socket.emit('index', 'hello world!')
        this.startKinect()
      })
      socket.on('res', msg => {
        this.dataHandle(msg)
      })
      // 系统事件
      socket.on('disconnect', msg => {
        console.log('#disconnect', msg)
      })
      socket.on('disconnecting', () => {
        console.log('#disconnecting')
      })
      socket.on('error', (msg) => {
        console.log('#error')
        console.log(msg)
      })
    },
    // 处理数据
    dataHandle (data) {
      console.log(data)
      // 左手掌数据
      let handLeft = data.joints[7]
      // 右手掌数据
      let handRight = data.joints[11]
      //console.log(handLeft)
    
      // 设置左手状态码
      this.leftHandState = data.leftHandState
      // 设置右手状态码
      this.rightHandState = data.rightHandState
      // 调用转换函数
      let handLeftData = this.distanceTrans(handLeft.depthX, handLeft.depthY)
      let handRightData = this.distanceTrans(handRight.depthX, handRight.depthY)
      this.divLeft = handLeftData.left
      this.divTop = handLeftData.top
      this.rightHandLeft = handRightData.left
      this.rightHandTop = handRightData.top
    },
    // kinect距离数据转web距离
    distanceTrans (depthX, depthY) {
      let returnData = {}
      let x = depthX*100
      let y = depthY*100
      if(x<100&&x>0 && y>0 && y<100){
        // console.log(x)
        // console.log(y)
        // console.log('----')
        returnData.left = x
        returnData.top = y
      } else {
        returnData.left = 0
        returnData.right = 0
      }
      return returnData
    }
  }
}
</script>
<style lang="scss" scoped>
.color-top{
  width: 100vw;
  height: 100vh;
  font-size: 12px;
  .color-left-hand{
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: aqua;
  }
  .color-right-hand{
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: rgb(255, 60, 0);
  }
}
</style>
