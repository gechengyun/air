<template>
  <div class="changeProject">
    <el-form ref="projectForm"
      :model="projectForm"
      :rules="rules"
      label-width="130px"
      v-loading="loading">
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称：" prop="name">
            <el-input
              v-model.trim="projectForm.name"
              maxLength="50"
              placeholder="请输入项目全称（不超过50位字符）">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目(合同)编码：">
            <el-input
              v-model.trim="projectForm.code"
              maxLength="20"
              placeholder="请输入项目合同编码（不超过20位字符）">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维保起止日期：" prop="time">
            <el-date-picker
              v-model="projectForm.time"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="请选择起始时间"
              end-placeholder="请选择结束时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="业主单位名称：" prop="unit">
            <el-input
              v-model.trim="projectForm.unit"
              maxLength="20"
              placeholder="请输入业主单位名称（不超过20位字符）">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目负责人：" prop="user">
            <el-input
              v-model.trim="projectForm.user"
              placeholder="请输入负责人名称">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系电话：" prop="mobile">
            <el-input
              v-model.trim="projectForm.mobile"
              placeholder="请输入负责人手机号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="区域：" prop="area">
            <el-col :span="8">
              <el-form-item prop="province">
                <el-select
                  v-model="projectForm.province"
                  placeholder="请选择"
                  :change="getProvince()">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="city">
                <el-select
                  v-model="projectForm.city"
                  placeholder="请选择"
                  :change="getCity()">
                  <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="county">
                <el-select
                  v-model="projectForm.county"
                  placeholder="请选择"
                  :change="getCounty()">
                  <el-option
                    v-for="item in countyList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目简称：">
            <el-input
              v-model.trim="projectForm.abbreviation"
              maxLength="10"
              placeholder="请输入项目简称（不超过10位字符）">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目位置：" prop="map">
            <!-- 百度地图 -->
            <div v-loading="mapLoding" style="height: 400px" id="projectMap"></div>
            <!-- 搜索框地址 -->
            <el-row style="position: absolute; top: 5px; right: 5px; width: 300px;">
              <el-col :span="18">
                <el-input
                  placeholder="请输入地址"
                  v-model.trim="search"
                  prefix-icon="el-icon-location"
                  size="mini"
                >
                </el-input>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-button
                  size="mini"
                  type="primary"
                  @click="searchAddress()"
                >搜索</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目地址：" prop="address">
            <el-input
              placeholder="请在地图中标明地址"
              v-model.trim="projectForm.address"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align:center">
        <el-col :span="24">
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('projectForm')"
              :disabled='disabled'>提交</el-button>
            <el-button type="primary" @click="closeForm()" plain>关闭</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  projectGetById,
  projectAdd,
  projectUpdate,
  areaGetPaths,
  areaGetSons
} from '../../config/api'
export default {
  name: 'changeProject',
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
      projectForm: {
        name: '', // 项目名称
        code: '', // 项目（合同）编码
        time: [], // 起止时间
        unit: '', // 单位
        user: '', //负责人
        mobile: '', // 电话
        abbreviation: '', // 简称
        address: '', // 详细地址
        province: '', // 省份
        city: '', // 市
        county: '', // 县/区
        provinceId: 0, // 省份ID
        cityId: 0, // 市ID
        countyId: 0, // 县/区ID
        latitude: 39.915119, // 纬度
        longitude: 116.403963 // 经度
      },
      search: '', // 搜索地址
      map: null, // 地图对象（后期优化）
      provinceList: [], // 省列表
      cityList: [], // 市列表
      countyList: [], // 县（区）列表
      provinceWatch: 0, // 省Id监听
      cityWatch: 0, // 市Id监听
      countyWatch: 0, // 县Id监听
      loading: true, // loading
      disabled: true, // 按钮置灰
      mapLoding: true, // 地图加载
      page: Number(this.$route.query.page) || 1, // 列表保存
      rules: {
        name: [
          { required: true, message: '请输入项目全称', trigger: 'blur' },
          { min: 1, max: 50, message: '不超过50位字符', trigger: 'blur' }
        ],
        time: [{ required: true, message: '请选择项目时间', trigger: 'change' }],
        unit: [
          { required: true, message: '请输入业主单位名称', trigger: 'blur' },
          { min: 1, max: 20, message: '不超过20位字符', trigger: 'blur' }
        ],
        user: [{ required: true, message: '请输入负责人名称', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { validate: checkMobile, trigger: 'blur' }
        ],
        area: [{ required: true, message: ' ', trigger: 'blur' }],
        province: [{ required: true, message: '请输入省份', trigger: 'change' }],
        city: [{ required: true, message: '请选择城市', trigger: 'change' }],
        county: [{ required: true, message: '请选择县/区', trigger: 'change' }],
        map: [{ required: true, message: ' ', trigger: 'blur' }],
        address: [{ required: true, message: '请在地图中标出地址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // 提交表单
      this.$refs[formName].validate((valid) => {
        if (!this.projectForm.name
          || this.projectForm.time.length == 0
          || !this.projectForm.unit
          || !this.projectForm.user
          || !this.projectForm.mobile
          || !this.projectForm.address
          || !this.projectForm.province
          || !this.projectForm.city
          || !this.projectForm.county)
          return console.log('表单不完整')
        let formData = {
          address: this.projectForm.address || '',
          areaId: this.projectForm.countyId || 0,
          chargeMen: this.projectForm.user || '',
          code: this.projectForm.code || '',
          startTime: this.projectForm.time[0] || '',
          endTime: this.projectForm.time[1] || '',
          id: this.$route.params.id || 1,
          latitude: this.projectForm.latitude || 0,
          longitude: this.projectForm.longitude || 0,
          ownerName: this.projectForm.unit || '',
          phone: this.projectForm.mobile || '',
          projectName: this.projectForm.name || '',
          projectShortName: this.projectForm.abbreviation || ''
        }
        this.loading = true
        this.disabled = true
        console.log(this.$route.params.id, 'this.$route.params.id')
        Number(this.$route.params.id) != 0 ? 
          projectUpdate(formData).then((res) => {
            if (Number(res.code) == 1) {
              // 修改项目信息
              this.$message({
                message: '修改项目成功',
                type: 'success',
                duration: 2000
              })
              setTimeout(() => {
                this.$router.push({path: '/project', query: {page: this.page}})
                this.loading = false
                this.disabled = false
              } ,2000)
            } else {
              this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
              this.loading = false
              this.disabled = false
            }
          }).catch((err) => {
            this.loading = false
            this.disabled = false
          }) 
        : 
          projectAdd(formData).then((res) => {
            if (Number(res.code) == 1) {
              // 新增项目信息
              this.$message({
                message: '新增项目成功',
                type: 'success',
                duration: 2000
              })
              setTimeout(() => {
                this.page = 1
                this.$router.push({path: '/project', query: {page: 1}})
                this.loading = false
                this.disabled = false
              } ,2000)
            } else {
              this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
              this.loading = false
              this.disabled = false
            }
          }).catch((err) => {
            this.loading = false
            this.disabled = false
          })
      })
    },
    closeForm () {
      // 关闭表单
      this.$router.push({path: '/project', query: {page: this.page}})
      return
      // 重置表单
      if (this.$route.params.id) {
        return
        this.getProjectData(this.$route.params.id)
      } else {
        this.$refs['projectForm'].resetFields()
        this.projectForm.code = ''
        this.projectForm.abbreviation = ''
        this.search = ''
        this.cityList = []
        this.countyList = []
      }
    },
    mapview (lng, lat) {
      // 百度地图API功能
      this.map = new BMap.Map("projectMap") // 创建Map实例
      let newPoint = new BMap.Point(Number(lng).toFixed(6), Number(lat).toFixed(6))
      this.map.centerAndZoom(newPoint, 14) // 初始化地图,设置中心点坐标和地图级别
      let marker = new BMap.Marker(newPoint) // 创建标注
			this.map.addOverlay(marker) // 将标注添加到地图中
			this.map.panTo(newPoint)
      this.map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
      var top_left_navigation = new BMap.NavigationControl() //左上角，添加默认缩放平移控件
      //添加地图类型控件
      this.map.addControl(top_left_navigation)
      // 地址反解析
      var geocoder= new BMap.Geocoder()
      this.map.addEventListener("click", (e) => { //给地图添加点击事件
        geocoder.getLocation(e.point, (rs) => {
          this.projectForm.address = rs.address // 获取详细地址
          this.projectForm.latitude = rs.point.lat // 获取纬度
          this.projectForm.longitude = rs.point.lng // 获取经度
        })
      })
      this.mapLoding = false
    },
    searchAddress () {
      this.mapLoding = true
      // 搜索地址
      let local = null
      local = new BMap.LocalSearch(this.map, { //智能搜索
        onSearchComplete: res => this.searchFun(res)
      })
      local.search(this.search)
    },
    searchFun (getResults) {
      let marker, point = null
      //如果搜索的有结果
      if(getResults != undefined) {
        this.map.clearOverlays() //清除地图上所有覆盖物
        if(getResults.getPoi(0)) {
            point =getResults.getPoi(0).point //获取第一个智能搜索的结果
            this.map.centerAndZoom(point, 18)
            marker = new BMap.Marker(point) // 创建标注
            this.map.addOverlay(marker) // 将标注添加到地图中
            marker.enableDragging() // 可拖拽
            console.log(`当前定位经度: ${point.lng}纬度: ${point.lat}`)
        } else {
          this.$message({
            message: '未匹配到地点，可拖动地图上的红色图标到精确位置',
            type: 'error',
            duration: 2000
          })
        }
      } else {
        this.$message({
          message: '未找到搜索结果',
          type: 'error',
          duration: 2000
        })
      }
      this.mapLoding = false
    },
    getSons (id, type, flag) {
      // 获取地域列表
      areaGetSons({id: Number(id)}).then((res) => {
        if (Number(res.code) != 1)
          return this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
        switch (type) {
          case 1:
            this.provinceList = res.data
            if (flag) {
              this.projectForm.province = res.data[0].name
              this.projectForm.provinceId = res.data[0].id
            }
            break
          case 2:
            if (res.data[0].id != 0) {
              this.cityList = res.data
              if (flag) {
                this.projectForm.city = res.data[0].name
                this.projectForm.cityId = res.data[0].id
              }
            }
            break
          case 3:
            if (res.data[0].id != 0) {
              this.countyList = res.data
              if (flag) {
                this.projectForm.county = res.data[0].name
                this.projectForm.countyId = res.data[0].id
              }
            }
            break
          default:
            this.provinceList = res.data
            if (flag) {
              this.projectForm.province = res.data[0].name
              this.projectForm.provinceId = res.data[0].id
            }
            break
        }
      }).catch((err) => {
      })
    },
    getProjectData (id) {
      // 获取已有项目数据
      this.loading = true
      this.disabled = true
      projectGetById({id: Number(id)}).then((res) => {
        if (Number(res.code) == 1) {
          // 编辑项目，提前获取项目信息
          let areaData = res.data.areaPath.split(',') || {}
          Object.assign(this.projectForm, {
            name: res.data.projectName || '', // 项目名称
            code: res.data.code || '', // 项目（合同）编码
            time: [res.data.startTime, res.data.endTime] || [], // 起止时间
            unit: res.data.ownerName || '', // 单位
            user: res.data.chargeMen || '', //负责人
            mobile: res.data.phone || '', // 电话
            abbreviation: res.data.projectShortName || '', // 简称
            address: res.data.address || '', // 详细地址
            provinceId: areaData[1] || 0, // 省份
            cityId: areaData[2] || 0, // 市
            countyId: areaData[3] || 0, // 县城(区)
            latitude: res.data.latitude || 0, // 纬度
            longitude: res.data.longitude || 0 // 经度
          })
          this.mapview(res.data.longitude, res.data.latitude)
          areaGetPaths({id: Number(areaData[3]) || 0}).then((resp) => {
            if (Number(resp.code) != 1) {
              this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
            } else {
              Object.assign(this.projectForm, {
                province: resp.data[0].name,
                city: resp.data[1].name,
                county: resp.data[2].name
              })
            }
            this.loading = false
            this.disabled = false
          }).catch((error) => {
            this.loading = false
            this.disabled = false
          })
          this.getSons(areaData[1], 2) // 获取市列表
          this.getSons(areaData[2], 3) // 获取县/区列表
        } else {
          this.$alert(res.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {})
        }
        this.loading = false
        this.disabled = false
      }).catch((err) => {
        this.loading = false
        this.disabled = false
      })
    },
    getProvince () {
      // 获取省Id
      let select = this.provinceList.filter((item, index) => {
        if (this.projectForm.province == item.name)
          return item
      })[0] || {}
      this.provinceWatch = select.id || 0
    },
    getCity () {
      // 获取市Id
      let select = this.cityList.filter((item, index) => {
        if (this.projectForm.city == item.name)
          return item
      })[0] || {}
      this.cityWatch = select.id || 0
    },
    getCounty () {
      // 获取县Id
      let select = this.countyList.filter((item, index) => {
        if (this.projectForm.county == item.name)
          return item
      })[0] || {}
      this.countyWatch = select.id || 0
    }
  },
  watch: {
    provinceWatch: function (newData, oldData) {
      // 省Id监听
      this.getSons(newData, 2, true)
    },
    cityWatch: function (newData, oldData) {
      // 市Id监听
      this.getSons(newData, 3, true)
    },
    countyWatch: function (newData, oldData) {
      // 县Id监听
    }
  },
  created () {
    if (this.$route.params.id) {
      this.getProjectData(this.$route.params.id)
    } else {
      this.loading = false
      this.disabled = false
    }
  },
  mounted () {
    this.getSons(0, 1) // 获取省列表
    !this.$route.params.id ?
      this.mapview(this.projectForm.longitude, this.projectForm.latitude)
    : this.mapview(116.403963, 39.915119) // 百度地图加载 默认北京  
  }
}
</script>

<style scoped>

</style>

