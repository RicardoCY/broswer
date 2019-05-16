<template>
  <div class="index">
    <el-row>
      <el-col :span="18" :offset="3">
        <h3 class="help-header">

常见问题列表  

  <span class="hover-i">
      联系客服
  </span>
</h3>
        <div style="padding:40px 0">
          <el-collapse v-model="activeNames" @change="handleChange" accordion>
          <el-collapse-item v-for="(item,index) in helpList" :title="item.title" :name="item.id">
           <div v-html="helpDetail">
           </div>
          </el-collapse-item>
        </el-collapse>
        </div>
       
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  name: "index",
  components: {},
  data() {
    return {
      activeNames: [],
      helpList:[],
      helpDetail:''
    };
  },
  methods: {
    async handleChange(val) {
      if(val){
       let res = await this.$http.get(`HelpCenter/${val}`)
       this.helpDetail = res.data.content
      }
    },
    async getHelpList(){
      let res = await this.$http.post('HelpCenter/pager',{
          "pageNum": 1,
          "pageSize":20,
          "paramData": {
          }
      })
      console.log(res.data.resultData)
      this.helpList = res.data.resultData
    }
  },
  mounted() {
    this.getHelpList()
  }
};
</script>

<style lang="less" scoped>
.index{
  padding-top:32px;
    .help-header{
    font-size:22px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(44,45,58,1);
  line-height:30px;
  }
  .hover-i{
    float:right;
    color:rgba(131,143,153,1);
    font-size:16px;
    cursor: pointer;
    position: relative;
    &:hover{
      &:after{
        position: absolute;
        bottom:-30px;
        right: 0px;
        width: 220px;
        color:rgba(44,45,58,1);
        text-align: center;
        background:rgba(243,245,247,1);
border-radius:4px;
        content: '联系客服 027-8788 8662'
      }
    }
  }
}

</style>
