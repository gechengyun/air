<template>
  <div class="distance">
    <el-row>
      <el-col :span="12"><h3>{{this.airStationName}}</h3></el-col>
      <el-col :span="4" style="line-height: 65px;">当前状态：{{stateValue(this.state).value}}</el-col>
      <el-col :span="8">
        <div class="title_box">
          <ul>
            <li><i></i>正常</li>
            <li><i></i>报警</li>
            <li><i></i>断线</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row v-loading="loading">
      <el-col :span="16">
        <div class="pic_box">
          <img class="pic_bg" :src="path" />
          <ul>
            <li
              v-for="item in displayPointList"
              :style="{
                top: item.yposition + '%',
                left: item.xposition + '%'
              }"
              @click="changeObservationInfo(item.equipmentId)"
              :key="item.id">
              <img :src="item.path" />
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="list_box">
          <ul>
            <li
              v-for="item in observationInfo"
              :key="item.id">{{item.value}}</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  dataGetAirStationInfo,
  getFlowChart,
  dataGetObservationInfo
} from '../../config/api'
export default {
  name: 'distance',
  data () {
    return {
      timer: null, // 定时器
      observationTimer: null, // 获取表单定时器
      loading: true, // loading
      airStationName: '', // 站点名称
      airStationId: this.$route.params.id || 0, // 站点Id
      state: 0, // 站点状态
      path: '', // 图片路径
      displayPointList: [], // 测点列表
      observationInfo: [], // 设备信息展示列表
    }
  },
  methods: {
    getAirStationInfo () {
      // 获取站点信息
      dataGetAirStationInfo({
        id: this.airStationId
      }).then(res => {
        if (res.status != 'ok')
          return this.$alert(res.message, '提示', {type: 'error'}).then(() => {}).catch(() => {})
        this.airStationName = res.airStationName
        this.state = res.state
      }).catch(err => {})
    },
    getList () {
      // 获取测点列表
      getFlowChart({
        id: this.airStationId
      }).then(res => {
        if (Number(res.code != 1)) {
          this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
        } else {
          this.path = res.msg + res.data.path
          res.data.displayPointList.forEach(item => {
            item.path = res.msg + item.path
          })
          this.displayPointList = res.data.displayPointList
          if (res.data.displayPointList.length > 0)
            this.getObservationInfo(res.data.displayPointList[0].equipmentId)
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
    showObservationInfo (id) {
      clearInterval(this.observationTimer)
      this.observationTimer = null
      // 每30秒调取测点列表数据
      this.observationTimer = setInterval(() => {
        this.getObservationInfo(id) // 获取站点信息
      }, 30000)
    },
    changeObservationInfo (id) {
      clearInterval(this.observationTimer)
      this.observationTimer = null
      // 切换设备
      this.getObservationInfo(id)
    },
    getObservationInfo (id) {
      this.observationInfo = []
      // 获取设备信息
      dataGetObservationInfo({id})
        .then(res => {
          if (res.status != 'ok')
            return this.$alert(res.message, '提示', {type: 'error'}).then(() => {}).catch(() => {})
          if (res.datas.length > 0) {
            res.data[0].values.map((item, index) => {
              res.data.map((elem, num) => {
                this.observationInfo.push({
                  id: elem.values[index].timestamp + num,
                  value: elem.observationName + elem.unitName + elem.values[index].value
                })
              })
            })
          }
          if (!this.observationTimer) {
            this.showObservationInfo(id)
          }
        }).catch(err => {})
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
  },
  created () {
    // 每隔30秒掉一次接口
    this.getAirStationInfo()
    this.timer = setInterval(() => {
      this.getAirStationInfo() // 获取站点信息
    }, 30000)
    this.getList() // 获取工艺图及测点
  },
  beforeDestroy() {
    // 销毁组件清除定时器
    clearInterval(this.timer)
    clearInterval(this.observationTimer)
    this.timer = null
    this.observationTimer = null
  }
}
</script>

<style scoped>
ul, li{
  border: 0 none;
  list-style: none;
  margin: 0;
  padding: 0;
}
.title_box {
  width: 300px;
  height: 32px;
  display: inline-block;
  background: #666666;
  border-radius: 3px;
  margin-top: 18px;
  float: right;
}
.title_box li {
  display: inline-block;
  width: 30%;
  line-height: 30px;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
}
.title_box ul {
  width: 100%;
  height: 100%;
}
.title_box li i {
  display: inline-block;
  width: 30px;
  height: 15px;
  border-radius: 3px;
  background: #F56C6C;
  margin-right: 10px;
  vertical-align: middle;
}
.title_box li:first-child i {
  background: #67C23A;
}
.title_box li:last-child i {
  background: #E6A23C;
}

.pic_box {
  width: 100%;
  height: 700px;
  position: relative;
}
.pic_bg {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.pic_box ul {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%
}
.pic_box li {
  position: absolute;
}
.list_box {
  width: 80%;
  height: 650px;
  padding: 25px 5%;
  margin-left: 10%;
  border: 1px solid #666666;
  line-height: 30px;
  overflow-y: auto;
}
</style>

