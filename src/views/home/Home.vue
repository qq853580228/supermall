<template>
    <div class="home">
        <nav-bar  class="home-nav"><div slot="center">购物街</div></nav-bar>
        <home-swiper :banners="banners"/>
        <home-recommend :recommends="recommends"/>
        <home-feature/>
        <tab-control :titles="titles" class="tab-control" @tabClick="tabClick"/>
        <goods-list :goodsList="goods[type].list"/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js';

import HomeSwiper from './childComps/HomeSwiper.vue';
import HomeRecommend from './childComps/HomeRecommend.vue';
import HomeFeature from './childComps/HomeFeature.vue';
export default {
    name: 'Home',
    data() {
        return {
            banners: [],
            recommends: [],
            titles: ['流行', '新款', '精选'],
            goods:{
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []}
            },
            type: 'pop'
        }
    },
    components: {
        NavBar,
        HomeSwiper,
        HomeRecommend,
        HomeFeature,
        TabControl,
        GoodsList
    },
    created() {
        // 1.轮播图和本周流行数据
        this.getHomeMultidata();
        // 2.请求商品的数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    methods: {
        tabClick(index) {          
            if(index === 0) {
                this.type = 'pop';
            }else if(index === 1) {
                this.type = 'new';
            }else {
                this.type = 'sell';
            }
        },
        getHomeMultidata(){
            getHomeMultidata()
            .then(res => {
            this.banners = res.data.data.banner.list; 
            this.recommends = res.data.data.recommend.list;
            });
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;           
            getHomeGoods(type, page)
            .then(res => {
                this.goods[type].list.push(...res.data.data.list);
                this.goods[type].page++;
            });
        }
    }
}
</script>

<style scoped>
.home {
    margin: 44px 0 60px 0;
}
.home-nav {
    position: fixed;
    z-index: 88;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--color-tint);
    color: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1)
}
.tab-control {
    position: sticky;
    top: 44px;
    background-color: #fff;
}
</style>