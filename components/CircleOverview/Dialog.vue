<template>
  <div class="circle-dialog">
    <!-- 前端 -->
    <div class="dialog-small" v-show="showTag === 'webDeveloper'">
      <div class="dialog-title">
        <img src="../../../static/circleOverview/dialog/dialog_title-icon.png"/>
        <span>前端</span>
      </div>
       <div class="dialog-close">
        <img  @click="$emit('close')" src="../../../static/circleOverview/dialog/icon_close.png"/>
        <div @click="$emit('close')" class="close-btn"></div>
      </div>
      <div class="dialog-content-web">
        <span>· Parrot前端无缝支持多种框架训练代码，如pytorch、caffe、prototxt等</span>
        <span>· 多态前端配合JIT技术，可将不同框架训练代码转换为通用中间表示</span>
      </div>
    </div>
    <!-- python库 -->
    <div class="dialog-small" v-show="showTag === 'python'">
      <div class="dialog-title">
        <img src="../../../static/circleOverview/dialog/dialog_title-icon.png"/>
        <span>Python库</span>
      </div>
       <div class="dialog-close">
        <img  @click="$emit('close')" src="../../../static/circleOverview/dialog/icon_close.png"/>
        <div @click="$emit('close')" class="close-btn"></div>
      </div>
      <div class="dialog-content-python">
         <img src="../../../static/circleOverview/dialog/python_content.png"/>
      </div>
    </div>
    <!-- base-component -->
    <!-- common-middle -->
    <div class="dialog-small" v-show="showTag === 'commonMiddle'">
      <div class="dialog-title">
        <img src="../../../static/circleOverview/dialog/dialog_title-icon.png"/>
        <span>通用中间表示</span>
      </div>
       <div class="dialog-close">
        <img  @click="$emit('close')" src="../../../static/circleOverview/dialog/icon_close.png"/>
        <div @click="$emit('close')" class="close-btn"></div>
      </div>
      <div class="dialog-content-common-middle">
        <span>· 具有完备的表达能力，可以表示任何类型深度学习模型训练过程</span>
        <span>· 元操作便于拓展</span>
        <span>· 中间表示对硬件、底层库无依赖，可以在多种硬件平台运行</span>
        <span>· 基于中间表示可做全局性能优化，其性能优于一般解释性框架</span>
      </div>
    </div>
    <!-- computing-lib -->
    <div class="dialog-small" v-show="showTag === 'computingLib'">
      <div class="dialog-title">
        <img src="../../../static/circleOverview/dialog/dialog_title-icon.png"/>
        <span>计算库</span>
      </div>
       <div class="dialog-close">
        <img  @click="$emit('close')" src="../../../static/circleOverview/dialog/icon_close.png"/>
        <div @click="$emit('close')" class="close-btn"></div>
      </div>
      <div class="dialog-content-computing">
        <span>· 训练：支持最新cuda/cudnn，针对原创算法添加特需层、优化特定配置</span>
        <span>· 推理：针对多种端架构，自主开发并极致优化数学计算库、深度学习库及图像处理库</span>
        <div class="chart-img">
          <img src="../../../static/circleOverview/dialog/computing_chart.png">
        </div>
      </div>
    </div>
    <!-- communication-lib -->
    <div class="dialog-small" v-show="showTag === 'communicationLib'">
      <div class="dialog-title">
        <img src="../../../static/circleOverview/dialog/dialog_title-icon.png"/>
        <span>通信库</span>
      </div>
       <div class="dialog-close">
        <img  @click="$emit('close')" src="../../../static/circleOverview/dialog/icon_close.png"/>
        <div @click="$emit('close')" class="close-btn"></div>
      </div>
      <div class="dialog-content-communication">
        <span>· 支持简单高效的并行SGD，通过彻底的overlap设计，32卡上并行效率90%+</span>
        <span>· 支持多种通信模式：ASGD、分布式参数服务器、百万分类的模型并行通信、</span>
        <span>· 不稳定环境下的Back up通信、半精度通信、Sync BN等</span>
        <div class="chart-img">
          <img src="../../../static/circleOverview/dialog/communication_ib.png">
        </div>
      </div>
    </div>
    <!-- visualization-tool -->
    <div class="dialog-small" v-show="showTag === 'visualizationTool'">
      <div class="dialog-title">
        <img src="../../../static/circleOverview/dialog/dialog_title-icon.png"/>
        <span>可视化工具</span>
      </div>
       <div class="dialog-close">
        <img  @click="$emit('close')" src="../../../static/circleOverview/dialog/icon_close.png"/>
        <div @click="$emit('close')" class="close-btn"></div>
      </div>
      <div class="dialog-content-visualization">
        <div class="visualization-scroll" @mousewheel="pageScorll('visualization', $event)" ref="visualization" :style="{marginTop: visualizationTop + 'px'}">
          <img class="visualization-img" src="../../../static/circleOverview/dialog/visualization.png"/>
          <!-- <show-chart-first></show-chart-first> -->
          <show-chart-second></show-chart-second>
        </div>
      </div>
    </div>
    <!-- watch-control -->
    <div class="dialog-large" v-show="showTag === 'watchControl'">
      <div class="dialog-title">
        <img src="../../../static/circleOverview/dialog/dialog_title-icon.png"/>
        <span>监控模块</span>
      </div>
       <div class="dialog-close">
        <img  @click="$emit('close')" src="../../../static/circleOverview/dialog/icon_close.png"/>
        <div @click="$emit('close')" class="close-btn"></div>
      </div>
      <div class="dialog-content-watch-control">
        <img src="../../../static/circleOverview/dialog/watch_control.png"/>
      </div>
    </div>
    <!-- machineLearn -->
    <div class="dialog-large" v-show="showTag === 'machineLearn'">
      <div class="dialog-title">
        <img src="../../../static/circleOverview/dialog/dialog_title-icon.png"/>
        <span>深度学习虚拟机</span>
      </div>
       <div class="dialog-close">
        <img  @click="$emit('close')" src="../../../static/circleOverview/dialog/icon_close.png"/>
        <div @click="$emit('close')" class="close-btn"></div>
      </div>
      <div class="dialog-content-machine-learn">
        <img src="../../../static/circleOverview/dialog/machine_learn.png"/>
        <div class="machine-word">
          <div class="machine-scroll" @mousewheel="pageScorll('machine', $event)" ref="machineScroll" :style="{marginTop: machineTop + 'px'}">
            <div class="machine-word-item">
              <div class="red-point-top">
                <div class="red-point"></div>
              </div>
              <span>指令并行执行，自动重排执行顺序，最大程度利用计算和通信资源。</span>
            </div>
            <div class="machine-word-item">
              <div class="red-point-top">
                <div class="red-point"></div>
              </div>
              <span>多指令融合，减少指令数，提高运行效率。</span>
            </div>
            <div class="machine-word-item">
              <div class="red-point-top">
                <div class="red-point"></div>
              </div>
              <span>支持条件分支指令，动态选择执行流，描述算法更加灵活。</span>
            </div>
            <div class="machine-word-item">
              <div class="red-point-top">
                <div class="red-point"></div>
              </div>
              <span>动态追踪数据引用，维护数据依赖关系，及时回收资源。</span>
            </div>
            <div class="machine-word-item">
              <div class="red-point-top">
                <div class="red-point"></div>
              </div>
              <span>提供清晰的编程接口，方便高级用户编写自定义指令。</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import showChartFirst from './ShowChartFirst'
import showChartSecond from './showChartSecond'
export default {
  components: {
    showChartFirst,
    showChartSecond
  },
  props: {
    showTag: {
      type: String
    },
    dialogShow: {
      type: Boolean
    }
  },
  data () {
    return {
      machineTop: 0,
      visualizationTop: 0,
      scorllSpeed: 30 // 滚轮速度
    }
  },
  watch: {
    dialogShow: function (value) {
      if (this.showTag === 'visualizationTool') {
        setTimeout(() => {
          this.referMiddle()
        }, 1000);
      }
    }
  },
  methods: {
    // 自动滚动页面
    referMiddle () {
      let visualizationHeight = this.$refs.visualization.offsetHeight
      let scrollTag = setInterval(() => {
        if (this.visualizationTop > (0 - visualizationHeight + 400)) {
          this.visualizationTop -= 30
        } else {
          clearInterval(scrollTag)
        }
      }, 10)
    },
    // 图片加载完成事件
    imgOnload () {
    },
    // 鼠标滚轮
    pageScorll (tag, $event) {
      if (tag === 'machine') {
        let height = this.$refs.machineScroll.offsetHeight
        if ($event.deltaY < 0) {
          // 向上滚轮
          if (this.machineTop < 0) {
            this.machineTop += this.scorllSpeed
          }
        } else {
          // 向下滚轮
          if (this.machineTop > (0 - height + 140)) {
            this.machineTop -= this.scorllSpeed
          }
        }
      } else {
        let visualizationHeight = this.$refs.visualization.offsetHeight
        if ($event.deltaY < 0) {
          // 向上滚轮
          if (this.visualizationTop < 0) {
            this.visualizationTop += this.scorllSpeed
          }
        } else {
          // 向下滚轮
          if (this.visualizationTop > (0 - visualizationHeight + 350)) {
            this.visualizationTop -= this.scorllSpeed
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.circle-dialog{
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  .dialog-small{
    $width: 70%;
    background-image: url('../../../static/circleOverview/dialog/dialog_bg_s.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 900px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .dialog-title{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      span{
        font-size: 22px;
        color: #fff;
        margin-left: 10px;
      }
      img{
        width: 6px;
      }
    }
    .dialog-close{
      $imgWidth: 40px;
      display: flex;
      height: $imgWidth;
      justify-content: flex-end;
      img{
        width: $imgWidth;
        margin-right: 50px;
        // cursor: pointer;
      }
      .close-btn{
        width: 100px;
        height: 100px;
        // background-color: #fff;
        position: absolute;
        margin-left: -22px;
        margin-top: -26px;
      }
    }
    // 前端弹窗
    .dialog-content-web{
      height: 350px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 130px;
      align-items: flex-start;
      font-size: 20px;
      box-sizing: border-box;
      color: #8897c2;
      span{
        &:last-child{
          margin-top: 50px;
        }
      }
    }
    // python弹窗
    .dialog-content-python{
      height: 450px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 80%;
      }
    }
    // 可视化工具
    .dialog-content-visualization{
      height: 400px;
      overflow: hidden;
      margin: 0 auto;
      margin-top: 10px;
      width: 90%;
      img{
        width: 100%;
      }
    }
    // 通用中间表示
    .dialog-content-common-middle{
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      box-sizing: border-box;
      font-size: 20px;
      color: #8897c2;
      span{
        margin-left: 120px;
        margin-bottom: 40px;
        &:first-child{
          margin-top: 80px;
        }
      }
    }
    // 计算库
    .dialog-content-computing{
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      box-sizing: border-box;
      font-size: 20px;
      color: #8897c2;
      span{
        margin-left: 120px;
        margin-bottom: 10px;
        &:first-child{
          margin-top: 10px;
        }
      }
      .chart-img{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 70%;
          margin-top: 18px;
        }
      }
    }
    // 通信
    .dialog-content-communication{
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      box-sizing: border-box;
      font-size: 20px;
      color: #8897c2;
      span{
        margin-left: 120px;
        margin-bottom: 10px;
        &:first-child{
          margin-top: 10px;
        }
      }
      .chart-img{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 70%;
        }
      }
    }
  }
  .dialog-large{
    background-image: url('../../../static/circleOverview/dialog/dialog_bg_l.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 1320px;
    height: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .dialog-title{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      span{
        font-size: 22px;
        color: #fff;
        margin-left: 10px;
      }
      img{
        width: 6px;
      }
    }
    .dialog-close{
      $imgWidth: 40px;
      display: flex;
      height: $imgWidth;
      justify-content: flex-end;
      .close-btn{
        width: 100px;
        height: 100px;
        // background-color: #fff;
        position: absolute;
        margin-left: -22px;
        margin-top: -26px;
      }
      img{
        width: $imgWidth;
        margin-right: 50px;
        // cursor: pointer;
      }
    }
    // 监控
    .dialog-content-watch-control{
      img{
        width: 85%;
      }
    }
    // 机器学习
    .dialog-content-machine-learn{
      img{
        width: 85%;
      }
      .machine-word{
        font-size: 12px;
        $width: 295px;
        width: $width;
        height: $width/2;
        color: #ffffff;
        position: absolute;
        display: flex;
        top: 330px;
        left: 99px;
        flex-direction: column;
        align-items: flex-start;
        background-image: url('../../../static/circleOverview/dialog/machine_learn_border.png');
        background-size: 100%;
        background-repeat: no-repeat;
        overflow: hidden;
        padding: 15px;
        box-sizing: border-box;
        .machine-scroll{
          display: inline-block;
          margin-top: -10px;
          .machine-word-item{
            display: inline-block;
            margin-bottom: 10px;
            .red-point-top{
              height: 36px;
              float: left;
              margin-right: 5px;
              .red-point{
                width: 5px;
                height: 5px;
                background-color: red;
                border-radius: 50%;
                line-height: 18px;
                margin-right: 5px;
                margin-top: 7px;
              }
            }
            span{
              text-align: left;
              float: left;
              line-height: 18px;
              width: 245px;
              letter-spacing: 3px;
              height: 36px;
            }
          }
        }
      }
    }
  }
}
</style>

