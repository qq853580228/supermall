<template>
    <div>
        <div class="wrapper" ref="wrapper">
            <ul class="content">
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li><li>...</li>
                <li>...</li>
            </ul>
</div>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name: 'Category',
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        console.log(this.$refs.wrapper);
        
        this.scroll = new BScroll(this.$refs.wrapper,{
           
        })
    },
}
</script>

<style scoped>
.wrapper {
    height: 150px;
    overflow: hidden;
}
</style>