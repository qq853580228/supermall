import {
  resolve,
  reject
} from "_any-promise@1.3.0@any-promise";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let flag = false;
      context.state.cartList.some(item => {
        if (item.iid == payload.iid) {
          context.commit('addCartCount', payload);
          resolve('已成功添加到购物车');
          flag = true;
          return true;
        }
      });
      if (!flag) {
        context.commit('addToCart', payload);
        resolve('已成功添加到购物车');
      }
    })
  }
}
