<template>
  <div class='user'>
    <el-row>
      <el-col :span="4">
        <el-tree
          ref="tree"
          node-key="id"
          v-loading="treeLoading"
          :data="treeData"
          :default-expand-all="true"
          :highlight-current="true"
          :expand-on-click-node="false"
          :props="defaultProps"
          @node-click="handleNodeClick" />
      </el-col>
      <el-col :span="20" style="padding-left:20px">
        <el-form
          :inline="true"
          :model="formInline"
          ref="formInline"
          class="demo-form-inline">
          <el-form-item label="用户姓名">
            <el-input
              v-model.trim="formInline.name"
              placeholder="请输入用户名称" />
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="formInline.time"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="请选择起始时间"
              end-placeholder="请选择结束时间" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getPageList()"
              :disabled="disabled">查询</el-button>
            <el-button
              type="primary"
              :disabled="disabled"
              @click="resetForm('formInline')"
              plain>重置</el-button>
            <el-button
              @click="$router.push({path: '/user/addUser/0', query: {page: currentPage}})"
              type="primary">新增用户</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="list"
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            prop="phone"
            label="用户账号" />
          <el-table-column
            prop="realname"
            label="用户姓名" />
          <el-table-column
            prop="phone"
            label="用户电话" />
          <el-table-column
            prop="duty"
            label="角色" />
          <el-table-column
            prop="ctime"
            label="注册时间" />
          <el-table-column
            prop="state"
            label="用户状态">
            <template slot-scope="scope">
              <el-tag :type="scope.row.state == 1 ? 'success' : 'danger'" close-transition>
                {{scope.row.state == 1 ? '启用' : '禁用'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="300"
            fixed="right">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="text"
                @click="$router.push({
                  path: '/user/addUser/' + scope.row.id,
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    userGetPageList,
    userDisableState,
    userEnableState,
    userResetPwd,
    userDelete,
    userGetListBy
  } from '../../config/api'
  export default {
    data() {
      return {
        formInline: {
          name: '', // 用户名
          time: [] // 注册时间
        },
        treeData: [{
          id: 1,
          realname: 'damin',
          pid: 0,
          children: []
        }], // 树状数据
        defaultProps: {
          children: 'children',
          label: 'realname'
        },
        list: [], // 列表
        treeLoading: true, // tree列表loading
        loading: true, // loading
        disabled: false, // 防止二次点击
        currentPage: Number(this.$route.query.page) || 1, // 页码
        currentPageSize: 10, // 每页数目
        total: 0, // 总项目数
        pid: 1, // 父Id
      }
    },
    methods: {
      resetForm (formName) {
        // 重置搜索条件
        this.$refs[formName].resetFields()
        Object.assign(this.formInline, {
          name: '',
          time: []
        })
        this.getPageList()
      },
      getPageList () {
        // 获取用户列表
        userGetPageList({
          pageIndex: this.currentPage,
          pageSize: this.currentPageSize,
          pid: this.pid,
          registerEndTime: this.formInline.time[1] || '',
          registerStartTime: this.formInline.time[0] || '',
          userName: this.formInline.name || ''
        }).then(res => {
          if (Number(res.code != 1)) {
            this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
          } else {
            this.list = res.data.list
            this.total = res.data.total
            this.currentPage = res.data.pageNum
            this.currentPageSize = res.data.pageSize
          }
          this.disabled = false
          this.loading = false
        }).catch(err =>{
          this.disabled = false
          this.loading = false
        })
      },
      handleSizeChange (val) {
      this.currentPage = 1
      this.currentPageSize = val
      this.getPageList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getPageList()
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
            this.$message({
              message: '禁用成功',
              type: 'success',
              duration: 2000
            })
            this.getPageList()
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
          this.$message({
            message: '启用成功',
            type: 'success',
            duration: 2000
          })
          this.getPageList()
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
            this.getPageList()
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
            this.getPageList()
            this.$message({
              message: '删除用户成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {})
        }).catch(err => {})
      },
      getListBy (id, pid, level) {
        // 获取树状列表
        userGetListBy({
          id: id
        }).then(res => {
          if (Number(res.code) != 1) {
            this.pid = pid || id // 报错则取父Id，顶层则为自己
            this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
          } else {
            this.addChild(id, this.treeData, res.data)
          }
          this.getPageList()
          this.treeLoading = false
        }).catch(err => {
          this.treeLoading = false
        })
      },
      addChild (id, list, data) {
        list.forEach(item => {
          // 添加到tree
          if (item.id === id) {
            return Object.assign(item, {children: data})
          } else {
            return item.children&&this.addChild(id, item.children)
          }
        })
      },
      handleNodeClick(data, nodeE) {
        // 树状图操作
        console.log(nodeE)
        this.pid = data.id
        this.getListBy(data.id, nodeE.level)
      }
    },
    created () {
      this.getListBy(this.pid, 0, 1) // 获取最外层树状列表
    }
  }

</script>
