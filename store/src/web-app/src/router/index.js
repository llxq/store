import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/components/content/Home.vue')
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('@/components/content/Member.vue')
    },
    {
      path: '/shopCar',
      name: 'shopCar',
      component: () => import('@/components/content/shopCar.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/content/login.vue')
    },
    {
      path: '/newsList',
      name: 'newsList',
      component: () => import('@/components/content-info/news/newsList.vue')
    },
    {
      path: '/newsInfo',
      name: 'newsInfo',
      component: () => import('@/components/content-info/news/newsInfo.vue')
    },
    {
      path: '/photoShare',
      name: 'photoShare',
      component: () => import('@/components/content-info/photos/photoList.vue')
    },
    {
      path: '/photoInfo',
      name: 'photoInfo',
      component: () => import('@/components/content-info/photos/photoInfo.vue')
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: () => import('@/components/content-info/goods/goodsList.vue')
    },
    {
      path: '/goodsInfo/:id',
      name: 'goodsInfo',
      component: () => import('@/components/content-info/goods/goodsInfo.vue')
    },
    {
      path: '/goodsComment',
      name: 'goodsComment',
      component: () => import('@/components/content-info/goods/goodsIntroduce.vue')
    },
    {
      path: '/goodsIntroduce',
      name: 'goodsIntroduce',
      component: () => import('@/components/content-info/goods/goodsComment.vue')
    },
    {
      path: '/leaveMessage',
      name: 'leaveMessage',
      component: () => import('@/components/comment/leaveMessage.vue')
    },
    {
      path: '/issue',
      name: 'issue',
      component: () => import('@/components/issue/issue.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/components/contactUs/contact.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/register/register.vue')
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: () => import('@/components/userInfo/userInfo.vue')
    },
    {
      path: '/goLogin',
      name: 'goLogin',
      component: () => import('@/components/shorpCar/goLogin.vue')
    },
    {
      path: '/update-password',
      name: 'update-password',
      component: () => import('@/components/userInfo/update-password.vue')
    },
    {
      path: '/all-indent',
      name: 'all-indent',
      component: () => import('@/components/userInfo/all-indent.vue')
    },
    {
      path: '/indent-details/:id',
      name: 'indent-details',
      component: () => import('@/components/userInfo/indent-details.vue')
    },
    {
      path: '/person-information',
      name: 'person-information',
      component: () => import('@/components/userInfo/person-information.vue')
    }
  ]
})
