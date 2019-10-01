<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll">
      <cart-list />
    </scroll>
    <bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import CartList from './childComps/CartList.vue'
import BottomBar from './childComps/BottomBar.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: {
    NavBar,
    Scroll,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters(['cartLength'])
    // ...mapGetters({
    //   length: 'cartLength'
    // })
  },
  activated () {
    this.$refs.scroll.refresh();
  }
}
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.content {
  height: calc(100% - 137px);
  overflow: hidden;
}
</style>