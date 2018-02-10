<template>
  <transition class="move">
    <div v-show="showDetail" class="foodDetail">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
        </div>
      </div>
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'food-detail',
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showDetail: false
      };
    },
    methods: {
      show() {
        this.showDetail = true;
      }
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .foodDetail
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
    transform translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition all 0.2s linear
    &.move-enter, &.move-leave-active
      transform translate3d(100%, 0, 0)

</style>
