<template>
  <div>

    <div class="tasklist">
      <div class="taskrule">
        <div class="taskclass">
          <img src="../../assets/images/shugang.svg"
               alt>任务规则介绍
        </div>
        <p class="taskintroduce"
           @click="taskinfo">
          任务介绍：
          <a v-for="(item,index) in taskdata"
             :key="index"
             v-on:click="taskinfo"> {{item.remark}}</a>
        </p>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      //  uid:''
      taskdata: []
    }
  },
  props: {
    // taskdata:Array,
    uid: String
  },
  created () {
    let vm = this
    vm.id = vm.uid
    vm.taskdetails(vm.id)
  },
  methods: {

    taskdetails (para) {
      let vm = this
      vm.$axios
        .post('/label/task/querytaskbyid', { id: para })
        .then(function (res) {
          vm.taskdata = res
          vm.remark = res.data.remark
          vm.cglist = res.data.cglist
          vm.taskinfo()
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    taskinfo () {
      let vm = this
      let data = [{
        remark: vm.remark
      },
      {
        cglist: vm.cglist
      }]
      vm.$emit('taskinforecive', data)
    }
  }
}
</script>
<style>
</style>
