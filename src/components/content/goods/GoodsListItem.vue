<template>
  <div class="goods-list-item">
    <img v-lazy="showImage"
         alt=""
         @load="imageLoaded"
         @click="itemClick">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  data () {
    return {

    }
  },
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  methods: {
    imageLoaded () {
      this.$bus.$emit('itemImageLoaded')
    },
    itemClick () {
      this.$router.push('/detail/' + this.goodsItem.iid);
    }
  },
  computed: {
    showImage () {
      return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  position: relative;
  width: 50%;
  padding: 0 1%;
  padding-bottom: 40px;
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  overflow: hidden;
  width: 100%;
  bottom: 5px;
  left: 0;
  right: 0;
  font-size: 12px;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.collect {
  position: relative;
}
.collect::before {
  position: absolute;
  content: "";
  width: 14px;
  height: 14px;
  left: -15px;
  top: -1px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>