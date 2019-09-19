<template lang="html">
    <div class="home">
     <div class="left">
      <Header></Header>
    </div>
    <div class="right">
      <TabTwo></TabTwo>
        <div class="Homecontent">
          <div class="Homecontent-top" >
            <Tab :tabdata="list" :active="active"></Tab>
            <div class="input"  >
               <input type="text" name="" value="" v-model="search" placeholder="请输入任务名搜索">
               <div class="close" v-if="search != ''" @click="cleantop" style="cursor:pointer">
                   <img src="../assets/images/guanbi.svg"  alt="">
               </div>
               <!-- <div class="search"  @click="searchdata(search)" style="cursor:pointer"> -->
                    <img src="../assets/images/sou-suo.svg" alt="" style="cursor:pointer" @click="searchdata(search)">
               <!-- </div> -->

               <!-- <div>
                 <p v-for="item in filter">{{item}}</p>
               </div> -->
               <!-- <el-button style="margin-left:-147px;height:32px;line-height:2px" @click="searchdata(search)">查询</el-button> -->

             </div>
           </div>
           <div class="Homecontent-content">
                <HList v-on:totalcount="totalcount1" ref="list"
                :total="totalNum"   :List="List" :inde="inde" v-on:clearlist2='clearlist2' />
            </div>
        <div class="foot" v-if="showpage"  >
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change= 'handleCurrentChange'
                :page-count="total"
                >
              </el-pagination>
          </div>
        </div>
        </div>
         </div>
</template>
<script>
import Tab from '@/components/Base/Tab.vue'
import HList from '@/components/Base/List.vue'
import Header from '@/components/Base/Header.vue'
import TabTwo from '@/components/Base/tabTwo.vue'

export default {
  components: {
    Tab: Tab,
    HList: HList,
    Header: Header,
    TabTwo: TabTwo

  },
  inject: ['reload'],
  data () {
    return {
      List: [],
      table: [],
      search: '',
      taskName: '',
      currentPage: 1,
      total: 0,
      page: 1,
      pageSize: 12,
      pageSize2: 9,
      // pageSize3: 6,
      pageNum: 1,
      totalNum: 0,
      showpage: false,
      inde: 0,
      val: 1,
      active: '0',
      active1: 0,
      list2: '1',
      list: [
        { title: '任务大厅', name: 'home', path: '/home/taskpool', ind: 0 },
        { title: '我的任务', name: 'home', path: '/home', ind: 0 }
      ],
      searchName: '',
      screenWidth: document.body.clientWidth // 屏幕尺寸
    }
  },
  mounted () {
    // Mock axios Fig.1
    // 首页列表
    let vm = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        vm.screenWidth = window.screenWidth
      })()
    }
    if (vm.screenWidth > 1500 && vm.screenWidth < 1900) {
      vm.size = 12
    } else if (vm.screenWidth > 1024 && vm.screenWidth < 1500) {
      vm.size = 12
    }
    vm.getList()
  },
  computed: {},
  watch: {},
  methods: {
    isIE () {
      var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
      var isIE =
        userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
      var isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
      var isIE11 =
        userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
      if (isIE) {
        var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        var fIEVersion = parseFloat(RegExp['$1'])
        if (fIEVersion === 7) {
          return 7
        } else if (fIEVersion === 8) {
          return 8
        } else if (fIEVersion === 9) {
          return 9
        } else if (fIEVersion === 10) {
          return 10
        } else {
          return 6 // IE版本<=7
        }
      } else if (isEdge) {
        return 'edge' // edge
      } else if (isIE11) {
        return 11 // IE11
      } else {
        return -1 // 不是ie浏览器
      }
    },
    totalcount1 (res) {
      let vm = this
      vm.total = res
    },
    getpage () {
      let vm = this
      vm.$emit('totalcount', vm.total)
    },
    clearlist2 () {
      let vm = this
      vm.list2 = ''
    },
    // 关闭按钮
    cleantop () {
      let vm = this
      vm.search = ''
      vm.reload()
      vm.pageNum = 1
      vm.getList()

      console.log(vm.pageNum)
    },
    // 搜索
    searchdata (val) {
      let vm = this
      vm.pageNum = 1
      vm.searchName = val
      vm.searchdata1(val)
    },
    searchdata1 (val1) {
      let vm = this
      // console.log(vm.pageNum);
      if (val1 !== '') {
        vm.$axios
          .post(
            '/label/taskHall/queryMyTaskList',
            { taskName: val1, currentPage: vm.pageNum, pageSize: vm.pageSize },
            {
              headers: { 'Content-Type': 'application/json' },
              xhrFields: {
                withCredentials: true
              }
            }
          )
          .then(function (res) {
            vm.List = res.data.l
            vm.showpage = true
            vm.inde = 1
            vm.total = res.data.totalPage
          })
          .catch(function (err) {
            console.log(err)
          })
        // vm.reload();
      }
    },
    // 获取列表数据
    getList (val) {
      // alert("数据请求")
      let vm = this
      // console.log(vm.pageNum);
      vm.$axios
        .post(
          '/label/taskHall/queryMyTaskList',
          { taskName: '', currentPage: val, pageSize: vm.pageSize },
          {
            headers: { 'Content-Type': 'application/json' },
            xhrFields: {
              withCredentials: true
            }
          }
        )
        .then(function (res) {
          vm.List = res.data.l
          vm.showpage = true
          vm.inde = 1
          vm.data1 = vm.List
          vm.total = res.data.totalPage
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    handleCurrentChange (val11) {
      // console.log(val11);
      let vm = this
      vm.pageNum = val11
      if (vm.search !== '') {
        vm.pageNum = val11
        vm.searchdata1(vm.searchName, vm.pageNum)
      } else {
        this.getList(val11)
        // console.log(val11)
      }
    }
  },
  created () {
  }
}
</script>
<style  >
</style>
