<template>
  <div class="home wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="titles"
                 class="tab-control"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isFixed" />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoaded="swiperImageLoaded" />
      <home-recommend :recommends="recommends"
                      @recommendImgLoaded="recommendImgLoaded" />
      <home-feature />
      <tab-control :titles="titles"
                   class="tab-control"
                   @tabClick="tabClick"
                   ref="tabControl2" />
      <goods-list :goodsList="goods[type].list" />
    </scroll>
    <back-top @click.native="backClick"
              v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home.js';

import HomeSwiper from './childComps/HomeSwiper.vue';
import HomeRecommend from './childComps/HomeRecommend.vue';
import HomeFeature from './childComps/HomeFeature.vue';

import { debounce } from 'common/utils.js'
import { backTopMixin } from "@/common/mixin.js"
export default {
  name: 'Home',
  mixins: [backTopMixin],
  data () {
    return {
      banners: [],
      recommends: [],
      titles: ['流行', '新款', '精选'],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      type: 'pop',
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0,
      swiperOffsetTop: null,
      recommendOffsetTop: null,
      featureOffsetTop: null
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll
  },
  created () {
    // 1.轮播图和本周流行数据
    this.getHomeMultidata();
    // 2.请求商品的数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted () {
    // 图片加载
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoaded', () => {
      refresh();
    });

  },
  computed: {

  },
  activated () {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);

  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    tabClick (index) {
      /*  if(index === 0) {
           this.type = 'pop';
       }else if(index === 1) {
           this.type = 'new';
       }else {
           this.type = 'sell';
       } */
      switch (index) {
        case 0:
          this.type = 'pop';
          break;
        case 1:
          this.type = 'new';
          break;
        case 2:
          this.type = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    getHomeMultidata () {
      getHomeMultidata()
        .then(res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        });
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page)
        .then(res => {
          console.log(res);

          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page++;
          this.$refs.scroll.finishPullUp();
        });
    },
    backClick () {
      this.backTop()
    },
    contentScroll (position) {
      this.listenShowBackTop(position)
      this.isFixed = -position.y > this.tabOffsetTop;
    },
    loadMore () {
      this.getHomeGoods(this.type);
    },
    swiperImageLoaded () {
      // 组件没有DOM的属性，如offsetTop，可以通过$el获取DOM元素
      // this.$refs.tabControl2.$el.offsetTop;


    },
    recommendImgLoaded () {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
}
</script>

<style scoped>
.home {
  position: relative;
  height: 100vh;
}
.home-nav {
  /*  position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 88; */
  background-color: var(--color-tint);
  color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.content {
  position: absolute;
  top: 43px;
  left: 0;
  right: 0;
  bottom: 49px;
  overflow: hidden;
  /* height: calc(100% - 93px);
    margin-top: 43px; */
}
.fixed {
  position: fixed;
  top: 43px;
  left: 0;
  right: 0;
  background-color: #fff;
}
.tab-control {
  position: relative;
  top: -2px;
  z-index: 66;
  background-color: #fff;
}
</style>