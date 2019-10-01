export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  cartCount(state) {
    return state.cartList.filter(item => {
      if (item.flag) {
        return item
      }
    }).length
  }
}
