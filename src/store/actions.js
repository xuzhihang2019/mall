import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      let oldProdect = context.state.cartList.find(item => item.iid === payLoad.iid)
    
      if (oldProdect) {
        // oldProdect.count += 1
        context.commit(ADD_COUNTER, oldProdect)
        resolve('当前商品数量+1')
      }else {
        payLoad.count = 1
        // context.state.cartList.push(payLoad)
        context.commit(ADD_TO_CART, payLoad)
        resolve('添加了新的商品')
      }
    })
  }
}