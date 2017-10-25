import Vue from 'vue'
import VueRouter  from 'vue-router'
import VueResource from 'vue-resource'
import axios from 'axios'
import BScroll from 'better-scroll'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'

Vue.use(VueRouter)
Vue.use(VueResource)
//路由的重定向可以设置默认路由
export default new VueRouter({
  routes: [
  	{
      path: '/',
      redirect: '/goods/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/goods/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller/seller',
      name: 'seller',
      component: Seller
    }
  ]
})
