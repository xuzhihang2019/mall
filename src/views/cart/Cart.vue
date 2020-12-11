<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>

    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  export default {
    name: "Cart",
    data() {
      return {
        
      }
    },
    computed: {
      cartLength() {
        return this.$store.getters.cartLength
      }
    },
    components: {
      NavBar,
      CartList,
      CartBottomBar
    }
}
</script>

<style scoped>
  .cart {
    height: 100hv;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>

