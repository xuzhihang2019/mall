<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        pullUpLoad: this.pullUpLoad,
        probeType: this.probeType,
        observeDOM: true,
        scrollbar: true,
        pullDownRefresh: true
      })

      // 监听滚动
      this.scroll.on('scroll', (position) => {
        // 把位置信息传给父组件
        this.$emit('scroll', position)
      })

      // 监听scroll滚到底部并上拉事件,如果上拉就向父组件发射自定义事件
      if(this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time=500) {
        // 利用&&的短路效应，前面表达式为false时，后面的语句不执行
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 100%;
  }
</style>
