export default {
  addCartCount(state, payload) {
    let item = state.cartList.find(item => {
      return item.iid === payload.iid
    })
    item.count++
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  addToCart(state, payload) {
    state.cartList.push(payload)
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  flagChange(state, obj) {
    state.cartList.forEach(item => {
      if (item.iid === obj.iid) {
        item.flag = obj.flag
      }
    })
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  },
  selectAllChange(state, isSelectAll) {
    console.log(isSelectAll);

    state.cartList.forEach(item => {
      if (isSelectAll) {
        item.flag = true
      } else {
        item.flag = false
      }
    })
    localStorage.setItem('cartList', JSON.stringify(state.cartList))
  }
}
