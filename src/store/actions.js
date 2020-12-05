export default {
  addCart(context, payLoad) {
    let oldProdect = context.state.cartList.find(item => item.iid === payLoad.iid)
    
    if (oldProdect) {
      // oldProdect.count += 1
      context.commit('addCounter', oldProdect)
    }else {
      payLoad.count = 1
      // context.state.cartList.push(payLoad)
      context.commit('addToCart', payLoad)
    }
  }
}