<template>
  <div class="goods-list">
    <router-link
      class="goods-item"
      v-for="item in goodsList"
      :key="item.src"
      :to="'/goodsInfo/'+ item.id"
      tag="div"
    >
      <img :src="item.src" alt>
      <h4 class="goods-title">{{ item.name }}</h4>
      <div class="goods-info">
        <p class="goods-info-price">
          <span class="price-now">￥{{ item.newPrice }}</span>
          <span class="price-old">￥{{ item.oldPrice }}</span>
        </p>
        <p class="goods-info-sell">
          <span>{{ item.sum }}人付款</span>
        </p>
      </div>
    </router-link>
    <mt-button v-if="goodsList.length > 0" type="danger" size="large" @click="add">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      goodsList: [],
      num: 3
    }
  },
  methods: {
    // 获取所有数据
    getAllList () {
      this.$http
        .get('/api/goods')
        .then(res => {
          res.data.code === 0 && (this.goodsList = res.data.data)
        })
        .catch(res => {
          Toast({
            message: '获取商品列表出错',
            duration: 1000,
            position: 'middle'
          })
        })
    },
    add () {}
  },
  created () {
    this.getAllList()
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  p {
    margin: 0;
    padding: 5px;
  }
  padding: 8px;
  display: flex;
  /*换行*/
  flex-flow: wrap;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin-bottom: 4px;
    padding: 2px;
    display: flex;
    /*当 title长了的话，会导致高度边长，下面留有空白，是因为 flex布局*/
    /*修改主轴方向 为竖方向*/
    flex-direction: column;
    /*让他的元素，上下对齐，因为改变了主轴方向*/
    justify-content: space-between;

    /*当图片没有加载出来的时候，应该给一个高度，不能让他挤一起*/
    min-height: 270px;
    img {
      width: 100%;
      height: 100%;
    }
    .goods-info {
      background-color: #eeeeee;
      .goods-info-price {
        .price-now {
          color: red;
          font-size: 15px;
          font-weight: bold;
        }
        .price-old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .goods-info-sell {
        font-size: 12px;
        margin-left: 2px;
      }
    }
  }
  .goods-title {
    font-size: 15px;
  }
}
</style>
