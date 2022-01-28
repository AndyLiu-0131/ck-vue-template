<template>
  <div id="header-container">
    <div class="header-center">
      <!-- <ul class="header-nav">
        <li v-for="(item, index) in navList" :key="index" class="nav-list" :class="{'nav-active': activeName === index}" @click="navActive(index)">{{ item.name }}</li>
      </ul> -->
    </div>
    <div class="header-right">
      <div class="user-icon">
        <div class="username">{{ userName }}</div>
        <i class="el-icon-caret-bottom" />
        <DropDown label="" :drop-list="dropList" />
      </div>
    </div>
    <Dialog
      title="修改密码"
      :visible="dialogpwdVisible"
      :footer-btns="[
        {
          text: '确定',
          type: 'primary',
          trigger: 'confirm',
        },
        {
          text: '关闭',
          type: 'info',
          trigger: 'cancel',
        },
      ]"
      @confirm="dialogConfirm('formPassword')"
      @cancel="handlecancel('formPassword')"
    >
      <el-form
        ref="formPassword"
        :model="formPassword"
        :rules="pass"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-form-item prop="oldPassword" style="" label="原密码">
          <el-input
            v-model="formPassword.oldPassword"
            placeholder="请输入原密码"
            class="input"
            size="mini"
            show-password
          />
        </el-form-item>
        <el-form-item prop="password" style="" label="新密码">
          <el-input
            v-model="formPassword.password"
            placeholder="请输入新密码"
            class="input"
            size="mini"
            show-password
          />
        </el-form-item>
        <el-form-item prop="confirmpwd" style="" label="确认新密码">
          <el-input
            v-model="formPassword.confirmpwd"
            placeholder="请在次输入新密码"
            class="input"
            size="mini"
            show-password
          />
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>
<script>
import { changePassword } from '../utils/apis/login'
export default {
  name: 'HeaderBar',
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
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {

      navList: [
      ],
      activeName: 1,
      dropList: [
        {
          label: '我的消息',
          handlerClick: this.toMessage
        },
        {
          label: '修改密码',
          handlerClick: this.toChangePassword
        },
        {
          label: '退出登录',
          handlerClick: this.toLogout
        }
      ],
      dialogpwdVisible: false,
      formPassword: {
        oldPassword: '',
        password: '',
        confirmpwd: ''
      },
      pass: {
        oldPassword: [
          { required: true, validator: validatePass3, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        confirmpwd: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      userId: '',
      userName: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.userId = localStorage?.userInfo ? JSON.parse(localStorage?.userInfo)?.userId : ''
      this.userName = localStorage?.userInfo ? JSON.parse(localStorage?.userInfo)?.userName : ''
    },
    navActive(i) {
      this.activeName = i
    },
    toMessage() {
      console.log('toMessage')
    },
    toChangePassword() {
      this.dialogpwdVisible = true
    },
    toLogout() {
      this.$confirm({
        content: '确定退出吗？',
        title: '确认信息',
        okFn: (res) => {
          localStorage.clear()
          sessionStorage.clear()
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          this.$router.push({
            path: '/login'
          })
        },
        cancelFn: (res) => {
          console.log('取消')
        }
      })
    },
    dialogConfirm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const params = {
            oldUserPassword: this.formPassword.oldPassword,
            newUserPassword: this.formPassword.password,
            id: this.userId
          }
          changePassword(params).then((res) => {
            if (res.data.code === 200) {
              this.$refs[ruleForm].resetFields()
              this.dialogpwdVisible = false
              sessionStorage.clear()
              this.$message.success('修改密码成功!!')
              this.$router.push({
                path: '/login'
              })
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handlecancel(ruleForm) {
      this.dialogpwdVisible = false
      this.$refs[ruleForm].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
@import url("@/assets/varibles.less");
@import url("@/assets/style/public.less");
#header-container {
  display: flex;
  align-items: center;
  height: @logoHeight;
  padding: 0px 10px;
  box-shadow: 0px 0px 5px #dedede;
  background: @themColor;
  .el-button--mini {
    background: #1a51c6;
    color: #fff;
    border-color: #1a51c6;
  }
}
.sider-bar-control {
  width: 40px;
  cursor: pointer;
}
.header-center {
  flex-grow: 1;
  .header-nav {
    display: flex;
    list-style: none;
    .nav-list {
      height: @logoHeight;
      line-height: @logoHeight;
      width: 150px;
      text-align: center;
      color: #fefefe;
      font-size: 18px;
      cursor: pointer;
    }
    .nav-active {
      background: #427cfa;
    }
  }
}
.header-right {
  font-size: 16px;
  color: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 10px;
    i{
      font-size: 16px;
    }
    .is-circle{
      padding: 0;
    }
  }
  .user-icon {
    display: inline-block;
    padding-left: 16px;
    padding-right: 32px;
    // width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background: #1a51c6;
    border-radius: 15px;
    position: relative;
    .username{
      font-size: 14px;
    }
    .el-icon-caret-bottom{
      font-size: 18px;
      position: absolute;
      right: 5px;
      top: 7px;
    }
  }
  ::v-deep{
    .el-dropdown{
      color: #fff;
      position: absolute;
      right: 8px;
      top: 8px;
      opacity: 0;
      z-index: 10;
    }
  }
}

</style>
