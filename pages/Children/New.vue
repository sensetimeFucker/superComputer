<template>
    <section class="container" @click="move">
      <h1 @click="move">返回</h1>
    </section>
</template>

<script>
    export default {
        // 全局感知
        name: "New",

        // 模板依赖
        components: {},
        filters: {},

        // 接口
        props: {},

        // 本地状态
        data() {
            return {};
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
          move() {
            this.$emit('move', 0);
          }
        }
    }
</script>

<style scoped>
  .container{
    width: 100vw;
    height: 100vh;
    /*background: saddlebrown;*/

    background-image: url(../../../static/Parrots.png);
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
  }
</style>
