<template>
  <div class="index">
  <child salary_time='2019年3月' update_time="上传时间：2019-03-15" :options="options" :value="value"></child>
  </div>
</template>


<script>
import child from '../components/Temp'
export default {
  name: "salary5",
  components: {
     child
  },
  data() {
    return {
         options:[{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '未读'
        }, {
          value: '选项3',
          label: '已读'
        }, {
          value: '选项4',
          label: '已撤回'
        }],
        value:""
    };
  },
  methods: {
   
  },
  mounted(){
    
  }
};
</script>

<style lang="css" scoped>

</style>
