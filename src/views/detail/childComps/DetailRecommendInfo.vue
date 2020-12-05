<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
  </div>
</template>

<script>
export default {
  name: 'DetailRecommendInfo',
  props: {
    recommendList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
