<template>
  <div class="sys-login">
    <div class="login-body">
      <div class="login-wrap">
        <div class="left-img">{{ '' }}</div>
        <div class="login_box">
          <h2 style="font-size: 32px">请输入系统名称</h2>
          <div class="box_from">
            <!-- <div style="font-size: 20px; font-weight: bold">登录</div> -->
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              class="demo-ruleForm"
            >
              <el-form-item prop="userName" style="">
                <div class="input-item">
                  <i class="el-icon-user" style="font-size: 25px;color:#3870F6" />
                  <el-input
                    v-model="ruleForm.userName"
                    placeholder="请输入您的账号"
                    class="input"
                    style="margin-left: 10px"
                  />
                </div>
              </el-form-item>
              <el-form-item prop="password" style="">
                <div class="input-item" style="padding-top: 10px">
                  <i class="el-icon-lock" style="font-size: 25px;color:#3870F6" />
                  <el-input
                    v-model="ruleForm.password"
                    placeholder="请输入您的密码"
                    class="input"
                    style="margin-left: 10px"
                    show-password
                  />
                </div>
              </el-form-item>
            </el-form>
            <div style="margin-top: 60px">
              <el-button
                class="buttonStyle"
                :loading="loading"
                @click="submitForm('ruleForm')"
              >登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setNewToken } from '../../utils/publicFun'

export default {
  name: 'Login',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formPassword.confirmpwd !== '') {
          this.$refs.formPassword.validateField('confirmpwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formPassword.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      formPassword: {
        password: '',
        confirmpwd: ''
      },
      pass: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmpwd: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      loginFirst: null,
      userId: '',
      roleId: ''
    }
  },
  created() {
    document.title = this.$baseInfo.BASE_TITLE + '-登录'
    window.addEventListener('keydown', this.keyDown, false)
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  },
  methods: {
    keyDown(e) {
      if (e.keyCode === 13) {
        this.submitForm('ruleForm')
      }
    },
    dstroyed() {
      window.removeEventListener('keydown', this.keyDown, false)
    },
    loginToSys() {},
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(async(valid) => {
        if (valid) {
          this.loading = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    dialogConfirm(ruleForm, formName) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 验证成功后相应逻辑
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel(ruleForm, formName) {
      this.$refs[ruleForm].resetFields()
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.sys-login {
  display: flex;
  height: 100vh;
  overflow: auto;
  min-width: 1200px;
  flex-direction: column;
  .login-header {
    display: flex;
    align-items: center;
    padding: 10px 80px;
  }
  .login-footer {
    height: 40px;
    padding: 10px;
  }
  .logo {
    font-size: 32px;
    font-weight: bold;
  }
  .logo-img {
    border-right: 1px solid #999;
    padding-right: 30px;
    margin-right: 30px;
    img {
      height: 60px;
    }
  }
  .login-body {
    flex-grow: 1;
    background: url("../../assets/image/background.png") no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-wrap {
      width: 64%;
      min-width: 1270px;
      height: 720px;
      background-color: #fff;
      border-radius: 30px;
      box-shadow: 20px -3px 50px 20px rgba(42,40,219,0.50); ;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .left-img{
        width: 720px;
        height: 720px;
        background: url("../../assets/image/bg-warpper.png") no-repeat;
        background-size: 70% 70%;
        background-position: center center;
      }
      .login_box {
        width: 400px;
        height: 500px;
        background-color: #fff;
        margin-right: 160px;
        border-radius: 10px;
        box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
        h2 {
          margin-top: 60px;
          text-align: center;
        }
        .box_from {
          padding: 20px 24px 0 24px;
          .demo-ruleForm {
            margin-top: 50px;
            .input-item {
              border-bottom: 1px solid #d3dfef;
              display: flex;
              align-items: center;
              width: 100%;
              .input {
                flex-grow: 1;
                font-size: 13px;
                width: 200px;
              }
              /deep/.el-input__inner {
                border: none;
              }
            }
          }
          /deep/.buttonStyle {
            height: 60px;
            border-radius: 30px;
            width: 100%;
            text-align: center;
            color: #fff;
            background: #3870f6;
            span{
              font-size: 24px !important;
            }
            // border-radius: 46px;
          }
        }
      }
    }
  }
  .login-footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
