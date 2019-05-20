<template>
  <div class="shopCar-container">
    <!-- 使用了 mui 的 car -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不包邮不含运费)</p>
            <p>
              已勾选商品
              <span class="red">{{ acount }}</span> 件，总价：
              <span class="red">￥{{ allPrice }}</span>
            </p>
          </div>
          <mt-button type="danger" @click="settlement">去结算</mt-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="mui-card" v-for="(item, index) in goodsList" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- 使用了 mint-ui 的 form-component -->
            <!-- 官方提供了一个 v-model属性，true代表选中，false代表未选中 -->
            <!-- 有一个事件：change，状态发生改变就会触发该事件 -->
            <mt-switch v-model="item.checked" @change="selectedChange(item)"></mt-switch>
            <img :src="item.src">
            <div class="info">
              <h3>{{ item.name }}</h3>
              <p>
                <span class="price">￥{{ item.price * item.count }}</span>
                <a href="#" @click.prevent="remove(item, index)">删除</a>
              </p>
              <div class="count">
                <el-input-number
                  size="small"
                  v-model="item.count"
                  :min="0"
                  @change="updateCount(item, $event)"
                ></el-input-number>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      info: {},
      goodsList: [],
      // 勾选数量
      acount: 0,
      allPrice: 0
    }
  },
  created () {
    this.getUserInfor().then(res => this.getShorp())
  },
  methods: {
    getShorp () {
      this.$http
        .get('/api/shopCar')
        .then(res => {
          this.goodsList = res.data.data
          this.$store.commit('setAcount', res.data.data.length)
        })
        .catch(res => {
          Toast({
            message: '获取信息失败',
            duration: 1000,
            position: 'middle'
          })
        })
    },
    remove (item, index) {
      // 删除
      this.goodsList.splice(index, 1)
      if (item.checked) {
        this.acount -= parseInt(item.count)
        this.allPrice -= parseInt(item.count) * parseInt(item.price)
      }
    },
    // 选中物品，将物品价格和数量计算
    selectedChange (item) {
      this.acount += parseInt(item.count)
      this.allPrice += parseInt(item.count) * parseInt(item.price)
    },
    updateCount (item, e) {
      e > 0 && (item.acount = e)
    },
    settlement () {
      this.$router.push({ name: 'indent-details' })
    },
    getUserInfor () {
      return new Promise((resolve, reject) => {
        this.$http.get('/api/getCurrentUser').then(res => {
          if (res.data.data !== undefined) {
            resolve()
          } else {
            this.$router.push({name: 'goLogin'})
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shopCar-container {
  overflow: hidden;
  height: 100%;
  & > .content {
    height: calc(100% - 106px);
    overflow: auto;

    & > .mui-card {
      height: 95px;
    }
  }
  .mui-card {
    .mui-card-content {
      .mui-card-content-inner {
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        img {
          width: 60px;
          height: 60px;
        }
        .info {
          display: flex;
          width: 100%;
          /* 竖直方向 */
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          .el-input-number--small {
            width: 100px;
          }
          h3 {
            font-size: 13px;
          }
          .price {
            color: red;
            font-weight: bold;
          }
          p {
            font-size: 13px;
            padding: 0;
            margin: 0;
            padding-top: 3px;

            & > a {
              margin-left: 120px;
              margin-top: 8px;
            }
          }
          .count {
            position: absolute;
            right: 25%;
            top: 20px;
          }
        }
      }
    }
  }
  .mui-card {
    .mui-card-content {
      .jiesuan {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
