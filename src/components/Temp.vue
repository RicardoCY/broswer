<template>
  <div class="index">
  <p class="salary_time">{{salary_time}}</p>
  <p class="update_time">{{update_time}}</p>
  <span>请选择</span>
  <el-select v-model="value">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  
  </div>
</template>


<script>

export default {
  name: "",
  components: {

  },
  data() {
    return {
  
    };
  },
  methods: {
   
  },
  mounted(){
    
  },
  props:["salary_time","update_time","options","value"]
};
</script>

<style lang="css" scoped>
.salary_time{
  width: 864px;
  height: 48px;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
}
</style>
