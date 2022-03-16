<template>
  <div class="points" ref="points"></div>
</template>
<script>
import * as THREE from 'three'
// import Stats from 'three-stats'
import course from 'course-lat-long'
export default {
  data () {
    return {
      speed: 3,
      iconArr: ['/static/circleOverview/material/yu.png'],
      renderer: null,
      camera: null,
      scene: null,
      spriteNormal: [],
      material: null,
      mesh: null,
      stats: null, // 性能检测
      starField: null,
      starsGeometry: null
    }
  },
  props: {
   rainNumber: {
     type: Number,
     default () {
       return 300
     }
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
      this.initMesh()
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
      let sprite =textureLoader.load(this.iconArr[0])
      for (let i = 0; i < this.rainNumber; i ++) {
        let spriteMaterialNormal = new THREE.SpriteMaterial({color: 0x00ffff, map: sprite, opacity: 1, transparent: true});
        let spriteItem = new THREE.Sprite(spriteMaterialNormal);
        spriteItem.position.set(-30, 500, 0) //设置位置
        spriteItem.position.x =  Math.random() * 2000 - 1000
        spriteItem.position.y =  Math.random() * 600 -300
        spriteItem.position.z = Math.random() * 1000 - 1000
        spriteItem.speed = Math.random() * this.speed + 0.5
        spriteItem.scale.set(4, 120, 1) //设置scale进行大小设置
        this.spriteNormal.push(spriteItem)
        this.scene.add(spriteItem)
      }
    },
    initAnimate () {
      //循环调用函数
      for (let x in this.spriteNormal) {
        if (this.spriteNormal[x].position.y < -200) {
          this.spriteNormal[x].position.y = 400
          this.spriteNormal[x].material.opacity = 1
        } else {
          let randomNum = Math.random()
          if (this.spriteNormal[x].position.y < (randomNum * -500)) {
            this.spriteNormal[x].material.opacity -= 0.1
          }
          this.spriteNormal[x].position.y -= this.spriteNormal[x].speed; //设置位置
        }
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
}
</style>
