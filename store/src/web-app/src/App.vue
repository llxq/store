<template>
  <div id="app">
    <!-- 顶部 header区域 -->
    <mt-header fixed title="商城">
      <!-- 使用了 mint-ui的 header -->
      <span to="/" slot="left" @click="goBack" class="return" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <div class="app-container">
      <transition>
        <router-view></router-view>
      </transition>
    </div>

    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link :class="['mui-tab-item-new', $route.path === '/' && 'is-active']" to="/">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link :class="['mui-tab-item-new', $route.path === '/member' && 'is-active']" to="/member">
        <span class="mui-icon mui-icon-location"></span>
        <span class="mui-tab-label">地址</span>
      </router-link>
      <router-link :class="['mui-tab-item-new', $route.path === '/shopCar' && 'is-active']" to="/shopCar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">{{ $store.state.acount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link :class="['mui-tab-item-new', ($route.path === '/login' || $route.path === '/userInfo') && 'is-active']" to="/login">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">{{ $store.state.isLogin }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: false
    }
  },
  methods: {
    goBack () {
      // 点击后退
      this.$router.go(-1)
    },
    getLoginState () {
      this.$http.get('/api/getCurrentUser').then(res => {
        if (res.data.data !== undefined) {
          this.$store.commit('updateLoginState', res.data.data.name)
        } else {
          this.$store.commit('updateLoginState', '未登录')
        }
      })
    }
  },
  created () {
    this.flag = this.$route.path !== '/'
    this.getLoginState()
  },
  // 监听路由
  watch: {
    '$route.path': function (newValue) {
      if (newValue === '/') {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  overflow-x: hidden;
  padding-bottom: 50px;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  .mint-header.is-fixed {
    z-index: 1000;
  }
  .mint-header-button .is-left {
    background-color: #26a2ff;
  }

  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  /*消失应该要从左往右消失*/
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    /*这个是不让 下一页的内容从下面飘上来*/
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }
}
/* 修改使用了 mui的滑动组件之后，tab无法切换问题，类名冲突了。直接 copy样式，修改名字即可 */
.mui-bar-tab .mui-tab-item-new.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-new {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-new .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-new .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.is-active {
  color: #007aff!important;
}
</style>
