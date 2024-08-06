<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules" label-position="right" label-width="100px" class="demo-loginForm">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="loginForm.phone" type="number" autocomplete="off" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="密码" prop="psw">
            <el-input v-model="loginForm.psw" type="password" autocomplete="off" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree" label="用户平台使用协议" name="type" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:350px" @click="login('loginForm')">登录</el-button>
          </el-form-item>
          <el-button @click="test">lg</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        phone: '',
        psw: '',
        isAgree: false
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        psw: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}/,
            message: '密码必须是6-15位非空字符',
            trigger: 'blur'
          }
        ],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error('没有勾选用户平台协议'))
            }
          }
        ]
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm)
          this.$message.success('登录成功')
        } else {
          this.$message.error('登录失败')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // margin-left: 176px;
    border: solid 1px #e6e6e6;
    .el-card {
      border: none;
      padding-right:80px;
    }
    h1 {
      // padding-left: 120px;
      text-align: center;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>
