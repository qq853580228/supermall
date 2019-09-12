<template>
    <div class="recommend">
        <div class="recommend-item" v-for="item in recommends" :key="item.link">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <span>{{ item.title }}</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        recommends: {
            type: Array,
            default() {
                return []
            }
        }
    }

}
</script>

<style scoped>
.recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 10px 0 20px 0;
    border-bottom: 8px solid #eee;
}
.recommend-item {
    flex: 1;
}
.recommend-item img {
    width: 80px;
}
.recommend-item span {
    display: block;
    margin-top: 8px;
}
</style>