<template>
  <div class="goods-info">
    <!-- 加入购物车动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="box" v-show="isShow" ref="box"></div>
    </transition>
    <!-- 轮播图区域 -->
    <div class="mui-card photos">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :photos="formData.imgs" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ formData.name }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价:&nbsp;
            <del>￥{{ formData.newPrice }}</del>&nbsp;&nbsp;&nbsp;销售价:&nbsp;
            <span class="sell-price">￥{{ formData.xsPrice }}</span>
          </p>
          <p>
            购买数量:&nbsp;
            <!-- 定义发送数据的方法 -->
            <!-- 像子组件传递商品总数量 -->
            <el-input-number
              size="small"
              v-model="formData.count"
              @change="getCount"
              :min="1"
              :max="getMax"
            ></el-input-number>
          </p>
          <p>
            <mt-button type="primary" size="small" @click="insantlyBuy">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            商品货号:
            <span class="goodsId">{{ formData.id }}</span>
          </p>
          <p>
            库存情况:
            <span class="inventory">{{ formData.restCount }}</span>
          </p>
          <p>
            上架时间:
            <span class="timer">{{ formData.time }}</span>
          </p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="introduce">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from '@/components/carousel/carouselPhots.vue'
export default {
  data () {
    return {
      isShow: false,
      // 用户选中的数量，通过子组件获取过来的
      selectCount: 1,
      // 这个是商品数量的最大值，以后可以通过数据接口获取，这里定死了
      inventory: 60,
      formData: {
        // 商品名称
        name: '',
        // 市场价
        newPrice: '',
        // 销售价
        xsPrice: '',
        // 购买数量
        count: 0,
        // 商品货号
        id: '',
        // 库存
        restCount: 0,
        time: '',
        imgs: []
      }
    }
  },
  methods: {
    // 评论
    comment () {
      this.$router.push({ path: '/goodsComment' })
    },
    // 介绍
    introduce () {
      this.$router.push({ path: '/goodsIntroduce' })
    },
    // 点击加入购物车
    addShopCar () {
      let params = {
        goodId: this.formData.id,
        goodCount: this.formData.count,
        price: parseInt(this.formData.count) * parseInt(this.formData.newPrice)
      }
      this.$http.post('/api/addShopCar', params).then(res => {
        this.isShow = !this.isShow
        this.updateCount()
      })
    },
    updateCount () {
      this.$http
        .get('/api/shopCar')
        .then(res => {
          this.$store.commit('setAcount', res.data.data.length)
        })
    },
    // 进入之前
    beforeEnter (el) {
      el.style.transform = 'translate(0, 0)'
    },
    // 进入的动画
    enter (el, done) {
      // 小球适配不同分辨率与位置
      // 获取小球的横纵坐标 与 购物车的横纵坐标
      // 使用：domObj.getBoundingClientRect()  可以获取元素距离页面的 x 和 y 坐标值
      // etBoundingClientRect 方法返回的是调用该方法的元素的TextRectangle对象，该对象具有top、left、right、bottom四个属性，分别代表该元素上、左、右、下四条边界相对于浏览器窗口左上角（注意，不是文档区域的左上角）的偏移像素值。

      // 小球位置
      const boxPostion = this.$refs.box.getBoundingClientRect()
      // 购物车图标位置
      const iconPosition = document
        .getElementsByClassName('mui-badge')[0]
        .getBoundingClientRect()
      const x = iconPosition.left - boxPostion.left
      const y = iconPosition.top - boxPostion.top

      // el.offsetWidth
      el.style.transform = `translate(${x}px, ${y}px)`
      el.style.transition = 'all .6s cubic-bezier(.4, -0.3, 1, .68)'
      done()
    },
    // 进入之后
    afterEnter (el) {
      // 隐藏
      this.isShow = !this.isShow
    },
    // 通过事件机制，子组件向父组件传值
    getCount (count) {},
    // 立即购买
    insantlyBuy () {
      let params = {
        goodId: this.formData.id,
        count: this.formData.count,
        allPrice:
          parseInt(this.formData.newPrice) * parseInt(this.formData.count),
        isfh: false,
        storeName: 'xxx旗舰店',
        name: this.formData.name
      }
      this.$http.post('/api/addOrder', params).then(res => {
        this.$router.push({ name: 'indent-details' })
      })
    },
    getList () {
      this.$http.get(`/api/goods/${this.$route.params.id}`).then(res => {
        this.formData = res.data.data
      })
    }
  },
  components: {
    swiper
  },
  created () {
    this.getList()
  },
  computed: {
    getMax () {
      return isNaN(this.formData.restCount)
        ? 100
        : parseInt(this.formData.restCount)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-info {
  background-color: #ccc;
  overflow: hidden;
  .photos {
    // text-align: right;
    .mui-card-content {
      .mui-card-content-inner {
        text-align: center;
        .sell-price {
          font-size: 16px;
          font-weight: bold;
          color: red;
        }
      }
    }
  }

  .mui-card-header,
  .mui-card-footer {
    display: block;
    button {
      margin: 10px 0;
    }
  }
}
.box {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  top: 390px;
  left: 145px;
  z-index: 1000;
}
</style>
