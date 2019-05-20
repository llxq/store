<template>
  <div class="login-container">
    <h1>用户登录</h1>
    <div class="login-form">
      <div class="user">
        <el-input v-model="userName" placeholder="请输入用户名"></el-input>
      </div>
      <div class="password">
        <el-input v-model="pwd" type="password" placeholder="请输入密码"></el-input>
      </div>
      <div class="submit">
        <mt-button type="primary" size="large" @click="login">登录</mt-button>
      </div>
    </div>
    <div class="info">
      <router-link href="#" to="/register">我要注册</router-link>|
      <a href="#">忘记秘密？</a>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      flag: false,
      userName: '',
      pwd: ''
    }
  },
  methods: {
    hidden () {
      this.flag = false
    },
    login () {
      if (this.userName.trim() === '') return this.showStr('请输入用户名')
      if (this.pwd.trim() === '') return this.showStr('请输入密码')
      let params = {
        username: this.userName,
        password: this.pwd
      }
      this.$http.post(`/api/login`, params).then(res => {
        res.data.code === 0 && this.$router.push({name: 'userInfo'})
        if (res.data.code !== 0) return this.showStr(res.data.msg)
      })
    },
    showStr (str) {
      Toast({
        message: str,
        duration: 1000,
        position: 'middle'
      })
    },
    getUserInfor () {
      this.$http.get('/api/getCurrentUser').then(res => {
        if (res.data.data !== undefined) {
          this.$router.push({name: 'userInfo'})
        } else {
          this.$store.commit('updateLoginState', '未登录')
        }
      })
    }
  },
  created () {
    this.getUserInfor()
  }
}
</script>

<style lang="scss">
.login-container {
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
      padding: 0 20px;
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
