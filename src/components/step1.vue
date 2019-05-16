<template>
  <div class="index">
    <!-- <Upload 
        style="display:inline-block"
        >
            <el-button type="info" round icon="ios-cloud-upload-outline">批量导入</el-button>
    </Upload>-->

    <el-row style="padding-top:84px">
      <el-col :span="6" :offset="9">
        <p class="title-text">发薪类型</p>
        <el-select clearable v-model="$store.state.stepOne.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <p class="title-text">发薪时间</p>
        <el-date-picker v-model="$store.state.stepOne.value2" type="month" placeholder="选择月"></el-date-picker>
        <p >
          <Upload
            ref='upload'
            style="display:inline-block;width:100%"
            :headers="{
            access_token:uploadToken
            }"
            :multiple="false"
            :show-upload-list="true"
            :on-success="handleSuccess"
            :on-erro="onerror"
            :on-remove="handleRemove"
            :default-file-list='fileList'
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :action="`${$http.defaults.url_base}/pst-salary-api/SalaryBill/multiple`"
          >
            <el-button class="login-btn" style="margin-top:40px" type="info" v-if="showUpLoadBtn" icon="ios-cloud-upload-outline">导入工资表</el-button>
          </Upload>
        </p>
        <p style="text-align:center">上传日常所用的Excel工资表必须包含员工邮箱</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Cookies from "js-cookie";
import { Upload, Button } from "iview";
import { constants } from 'crypto';
const Qs = require('qs');

export default {
  name: "setp1",
  components: {
    Upload,
    Button
  },
  data() {
    return {
      uploadToken: "",
      routes: [],
      top: [],
      isCollapse: false,
      options: [
        {
          value: "1",
          label: "工资"
        },
        {
          value: "2",
          label: "补贴"
        },
        {
          value: "3",
          label: "分红"
        },
        {
          value: "4",
          label: "慰问"
        },
        
      ],
      fileList:[],
      showUpLoadBtn:true
    };
  },
  methods: {
    handleRemove(file, fileList){
        console.log(fileList)
        this.fileList=fileList
        this.$store.commit('getList',fileList)
    },
    handleSuccess(response, file, fileList) {
      if (response.data) {
        this.$message({
          type: "success",
          message: "导入完成"
        });
        this.fileList=fileList
        console.log(file)
        this.$store.commit('getList',response.data)
      } else {
        this.$message({
          type: "info",
          message: "上传失败"
        });
      }
    },
    onerror() {
      this.$message({
        type: "info",
        message: "上传失败"
      });
    }
   
  },
  mounted() {
    // this.uploadToken = Cookies.get("token");
  },
  watch: {
    fileList:function(newfileList, oldfileList){
        this.showUpLoadBtn = newfileList.length>0?false:true
    }
  }
};
</script>

<style lang="less" scoped>
.login-btn {
  width: 100%;
  margin-top: 13px;
  background: rgba(59, 196, 146, 1);
  border-radius: 28px;
  border-color: rgba(59, 196, 146, 1);
  &:hover {
    background: rgba(59, 196, 146, 0.7);
    border-color: rgba(59, 196, 146, 0.7);
  }
}

.index{
  .title-text{
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(131,143,153,1);
    line-height:50px;
    height: 50px;
  }
 
  .el-select{
    width: 100%;
  }
  .el-date-editor{
     width: 100%;
  }
}
</style>
