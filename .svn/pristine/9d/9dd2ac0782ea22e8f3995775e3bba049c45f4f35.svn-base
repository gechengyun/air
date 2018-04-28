<template>
  <div class="addUser">
    <h3>基本信息</h3>
    <el-form
      v-loading="loading"
      :model="addForm"
      :rules="rules"
      ref="addForm"
      label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称：" prop="realname">
            <el-input
              type="text"
              placeholder="请输入真实姓名"
              v-model.trim="addForm.realname" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码：" prop="phone">
            <el-input
              type="text"
              placeholder="请输入手机号码"
              v-model.trim="addForm.phone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="密码：" prop="password">
            <el-input
              type="password"
              placeholder="请输入密码，6-20位英文或数字"
              v-model.trim="addForm.password" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱：" prop="email">
            <el-input
              type="text"
              placeholder="请输入电子邮箱"
              v-model.trim="addForm.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="职务：">
            <el-input
              type="text"
              placeholder="请输入职务"
              v-model.trim="addForm.duty" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户状态：" prop="state">
            <el-select v-model="addForm.state" placeholder="请选择状态">
              <el-option
                v-for="item in stateList"
                :key="item.id"
                :label="item.value"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>角色信息</h3>
      <el-form-item label="用户角色：" prop="roleIdList">
        <el-row>
          <el-col :span="24">
            <el-checkbox-group v-model="addForm.roleIdList">
              <el-checkbox
                v-for="item in roleList"
                :label="item.id"
                :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-form-item>
      <el-row style="text-align:center">
        <el-col :span="24">
          <el-button
            type="primary"
            @click="submitForm('addForm')"
            :disabled='disabled'>提交</el-button>
          <el-button @click="$router.push({path: '/user', query: {page: $route.query.page}})">关闭</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  userAdd,
  roleGetAllList,
  userGetById
} from '../../config/api'
export default {
  name: 'addUser',
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
    // 邮箱验证
    var checkEmail =  (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'))
      }
      setTimeout(() => {
        if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
          callback(new Error('请输入邮箱'))
        }
        callback()
      }, 1000)
    }
    // 邮箱验证
    var checkSelect =  (rule, value, callback) => {
      console.log(value, 'value')
      if (!value) {
        return callback(new Error('请选择用户角色'))
      }
      setTimeout(() => {
        if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
          callback(new Error('请输入邮箱'))
        }
        callback()
      }, 1000)
    }
    return {
      loading: false, // loading
      disabled: false, // disabled
      addForm: {
        duty: "", // 职务
        email: "", // 邮箱
        id: this.$route.params.id || 0, // id
        password: "", // 密码
        phone: "", // 手机
        realname: "", // 真实姓名
        roleIdList: [], // 勾选角色表
        state: 1 // 状态
      },
      stateList: [
        {id: 0, value: '请选择'},
        {id: 1, value: '启用'},
        {id: 2, value: '禁用'},
      ], // 状态列表
      roleList: [], // 角色列表
      rules: {
        realname: [{required: true, message: '请输入真实姓名', trigger: 'blur'}],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkMobile, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: checkCode, trigger: 'blur'}
        ],
        email: [{validator: checkEmail, trigger: 'blur'}],
        roleIdList: [{required: true, message: '请选择角色', trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // 提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.disabled = true
          userAdd(this.addForm).then(res => {
            if (Number(res.code) != 1) {
              this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
            } else {
              this.$message({
                type: 'success',
                message: '新增用户成功',
                duration: 2000
              })
              setTimeout(() => {
                this.$router.push({path: '/user', query: {page: this.$route.query.page}})
              }, 2000)
            }
            this.disabled = false
          }).catch(err => {
            this.disabled = false
          })
        } else return console.log('表单不完整')
      })
    },
    getAllList () {
      // 获取所有角色列表
      roleGetAllList({}).then(res => {
        if (Number(res.code) != 1)
          return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
        this.roleList = res.data
      }).catch(err => {})
    },
    getById () {
      // 获取用户信息
      userGetById({
        id: this.$route.params.id || 0
      }).then(res => {
        if (Number(res.code) != 1) {
          this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
        } else {
          Object.assign(this.addForm, res.data)
        }
        this.loading = false
        this.disabled = false
      }).catch(err => {
        this.loading = false
        this.disabled = false
      })
    }
  },
  created () {
    this.$route.params.id != 0 ? this.getById() : this.loading = false // 获取用户信息
    this.getAllList() // 获取所有角色列表
  }
}
</script>

<style scoped>
      
</style>


