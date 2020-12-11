<template>
  <div class="cart-bottom-bar">
    <div class="check-area">
      <check-button @click.native="checkClick" :is-checked="isSelectAll" class="check-button"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="pay" @click="calcClick">
      去支付({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + (item.price * item.count)
        }, 0)
      },
      checkedLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) {
          return false
        }else {
          return !(this.$store.state.cartList.find(item => !item.checked))
        }
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = false
          })
        }else {
          this.$store.state.cartList.forEach(item => {
            item.checked = true
          })
        }
      },
      calcClick() {
        if(this.checkedLength === 0) {
          this.$toast.show('请选择要购买的商品', 2000)
        }
      }
    },
  }
</script>

<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;

    background-color: #eee;
    display: flex;

    position: fixed;
    bottom: 49px;
  }

  .check-area {
    display: flex;
    align-items: center;
    width: 60px;
  }

  .check-button {
    width: 21px;
    height: 21px;
    line-height: 21px;
    margin-right: 5px;
  }

  .price {
    margin-left: 25px;
  }

  .pay {
    width: 100px;
    position: fixed;
    right: 0;
    text-align: center;
    color: #fff;
    background-color: orangered;
    float: right;
  }
</style>