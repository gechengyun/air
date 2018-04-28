<template>
  <div class='operation'>
    <el-form
      ref="formInline"
      :inline="true"
      :model="formInline"
      class="demo-form-inline">
      <el-form-item label="区域">
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
      <el-form-item label="项目：">
        <el-select v-model="formInline.projectId" placeholder="请选择">
          <el-option
            v-for="item in projectList"
            :key="item.id"
            :label="item.projectName"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="disabled"
          @click="onSubmit()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="disabled"
          @click="onReset()"
          plain>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%">
      <el-table-column
        prop="airStationName"
        label="站点名称" />
      <el-table-column
        prop="projectName"
        label="所属项目" />
      <el-table-column
        prop="areaPathName"
        label="所属区域" />
      <el-table-column
        prop="state"
        label="运行状态">
        <template slot-scope="scope">
          <el-tag
            :type="stateValue(scope.row.state).type"
            close-transition>{{stateValue(scope.row.state).value}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push({
              path: '/operation/distance/' + scope.row.airStationId,
              query: {page: currentPage}})"
            type="text"
            size="small">运行监控</el-button>
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
  </div>
</template>
<script>
  import {
    areaGetSons,
    getUserProjects,
    dataGetMonitorPageList
  } from '../../config/api'
  export default {
    data() {
      return {
        formInline: {
          projectId: '', // 项目Id
          cityId: 0, // 城市Id
          countyId: 0, // 县区Id
          provinceId: 0, // 省Id
        },
        loading: true, // loading
        disabled: false, // 防止二次点击
        tableData: [], // 列表数据
        currentPage: Number(this.$route.query.page) || 1, // 页码
        currentPageSize: 10, // 每页数目
        total: 0, // 总项目数,
        projectList: [], // 项目列表
        provinceList: [{id: 0, name: '全部'}], // 省列表
        cityList: [{id: 0, name: '全部'}], // 城市列表
        countyList: [{id: 0, name: '全部'}], // 县、区列表
        provinceWatch: 0, // 省Id监听
        cityWatch: 0, // 市Id监听
        countyWatch: 0, // 县Id监听
      }
    },
    methods: {
      onSubmit () {
        // 查询
        this.getMonitorPageList()
      },
      onReset () {
        // 重置
        Object.assign(this.formInline, {
          projectId: '',
          cityId: 0,
          countyId: 0,
          provinceId: 0
        })
        this.getMonitorPageList()
      },
      getMonitorPageList () {
        // 获取站点信息列表
        this.disabled = true
        dataGetMonitorPageList(Object.assign(this.formInline, {
          pageSize: this.currentPageSize,
          pageIndex: this.currentPage
        })).then(res => {
          this.tableData = res.list
          this.total = res.data.total
          this.currentPage = res.data.pageNum
          this.currentPageSize = res.data.pageSize
          this.loading = false
          this.disabled = false
        }).catch(err => {
          this.loading = false
          this.disabled = false
        })
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
      userProjects () {
        // 获取用户关联项目列表
        getUserProjects({})
          .then(res =>{
            if (Number(res.code) != 1)
              return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
            this.projectList = res.data || []
          })
          .catch(err => {})
      },
      stateValue (state) {
        // 过滤状态
        switch (state) {
          case 0:
            return {value: '正常', type: 'success'}
          case 1:
            return {value: '报警', type: 'danger'}
          case 2:
            return {value: '断线', type: 'warning'}
          default:
            return {value: '正常', type: 'success'}
        }
      },
      handleSizeChange (val) {
        this.currentPage = 1
        this.currentPageSize = val
        this.getMonitorPageList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getMonitorPageList()
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
    created () {
      this.getSons(0, 1) // 获取省份列表
      this.userProjects() // 获取用户关联列表
      this.getMonitorPageList() // 获取表单列表
    }
  }

</script>
<style scoped>
  .el-select {
    width: 140px
  }
</style>
