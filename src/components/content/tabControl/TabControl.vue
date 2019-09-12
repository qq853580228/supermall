<template>
    <div class="tab-control">
        <div class="tab-control-item"  v-for="(item, index) in titles" :key="item">
            <span @click="itemClick(index)" :class="{active: currentIndex === index}">{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0
        }
    },
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            this.$emit('tabClick', index);
        }
    }
}
</script>

<style scoped>
.tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    z-index: 99;
}
.tab-control-item {
    flex: 1;
}
.active {
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-tint);
}
.tab-control-item span {
    padding: 5px;
}
</style>