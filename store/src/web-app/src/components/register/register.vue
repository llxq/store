<template>
  <div class="reject-container">
    <h1>用户注册</h1>
    <div class="login-form">
      <div class="user">
        <el-input placeholder="请输入用户名" v-model="userName"></el-input>
      </div>
      <div class="user">
        <el-input placeholder="电话号码" v-model="phone"></el-input>
      </div>
      <div class="password">
        <el-input type="password" placeholder="请输入密码" v-model="pwd"></el-input>
      </div>
      <div class="password">
        <el-input type="password" placeholder="请再次输入密码" v-model="againPwd"></el-input>
      </div>
      <div class="submit">
        <mt-button type="danger" size="large" @click.stop="register">注册</mt-button>
      </div>
    </div>
    <div class="info">
      <router-link href="#" to="/login">已有账号</router-link>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      msg: '',
      flag: false,
      againPwd: '',
      pwd: '',
      userName: '',
      phone: ''
    }
  },
  methods: {
    hidden () {
      this.flag = false
    },
    register () {
      if (this.userName.trim() === '') return this.showStr('请输入用户名')
      if (this.pwd.trim() === '') return this.showStr('请输入密码')
      if (this.pwd !== this.againPwd) return this.showStr('两次密码不一致')
      let params = {
        username: this.userName,
        phone: this.phone,
        password: this.pwd,
        name: this.userName
      }
      this.$http.post('/api/sign', params).then(res => {
        res.body.data.code === 0 && this.$router.push({name: 'userInfo'})
        if (res.data.code !== 0) return this.showStr(res.data.msg)
      }).catch(res => {
        return this.showStr('登录失败')
      })
    },
    showStr (str) {
      Toast({
        message: str,
        duration: 1000,
        position: 'middle'
      })
    }
  }
}
</script>

<style lang="scss">
.reject-container {
  .el-input__inner {
    border-radius: 20px;
  }
  padding: 30% 0;
  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-weight: normal;
  }
  .login-form {
    .user,
    .password {
      padding: 0 10px;
      input {
        border-radius: 20px;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
      input::-moz-placeholder {
        color: #ccc;
      }
      input:-moz-placeholder {
        color: #ccc;
      }
      input:-ms-input-placeholder {
        color: #ccc;
      }
    }
    .submit {
      padding: 0 10px;
      button {
        border-radius: 20px;
        height: 50px;
      }
    }
  }

  .info {
    padding: 20px;
    text-align: center;
    a {
      padding: 0 5px;
    }
  }
}
</style>
