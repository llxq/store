<template>
  <!-- 订单详情 -->
  <div class="indent-details-container">
    <div class="content">
      <div class="title">
        <span>{{ shorpState }}</span>
        <div class="img">
          <img src="../../assets/card.png">
        </div>
      </div>
      <div class="infor flex">
        <div class="left">
          <span class="el-icon-location"></span>
        </div>
        <div class="right">
          <div class="people-details">收货人：{{ formData.name }}&nbsp;&nbsp;&nbsp;{{ formData.phone }}</div>
          <div class="address">收货地址：{{ formData.address }}</div>
        </div>
      </div>
      <!-- 商品 -->
      <div class="shorp-list">
        <div class="item" v-for="(item, i) in formData.goodList" :key="i">
          <div class="title">
            <span
              :class="['circle', item.checked ? 'is-checked' : '']"
              @click="item.checked = !item.checked"
            ></span>
            <span class="el-icon-s-shop"></span>
            <span class="name">{{ item.storeName }}</span>
          </div>
          <div class="middle flex">
            <div class="left">
              <img :src="item.img">
            </div>
            <div class="center">
              <div class="name">{{ item.name }}</div>
              <div class="details">颜色：{{ item.color || '灰色' }} &nbsp;&nbsp;&nbsp;尺寸：{{item.size || '11.6'}}英寸</div>
            </div>
            <div class="right">
              <div class="count">x{{ item.count }}</div>
            </div>
          </div>
          <div class="footer">
            <div class="top">
              <span class="price">￥{{ item.allPrice }}</span>
              <span>等待付款</span>
            </div>
            <div class="bottom">
              <span class="custom-btn">取消订单</span>
              <span class="custom-btn">提醒发货</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 创建时间 -->
      <div class="create-time">创建时间：{{ formData.createTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shorpState: '等待买家付款',
      formData: {
        name: '',
        phone: '',
        address: '',
        createTime: '',
        goodList: [
          {
            storeName: '',
            price: 0,
            img: '',
            count: 1,
            color: '',
            size: '',
            checked: true
          }
        ]
      }
    }
  },
  methods: {
    getDetails () {
      this.$http.get('/api/order').then(res => {
        this.formData.goodList = res.data.data
      })
    },
    getUserInfor () {
      return new Promise(resolve => {
        this.$http.get('/api/getCurrentUser').then(res => {
          this.formData.name = res.data.data.name
          this.formData.phone = res.data.data.phone || '暂未设置手机号码'
          this.formData.address = res.data.data.address || '暂无收货地址'
          this.$nextTick(() => resolve())
        })
      })
    }
  },
  created () {
    this.getUserInfor().then(res => this.getDetails())
  }
}
</script>

<style lang="scss">
.indent-details-container {
  background-color: #f5f5f5;
  height: 100%;
  color: #333;
  font-size: 14px;
  & > .content {
    height: 100%;
    .flex {
      display: flex;
    }
    .price {
      font-size: 18px;
      color: red;
    }
    .is-checked {
      background-color: #409eff;
      border-color: #409eff !important;
    }
    .custom-btn {
      width: 80px;
      padding: 5px 0;
      border-radius: 10px;
      border: 1px solid #ff4040;
      color: #ff4040;
      text-align: center;
      display: inline-block;
      margin-left: 20px;
    }
    .circle {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #333;
    }
    & > .title {
      height: 100px;
      background-color: #ff4040;
      color: #fff;
      line-height: 100px;
      padding: 0 60px;
      text-align: right;
      position: relative;

      .img {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 0;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .infor {
      padding: 15px 10px;
      background: #fff;
      margin-bottom: 10px;
      .left {
        font-size: 25px;
        height: 90px;
        background-color: #fff;
        line-height: 90px;
      }
      .right {
        padding: 10px;
        .people-details {
          padding-bottom: 10px;
        }
      }
    }
    .shorp-list {
      background-color: #fff;
      height: calc(100% - 295px);
      overflow: auto;
      margin-bottom: 10px;

      .item {
        border-bottom: 1px solid #ccc;
        .title {
          height: 34px;
          line-height: 43px;
          border-bottom: 1px solid #ccc;
          padding-left: 20px;
          .el-icon-s-shop {
            font-size: 25px;
            margin-left: 5px;
          }
          & > .name {
            display: inline-block;
            line-height: 33px;
            vertical-align: top;
            font-size: 16px;
          }
        }

        .middle {
          border-bottom: 1px solid #d2d2d2;
          padding: 0 20px 10px 20px;

          .left {
            flex: 1;
            padding-top: 20px;

            img {
              width: 70px;
              height: 70px;
            }
          }

          .center {
            flex: 3;
            height: 50px;
            padding-left: 15px;
            padding-top: 10px;

            .details {
              padding-top: 10px;
              color: #999;
            }
          }

          .right {
            padding-top: 10px;
            .price {
              font-weight: 700;
            }

            .count {
              color: #999;
              text-align: right;
              padding: 25px 5px;
              font-size: 14px;
            }
          }
        }

        .footer {
          flex: 1;
          padding: 15px 20px;

          .top {
            text-align: right;

            .price {
              margin-right: 20px;
            }
          }

          .bottom {
            padding-top: 10px;
            text-align: right;

            & > :first-child {
              flex: 5;
              position: relative;

              div {
                position: absolute;
                right: 0;
              }
            }

            & > :last-child {
              background-color: #ff4200;
              color: #fff;
              border-color: #ff4200;
            }
          }
        }
      }
    }

    .create-time {
      height: 50px;
      background-color: #fff;
      color: #666;
      padding: 10px;
    }
  }
}
</style>
