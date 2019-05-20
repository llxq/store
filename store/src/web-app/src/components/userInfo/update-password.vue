<template>
  <div class="reject-container">
    <h1>密码修改</h1>
    <div class="login-form">
      <div class="user">
        <el-input placeholder="请输入用户名" v-model="userName"></el-input>
      </div>
      <div class="password">
        <el-input placeholder="请输入密码" v-model="pwd"></el-input>
      </div>
      <div class="password">
        <el-input placeholder="请再次输入密码" v-model="againPwd"></el-input>
      </div>
      <div class="submit">
        <mt-button type="danger" size="large" @click.stop="register">确认修改</mt-button>
      </div>
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
      userName: ''
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
