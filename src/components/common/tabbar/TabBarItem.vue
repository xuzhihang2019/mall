<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="acviteStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      acviteStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // this.$router.replace(this.path)
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    margin-top: 3px;
    margin-bottom: 2px;
    /* 去除图片下默认的3个像素 */
    vertical-align: middle;
    width: 24px;
    height: 24px;
  }
</style>
