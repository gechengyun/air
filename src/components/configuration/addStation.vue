<template>
  <div class="addStation">
      <el-form label-position="left" :model="dynamicValidateForm" :rules="rules" ref="dynamicValidateForm" label-width="100px" class="demo-ruleForm demo-form-inline" v-loading="loading">
       <h1>基础信息</h1>
       <hr>
      <el-row>
          <el-col :span="12">
          <el-form-item label="空调站点名称" prop="name" label-width="110px">
              <el-input v-model="dynamicValidateForm.name" placeholder="请输入中央空调名称（不超过20位字符）"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属项目" prop="projectId" class="ml10" label-width="80px">
              <el-select v-model="dynamicValidateForm.projectId" placeholder="请选择归属项目">
                 <el-option
                  v-for="item in project"
                  :key="item.id"
                  :label="item.projectName"
                  :value="item.id"
                  ></el-option>
              </el-select>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        
        <el-col :span="24">
          <el-form-item label="安装位置" prop="location">
            <el-input v-model="dynamicValidateForm.location" placeholder="请输入安装位置（不超过20位字符）"></el-input>
          </el-form-item>
        </el-col>
      </el-row>  
       <h1>物联网采集网关及关联控制器信息</h1>
       <hr> 
       <el-row class="mb10">
          <el-col :span="6"><label class="require">*</label>采集设备名称</el-col>
          <el-col :span="3"><label class="require">*</label>采集网关设备ID</el-col>
          <el-col :span="6"><label class="require">*</label>关联控制器名称</el-col>
          <el-col :span="8">安装位置</el-col>
       </el-row>
       
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.gatewayList"
          :key="domain.key"
          label-width="0px"
        >  
              
           <el-col :span="6">
              <el-form-item
                class="mr10 mb5"
                label-width="0px"
                :prop="'gatewayList.' + index + '.deviceName'"               
                :rules="[
                {required: true, message: '请输入采集设备名称', trigger: 'blur'},
                { max: 15, message: '长度不能超过15个字符', trigger: 'blur' },
                ]">
                <el-input v-model="domain.deviceName" placeholder="(不超过15个字符)"></el-input>
              </el-form-item>
           </el-col>
           <el-col :span="3">
              <el-form-item
                class="mr10 mb5"
                label-width="0px"
                :prop="'gatewayList.' + index + '.deviceId'"               
                :rules="[
                {required: true, message: '请输入采集网关设备ID', trigger: 'blur'},
                { max: 3, message: '长度不能超过3个字符', trigger: 'blur' },
                ]">
                <el-input v-model="domain.deviceId" placeholder="(不超过3个字符)"></el-input>
              </el-form-item>
           </el-col>
           <el-col :span="6">
              <el-form-item
                class="mr10 mb5"
                label-width="0px"
                :prop="'gatewayList.' + index + '.controllerName'"               
                :rules="[
                {required: true, message: '请输入关联控制器名称', trigger: 'blur'},
                { max: 15, message: '长度不能超过15个字符', trigger: 'blur' },
                ]">
                <el-input v-model="domain.controllerName" placeholder="(不超过15个字符)"></el-input>
              </el-form-item>
           </el-col>
           <el-col :span="8">
              <el-form-item
                class="mr10 mb5"
                label-width="0px"
                :prop="'gatewayList.' + index + '.location'"               
                :rules="[
               { max: 20, message: '长度不能超过20个字符', trigger: 'blur' },
                ]">
                <el-input v-model="domain.location" placeholder="(不超过20个字符)"></el-input>
              </el-form-item>
           </el-col>
           <el-col :span="1">
              <el-form-item label-width="0px">
                  <el-button type="primary" size="small" @click="addDomain" class="mt5" v-show="domain.add_btn">新增</el-button>
                  <el-button type="danger" @click.prevent="removeDomain(domain)" v-show="domain.del_btn"  size="small" class="mt5 ml0">删除</el-button>
              </el-form-item>          
           </el-col>   
        </el-form-item>    
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">保存</el-button>
        <el-button  @click="$router.push({path:'/station',query:{page:$route.query.page}})">关闭</el-button>
      </el-form-item>
</el-form>


</div>
</template>

<script>
import {
  getListByUser,
  getUserProjects,
  stationAdd,
  getstation,
  stationUpdate
} from '../../config/api'
export default {
  name: 'addStation',
  data () {
    return {
          project:[],
          dynamicValidateForm: {
            projectId:'',
            location:'',
            name: '', 
            gatewayList: [{
              deviceName: '',
              deviceId:'',
              controllerName:'',
              location:'',
              add_btn:true,
              del_btn:false
            }],
         },
         loading:true,
        rules: {
          name: [
            { required: true, message: '请输入空调站点名称', trigger: 'blur' },
             { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
          ],       
          projectId:[
           { required: true, message: '请选择归属项目', trigger: 'change' }
          ],
          location:[
           { required: true, message: '请输入安装位置', trigger: 'blur' },
            { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
          ],
          value:[
              { required: true, message: '请输入123', trigger: 'blur' },
          ]
         
        },
      };
  },
   created () {
     this.getSelectValue();
     if(this.$route.params.id!=0){
      this.views()
      }else{
      this.loading=false;
      }
  },
  methods: {
        getSelectValue(){
          getUserProjects().then((resp)=>{
          this.project=resp.data
          })
        },
        views(){
         getstation({
           id:this.$route.params.id
         }).then((resp)=>{     
           console.log(resp.data.gatewayList)
          resp.data.gatewayList[0].add_btn=true 
          if(resp.data.gatewayList.length>1){
            for(let i=1;i<resp.data.gatewayList.length;i++){
               resp.data.gatewayList[i].del_btn=true
            }             
          }
          this.dynamicValidateForm={
          projectId:resp.data.projectId,
          location:resp.data.location,
          name: resp.data.name,
          gatewayList:resp.data.gatewayList
          };
          this.$nextTick().then(() => {
            setTimeout(() => {
              this.loading=false;
            }, 100);
          })
          })    
      },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.loading=true
            if(this.$route.params.id==0){     
                stationAdd(this.dynamicValidateForm).then((resp)=>{
                  setTimeout(()=>{
                      this.loading=false
                   },500) 
                if(resp.code==1){
                    this.$message({
                       message: '新增成功',
                       type: 'success',
                       duration:500
                        });
                       setTimeout(()=>{
                         this.$router.push({path:'/station'}) 
                   },500) 
                }else{
                    this.$alert(resp.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {});
                }
              })
            }else{
                Object.assign(this.dynamicValidateForm,{id:parseInt(this.$route.params.id)})
                stationUpdate(this.dynamicValidateForm).then((resp)=>{
                  setTimeout(()=>{
                      this.loading=false
                   },500) 
                if(resp.code==1){
                    this.$message({
                       message: '修改成功',
                       type: 'success',
                       duration:500
                        });
                       setTimeout(()=>{
                         this.$router.push({path:'/station'}) 
                   },500) 
                }else{
                    this.$alert(resp.msg, '提示', {type: 'error'}).then(() => {}).catch(() => {});
                }
            })

            }      
          } else {
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.gatewayList.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.gatewayList.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.gatewayList.push({
          deviceName:'',
          deviceId:'',
          controllerName:'',
          location:'',
          key: Date.now(),
          add_btn:false,
          del_btn:true
        });
      }
  },
 
}
</script>

<style scoped>
     .el-select{
         width:100%
     }
     hr{
      height:1px;border:none;border-top:1px solid #D9D9D9;
     }
      .mb5{
        margin-bottom: 5px
      }
       .mb10{
        margin-bottom: 10px
      }
     .mr10{
       margin-right: 10px
     }
     .require{
       color: #f56c6c;
       margin-right: 4px
     }
    
</style>

