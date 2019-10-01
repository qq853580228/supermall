<template>
  <div>
    <nav-bar class="detail-nav">
      <div slot="left"
           class="back"
           @click="back">
        <img src="~assets/img/common/back.svg"
             alt="">
      </div>
      <div slot="center"
           class="title">
        <div v-for="(item, index) in titles"
             :key="item"
             class="item-title"
             :class="{active: currentIndex === index}"
             @click="titleClick(index)">
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  name: "DetailNavBar",
  props: {
    detailCurrentIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: this.detailCurrentIndex
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index;
      this.$emit('titleClick', index);
    },
    back () {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.detail-nav {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.back img {
  margin-top: 11px;
}
.title {
  display: flex;
}
.item-title {
  flex: 1;
  font-size: 14px;
}
.active {
  color: var(--color-high-text);
}
</style>
