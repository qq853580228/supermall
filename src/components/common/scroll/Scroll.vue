<template>
  <div class="wrapper"
       ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    };
  },
  methods: {
    scrollTo (x, y, time = 600) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh () {
      this.scroll && this.scroll.refresh();
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0;
    }
  },
  mounted () {
    // 创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 2 或 3 监听实时滚动
      probeType: this.probeType,
      // 上拉加载更多
      pullUpLoad: this.pullUpLoad
    });
    // 监听滚动位置,此处要用箭头函数，否则调不了 $emit方法
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position);
      });
    }
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      });
    }
  }
}
</script>

<style scoped>
</style>
