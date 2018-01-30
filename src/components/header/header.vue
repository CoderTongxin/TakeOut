<template>
  <div class="v-header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="vendor.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{vendor.name}}</span>
        </div>
        <div class="description">
          {{vendor.description}}/{{vendor.deliveryTime}}分钟送达
        </div>
        <div v-if="vendor.supports" class="support">
          <span class="icon" :class="classMap[vendor.supports[0].type]"></span>
          <span class="text">{{vendor.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="vendor.supports" class="support-count" @click="showDetail">
        <span class="count">{{vendor.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{vendor.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="vendor.avatar" width="100%" height="100%"/>
    </div>
    <div v-show='detailShow' class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main"></div>
      </div>
      <div class="detailClose">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name: 'Header',
    props: {
      vendor: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail(){
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl"
  .v-header
    color #fff
    position relative
    background rgba(7,17,27,0.5)
    overflow hidden
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support
          .icon
            display inline-block
            width 12px
            height 12px
            vertical-align top
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
               bg-image('discount_1')
            &.guarantee
               bg-image('guarantee_1')
            &.invoice
               bg-image('invoice_1')
            &.special
               bg-image('special_1')
          .text
              line-height: 12px
              font-size: 10px
      .support-count
        position absolute
        right 12px
        bottom 14px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background: rgba(0, 0, 0, 0.2)
        text-align center
        .count
          font-size 10px
          vertical-align top
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
          font-size 10px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 12px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display inline-block
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right 10px
        top 8px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      z-index 100
      top 0
      left 0
      height 100%
      width 100%
      overflow auto
      background rgba(7,17,27,0.8)
      .detail-wrapper
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto
        font-size 32px
        clear both
</style>
