<template>

 <div class='updatepwd'>

     <el-row>
        <el-col :span="6"><div style="width:100px;height:10px"></div>　</el-col>
        <el-col :span="10">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                 <el-form-item label="旧密码" prop="oldPass" required>
                    <el-input type="password" v-model.number="ruleForm2.oldPass"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass" required>
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="checkPass" required>
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
               
                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
                    <el-button  onclick="javascript :history.back(-1);">关闭</el-button>
                </el-form-item>
            </el-form>
        </el-col>
       <el-col :span="6"></el-col>
    </el-row>
  


 </div>
</template>
<script>
  import {
    userUpdatePwd
  } from '../../config/api'
  export default {
    data() {
      var oldPass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧密码不能为空'));
        }else{
            callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          oldPass: '',
          pass: '',
          checkPass: ''
        },
        rules2: {
          oldPass: [
            { validator: oldPass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
         
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            userUpdatePwd({
              newPwd: this.ruleForm2.pass,
              oldPwd: this.ruleForm2.oldPass
            }).then(res => {
              if (Number(res.code) != 1)
                return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              setTimeout(()=>{
                this.$router.push({path: '/login'}) 
              },2000) 
            }).catch(err => {})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>