import Vue from 'vue';
import VueRouter from 'vue-router';
// 防止push跳转路由的时候，连续点击当前路由所在的导航出现报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const Home = () => import ('../views/home/Home.vue');
const Cart = () => import ('../views/cart/Cart.vue');
const Category = () => import ('../views/category/Category.vue');
const Profile = () => import ('../views/profile/Profile.vue');
const Detail = () => import ('../views/detail/Detail.vue');
Vue.use(VueRouter);
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '', redirect: '/home'
        },
        {
            path: '/home', component: Home
        },
        {
            path: '/cart', component: Cart
        },
        {
            path: '/category', component: Category
        },
        {
            path: '/profile', component: Profile
        },
        {
          path: '/detail/:iid', component: Detail
      },
    ]
})