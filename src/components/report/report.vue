<template>
  <div class='report'>
    <!-- <el-row>
     <el-col :span="24"><div class="grid-content bg-purple-dark" style="border:1px solid red" id='a'><el-button type="primary" @click="layerview()">报表管理</el-button></div></el-col>
    </el-row> -->
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="时间">
            <el-date-picker v-model="formInline.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select v-model="formInline.airStationId" placeholder="站点">
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目">
            <el-select v-model="formInline.projectId" placeholder="项目">
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点">
            <el-select v-model="formInline.airStationId" placeholder="站点">
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getDataList()">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" width="80" fixed>
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="报表名称" />
          <el-table-column prop="type" label="报表类型" width="180" />
          <el-table-column prop="time" label="报表生成时间" width="180" />
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="downLink(scope.row.link)">编辑字典值</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-if="total > currentPageSize">
      <el-col :span="24">
        <el-pagination
            background
            style="text-align:center"
            class="mt20"
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
  export default {
    data() {
      return {
        formInline: {
          projectId: '',
          airStationId: '',
          observationType: '',
          name: '',
          time: '',
        },
        currentPage: 1,
        currentPageSize: 10,
        total: 100,
        tableData: [{
            id: 1,
            name: '港汇广场项目-1#中央空调测试报告20171106',
            type: '测试报告',
            time: '2018-09-21 08:50',
            link: ''
          },
          {
            id: 2,
            name: '港汇广场项目-1#中央空调测试报告20171106',
            type: '测试报告',
            time: '2018-09-21 08:50',
            link: ''
          },
          {
            id: 3,
            name: '港汇广场项目-1#中央空调测试报告20171106',
            type: '测试报告',
            time: '2018-09-21 08:50',
            link: ''
          },
          {
            id: 4,
            name: '港汇广场项目-1#中央空调测试报告20171106',
            type: '测试报告',
            time: '2018-09-21 08:50',
            link: ''
          },
          {
            id: 5,
            name: '港汇广场项目-1#中央空调测试报告20171106',
            type: '测试报告',
            time: '2018-09-21 08:50',
            link: ''
          },
          {
            id: 6,
            name: '港汇广场项目-1#中央空调测试报告20171106',
            type: '测试报告',
            time: '2018-09-21 08:50',
            link: ''
          },
          {
            id: 7,
            name: '港汇广场项目-1#中央空调测试报告20171106',
            type: '测试报告',
            time: '2018-09-21 08:50',
            link: ''
          },
          {
            id: 8,
            name: '港汇广场项目-1#中央空调测试报告20171106',
            type: '测试报告',
            time: '2018-09-21 08:50',
            link: ''
          },
          {
            id: 9,
            name: '港汇广场项目-1#中央空调测试报告20171106',
            type: '测试报告',
            time: '2018-09-21 08:50',
            link: ''
          },
          {
            id: 10,
            name: '港汇广场项目-1#中央空调测试报告20171106',
            type: '测试报告',
            time: '2018-09-21 08:50',
            link: ''
          },
        ]
      }
    },
    methods: {
        layerview() {
            layer.alert('内容')
        },
        getDataList() {
            // 获取列表

        },
        downLink() {
            // 下载表单
        },
        handleSizeChange (val) {
            this.currentPage = 1
            this.currentPageSize = val
            this.getDataList()
        },
        handleCurrentChange (val) {
            this.currentPage = val
            this.getDataList()
        }
    }
  }

</script>
