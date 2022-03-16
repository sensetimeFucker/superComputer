<template>
  <div class="points" ref="points"></div>
</template>
<script>
import * as THREE from 'three'
import * as Stats from 'three-stats'
import course from 'course-lat-long'
export default {
  data () {
    return {
      speed: 0.7,
      iconArr: ['/static/circleOverview/material/blue.png', '/static/circleOverview/material/red.png'],
      renderer: null,
      camera: null,
      scene: null,
      geometry: [],
      material: null,
      mesh: null,
      stats: null, // 性能检测
      starField: {},
      starsGeometry: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // this.statsInit()
      this.initRenderer()
      this.initScene()
      this.initCamera()
      this.initMesh(0)
      this.initMesh(1)
      this.initAnimate()
    },
    statsInit () {
       this.stats = new Stats()
       this.$refs.points.appendChild(this.stats.dom)
    },
    // 渲染器
    initRenderer () {
      this.renderer = new THREE.WebGLRenderer({
        alpha:true,
        antialias: true
      }) // 实例化渲染器       
      this.renderer.setClearAlpha(0)
      this.renderer.setSize(window.innerWidth, window.innerHeight) // 设置宽和高        
      this.$refs.points.appendChild(this.renderer.domElement) // 添加到dom  
    },
    // 场景
    initScene () {
      this.scene = new THREE.Scene()
    },
    // 相机
    initCamera () {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 2, 2000)
      //实例化相机       
      this.camera.position.set(0, 0, 500)
    },
    // 模型
    initMesh (index) {
      // 加载纹理
      let textureLoader = new THREE.TextureLoader()
      let sprite =textureLoader.load(this.iconArr[index])
      //创建一个星空的效果
      this.starsGeometry[index] = new THREE.Geometry()
      for (let i = 0; i < 150; i++) {
          let star = new THREE.Vector3()
          star.x = THREE.Math.randFloatSpread(1000)
          star.y = THREE.Math.randFloatSpread(1000)
          star.z =  THREE.Math.randFloatSpread(500) - 200
          let angle = course([0,0], [star.x, star.y])
          star.angle = angle
          this.starsGeometry[index].vertices.push(star)
      }
      let starsMaterial = new THREE.PointsMaterial({size:10, map: sprite, sizeAttenuation: true})
      this.starField[index] = new THREE.Points(this.starsGeometry[index], starsMaterial)
      this.scene.add(this.starField[index])
    },
    initAnimate () {
      //循环调用函数
      for (let i = 0; i < 2; i++) {
        let points = this.starField[i].geometry.vertices
        for (let x in points) {
          if (points[x].y < -500 || points[x].y > 500 || points[x].x > 500 || points[x].x < -500) {
            // 如果飞出屏幕则返回中心点
            points[x].x = 0
            points[x].y = 0
            points[x].angle = Math.random() * 360
          } else {
            // // 角度
            let angle = points[x].angle
            let subAngle = angle % 90
            let line =  Math.sqrt(Math.pow(Math.abs(points[x].x), 2) + Math.pow(Math.abs(points[x].y), 2)) + this.speed
            let xPoint = line * Math.sin(subAngle * Math.PI/180)
            let yPoint = line * Math.cos(subAngle * Math.PI/180)
            if (angle > 270) {
              xPoint = 0 - xPoint
              yPoint = 0 - yPoint
            } else if (angle > 180){
              xPoint = 0 - xPoint
            } else if (angle > 90) {
            } else {
              yPoint = 0 - yPoint
            }
            points[x].x = xPoint
            points[x].y = yPoint
          }
        }
        this.starsGeometry[i].verticesNeedUpdate = true
      }
      
      this.renderer.render(this.scene, this.camera)//渲染界面 
      // this.stats.update() //更新stats 性能检测工具
      requestAnimationFrame(this.initAnimate)
    }
  }
}
</script>
<style lang="scss" scoped>
.points{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
