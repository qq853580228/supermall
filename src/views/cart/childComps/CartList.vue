<template>
  <div class="cart-list">
    <cart-list-item :item-info="item"
                    v-for="item in cartList"
                    :key="item.id" />
  </div>
</template>

<script>
import CartListItem from './CartListItem.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    CartListItem
  }
}
</script>

<style scoped>
.cart-list {
  height: (100% - 93px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
