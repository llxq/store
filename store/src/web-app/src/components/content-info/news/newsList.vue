<template>
  <!-- 使用 mui 的 media-list(图文列表) 绘制新闻列表 -->
  <div class="news-list-container">
    <ul class="mui-table-view">
      <li
        class="mui-table-view-cell mui-media"
        v-for="item in newsList"
        :key="item.id"
        @click="show(item.title)"
      >
        <router-link to="/newsinfo">
          <img :src="item.images[0]" class="mui-media-object mui-pull-left">
          <div class="mui-media-body">
            <h3>{{ item.title }}</h3>
            <p class="mui-ellipsis">
              <span>发表时间：2017-12-12</span>
              <span>点击：{{ item.id }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      newsList: [
        {
          images: ['http://pic40.nipic.com/20140412/18428321_144447597175_2.jpg'],
          type: 0,
          id: 9690444,
          ga_prefix: '072016',
          title: '妈，我败给你了，我不谈恋爱行了吧？'
        }
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {},
    show (msg) {
      this.$store.commit('add', msg)
    }
  }
}
</script>

<style lang="scss">
.mui-table-view {
  li {
    h3 {
      font-size: 15px;
      width: 200px;
    }
    .mui-ellipsis {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 12px;
        color: #226aff;
      }
    }
  }
}

.news-list-container {
  margin-top: 40px;
}
</style>
