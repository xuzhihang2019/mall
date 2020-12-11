<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @titleClick="titleClick" class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendList"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    <!-- <toast :message="message" :is-show="isShowToast"></toast> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'
  import GoodsList from 'components/content/goods/GoodsList'
  // import Toast from 'components/common/toast/Toast'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail.js'
  import { debounce } from 'common/utils.js'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      BackTop,
      GoodsList
      // Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false
        // message: '',
        // isShowToast: false
      }
    },
    created() {
      // 1.保存商品id
      this.iid = this.$route.params.iid

      // 2.根据id请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result
        console.log(res)
        // 获取顶部的轮播图数据
        this.topImages = res.result.itemInfo.topImages

        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 获取商品详细信息
        this.detailInfo = data.detailInfo

        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 获取评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.获取推荐数据
      getRecommend().then(res => {
        this.recommendList = res.data.list
      })

      // 4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      }, 1000)
    },
    mounted() {

      // 用refresh接收debounce函数返回的函数，refresh会回调传入防抖函数的函数
      const refresh = debounce(this.$refs.scroll.refresh, 200)

      // 监听item中图片加载完成
      this.$bus.$on('detailItemImageLoad', () => {
        // this.$refs.scroll.refresh()
        // 使用防抖函数处理，会回调执行timer中的this.$refs.scroll.refresh()
        // 如果200ms内又有新图片加载，timer就会被清空
        refresh()
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000)
      },
      contentScroll(position) {
        // 获取位置
        const positionY = -position.y
        // 和theme的值进行对比
        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          if(this.currentIndex !== i){
            if ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])
            || (i===length-1&&positionY>=this.themeTopYs[i])){
              this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
            }
          }

          // 是否显示回到顶部按钮
          this.isShowBackTop = (-position.y) > 1000
        }
      },
      addToCart() {
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        this.$store.dispatch('addCart', product).then(res => {
          console.log(res)
          // this.message = res
          // this.isShowToast = true

          // setTimeout(() => {
          //   this.message = ''
          //   this.isShowToast = false
          // }, 1500);

          // 将toast封装成插件使用
          this.$toast.show(res, 2000)
        })


      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
</style>
