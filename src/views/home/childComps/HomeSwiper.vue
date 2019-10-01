<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners"
                   :key="item.link">
        <a :href="item.link">
          <img :src="item.image"
               alt=""
               @load="swiperImageLoaded">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index.js';
export default {
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isload: false
    }
  },
  methods: {
    swiperImageLoaded () {
      // 通过isload变量，只让这个方法emit一次
      if (!this.isload) {
        this.$emit('swiperImageLoaded');
        this.isload = true;
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>