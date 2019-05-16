<template>
  <div class="index">
  <el-row>
  <el-col :span="18" offset="3">
    <div class="left">
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      unique-opened='true'>
      <el-submenu index="1">
        <template slot="title">
          <span>2019年</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="goto('/salary1')">3月薪资</el-menu-item>
          <el-menu-item index="1-2" @click="goto('/salary2')">2月薪资1</el-menu-item>
          <el-menu-item index="1-3" @click="goto('/salary3')">2月薪资</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>2018年</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="goto('/salary4')">3月薪资</el-menu-item>
          <el-menu-item index="2-2" @click="goto('/salary5')">2月薪资1</el-menu-item>
          <el-menu-item index="2-3" @click="goto('/salary6')">2月薪资</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </el-col>
  </el-row>
  <div class="img">
    <img src="../assets/IMG001.png" style="width:364px;height:364px">
  </div>
  </div>
</template>


<script>

export default {
  name: "index",
  components: {

  },
  data() {
    return {
  
    };
  },
  methods: {
    goto(url){
      this.$router.push(url);
    }
   
  },
  mounted(){
    
  }
};
</script>

<style lang="css" scoped>
.left{
  width: 216px;
  height: 148px;
  margin-top: 32px;
  float: left;
}
.right{
  float: left;
  margin: 32px 0px 0px 32px;
}
.img{
  position: fixed;
  left: 0;
  top: 388px;
  }

</style>
