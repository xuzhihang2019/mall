import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  addCart(context, payLoad) {
    let oldProdect = context.state.cartList.find(item => item.iid === payLoad.iid)
    
    if (oldProdect) {
      // oldProdect.count += 1
      context.commit(ADD_COUNTER, oldProdect)
    }else {
      payLoad.count = 1
      // context.state.cartList.push(payLoad)
      context.commit(ADD_TO_CART, payLoad)
    }
  }
}