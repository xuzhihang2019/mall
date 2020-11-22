import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

// 1.安装路由
Vue.use(VueRouter)

// 2.创建路由
const routers = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]
const router = new VueRouter({
  routers,
  mode: 'history'
})

// 3.导出
export default router