<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control class="top-tab-control" 
                :titles="['流行','新款','精选']" 
                @tabClick="tabClick" ref="tabControl1" v-show="isTabControlFixed">
    </tab-control>

    <scroll class="content" ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll" 
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends"/>
      <home-feature-view></home-feature-view>
      <tab-control 
                    v-show="!isTabControlFixed" 
                    :titles="['流行','新款','精选']" 
                    @tabClick="tabClick" 
                    ref="tabControl2">
      </tab-control>
      <goods-List :goods="showGoods"></goods-List>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'

  import { getHomeMultidata, getHomeGoods } from 'network/home.js'
  import { debounce } from 'common/utils.js'

  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabControlFixed: false,
        saveY: 0
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {

      // 用refresh接收debounce函数返回的函数，refresh会回调传入防抖函数的函数
      const refresh = debounce(this.$refs.scroll.refresh, 200)

      // 监听item中图片加载完成
      this.$bus.$on('homeItemImageLoad', () => {
        // this.$refs.scroll.refresh()
        // 使用防抖函数处理，会回调执行timer中的this.$refs.scroll.refresh()
        // 如果200ms内又有新图片加载，timer就会被清空
        refresh()
      })

    },
    // 回来时回到之前离开时的位置
    activated() {
      // 刷新一下
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    // 记录离开时的位置
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()
        })
      },

      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        switch(index) {
          case 0: 
            this.currentType = 'pop';
            break;
          case 1: 
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        if(this.$refs.tabControl1 !== undefined){
          this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // 下拉1000多后，显示backTop
        this.isShowBackTop = (-position.y) > 1000

        // tabControl是否吸顶
        this.isTabControlFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      // 获取tab-control的offsetTop
      // 组件有一个属性$el，用于获取组件中的dom元素
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /* 使用浏览器原生滚动，让nav-bar固定在顶部 */
    /* 现在使用better-scroll管理局部滚动区域，让nav-bar不在scroll标签内就能实现固定在顶部的效果 */
    /* position: fixed; */
    /* left: 0; */
    /* right: 0; */
    /* top: 0; */
    /* z-index: 9; */
  }

  .content {
    overflow: hidden; 
    position: absolute;
    /* top: 44px; */
    /* bottom: 49px; */
    /* left: 0; */
    /* right: 0; */

    /* overflow: hidden; */
    height: calc(100% - 93px);
    /* margin-top: 44px; */
  }

  top-tab-control {
    position: relative;
    z-index: 9;
  }

</style>
