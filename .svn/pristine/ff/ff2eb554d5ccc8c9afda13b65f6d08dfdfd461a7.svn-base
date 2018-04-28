<template>
  <div class="loginBox">
    <div class="container demo-1">
      <div class="content">
        <div id="large_header" class="large-header" ref="large_header">
          <div class="register">
            <div class="logo"></div>
            <div class="logoText"><span>中央空调远程监测</span>大数据平台</div>
            <div class="logoText2">BIG DATA PLATFORM FOR REMOTE MONITORING OF CENTRAL AIR CONDITIONING</div>
            <el-form ref="registerForm" :model="registerForm" :rules="rules">
              <el-form-item prop="mobile" class="loginInput">
                <i class="loginPhone"></i>
                <input
                  type="text"
                  maxlength="11"
                  placeholder="请输入手机号"
                  v-model.trim="registerForm.mobile" />
              </el-form-item>
              <el-form-item prop="msm" class="loginInput">
                <div style="width: 225px" class="fl">
                  <input
                    type="text"
                    maxlength="4"
                    style="width: 210px"
                    placeholder="请输入验证码"
                    v-model.trim="registerForm.msm" />
                </div>
                <div class="fr">
                  <button v-if="isCount" disabled>倒计时{{ this.count }}s</button>
                  <button @click="getCode()" type="primary" v-else>获取验证码</button>
                </div>
              </el-form-item>
              <el-form-item prop="name" class="loginInput">
                <i class="loginName"></i>
                <input
                  type="text"
                  placeholder="请输入真实姓名"
                  v-model.trim="registerForm.name" />
              </el-form-item>
              <el-form-item prop="code" class="loginInput">
                <i class="loginCode"></i>
                <input
                  type="password"
                  placeholder="请输入密码，6-20位英文或数字"
                  v-model.trim="registerForm.code" />
              </el-form-item>
              <div class="loginLink"><span class="a" @click="$router.push('/login')">我有账号直接去登录</span></div>
              <el-form-item>
                <div
                  class="loginButton"
                  @click="submitForm('registerForm')"
                  :disabled="disabled">注&nbsp;&nbsp;&nbsp;&nbsp;册</div>
              </el-form-item>
              <div class="loginStu">安徽华斯源新能源科技有限公司&nbsp;&nbsp;Copyright © 2018 All Rights Reserved&nbsp;&nbsp;皖ICP备10003051号</div>
            </el-form>
          </div>
          <canvas id="demo_canvas" ref="demo_canvas"></canvas>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import {
    userRegister,
    getMSM
  } from '../../config/api'
  import {canvasBg} from '../../assets/login'
  export default {
    name: 'register',
    data() {
      // 手机验证
      var checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号'))
        }
        setTimeout(() => {
          if (!/1\d{10}/.test(value)) {
            callback(new Error('请输入正确的手机号'))
          }
          callback()
        }, 1000)
      }
      // 验证码验证
      var checkMsm = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'))
        }
        setTimeout(() => {
          if (!/\d{4}/.test(value)) {
            callback(new Error('验证码格式错误！'))
          }
          callback()
        }, 1000)
      }
      // 密码验证
      var checkCode =  (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'))
        }
        setTimeout(() => {
          if (!/[a-zA-Z0-9]{6,20}/.test(value)) {
            callback(new Error('密码为6-20位英文或数字'))
          }
          callback()
        }, 1000)
      }
      return {
        registerForm: {
          mobile: '', // 用户手机号
          msm: '', // 验证码
          name: '', // 用户名
          code: '', // 密码
        },
        disabled: false, // disabled
        rules: {
          mobile: [{ validator: checkMobile, trigger: 'blur' }],
          msm: [{ validator: checkMsm, trigger: 'blur' }],
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 20, message: '用户名为2-20个字符', trigger: 'blur' }
          ],
          code: [{ validator: checkCode, trigger: 'blur'}]
        },
        isCount: false, // 是否点击
        count: 60, // 60s
        timer: null // 定时器
      }
    },
    methods: {
      getCode () {
        // 获取验证码
        this.$refs['registerForm'].validateField('mobile', (valid) => {
          if (/1\d{10}/.test(this.registerForm.mobile)) {
            this.countDown()
            getMSM({
              mobile: this.registerForm.mobile
            }).then((res) => {
              // 短信发送成功
            }).catch((err) => {})
          } else {
            this.$message({
              message: '请输入正确的手机号码',
              type: 'warning',
              duration: 2000
            })
          }
        })
      },
      countDown () {
        // 倒计时 60 秒
        if (!this.isCount) {
          this.isCount = true
          this.timer = setInterval(() => {
            if (this.count == 0) {
              this.count = 60
              this.isCount = false
              clearInterval(this.timer)
            } else {
              this.count--
            }
          }, 1000)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // 注册
          if (!/1\d{10}/.test(this.registerForm.mobile))
            return console.log('请输入正确的手机号！')
          if (!/\d{4}/.test(this.registerForm.msm))
            return console.log('验证码格式错误！')
          if (!/[\s\S]{2,20}/.test(this.registerForm.name))
            return console.log('名字为2-20个字符！')
          if (!/[a-zA-Z0-9]{6,20}/.test(this.registerForm.code))
            return console.log('密码为6-20位英文或数字!')
          this.disabled = true
          userRegister({
            name: this.registerForm.name || '',
            password: this.registerForm.code || '',
            phone: this.registerForm.mobile || '',
            smsCode: this.registerForm.msm || ''
          }).then((res) => {
            // 跳转登录页面
            if (Number(res.code != 1)) {
              this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
              this.disabled = false
            } else {
              this.$message({
                message: '注册成功',
                type: 'success',
                duration: 2000
              })
              setTimeout(() => {
                this.$router.push('/login')
                this.disabled = false
              } ,2000)
            }
          }).catch((err) => {
            this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
            this.disabled = false
          })
        })
      }
    },
    mounted () {
      // 渲染背景
      canvasBg(document.getElementById('large_header'), document.getElementById('demo_canvas'))
    },
    beforeDestroy() {
      // 销毁组件清除定时器
      clearInterval(this.timer)
      this.timer = null
    }
  }

</script>

<style scoped>
  .logo {
    width: 100%;
    height: 95px;
    background: url('../../assets/logo.png') no-repeat center;
  }

  .logoText {
    font-size: 28px;
    line-height: 50px;
    color: #fff;
    margin-top: 25px;
  }

  .logoText span {
    font-size: 35px;
    font-weight: bold;
  }

  .logoText2 {
    font-size: 12px;
    line-height: 25px;
    color: #fff;
  }

  .loginBox {
    width: 100%;
    height: 100%;
    background-image: url('../../assets/bg.jpg');
  }

  .register {
    width: 512px;
    height: auto;
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
  }

  .loginStu {
    font-size: 12px;
    color: #fff;
    line-height: 45px;
    margin: 20px auto 0;
    width: 100%;
  }

  .loginButton {
    color: #fff;
    font-size: 20px;
    width: 360px;
    height: 45px;
    line-height: 45px;
    background: #0d7cd0;
    margin: 0 auto;
    cursor: pointer;
    text-align: center;
  }

  .loginInput {
    width: 360px;
    height: 45px;
    line-height: 45px;
    margin: 20px auto 0;
  }

  .loginInput i{
    display: block;
    float: left;
    width: 50px;
    height: 45px;
    border-right: 1px solid #263743;
  }

  .loginInput input {
    float: right;
    width: 294px;
    height: 43px;
    line-height: 43px;
    color: #263743;
    font-size: 16px;
    margin: 0;
    border: none;
    background: #fff;
    padding-left: 15px;
  }

  .loginInput button {
    border: none;
    background: #0d7cd0;
    font-size: 14px;
    color: #fff;
    width: 110px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    cursor: pointer;
  }

  .loginName {
    background: url('../../assets/loginName.png') no-repeat center #fff;
  }

  .loginCode {
    background: url('../../assets/loginCode.png') no-repeat center #fff;
  }

  .loginPhone {
    background: url('../../assets/loginPhone.png') no-repeat center #fff;
  }

  .register h2 {
    text-align: center;
    color: #606266;
  }

  .register-button {
    width: 100%;
  }

  .loginLink {
    font-size: 14px;
    height: 45px;
    line-height: 45px;
    text-align: left;
    text-decoration: underline;
    width: 360px;
    margin: 5px auto 0;
    color: #409EFF;
  }

  .large-header {
    position: relative;
    width: 100%;
    height: 100%;
    background: #333;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
    z-index: 1;
  }

  .demo-1 .large-header {
    background: transparent;
  }

  .main-title {
    position: absolute;
    margin: 0;
    padding: 0;
    color: #f9f1e9;
    text-align: center;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
  }

  .demo-1 .main-title {
    text-transform: 'uppercase';
    font-size: 4.2em;
    letter-spacing: 0.1em;
  }

  .main-title .thin {
    font-weight: 200;
  }

  @media only screen and (max-width : 768px) {
    .demo-1 .main-title, 
    .demo-3 .main-title,
    .demo-4 .main-title {
      font-size: 3em;
    }

    .demo-2 .main-title {
      font-size: 4em;
    }
  }
</style>
