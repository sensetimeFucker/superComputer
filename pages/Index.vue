<template>
  <div class="window">
    <div class="container" :style="{'margin-left': left}">
      <home class="content" @move="moveContent"></home>
      <parrots class="content" @move="moveContent"></parrots>
    </div>
  </div>
</template>

<script>
    import Home from './Children/Home.vue'
    import New from './Children/New.vue'
    import Parrots from './Children/Parrots.vue'
    export default {
        // 全局感知
        name: "",
        // 模板依赖
        components: {
          Home,
          New,
          Parrots
        },
        filters: {},

        // 接口
        props: {},

        // 本地状态
        data() {
            return {
              left: '0'
            };
        },
        computed: {},
        // 事件
        watch: {},
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        // 非响应式的属性
        methods: {
          moveContent (msg) {
            !!msg ? this.left = '-100vw' : this.left = '0';
          }
        }
    }
</script>

<style scoped>
  .window{
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .container{
    width: 200vw;
    height: 100vh;
    transition-property: all;
    transition-duration: 1s;
  }
  .content{
    position: relative;
    float: left;
    width: 100vw;
    height: 100vh;
  }
</style>
