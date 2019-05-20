<template>
  <div class="all-indent-container">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="getList" :stretch="true">
        <el-tab-pane label="全部订单" name="first">
          <div class="all">
            <div class="item" v-for="(item, i) in list" :key="i">
              <div class="title flex">
                <div class="left">
                  <span class="el-icon-shopping-bag-1"></span>
                  <span class="title-name">{{ item.storeName }}</span>
                  <span class="el-icon-arrow-right"></span>
                </div>
                <div class="right">卖家{{ item.isfh ? '已' : '未' }}发货</div>
              </div>
              <div class="middle flex">
                <div class="left" @click="checkDetails(item)">
                  <img :src="item.img">
                </div>
                <div class="center" @click="checkDetails(item)">{{ item.name }}</div>
                <div class="right">
                  <div class="price">￥{{ item.allPrice }}</div>
                  <div class="count">x{{ item.count }}</div>
                </div>
              </div>
              <div class="footer">
                <div class="top">共{{ item.count }}件商品&nbsp;&nbsp;实付：￥{{ item.shouldPrice }}</div>
                <div class="bottom flex">
                  <div class="flex">
                    <div class="custom-btn">延长收货</div>
                  </div>
                  <div class="custom-btn">查看物流</div>
                  <div class="custom-btn">提醒发货</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已发货" name="second">
          <div class="yf">
            <img src="../../assets/logo.jpg">
            <p class="no">您还没有相关的订单</p>
            <span>可以去看看有哪些想买的</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未发货" name="three">
          <div class="all">
            <div class="item" v-for="(item, i) in list" :key="i">
              <div class="title flex">
                <div class="left">
                  <span class="el-icon-shopping-bag-1"></span>
                  <span class="title-name">{{ item.storeName }}</span>
                  <span class="el-icon-arrow-right"></span>
                </div>
                <div class="right">卖家{{ item.isfh ? '已' : '未' }}发货</div>
              </div>
              <div class="middle flex">
                <div class="left">
                  <img :src="item.img">
                </div>
                <div class="center">{{ item.name }}</div>
                <div class="right">
                  <div class="price">￥{{ item.allPrice }}</div>
                  <div class="count">x{{ item.count }}</div>
                </div>
              </div>
              <div class="footer">
                <div class="top">共{{ item.count }}件商品&nbsp;&nbsp;实付：￥{{ item.shouldPrice }}</div>
                <div class="bottom flex">
                  <div class="flex">
                    <div class="custom-btn">延长收货</div>
                  </div>
                  <div class="custom-btn">查看物流</div>
                  <div class="custom-btn">提醒发货</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      list: [
        {
          storeName: '',
          // 是否发货
          isfh: false,
          // 展示图片
          img: '',
          // 商品名称
          name: '',
          // 总价价格
          allPrice: '',
          // 数量
          count: 1,
          // 实付款
          shouldPrice: ''
        }
      ]
    }
  },
  methods: {
    getList () {
      this.$http.get('/api/order').then(res => {
        this.list = res.data.data
      })
    },
    // 查看详情
    checkDetails (item) {
      this.$router.push({ name: 'indent-details', params: { id: '123' } })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="scss">
.all-indent-container {
  height: 100%;
  background-color: #f5f5f5;
  color: #333;
  font-size: 14px;

  .flex {
    display: flex;
  }

  .custom-btn {
    border: 1px solid #999;
    padding: 5px;
    margin-left: 10px;
    border-radius: 5px;
    color: #000;
  }

  & > .content {
    height: 100%;

    .el-tabs {
      height: 100%;

      .el-tabs__header {
        background-color: #fff;
        padding: 0 10px;
        .el-tabs__nav {
          width: 100%;
        }
      }

      .el-tabs__nav-wrap::after {
        display: none;
      }

      .el-tabs__content {
        height: calc(100% - 56px);
        overflow: auto;
      }

      .item {
        background-color: #fff;
        margin-bottom: 10px;
        .title {
          padding: 15px 20px;
          div {
            flex: 1;
          }

          & > .right {
            text-align: right;
            color: #ff4200;
          }
        }

        .middle {
          border-bottom: 1px solid #d2d2d2;
          padding: 0 20px 10px 20px;

          .left {
            flex: 1;

            img {
              width: 70px;
              height: 70px;
            }
          }

          .center {
            flex: 3;
            height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            padding-left: 15px;
            padding-top: 10px;
          }

          .right {
            padding-top: 10px;
            .price {
              font-weight: 700;
            }

            .count {
              color: #999;
              text-align: right;
              padding-top: 5px;
            }
          }
        }

        .footer {
          flex: 1;
          padding: 15px 20px;

          .top {
            text-align: right;
          }

          .bottom {
            padding-top: 20px;

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

      .yf {
        height: 100%;
        padding: 50px 0;
        text-align: center;

        p {
          margin: 0;
          padding: 0;
          color: #000;
          font-size: 14px;
        }
        span {
          font-size: 10px;
          color: #999;
        }

        img {
          width: 100px;
          height: 100px;
        }
      }
    }
  }
}
</style>
