<template>
    <div class="title-chart fy-flex">
      <img src="../assets/img/icon2.png" v-if="icon == 'icon2' || !icon"/>
      <img v-if="icon == 'icon3'" src="../assets/img/icon3.png"/>
      <img v-if="icon == 'icon4'" src="../assets/img/icon4.png"/>
      <img v-if="icon == 'icon5'" src="../assets/img/icon5.png"/>
      <img v-if="icon == 'icon6'" src="../assets/img/icon6.png"/>
      <img v-if="icon == 'icon7'" src="../assets/img/icon7.png"/>
      <div class="title-trapezium"></div>
      <h3>{{title}}</h3>
    </div>
</template>

<script>
  // {{item.img}}
    export default {
        // 全局感知
        name: "TitleChart",

        // 模板依赖
        components: {},
        filters: {},

        // 接口
        props: {
          title: String,
          icon: String
        },

        // 本地状态
        data() {
            return {};
        },
        computed: {},
        // 事件
        watch: {
        },
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
        methods: {}
    }
</script>

<style scoped>
  .title-chart{
    margin: .05rem auto;
  }
  .title-chart img{
    margin: 0 .04rem;
    height: .18rem;
  }
  .title-trapezium {
    margin: 0 .04rem;
    width: 0;
    height: .1rem;
    background-color:rgba(255, 0, 0, 0);
    border-top: .04rem solid rgba(255, 0, 0, 0);
    border-right: .01rem solid rgba(255, 0, 0, 0);
    border-bottom: .04rem solid rgba(255, 0, 0, 0);
    border-left: .05rem solid #aa2f2d;
  }
  .title-chart h3{
    font-size: 26px !important;
    /* color: #575c6a; */
    color: #cdd2dd;
    /* font-size: .22rem; */
  }
</style>
