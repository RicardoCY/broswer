<template>
  <div class="step-container">
    <div class="box-shadow">
      <div>
        <el-steps :active="active" finish-status="success">
          <el-step title="上传工资表"></el-step>
          <el-step title="配置工资条"></el-step>
          <el-step title="预览并发送"></el-step>
        </el-steps>
      </div>
    </div>
    <div style="min-height:440px;">
      <step1 v-show="active==1"></step1>
      <step2 v-show="active==2"></step2>
      <step3 v-show="active==3"></step3>
    </div>
    <div class="btn-container" style="text-align:center">
      <el-button class="pre-btn"  type="text" v-if="active!=1" style="margin-top: 12px;" @click="pre">上一步</el-button>
      <el-button class="next-btn"  type="success" v-if="active!=3" style="margin-top: 12px;" @click="next">下一步</el-button>
      <el-button class="next-btn" type="success" v-if="active==3" style="margin-top: 12px;" @click="send">发 送</el-button>
    </div>
  </div>
</template>

<script>
import { Upload, Button } from "iview";
import step1 from "@/components/step1";
import step2 from "@/components/step2";
import step3 from "@/components/step3";
export default {
  name: "index",
  components: {
    Upload,
    Button,
    step1,
    step2,
    step3
  },
  data() {
    return {
      active: 1,
      toStepTwo:false,
      toStepThree:false
    };
  },
  methods: {
    handleSuccess(response) {},
    onerror() {
      this.$message({
        type: "error",
        message: "上传失败"
      });
    },
    next() {
      if(this.getvalue){
        this.active++
      }else{
        this.$message({
        type: "warning",
        message: "请先填写下方表单"
      });
      }
     
    },
    pre() {
      if (this.active-- < 1) this.active = 1;
    },
    send() {}
  },
  mounted() {

  },
  computed: {
  getvalue() {
    return this.$store.state.stepOne.value&&this.$store.state.stepOne.value2&&this.$store.state.responeList.length?true:false
    }
  },
  watch:{
    getvalue(val){
      // console.log(val)
    }
  }
};
</script>

<style lang="less" scoped>
.step-container{
  background-color:rgba(243,245,247,1);
  min-height: calc(100vh - 80px ); 
}
.box-shadow {
  width: 100%;
  height: 120px;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;
     box-shadow:0px 4px 16px 0px rgba(131,143,153,0.1);
  >div{
    width: 44%;
  }
}
</style>
