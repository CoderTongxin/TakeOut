<template>
  <transition class="move">
    <div v-show="showDetail" class="foodDetail" ref="foodDetail">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h2 class="title">{{food.name}}</h2>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="current-price">¥{{food.price}}</span><span v-show="food.oldPrice" class="old-price">${{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @add="addFood"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirstFood">加入购物车</div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';

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
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodDetail, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showDetail = false;
      },
      addFirstFood(event) {
        if (!event._constructed) {
          return;
        }
        // 派发事件，实现抛物线小球动画
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      addFood(target) {
        this.$emit('add', target);
      }
    },
    components: {
      cartcontrol,
      split
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
    .image-header
      position relative
      width 100%
      height 0
      padding-bottom 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      padding 18px
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        line-height 10px
        height 10px
        font-size 0
        .sell-count, .rating
          font-size 10px
          color rgb(177, 153, 159)
        .sell-count
          margin-right 12px
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
</style>
