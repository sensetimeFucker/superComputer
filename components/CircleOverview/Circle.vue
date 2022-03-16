<template>
  <div class="flex-center">
    <!-- 外围圈 -->
    <div class="outer-circle">
      <div class="outer-circle-first">
        <img src="../../../static/circleOverview/circle/outer_1.png"/>
      </div>
      <div class="outer-circle-second">
        <img src="../../../static/circleOverview/circle/outer_2.png"/>
      </div>
      <div class="outer-circle-third">
        <img src="../../../static/circleOverview/circle/outer_3.png"/>
      </div>
      <div class="outer-circle-fourth">
        <img src="../../../static/circleOverview/circle/outer_4.png"/>
      </div>
    </div>
    <!-- 机器学习圈 -->
    <div class="machine-learn">
      <div class="machine-learn-first">
        <img src="../../../static/circleOverview/circle/machine_1.png"/>
      </div>
      <div class="machine-learn-second">
        <img src="../../../static/circleOverview/circle/machine_2.png"/>
      </div>
      <div class="machine-learn-third">
        <img src="../../../static/circleOverview/circle/machine_3.png"/>
      </div>
      <div class="machine-learn-fourth">
        <img src="../../../static/circleOverview/circle/machine_4.png"/>
      </div>
      <div class="machine-learn-fifth">
        <img src="../../../static/circleOverview/circle/machine_5.png"/>
      </div>
      <div class="machine-learn-word">
        <span>深度学习</span>
        <span>虚拟机</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
    // this.changeRotate()
  },
  methods: {
    changeRotate () {
      setInterval(() => {
        if (this.rotateY < 360 && this.rotateX > 0) {
          this.rotateY++
          this.rotateX = this.rotateX - 2
        } else {
          this.rotateY = 0
          this.rotateX = 360
        }
      }, 20)
    },
    angle () {
      let returnAngle = Math.floor(Math.random() * 360)
      return returnAngle
    }
  }
}
</script>
<style lang="scss" scoped>
$speed: 10s;
.flex-center{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  div{
    top: 50%;
    left: 50%;
    position: absolute;
    z-index: 10;
  }
  img{
    width: 100%;
    z-index: 10;
  }
}
.machine-learn{
  // 机器学习内圈1
  $x: random() + 0.001;
  $y: random();
  $z: random();
  $angel: random() * 360;
  .machine-learn-first{
    $size: 250px;
    width: $size;
    height: $size;
    margin-left: -$size/2;
    margin-top: -$size/2;
    animation: learn-first-learn $speed linear infinite;
    // $x: random() + 0.001;
    // $y: random();
    // $z: random();
    // $angel: random() * 360;
    @keyframes learn-first-learn {
      0% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel}deg);
        transform: rotate3d($x, $y, $z, #{$angel}deg);
        }
      50% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        }
      100% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
      }
    }
  }
  .machine-learn-second{
    $size: 265px;
    width: $size;
    height: $size;
    margin-left: -$size/2;
    margin-top: -$size/2;
    animation: learn-second-learn $speed linear infinite;
    // $x: random() + 0.001;
    // $y: random();
    // $z: random();
    // $angel: random() * 360;
    @keyframes learn-second-learn {
      0% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel}deg);
        transform: rotate3d($x, $y, $z, #{$angel}deg);
        }
      50% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        }
      100% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
      }
    }
  }
  .machine-learn-third{
    $size: 345px;
    width: $size;
    height: $size;
    margin-left: -$size/2;
    margin-top: -$size/2;
    animation: learn-third-learn $speed linear infinite;
    // $x: random() + 0.001;
    // $y: random();
    // $z: random();
    // $angel: random() * 360;
    @keyframes learn-third-learn {
      0% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel}deg);
        transform: rotate3d($x, $y, $z, #{$angel}deg);
        }
      50% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        }
      100% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
      }
    }
  }
  .machine-learn-fourth{
    $size: 370px;
    width: $size;
    height: $size;
    margin-left: -$size/2;
    margin-top: -$size/2;
    animation: learn-fourth-learn $speed linear infinite;
    // $x: random() + 0.001;
    // $y: random();
    // $z: random();
    // $angel: random() * 360;
    @keyframes learn-fourth-learn {
      0% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel}deg);
        transform: rotate3d($x, $y, $z, #{$angel}deg);
        }
      50% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        }
      100% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
      }
    }
  }
  .machine-learn-fifth{
    $size: 380px;
    width: $size;
    height: $size;
    margin-left: -$size/2;
    margin-top: -$size/2;
    animation: learn-fifth-learn $speed linear infinite;
    // $x: random() + 0.001;
    // $y: random();
    // $z: random();
    // $angel: random() * 360;
    @keyframes learn-fifth-learn {
      0% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel}deg);
        transform: rotate3d($x, $y, $z, #{$angel}deg);
        }
      50% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        }
      100% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
      }
    }
  }
  .machine-learn-word{
    color: #fff;
    font-size: 22px;
    $size: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: $size;
    height: $size;
    margin-left: -$size/2;
    margin-top: -$size/2;
    z-index: 1;
  }
}
.outer-circle{
  .outer-circle-first{
    $size: 520px;
    width: $size;
    height: $size;
    margin-left: -$size/2;
    margin-top: -$size/2;
    animation: circle-first-learn $speed linear infinite;
    $x: random() + 0.001;
    $y: random();
    $z: random();
    $angel: random() * 360;
    @keyframes circle-first-learn {
      0% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel}deg);
        transform: rotate3d($x, $y, $z, #{$angel}deg);
        }
      50% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        }
      100% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
      }
    }
  }
  .outer-circle-second{
    $size: 540px;
    width: $size;
    height: $size;
    margin-left: -$size/2;
    margin-top: -$size/2;
    animation: circle-second-learn $speed linear infinite;
    $x: random() + 0.001;
    $y: random();
    $z: random();
    $angel: random() * 360;
    @keyframes circle-second-learn {
      0% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel}deg);
        transform: rotate3d($x, $y, $z, #{$angel}deg);
        }
      50% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        }
      100% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
      }
    }
  }
  .outer-circle-third{
    $size: 565px;
    width: $size;
    height: $size;
    margin-left: -$size/2;
    margin-top: -$size/2;
    animation: circle-third-learn $speed linear infinite;
    $x: random() + 0.001;
    $y: random();
    $z: random();
    $angel: random() * 360;
    @keyframes circle-third-learn {
      0% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel}deg);
        transform: rotate3d($x, $y, $z, #{$angel}deg);
        }
      50% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        }
      100% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
      }
    }
  }
  .outer-circle-fourth{
    $size: 600px;
    width: $size;
    height: $size;
    margin-left: -$size/2;
    margin-top: -$size/2;
    animation: circle-fourth-learn $speed linear infinite;
    $x: random() + 0.001;
    $y: random();
    $z: random();
    $angel: random() * 360;
    @keyframes circle-fourth-learn {
      0% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel}deg);
        transform: rotate3d($x, $y, $z, #{$angel}deg);
        }
      50% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 180}deg);
        }
      100% {
        -webkit-transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
        transform: rotate3d($x, $y, $z, #{$angel + 360}deg);
      }
    }
  }
}
</style>
