<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="scrollContents"
            :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"
                         ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"
                           ref="comment"></detail-comment-info>
      <goods-list :goods-list="recommends"
                  ref="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick"
              v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail.js'
import { debounce } from '@/common/utils.js'

import { itemListenerMixin, backTopMixin } from "@/common/mixin.js"
export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      timer: null,
      flag: false, // 控制点击顶部navbar，滚动样式是否生效 
      message: ''
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  created () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid)
      .then(res => {
        const data = res.data.result;
        this.topImages = data.itemInfo.topImages;
        // 3. 获取商品的信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // 4. 获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 5. 获取商品信息
        this.detailInfo = data.detailInfo;
        // 6. 保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        // 7. 获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        // 请求推荐数据
        getRecommend()
          .then(res => {
            this.recommends = res.data.data.list;
          })

        this.getThemeTopY = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
          this.themeTopYs.push(Number.MAX_VALUE);
        })
      });
  },
  methods: {
    imageLoad () {
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200)
      this.flag = true
    },
    backClick () {
      this.backTop()
    },
    addToCart () {
      // 获取商品信息
      let product = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.newPrice,
        iid: this.iid,
        count: 1,
        flag: true
      }
      // 把商品添加到购物车中
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res)
      })
    },
    scrollContents (position) {
      // 获取y的值
      const positionY = -position.y + 44
      const length = this.themeTopYs.length
      // positionY 在 0 和 7983 之间， index = 0
      // positionY 在 7983 和 9120 之间， index = 1
      // positionY 在 9120 和 9452 之间， index = 2
      // positionY 超过 9452， index = 3
      /* for (let i = 0; i < length; i++) {
        // this.currentIndex !== i防止赋值过程过于频繁
        if (this.currentIndex !== i && (i < length - 1 && this.themeTopYs[i] <= positionY && positionY < this.themeTopYs[i + 1]
          || i === length - 1 && this.themeTopYs[i] <= positionY)) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = i;

        }
      } */
      this.listenShowBackTop(position)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.flag = false
      }, 100);

      // hack:
      for (let i = 0; i < length - 1; i++) {
        // this.currentIndex !== i防止赋值过程过于频繁
        if (this.currentIndex !== i && (this.themeTopYs[i] <= positionY && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          if (!this.flag) {
            this.$refs.nav.currentIndex = i;
          }
        }
      }
    }
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  height: 100vh;
  z-index: 9;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}
.content {
  height: calc(100% - 102px);
  overflow: hidden;
}
</style>
