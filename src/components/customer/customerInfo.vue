<template>
  <div class="customerInfo">
    <el-row>
      <el-col :span="24">
        <el-form
          v-loading="loading"
          :model="infoForm"
          :rules="rules"
          ref="infoForm"
          label-width="100px">
          <el-row type="flex" justify="space-around">
            <el-col :span="16">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="企业名称：">
                    <div>{{infoForm.name}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="联系人：" prop="linkmanName">
                    <el-input
                      type="text"
                      placeholder="请输入联系人"
                      v-model.trim="infoForm.linkmanName" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="联系电话：" prop="linkmanPhone">
                    <el-input
                      type="text"
                      placeholder="请输入联系电话"
                      v-model.trim="infoForm.linkmanPhone" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="所在区域：">
                    <div>{{infoForm.areaPathName}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="企业地址：">
                    <el-input
                      type="text"
                      maxLength="30"
                      placeholder="请输入具体地址(不超过30位字符)"
                      v-model.trim="infoForm.address" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="企业简介：">
                    <el-input
                      type="textarea"
                      maxLength="150"
                      placeholder="请输入企业简介(不超过150个字符)"
                      :rows="5"
                      v-model.trim="infoForm.introduction" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" style="text-align: center">
              <div class="avatarBox">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadLink + 'customer/upload'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :disabled="picDisabled">
                  <img v-if="infoForm.licensePic" :src="infoForm.licensePic" class="avatar" />
                  <div v-else>
                    <i class="el-icon-upload"></i>
                    <p class="">{{picDisabled ? '上传中...' : '点击上传'}}</p>
                  </div>
                </el-upload>
                <el-button
                  v-if="infoForm.licensePic"
                  class="avatarButton"
                  size="small"
                  @click="dialogTableVisible = true"
                  type="primary">点击查看</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row style="text-align:center">
            <el-col>
              <el-button
                type="primary"
                @click="submitForm('infoForm')"
                :disabled='disabled'>提交</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog
      style="text-align: center"
      width="70%"
      top="2%"
      :append-to-body="true"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false">
      <img class="loginPic" :src="infoForm.licensePic" />
    </el-dialog>
  </div>
</template>

<script>
import {
  customerGetById,
  customerUpdate
} from '../../config/api'
import config from '../../config'
import {isLegalImg} from '../../config/common'
export default {
  name: 'customerInfo',
  data () {
    var checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入联系方式'))
      }
      setTimeout(() => {
        if (!/[-\d]+/.test(value)) {
          callback(new Error('请输入正确的联系方式'))
        }
        callback()
      }, 1000)
    }
    return {
      disabled: false, // 防止二次提交
      picDisabled: false, // 防止图片二次上传
      loading: false, // loading
      uploadLink: config.baseUrl, // 上传路径
      dialogTableVisible: false, // dialog展示
      infoForm: {
        name: '', // 企业名称
        linkmanName: '', // 联系人
        linkmanPhone: '', // 联系电话
        areaPathName: '', // 联系区域
        address: '', // 详细地址
        introduction: '', // 企业简介
        licensePic: '', // 图片路径
        id: this.$route.params.id || 0, // id
        applyTime: '',
        areaId: '',
        examineTime: '',
        licenseCode: ''
      },
      rules: {
        linkmanName: [{required: true, message: '请输入联系人', trigger: 'blur'}],
        linkmanPhone: [
          {required: true, message: '请输入联系方式', trigger: 'blur'},
          {validate: checkMobile, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // 保存资料
      this.$refs[formName].validate((valid) => {
        if (!this.infoForm.linkmanName
          || !/[-\d]+/.test(this.infoForm.linkmanPhone))
          return console.log('表单不完整')
        // 提交表单
        this.disabled = true
        customerUpdate(this.infoForm).then((res) => {
          if (Number(res.code) != 1) {
            this.loading = false
            return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
          }
          this.loading = false
          this.disabled = false
          this.$router.push({path: '/customer', query: {page: this.$route.query.page}})
        }).catch((err) => {
          this.loading = false
          this.disabled = false
        })
      })
    },
    getById () {
      // 获取资料
      customerGetById({
        id: this.$route.params.id || ''
      }).then((res) => {
        if (Number(res.code) != 1) {
          this.loading = false
          return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
        }
        this.loading = false
        Object.assign(this.infoForm, res.data, {licensePic: res.msg + '/' +  res.data.licensePic})
      }).catch((err) => {})
    },
    handleAvatarSuccess (res, file) {
      // 上传成功
      this.picDisabled = false
      this.$message.success('上传成功！')
      this.infoForm.licensePic = (res.msg + res.data) || ''
    },
    beforeAvatarUpload (file) {
      if (this.infoForm.licensePic !== '') {
        return this.$confirm('已有营业执照图，再次上传将替换现在的营业执照图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return isLegalImg(this, file, {
            success: () => {
              this.$message.warning('上传中...')
              this.picDisabled = true
            },
            error: () => {
              this.picDisabled = false
            }
          })
        })
      } else {
        return isLegalImg(this, file, {
          success: () => {
            this.$message.warning('上传中...')
            this.picDisabled = true
          },
          error: () => {
            this.picDisabled = false
          }
        })
      }
    }
  },
  created () {
    this.getById()
  }
}
</script>

<style scoped>
  .avatar {
    width: 100%;
  }
  .avatarBox {
    width: 240px;
    height: auto;
    position: relative;
    text-align: center;
  }
  .avatarButton {
    position: absolute;
    z-index: 999;
    bottom: 10px;
    right: 10px;
  }
  .el-icon-upload {
    font-size: 67px;
    color: #c0c4cc;
    margin: 40px 0 16px;
    line-height: 50px;
  }
  .el-upload__text {
    color: #606266;
    font-size: 14px;
    text-align: center;
  }
  .loginPic {
    max-width: 100%;
    height: 750px;
    border: 1px solid #666
  }

  @media only screen and (max-height : 768px) {
    .loginPic {
      max-width: 100%;
      height: 500px;
      border: 1px solid #666
    }
  }
</style>

