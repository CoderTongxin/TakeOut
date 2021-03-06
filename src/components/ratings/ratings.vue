<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{vendor.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{vendor.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="vendor.serviceScore"></star>
            <span class="score-text">{{vendor.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="vendor.foodScore"></star>
            <span class="score-text">{{vendor.foodScore}}</span>
          </div>
          <div class="delivery-time-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery-text">{{vendor.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRatingType" @toggle="toggleContent"
                    :selectType="selectedType" :onlyShowContent="onlyShowContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating,index) in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)" :key="index">
            <div class="avatar">
              <img width="28px" height="28px" :src="rating.avatar"/>
            </div>
            <div class="content">
              <h1 class="username">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text" v-show="rating.text.length>0">{{rating.text}}</p>
              <p class="text" v-show="!rating.text.length>0">默认评论</p>
              <div v-show="rating.recommend && rating.recommend.length" class="recommend">
                <span class="icon-thumb_up"></span>
                <span v-for="(item,index) in rating.recommend" :key="index" class="item">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import star from 'components/star/star';
  import split from 'components/split/split';
  import ratingselect from 'components/rating-select/rating-select';
  import BScroll from 'better-scroll';
  import {formatDate} from 'common/js/date';

  const ALL = 2;
  const ERR_OK = 0;
  const debug = process.env.NODE_ENV !== 'production';
  export default {
    name: 'ratings',
    props: {
      vendor: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectedType: ALL,
        onlyShowContent: true
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        const url = debug ? '/api/ratings' : 'http://ustbhuangyi.com/sell/api/ratings';
        this.$http.get(url).then((response) => {
          response = response.body;
          if (response.errno === ERR_OK) {
            this.ratings = response.data;
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            });
          }
        });
      });
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectedType === ALL) {
          return true;
        } else {
          return type === this.selectedType;
        }
      },
      selectRatingType(type) {
        this.selectedType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin.styl"
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        padding 6px 0
        width 134px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        // 适应iphone5的屏幕
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
        .score
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .title
            font-size 12px
            line-height 18px
            vertical-align top
            color rbg(7, 17, 27)
          .star
            display inline-block
            margin 0 12px
            vertical-align top
          .score-text
            display inline-block
            line-height 18px
            vertical-align top
            font-size 12px
            color rgb(255, 153, 0)
        .delivery-time-wrapper
          font-size 0
          .title
            margin-bottom 8px
            line-height 12px
            font-size 12px
            color rgb(7, 17, 27)
          .delivery-text
            margin-left 12px
            font-size 12px
            color rgb(147, 153, 159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, 0.2))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star, .delivery-time
              display inline-block
              margin-right 6px
            .star
              vertical-align top
            .delivery-time
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
          .text
            margin-bottom 8px
            line-height 18px
            color rgb(7, 17, 27)
            font-size 12px
          .recommend
            line-height 16px
            font-size 0
            .icon-thumb_up, .item
              display inline-block
              margin 0 8px 4px 0
              font-size 9px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .item
              padding 0 6px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 1px
              color rgb(147, 153, 159)
              background #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
</style>
