<template>
  <div class="loginBox">
    <div class="container demo-1">
      <div class="content">
        <div id="large_header" class="large-header" ref="large_header">
          <canvas id="demo_canvas" ref="demo_canvas"></canvas>
          <div class="login">
            <el-form
              :model="loginForm"
              :rules="rules"
              ref="loginForm">
              <div class="logo"></div>
              <div class="logoText"><span>中央空调远程监测</span>大数据平台</div>
              <div class="logoText2">BIG DATA PLATFORM FOR REMOTE MONITORING OF CENTRAL AIR CONDITIONING</div>
              <el-form-item prop="name" class="loginInput">
                <i class="loginName"></i>
                <input
                  v-model.trim="loginForm.name"
                  maxlength="11"
                  placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item prop="code" class="loginInput">
                <i class="loginCode"></i>
                <input
                  type="password"
                  v-model.trim="loginForm.code"
                  minlength="6"
                  maxlength="20"
                  placeholder="请输入密码" />
              </el-form-item>
              <div class="loginLink">
                <router-link to="/register" class="loginA" style="float: left">注册新账号</router-link>
                <router-link to="/forget" class="loginA" style="float: right">忘记密码？</router-link>
              </div>
              <div
                class="loginButton"
                @click="submitForm('loginForm')"
                :disabled="disabled">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
              <div class="loginStu">安徽华斯源新能源科技有限公司&nbsp;&nbsp;Copyright © 2018 All Rights Reserved&nbsp;&nbsp;皖ICP备10003051号</div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {canvasBg} from '../../assets/login'
export default {
  name: 'login',
  data () {
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
      loginForm: {
        name: '', // 用户名
        code: '', // 密码
      },
      disabled: false, // 防止二次点击
      rules: {
        name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        code: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
      // rules: {
      //   name: [{validator: checkMobile, trigger: 'blur'}],
      //   code: [{validator: checkCode, trigger: 'blur'}]
      // }
    }
  },
  methods: {
    submitForm (formName) {
      // 登录
      this.$refs[formName].validate((valid) => {
        /* if (!/1\d{10}/.test(this.loginForm.name))
          return console.log('请输入正确的手机号！')
        if (!/[a-zA-Z0-9]{6,20}/.test(this.loginForm.code))
          return console.log('密码为6-20位英文或数字!') */
        if(!this.loginForm.name || !this.loginForm.code)
          return ''
        this.disabled = true
        localStorage.setItem('user', true)
        this.$message({
          message: '登录成功',
          type: 'success',
          duration: 2000
        })
        setTimeout(() => {
          this.$router.push({path: '/dashboard'})
          this.disabled = false
        } ,2000)
      })
    },
  },
  mounted () {
    // 渲染背景
    canvasBg(document.getElementById('large_header'), document.getElementById('demo_canvas'))
  }
}
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 0;
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

  .loginLink {
    line-height: 45px;
    height: 45px;
    width: 360px;
    margin: 0 auto;
  }

  .loginA {
    color: #42a1e8;
    font-size: 14px;
    text-decoration: underline;
  }

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

  .loginName {
    background: url('../../assets/loginName.png') no-repeat center #fff;
  }

  .loginCode {
    background: url('../../assets/loginCode.png') no-repeat center #fff;
  }

  .loginInput input{
    float: right;
    width: 294px;
    height: 43px;
    line-height: 43px;
    color: #263743;
    background: #fff;
    font-size: 16px;
    margin: 0;
    border: none;
    padding-left: 15px;
  }

  .login {
    width: 512px;
    height: auto;
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
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
    background-image: url('../../assets/bg.jpg');
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

