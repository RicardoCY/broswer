<template>
  <div class="index">
    <header class="comm-header">
      <el-row>
         <el-col :span="12" style="">
          <img src="../assets/companyLogo.png" style="margin:0 48px;vertical-align:middle;">
          <div class="router-link">
              <router-link to="/index/new">新建</router-link>
          </div>
        <div class="router-link">
             <router-link to="/index/history">发送记录</router-link>
          </div>
          <div class="router-link">
          <router-link to="/index/help">帮助中心</router-link>
          </div>
          
          </el-col>
        <el-col :span="2" :offset="10">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="font-size:16px;
font-family:PingFangSC-Semibold;
font-weight:600;
color:rgba(21,36,54,1);
line-height:22px;">
              下拉菜单
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/index/provid">高级服务</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/index/setting">账号设置</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <span  @click="logout">退出</span> 
             </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </header>
    <router-view style=""></router-view>
  </div>
</template>


<script>
// @ is an alias to /src
import { Upload, Button } from "iview";
import Cookie from 'js-cookie'

export default {
  name: "index",
  components: {
    Upload,
    Button,
  },
  data() {
    return {
      
    };
  },
  methods: {
    handleSuccess(response) {},
    onerror() {
      this.$message({
        type: "info",
        message: "上传失败"
      });
    },
    logout(){
      console.log(1)
      this.$router.replace('/login')
      Cookie.remove('userInfo',)
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.active {
  color: rebeccapurple;
}
.el-dropdown-link {
  cursor: pointer;
}
.index {
  .dialog-footer {
    padding-bottom: 80px;
  }
  .btn-container {
    text-align: center;
  }
}

.router-link{
  display: inline-block;
  margin-left: 40px;
  >a{
    display: inline-block;
    height:100%;
    font-size:16px;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(131,143,153,1);
     &.active{
           color: #152436;
           border-bottom: 2px solid  #3BC492 ;
     }
        
  }
}
</style>
