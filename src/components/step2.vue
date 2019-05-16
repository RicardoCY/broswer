<template>
  <div class="index">
    
    <el-row :gutter="20">
      <el-col :span='4'>
          <p class="l-border-title">系统已解析出工资条类别</p>
          <div @click="insertContent(item.header)" class="header-btn" v-for="(item,index) in $store.state.responeList" :key='index'>
              {{item.header}}
          </div>
      </el-col>
      <el-col :span='14'>
<div class="edit-container">
    <p class="l-border-title">编辑工资条</p>
	    <edit	v-model="rickText" :height="'500'"></edit>
    </div>
      </el-col>
      <el-col :span='6'>
        <p class="l-border-title">默认模板</p>
        <el-row :gutter="5">
             <el-col class="template-container"  v-for="i in 3" :span='8'  v-if="templateList[i-1]" >
                  <img @click="hanleSelectPic(templateList[i-1])" v-if="templateList[i-1]" style="width:100%;height:100px;" :src="templateList[i-1].picUrl" alt="">
             </el-col >
       </el-row >
           <el-row :gutter="5" style="margin-top:15px;">
               <el-col class="template-container" v-for="i in 3" :span='8'  v-if="templateList[2+i]" >
                  <img  @click="hanleSelectPic(templateList[2+i])"  v-if="templateList[2+i]" style="width:100%;height:100px;" :src="templateList[2+i].picUrl" alt="">
              </el-col >
          </el-row>
      </el-col>
    </el-row>
      <!-- <el-button type='success' style="margin-top: 12px;" @click="getContent" >保存</el-button> -->
  </div>
</template>

<script>
import edit from "@/components/edit"
import { constants } from 'crypto';

export default {
  name: "step2",
  components:{
		edit
	},
  data() {
    return {
     rickText:'',
     templateList:[]
    };
  },
  methods: {
    getContent(){
    },
    insertContent(header){
      window.tinymce.activeEditor.execCommand('mceInsertContent',false,`@@${header}@@`)
    },
    async getDefaultTemplate(){
        let res = await this.$http.get("template/all");
        this.templateList=res.data
        console.log(res.data)
    },
    async hanleSelectPic(item){
      console.log(item.id)
      let res = await  this.$http.get(`template/${item.id}`);
      this.rickText = res.data.content
    }
  },
  mounted(){
    this.getDefaultTemplate()
  }
};
</script>

<style lang="less" scoped>
.index{
  padding: 32px 40px;
  min-height: calc(100vh - 202px);
 
  .header-btn{
    margin-top: 8px;
    text-align: center;
    line-height: 36px;
    width: 100%;
    height:36px;
    cursor: pointer;
    background:rgba(255,255,255,1);
    border-radius:24px;
    border:1px solid rgba(224,234,241,1);
    &:hover{
      background:rgba(59,196,146,1);
      color: #fff;
    }
  }
  .template-container{
      height: 100px;
      box-sizing: border-box;
      img{
        border-radius: 4px;
          border:1px solid rgba(224,234,241,1);
        &:hover{
        border:1px solid rgba(59,196,146,1);
      }
      }
      
    
  }
}
.edit-container{
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  background-color: #fff;
  border-radius:8px;
}

</style>
