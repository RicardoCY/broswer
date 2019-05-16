import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num:1,
    responeList:[{
      "num": 0,
      "header": "资产名称"
    },
    {
      "num": 1,
      "header": "资产类型"
    },
    {
      "num": 2,
      "header": "资产描述"
    }],
    stepOne:{
      value: "",
      value2: "",
    }
  },
  mutations: {
    add(state){
      state.num++
    },
    getList(state,payload){
      state.responeList=payload
    }
  },
  actions: {
    test(store){
      setTimeout(()=>{
        store.commit('add')
        console.log(state.num)
      },3000)
     
    }
  }
})
