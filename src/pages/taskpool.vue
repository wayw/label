<template>
  <div class="home">
    <div class="left">
      <Header></Header>
    </div>
    <div class="right">
      <TabTwo></TabTwo>
      <div class="Homecontent">
        <div class="Homecontent-top">
          <Tab :tabdata="list"
               :active="active"
               :firsttitle="firsttitle"></Tab>
          <div class="input">

            <input type="text"
                   name=""
                   value=""
                   v-model="search"
                   placeholder="请输入任务名搜索">
            <div class="close"
                 v-if="search != ''"
                 @click="closedata"
                 style="cursor:pointer">
              <img src="../assets/images/guanbi.svg"
                   alt="">
            </div>
            <!-- <div class="search"  @click="searchdata(search)" style="cursor:pointer"> -->
            <img src="../assets/images/sou-suo.svg"
                 alt=""
                 style="cursor:pointer"
                 @click="searchdata(search)">
          </div>
        </div>
        <div class="Homecontent-content">
          <PList :List="poolList"
                 :inde="inde" />
        </div>
        <div class="foot"
             v-if="showpage">
          <el-pagination background
                         layout="prev, pager, next,total"
                         :page-count="total"
                         @current-change="handleCurrentChange"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tab from '@/components/Base/Tab.vue'
import PList from '@/components/Base/List.vue'
import Header from '@/components/Base/Header.vue'
import TabTwo from '@/components/Base/tabTwo.vue'

export default {
  components: {
    Tab: Tab,
    PList: PList,
    Header: Header,
    TabTwo: TabTwo

  },
  created () {
  },
  data () {
    return {
      //  List:["我的任务","任务池","待审任务"],
      list: [
        { title: '任务大厅', name: 'home', path: '/home/taskpool' },
        { title: '任务池', name: 'taskpool', path: '/home/taskpool' }
      ],
      firsttitle: '任务大厅',
      active: '1',
      active1: 0,
      search: [],
      poolList: [],
      table: [],
      taskName: '',
      showpage: false,
      currentPage: 1,
      totalNum: 0,
      page: 1,
      pageSize: 12,
      pageNum: 1,
      inde: 0,
      val: 1,
      total: 0,
      pageval: 0
    }
  },
  mounted () {
    let vm = this
    vm.getList()
  },
  watch: {},
  methods: {
    // 获取列表数据
    getList (val) {
      let vm = this
      vm.$axios
        .post(
          '/label/taskHall/queryPublicTaskList',
          { taskName: '', currentPage: val, pageSize: vm.pageSize },
          {
            headers: { 'Content-Type': 'application/json' },
            xhrFields: {
              withCredentials: true
            }
          }
        )
        .then(function (res) {
          // console.log(res);
          vm.poolList = res.data.l
          vm.showpage = true
          vm.data1 = vm.poolList
          vm.inde = 1
          vm.totalNum = res.data.totalNum
          vm.total = res.data.totalPage
          vm.$nextTick(() => {
            var storage = window.localStorage
            storage.setItem('c', '1')
          })
        })
        .catch(function (err) {
          if (err) {
            console.log(err)
          }
        })
    },
    // 改变时
    handleSizeChange (val) {
      let vm = this
      console.log(val)
      this.pageSize = val
      vm.pageval = val
      this.getList()
    },
    // 条目改变时
    handleCurrentChange (val) {
      console.log(val)
      let vm = this
      vm.pageNum = val
      this.getList(val)
    },
    closedata () {
      let vm = this
      vm.search = ''
      vm.poolList = vm.data1
    },
    searchdata (val) {
      let vm = this
      vm.pageNum = 1
      vm.searchName = val
      vm.searchdata1(val)
    },
    searchdata1 (val1) {
      console.log(val1)
      let vm = this
      if (val1) {
        vm.$axios
          .post(
            '/label/taskHall/queryPublicTaskList',
            { taskName: val1, currentPage: vm.pageval, pageSize: vm.pageSize },
            {
              headers: { 'Content-Type': 'application/json' },
              xhrFields: {
                withCredentials: true
              }
            }
          )
          .then(function (res) {
            vm.poolList = res.data.l
            vm.inde = 1
            vm.showpage = true
            vm.totalNum = res.data.totalNum
            vm.total = res.data.totalPage
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }
}
</script>
<style scoped>
</style>
