export default {
  addCounter(state, payLoad) {
    payLoad.count++
  },
  addToCart(state, payLoad) {
    state.cartList.push(payLoad)
  }
}