<template>
  <!-- 个人信息 -->
  <div class="person-information-container">
    <div class="content">
      <div class="img"></div>
      <div class="item">姓名：{{ formData.name }}</div>
      <el-divider></el-divider>
      <div class="item">性别：{{ formData.sex }}</div>
      <el-divider></el-divider>
      <div class="item">收货地址：{{ formData.address }}</div>
      <el-divider></el-divider>
      <div class="item">电话号码：{{ formData.phone }}</div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        sex: '',
        address: '',
        phone: ''
      }
    }
  },
  methods: {
    getUserInfor () {
      return new Promise(resolve => {
        this.$http.get('/api/getCurrentUser').then(res => {
          this.formData = res.data.data
          this.formData.sex = '男'
          this.formData.address = '暂无收货地址'
          this.$nextTick(() => resolve())
        })
      })
    },
    getInfor () {
      this.$http.get('/api/order').then(res => {
        debugger
      })
    }
  },
  created () {
    this.getUserInfor().then(res => this.getInfor())
  }
}
</script>

<style lang="scss">
.person-information-container {
  height: 100%;
  .content {
    padding: 20px 10px;
    color: #666;

    .img {
        width: 100px;
        height: 100px;
        background: url(http://img.cdn.qiniu.dcloud.net.cn/shuijiao.jpg) no-repeat center;
        background-size: contain;
        margin: 0 auto;
    }
  }
}
</style>
