<template>
  <div>
    <div class="number-scroll">
      <!-- <div class="scroll-item" :style="{transform: `translateY(${number === 0 ? 10 * -18 : number * -18}px)`}"> -->
      <div class="scroll-item" :style="{transform: `translateY(${translateY}px)`}">
        <span v-for="(item, index) in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" :key="index">{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      translateY: 0
    }
  },
  props: {
    number: {
      // type: String,
      required: true
    }
  },
  watch: {
    number: function (value, oldValue) {
      if (value !==0 && (value - oldValue !== 1)) {
        this.translateY = -18 * value
      } else {
        this.animationNumber(value)
      }
    }
  },
  methods: {
    animationNumber (value) {
      if (value === 0) {
        let numberSet0 = setInterval(() => {
          if (10 * -18 < this.translateY) {
            this.translateY -= 2
          } else {
            clearInterval(numberSet0)
            this.translateY = 0
          }
        }, 10)
      } else {
        let numberSet = setInterval(() => {
          if (value * -18 < this.translateY) {
            this.translateY -= 2
          } else {
            clearInterval(numberSet)
          }
        }, 10)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.number-scroll{
  border: none;
  height: 18px;
  overflow: hidden;
  color: #575c6a;
  font-size: .12rem;
  border: 1px solid #575c6a;
  .scroll-item{
    display: flex;
    flex-direction: column;
    // transition: all 1s;
    justify-content: flex-start;
    span{
      padding: 0 .01rem;
      color: white;
      line-height: 18px;
      display: inline-block;
    }
  }
}
</style>

