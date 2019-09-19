<template>
  <div class="MyTask">
    <div class='left'>
      <Header :active="active1" />
    </div>
    <div class='right'>
      <Tab :tabdata="List"
           :active="active" />
      <div class="Homecontent">
        <div class="title">
          <div class="title-left">
            <p>{{taskname}}</p>
          </div>
          <div class="title-right">
            <a style="display: block;
                height: 100%;
                width: 100%;
                line-height: 42px;
                margin-left:-10px"
               @click="mytask()">开始任务</a>
            <img src="../assets/images/youjiantou-.svg"
                 style="margin-top: -86px;margin-left: 82px;"
                 alt>
          </div>
        </div>
        <Tasklist :uid="uid"
                  v-on:taskinforecive="receiveinfo" />
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Base/Header.vue'
import Tab from '@/components/Base/Tab.vue'
import Tasklist from '@/components/Base/tasklist.vue'
import Vuex from 'vuex'

export default {
  components: {
    Header: Header,
    Tab: Tab,
    Tasklist: Tasklist
  },
  data () {
    return {
      List: [
        { title: '我的任务', name: 'home', path: '/home' },
        { title: '任务池', name: 'taskpool', path: '/home/taskpool' }
      ],
      uid: '',
      remark: '',
      taskId: '',
      taskname: '',
      active: '',
      active1: 0
    }
  },
  created () {
    let vm = this
    let storage = window.localStorage
    vm.active = storage.getItem('c')
    vm.getparams()
    vm.getid()
  },
  mounted () {
    // Mock axios Fig.1
  },
  computed: {
    ...Vuex.mapState({
      status: state => state.home.taskstatus
    })
  },
  methods: {
    ...Vuex.mapActions({
      handle: 'home/getmytask'
    }),
    receiveinfo (data) {
      console.log(data)
      let vm = this
      vm.remark = data[0].remark
      vm.cglist = data[1].cglist
    },
    getparams () {
      let vm = this
      vm.taskId = vm.$route.query.id
      vm.taskname = decodeURIComponent(vm.$route.query.taskname)
    },
    mytask () {
      let vm = this
      let data = [
        { taskId: vm.taskId },
        { remark: vm.remark },
        { taskname: vm.taskname },
        { cglist: vm.cglist }
      ]
      // console.log("开始任务触发...");
      vm.handle(data)
      let status = vm.$store.state.home.mytaskList.status
      if (status) {
        vm.$router.push({
          name: `mydetails`
        })
      } else {
        vm.$message({
          message: vm.$store.state.home.mytaskList.errMsg,
          type: 'info',
          duration: '500'
        })
      }
    },
    getid () {
      let vm = this
      vm.uid = vm.taskId
      // console.log(vm.uid);
    }
  }
}
</script>
<style scoped>
/* .MyTask>.router-link-active{
  color: #008ce6 !important;
} */

.MyTask > #Tab > .router-link-exact-active {
  color: #008ce6 !important;
}
</style>
