<template>
  <div class="stationPic">
    <el-form :inline="true" class="demo-form-inline"  v-loading="loading">
      <el-form-item>
         <el-upload
          class="upload-demo"
          :action="uploadLink + 'customer/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
           >
          <el-button type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="query()">保存</el-button>
      </el-form-item>
       <el-form-item>
          <el-button @click="$router.push({path:'/station',query:{page:$route.query.page}})">关闭</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="16">
           <div class="container">
             <div class="div" v-show="this.licensePic==''?true:false">
               <img  src="/static/img/upload_bg.png">
             </div>

              <img  :src="licensePic" style="width:100%;height:100%;position:absolute"  v-show="this.licensePic==''?false:true">
              <img  @contextmenu.prevent='delete1(item.equipmentId,item.equipmentName)'   v-for="item in DisplayPointParam.displayPointList" :id="item.equipmentId" class="draggable icon" :path="item.path" :src="msg+item.path" :style="{position:position,top:item.yposition+'%',left:item.xposition+'%'}">
              <!-- <img src="/static/img/icon.png" style="position:absolute;top:0%;left:50%"class="draggable">
             -->
	     	  </div>
      </el-col>
      <el-col :span="8">
         <el-table
          :data="tableData"
          style="width: 100%"
          border>
          <el-table-column
            prop="equipmentName"
            label="设备名称"
            />
          <el-table-column
            label="图标"
           >
           <template slot-scope="scope">
            <img :src="msg+scope.row.path">
           </template>
          </el-table-column>
            <el-table-column
            prop="remark"
            label="操作"
           >
           <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              :disabled="licensePic==''?true:false"
              @click="add_icon(msg+scope.row.path,scope.row.equipmentId,scope.row.path)"
              >
              放置图标
            </el-button>
           </template>
      </el-table-column>
        </el-table>
      </el-col>
    </el-row>
     <div id="layer" v-show="false"><br>
     <el-button type="danger" size="mini" style="margin-left:10px" @click="remove(equipmentId)">移除</el-button>
     <br><br>
     </div>
  </div>

  
</template>

<script>
 import {getEquimentIcons,saveFlowChart,getFlowChart} from '../../config/api'
import config from '../../config'
import {isLegalImg} from '../../config/common'
export default {
  name: 'stationPic',
  data () {
    return {
      position:'absolute',
      top:'',
      left:'',
      loading:true,
      tableData: [],
      fileList: [],
      uploadLink: config.baseUrl,
      licensePic:'',
      equipmentId:'',
      msg:'',
      flag:[],
      DisplayPointParam:{
         displayPointList:[]
      }
     
    }
  },
  created(){
    this.getEquimentIcons(),
    this.getFlowChart()
  },
  methods: {
    //获取单个工艺图
    getFlowChart(){
          getFlowChart({
           id:this.$route.params.id
         }).then((resp)=>{     
          if(resp.data!=null){
             this.licensePic=resp.msg+resp.data.path;
             this.DisplayPointParam.displayPointList=resp.data.displayPointList;
             this.msg=resp.msg ;
              for (let item of resp.data.displayPointList){
               this.flag.push(item.equipmentId)
              }          
          }
         
          this.$nextTick().then(() => {
            this.options(),
            setTimeout(() => {
              this.loading=false;
            }, 100);
          })
           
          })
    },
    //放置图标
    add_icon(url,id,path){
      //每个设备只能放置一个icon
      if((this.flag).includes(id)==false){
          this.DisplayPointParam.displayPointList.push({
          path:path,
          equipmentId:id,
          xposition:0,
          yposition:0,
        })
         this.flag.push(id); 
      }
        this.$nextTick().then(() => {
          this.options()
          })
    },
    delete1(id,name){
      this.equipmentId=id;
      let offset = $("#"+id).offset();
						let layerIndex = layer.open({
					    	type:1,
					    	title: name,
					    	content: $('#layer'),
				    		shadeClose :true,
				    		closeBtn: 1,
				    		offset: [offset.top+16, offset.left+16],
					    });
    },
    remove(id){
        let index=(this.flag).indexOf(id)
        this.DisplayPointParam.displayPointList.splice(index,1);
        this.flag.splice(index,1);
        layer.closeAll();
    },
    options(){
      $('.draggable').draggabilly({ containment: ".container" });
    },
    //列表
     getEquimentIcons(){
         getEquimentIcons({
             id:this.$route.params.id
         }).then((resp)=>{
            this.tableData=resp.data;
            this.msg=resp.msg
       })
     },  
    handleAvatarSuccess (res, file) {
      // 上传成功
      this.picDisabled = false
      this.$message.success('上传成功！')
      this.licensePic=res.msg+res.data;
    },
    beforeAvatarUpload (file) {      
      if(this.licensePic!==''){         
          return this.$confirm('已有工艺图，再次上传将替换原现在的工艺图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            isLegalImg(this, file, () => {
           this.$message.warning('上传中...')
           this.picDisabled = true
      })
        });
      }else{
          return isLegalImg(this, file, () => {
           this.$message.warning('上传中...')
           this.picDisabled = true
      });
      }
            
    },
    query(){
      if(this.licensePic==''){
         this.$alert('请上传工艺图片', '提示', {type: 'error'}).then(() => {}).catch(() => {});
         return false
      }
      //this.DisplayPointParam.displayPointList=[];
     // 首先获取所有的拖拽元素
      let draggableElems = document.querySelectorAll('.draggable');
      // 设置一个数组用来存放初始化后的所有拖拽元素
      let img_width=$(".container").width();
      let img_height=$(".container").height();
      // 初始化
      let draggies =[];
      for ( let i=0, len = draggableElems.length; i < len; i++ ) {
        let draggableElem = draggableElems[i];
        let draggie = new Draggabilly( draggableElem, {
            containment: ".container"
        });
        
        let x=parseFloat( draggie.position.x)<0?0:parseFloat(draggie.position.x);
        let y=parseFloat( draggie.position.y)<0?0:parseFloat(draggie.position.y);
        draggies.push({
          path:draggie.element.attributes.path.value,
          equipmentId:draggie.element.id,
          xposition:((x/img_width).toFixed(2))*100,
          yposition:((y/img_height).toFixed(2))*100,
          });              
      }  
          this.loading=true
          saveFlowChart({
            displayPointList:draggies,
            airStationId:parseInt(this.$route.params.id),
            path:this.licensePic,
            picType:1

          }).then((resp)=>{
              setTimeout(()=>{
                      this.loading=false
                   },100) 
                if(resp.code==1){
                    this.$message({
                       message: '保存成功',
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
    
  }
}

</script>

<style scoped>
   .container{
     width:100%;height:700px;position:relative;
     background: #ffffff;
   }
   .model{
     position:absolute; width: 100%;
    height: 100%;
   }
   .container{
     background:#ffffff;    
     margin: 0 auto;
    
   }
   .div{
     width:40%;
     height: 200px;
     position: absolute;
     top:250px;
     left:30%;
   }
   .div img{
     width:100%;
     height: 100%;
   }
   .btn-danger{
     margin-left:10px;
    color: #fff!important;
    background-color: #d2322d!important;
    border-color: #bd2d29!important;
    box-shadow: 0 2px 1px rgba(0, 0, 0, .1)!important;
   }
</style>

