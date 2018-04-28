<template>
  <div class='customer'>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="客户名称：">
            <el-select v-model="formInline.customerId" placeholder="请选择">
              <el-option
                v-for="item in customerList"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="区域：">
            <el-select v-model="formInline.provinceId" :change="getProvince()" placeholder="请选择">
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
            <el-select v-model="formInline.cityId" :change="getCity()" placeholder="请选择">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
            <el-select v-model="formInline.countyId" :change="getCounty()" placeholder="请选择">
              <el-option
                v-for="item in countyList"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="账号状态：">
            <el-select v-model="formInline.state" placeholder="请选择">
              <el-option
                v-for="item in stateList"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getCustomerPageList()"
              :disabled="disabled">查询</el-button>
            <el-button
              @click="ResetCustomerPageList()"
              :disabled="disabled" plain>重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          border>
          <el-table-column
            prop="name"
            label="客户名称"
            width="100"
            fixed />
          <el-table-column
            prop="areaPathName"
            label="行政区域" />
          <el-table-column
            prop="linkmanName"
            label="联系人"
            width="100" />
          <el-table-column
            prop="linkmanPhone"
            label="联系电话"
            width="150" />
          <el-table-column
            prop="registerTime"
            label="注册时间"
            width="250" />
          <el-table-column
            prop="projectCount"
            label="项目数"
            width="80" />
          <el-table-column
            prop="airStationCount"
            label="空调数"
            width="80" />
          <el-table-column
            prop="userPhone"
            label="平台账号"
            width="150" />
          <el-table-column
            prop="state"
            label="账号状态"
            width="100">
            <template slot-scope="scope">
              <el-tag :type="scope.row.state == 1 ? 'success' : 'danger'" close-transition>
                {{scope.row.state == 1 ? '启用' : '禁用'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column 
            label="操作"
            width="400"
            fixed="right">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="openDialog(scope.row.userId)"
                type="text">分配项目</el-button>
              <el-button
                size="small"
                type="text"
                @click="$router.push({
                  path: '/customer/customerInfo/' + scope.row.id,
                  query: {page: currentPage}
                })">企业详情</el-button>
              <el-button
                size="small"
                type="text"
                @click="$router.push({
                  path: '/customer/customerInfo/' + scope.row.id,
                  query: {page: currentPage}
                })">修改</el-button>
              <el-button
                size="small"
                @click="deleteAction(scope.row.id)"
                type="text">删除</el-button>
              <el-button
                size="small"
                @click="scope.row.state == 1 ? disableState(scope.row.id) : enableState(scope.row.id)"
                type="text">{{scope.row.state == 1 ? '禁用' : '启用'}}</el-button>
              <el-button
                size="small"
                @click="resetPwd(scope.row.id)"
                type="text">密码重置</el-button> 
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-if="total > currentPageSize">
      <el-col :span="24">
        <el-pagination
          background
          style="text-align:center" class="mt20"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="currentPageSize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      title="选择分配的项目"
      :append-to-body="true"
      :visible.sync="dialogTableVisible"
      width="815px"
      :modal-append-to-body="false">
      <el-form :inline="true" :model="dialogForm" ref="dialogForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="项目名称：">
              <el-input
                type="text"
                placeholder="请输入项目名称"
                :value="dialogForm.projectName" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="业主单位名称：">
              <el-input
                type="text"
                placeholder="请输入业主单位名称"
                :value="dialogForm.ownerName" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button
                type="primary"
                @click="submitFormDialog('dialogForm')">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-checkbox-group v-model="checkList">
              <el-table
                v-loading="dialogLoading"
                :data="dialogList"
                style="width: 100%"
                border>
                <el-table-column
                  prop="value"
                  width="150"
                  label="编号">
                  <template slot-scope="scope">
                    <el-checkbox :label="scope.row.id" :checked="scope.row.isAllocated == 1 ? true : false" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="projectName"
                  label="项目名称" />
                <el-table-column
                  prop="ownerName"
                  label="物业名称" />
                <el-table-column
                  prop="customerName"
                  label="已分配客户名称" />
              </el-table>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row style="text-align:center" class="mt30">
          <el-col :span="24">
            <el-form-item>
              <el-button
                type="primary"
                @click="submitDialog()">提交</el-button>
              <el-button @click="closeDialog()">关闭</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import {
    areaGetSons,
    customerGetAllList,
    customerGetCustomerPageList,
    projectGetUserAndNoUserPro,
    userDisableState,
    userEnableState,
    userResetPwd,
    userDelete
  } from '../../config/api'
  export default {
    data() {
      return {
        loading: true, // loading
        disabled: false, // 防止二次点击
        dialogTableVisible: false, // dialog显示
        dialogLoading: true, // 弹窗loading
        formInline: {
          customerId: 0, // 客户Id
          state: 0, // 状态
          provinceId: 0, // 省
          cityId: 0, // 城市
          countyId: 0, // 县、区
        },
        dialogForm: {
          ownerName: '', // 业主名称
          projectName: '', // 项目名称
          userId: '' // 用户id
        },
        dialogList: [], // 弹窗项目列表 
        checkList: [], // 勾选列表
        customerList: [], // 客户列表
        stateList: [
          {id: 0, name: '全部'},
          {id: 1, name: '启用'},
          {id: 2, name: '禁用'},
        ], // 状态列表
        provinceList: [{id: 0, name: '全部'}], // 省列表
        cityList: [{id: 0, name: '全部'}], // 城市列表
        countyList: [{id: 0, name: '全部'}], // 县、区列表
        provinceWatch: 0, // 省Id监听
        cityWatch: 0, // 市Id监听
        countyWatch: 0, // 县Id监听
        tableData: [], // 表单
        currentPage: Number(this.$route.query.page) || 1, // 页码
        currentPageSize: 10, // 每页数目
        total: 0, // 总项目数,
      }
    },
    methods: {
      getAllList () {
        // 获取客户列表
        customerGetAllList({})
          .then(res => {
            if (Number(res.code) != 1)
              return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
            res.data.unshift({id: 0, name: '全部'})
            this.customerList = res.data
          }).catch(err => {})
      },
      getSons (id, type) {
        // 获取地域列表
        areaGetSons({id: Number(id)}).then((res) => {
          if (Number(res.code) != 1)
            return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
          res.data.unshift({id: 0, name: '全部'})
          switch (type) {
            case 1:
              this.provinceList = res.data
              break
            case 2:
              this.cityList = res.data
              break
            case 3:
              this.countyList = res.data
              break
            default:
              this.provinceList = res.data
              break
          }
        }).catch((err) => {})
      },
      getProvince () {
        // 获取省Id后
        this.provinceWatch = this.formInline.provinceId
      },
      getCity () {
        // 获取市Id后
        this.cityWatch = this.formInline.cityId
      },
      getCounty () {
        // 获取县、区Id后
        this.countyWatch = this.formInline.countyId
      },
      getCustomerPageList () {
        // 获取列表
        this.disabled = true
        customerGetCustomerPageList({
          customerId: this.formInline.customerId || 0,
          state: this.formInline.state || 0,
          provinceId: this.formInline.provinceId || 0,
          cityId: this.formInline.cityId || 0,
          countyId: this.formInline.countyId || 0,
          pageIndex: this.currentPage || 1,
          pageSize: this.currentPageSize || 10
        }).then(res => {
          if (Number(res.code != 1)) {
            this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
          } else {
            this.tableData = res.data.list
            this.total = res.data.total
            this.currentPage = res.data.pageNum
            this.currentPageSize = res.data.pageSize
          }
          this.loading = false
          this.disabled = false
        }).catch(err => {
          this.disabled = false
          this.loading = false
        })
      },
      ResetCustomerPageList () {
        // 重置客户列表
        Object.assign(this.formInline, {
          customerId: 0, // 客户Id
          state: 0, // 状态
          provinceId: 0, // 省
          cityId: 0, // 城市
          countyId: 0, // 县、区
        })
        this.getCustomerPageList()
      },
      openDialog (userId) {
        // 打开弹窗
        this.dialogForm.userId = userId
        this.submitFormDialog(() => {this.dialogTableVisible = true})
      },
      submitFormDialog (cb) {
        // 查询分配项目
        projectGetUserAndNoUserPro(this.dialogForm)
          .then(res => {
            if (Number(res.code != 1)) {
              this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
            } else {
              this.dialogList = res.data
            }
            this.dialogLoading = false
            cb()
          })
          .catch(err => {})
      },
      submitDialog () {
        // 提交保存
        this.dialogTableVisible = false
      },
      closeDialog () {
        // 关闭弹窗
        this.dialogTableVisible = false
        this.checkList = []
      },
      disableState (userId) {
        // 禁用用户
        this.$confirm('是否确定禁用该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userDisableState({
            id: userId
          }).then(res => {
            if (Number(res.code) != 1)
              return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
            this.getAllList()
            this.$message({
              message: '禁用成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {})
        }).catch(err => {})
      },
      enableState (userId) {
        // 启用用户
        userEnableState({
          id: userId
        }).then(res => {
          if (Number(res.code) != 1)
            return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
          this.getAllList()
          this.$message({
            message: '启用成功',
            type: 'success',
            duration: 2000
          })
        }).catch(err => {})
      },
      resetPwd (userId) {
        this.$confirm('是否确定禁用该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userResetPwd({
            id: userId
          }).then(res => {
            if (Number(res.code) != 1)
              return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
            this.getAllList()
            this.$message({
              message: '用户密码已被重置为123456，请及时提醒用户登录修改密码',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {})
        }).catch(err => {})
      },
      deleteAction (userId) {
        // 用户软删除
        this.$confirm('是否确定删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userDelete({
            id: userId
          }).then(res => {
            if (Number(res.code) != 1)
              return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
            this.getAllList()
            this.$message({
              message: '删除用户成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {})
        }).catch(err => {})
      },
      handleSizeChange (val) {
        this.currentPage = 1
        this.currentPageSize = val
        this.getCustomerPageList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getCustomerPageList()
      },
    },
    watch: {
      provinceWatch: function (newData, oldData) {
        // 省Id监听
        this.getSons(newData, 2)
      },
      cityWatch: function (newData, oldData) {
        // 市Id监听
        this.getSons(newData, 3)
      },
      countyWatch: function (newData, oldData) {
        // 县Id监听
      }
    },
    created() {
      this.getSons(0, 1) // 获取省份列表
      this.getAllList() // 获取客户列表
      this.getCustomerPageList() // 获取表单
    },
  }

</script>
