<template>
  <div class="login">
    <div class="content">
      <div class="loginleft">
        <!-- <img src="../assets/images/login.png"
             alt> -->

        <div class="box1">
        </div>

      </div>
      <div class="loginright">
        <h3 style="color:#fff;margin-bottom:10px">欢迎登录</h3>
        <div class="icon"
             v-if="user == ''"
             style="position:absolute; width:20px;height:20px ;margin-left: 240px;margin-top: 40px;z-index: 2000;">
          <img src="../assets/images/my (1).svg"
               alt>
        </div>
        <div class="icon2"
             v-if="user != ''"
             style>
          <img src="../assets/images/my.svg"
               alt>
        </div>
        <div class="iconpwd"
             v-if="ruleForm.pass == ''"
             style="position:absolute; width:20px;height:20px ;margin-left: 240px;margin-top: 100px;z-index: 2000;">
          <img src="../assets/images/quanxianguanlisuozi.svg"
               alt>
        </div>
        <div class="iconpwd2"
             v-if="ruleForm.pass != ''"
             style="position:absolute; width:20px;height:20px ;margin-left: 240px;margin-top: 100px;z-index: 2000;">
          <img src="../assets/images/quanxianguanlisuozi (1).svg"
               alt>
        </div>
        <img src="../assets/images/shugang.svg"
             style="transform:rotate(90deg)"
             alt>
        <!-- <input type="text" class="username" value="zhangxj">
                <input type="password" class="password" value="111111">
        <input type="text" class="">-->
        <div class="logininner"></div>
        <el-form :model="ruleForm"
                 status-icon
                 ref="ruleForm"
                 label-width="20px"
                 class="form">
          <!-- :rules="rules" -->
          <el-form-item prop="username">
            <el-input v-model="user"
                      placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password"
                      v-model="ruleForm.pass"
                      autocomplete="off"
                      placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop="age">
            <el-input v-model="verification"
                      maxlength="4"
                      placeholder="请输入验证码" />

            <div class="verify-box"
                 style="width:116px;height:38px;position:absolute;margin-left:134px;margin-top:-39px;"
                 @click="refreshCode()">
              <Sidentify :identifyCode="identifyCode"></Sidentify>
            </div>
          </el-form-item>
          <el-form-item class="checkobx">
            <el-checkbox v-model="remember">记住密码</el-checkbox>
            <a href
               style="margin-left:80px;visibility: hidden;">忘记密码</a>
          </el-form-item>
          <el-form-item>
            <el-button @keyup.enter="submitForm('ruleForm')"
                       @click="submitForm('ruleForm')"
                       style="width:250px;background:#327ed8;border:#327ed8;color:#fff">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Vuex from 'vuex'
import Sidentify from '../components/Base/identify'
import utils from '@/utils/util'
export default {
  components: {
    Sidentify: Sidentify
  },
  data () {
    return {
      identifyCodes: '1234567890abcdefghijklmnopqrstuvwxyz',
      identifyCode: '',
      user: '',
      verification: '',
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      remember: true
    }
  },
  created () {
    let vm = this
    vm.refreshCode()
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        vm.submitForm('ruleForm')
      }
    }
    var storage = window.localStorage
    vm.actived = false
    storage.setItem('select', vm.actived)
    storage.setItem('select2', vm.actived)
  },
  computed: {
    ...Vuex.mapState({
      menulist: state => state.home.menulist
    })
  },
  mounted () {
    let vm = this
    let cookie = utils.authorize()
    if (cookie.remember) {
      vm.user = cookie.user
      vm.ruleForm.pass = cookie.pwd
    }
    vm.remember = cookie.remember
  },
  methods: {
    ...Vuex.mapActions({
      handlemenu: 'home/getmenulist'
    }),
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      let vm = this
      vm.identifyCode = ''
      vm.makeCode(vm.identifyCode, 4)
    },
    makeCode (o, p) {
      let vm = this
      for (let i = 0; i < p; i++) {
        vm.identifyCode +=
          vm.identifyCodes[vm.randomNum(0, vm.identifyCodes.length)]
      }
    },
    submitForm (formName) {
      let vm = this
      vm.$refs[formName].validate(valid => {
        if (valid) {
          if (vm.verification === '') {
            vm.$_message.warning('请输入验证码')
          } else {
            if (vm.verification === vm.identifyCode) {
              vm.$axios
                .post('/sso/login', {
                  userName: vm.user,
                  pwd: vm.ruleForm.pass
                })
                .then(function (res) {
                  if (res.status) {
                    let userinfo = {
                      user: vm.user,
                      pwd: vm.ruleForm.pass,
                      remember: vm.remember,
                      isLoad: true
                    }
                    utils.setCookie('userinfo', JSON.stringify(userinfo), 7)
                    let obj = { userName: vm.user, pwd: vm.ruleForm.pass }
                    vm.handlemenu(obj)
                    vm.$_message.success('登录成功！')
                    if (res.data.roleid === '1' || res.data.roleid === '3' || res.data.roleId === '1') {
                      vm.$router.replace('/home/taskpool')
                      // } else {
                      //   vm.$router.replace('/historytask')
                      // }
                    }
                  } else {
                    vm.$_message.error(res.errMsg)
                    vm.refreshCode()
                  }
                })
                .catch(function (err) {
                  console.log(err)
                })
            } else {
              vm.$_message.error('验证码错误')
              vm.refreshCode()
              vm.verification = ''
            }
          }
        } else {
          // console.log("error submit!!");
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    clearCookie () {
      utils.clearCookie('userinfo', '', -1)
    }
  }
}
</script>
<style  scoped>
.loginright >>> .el-form-item__content > .el-input > .el-input__inner {
  /* margin-right: -100px !important; */
  width: 250px;
  background-color: #1f3561 !important;
  color: #fff;
  border: 0px;
}

.logininner >>> .el-form-item__content {
  margin-left: 40px;
}
.logininner >>> .el-input__inner:focus {
  z-index: -1;
  border-color: green;
  background: red;
}
.icon2 {
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  margin-left: 240px;
  margin-top: 40px;
  z-index: 2000;
}
</style>
