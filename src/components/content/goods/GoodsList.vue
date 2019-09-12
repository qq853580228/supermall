<template>
    <div class="goodslist">
        <goods-list-item v-for="(item, index) in goodsList" :key="index" :goodsItem="item"/>
    </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem.vue'
export default {
    name: 'GoodsList',
    props: {
        goodsList: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        GoodsListItem
    }
}
</script>

<style scoped>
.goodslist {
    display: flex;
    flex-wrap: wrap;
}
</style>