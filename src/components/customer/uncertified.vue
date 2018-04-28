<template>
  <div class="uncertified">
    <div v-if="flag == 0">
      <el-row>
        <el-col :span="24">
          <div class="box">
            <h2><i class="el-icon-info el_icon"></i> 您的资质正在审核中</h2>
            <p>只有资质审核通过的账号才可以正式使用中央空调监测云平台</p>
            <p>您可以访问这里
              <span class="el_link" @click="$router.push({path: '/customer/infoInput/' + $route.params.id})">查看</span>
              和<span class="el_link" @click="$router.push({path: '/customer/infoInput/' + $route.params.id})">修改</span>
              审核中的资质。</p>
            <p>如需帮助请拨打服务热线：400-0123-123</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="flag == 2">
      <el-row>
        <el-col :span="24">
          <div class="box">
            <h2><i class="el-icon-error el_icon"></i> 企业资质认证失败</h2>
            <p>只有资质审核通过的账号才可以正式使用中央空调监测云平台</p>
            <p>您可以访问这里
              <span class="el_link" @click="$router.push({path: '/customer/infoInput/' + $route.params.id})">查看</span>
              和<span class="el_link" @click="$router.push({path: '/customer/infoInput/' + $route.params.id})">修改</span>
              审核中的资质。</p>
            <p>如需帮助请拨打服务热线：400-0123-123</p>
            <p>如需帮助请拨打服务热线：400-0123-123</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="flag == 3">
      <el-row>
        <el-col :span="24">
          <div class="box">
            <h2><i class="el-icon-warning el_icon"></i> 请完成企业资质认证</h2>
            <p>请完善企业相关资料，等待审核，</p>
            <p>我们将尽快与您联系并处理。</p>
            <p>咨询电话：400-0123-123</p>
          </div>
        </el-col>
      </el-row>
      <el-row style="text-align: center">
        <el-col :span="24">
          <el-button type="primary" @click="$router.push({path: '/customer/infoInput/0'})">立即认证</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  customerGetExamineStateByUser,
} from '../../config/api'
export default {
  name: 'uncertified',
  data () {
    return {
      flag: 3 // 审核状态 3 未录入 0 审核中 1 审核通过 2 审核失败
    }
  },
  methods: {
    getExamineStateByUser () {
      // 资质审核状态
      customerGetExamineStateByUser({
        id: this.$route.params.id || ''
      }).then((res) => {
        if (Number(res.code) != 1)
          return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
        switch (res.data) {
          case 0, 2:
            this.flag = res.data
            break
          case 1:
            this.$router.push('/customer/customerInfo' + this.$route.params.id)
            break
          default:
            this.flag = res.data
        }
      })
    }
  },
  created () {
    if (this.$route.params.id == 0) {
      this.flag = 3
    } else {
      this.getExamineStateByUser()
    }
  }
}
</script>

<style scoped>
  .box {
    width: 300px;
    margin: 200px auto 20px;
  }
  h2 {
    text-align: center
  }
  p {
    padding-left: 57px
  }
  .el_icon {
    font-size: 28px;
  }
  .el_link {
    cursor: pointer;
    color: #409EFF;
  }
</style>


