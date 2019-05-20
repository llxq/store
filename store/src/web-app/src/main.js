/**
 * author：chendf
 **/
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入 app 组件
import App from './App.vue'

import Vuex from 'vuex'

// 导入 mint-ui组件
import mintUi from 'mint-ui'
import 'mint-ui/lib/style.css'

// 导入 mui样式
import '@/assets/mui/css/mui.css'
// 需要使用到 mui的 扩展文件，需要导入，还需要导入 该字体图标的 ttf文件
import '@/assets/mui/css/icons-extra.css'

// 路由
import VueRouter from 'vue-router'
import router from './router'

// 导入 vue-resource
import VueResource from 'vue-resource'

// vuex
import store from '@/assets/store/store.js'

// 引入veu-preview，缩略图放大的功能
import VuePreview from 'vue-preview'

// 引入moment.js，可以处理时间
import moment from 'moment'

// 导入该js 全局注册 mui 可以使用mui api
import mui from './assets/mui/js/mui.js'

// 引入全局样式
import '@/assets/index.scss'
Vue.prototype.mui = mui
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(mintUi)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VuePreview)

// 定义一个全局过滤器，处理时间
Vue.filter('dateFormat', str =>
  moment(str).format('YYYY-MM-DD')
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
