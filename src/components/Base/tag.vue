<template>
  <div class="tag"
       style>
    <!-- <el-input type="text" v-model="value" ></el-input> -->
    <div>
      <div class="tagleft"
           style="width:850px;min-width:680px">
        <div class="tagsearch"
             style="margin-left:150px">
          <input type="text"
                 class="el-input__inner"
                 style="width:180px;margin-left:5px;margin-right:15px;border-radius:8px;height:45px;margin-bottom:10px;"
                 placeholder="搜索标签"
                 v-model="searchval">
          <el-button @click="searchTag(searchval)">查询</el-button>
          <el-button @click="cleansearch()">清空</el-button>
        </div>

        <div class="info"
             v-if="flag">
          <p style="color:red;margin-left:42px">没有搜索到该标签！</p>
        </div>
        <!-- 新建任务页面标签-->
        <div v-if="tagarr.length== '0'"
             v-for="(tab,index) in arr"
             :key="index"
             style="margin-left:136px">
          <span style="line-height:44px;display:inline-block;height:33px;float:right;position:absolute;right:850px"
                v-if="open">{{tab.children[0].up_name}}</span>
          <span v-if="tab.children[0].up_name ==null"
                style="line-height:44px;display:inline-block;height:33px"></span>
          <el-button v-for="(item,index) in tab.children"
                     :key="index"
                     @click="handleC(item.id,item.up_id,item.cg_name)"
                     style="margin-top:5px;margin-left:5px"
                     :value="item.cg_name">{{item.cg_name}}</el-button>
          <br>
        </div>
        <!-- 标注页面标签-->
        <div v-if="tagarr.length!= '0'"
             v-for="(tab,index) in arr"
             :key="index"
             style="margin-left:136px">{{tab}}
          <span style="line-height:44px;display:inline-block;height:33px;float:right;position:absolute;right:850px"
                v-if="open">{{tab.children[0].up_name}}</span>
          <span v-if="tab.children[0].up_name ==null"
                style="line-height:44px;display:inline-block;height:33px"></span>
          <el-button v-for="(item,index) in tab.children"
                     :key="index"
                     @click="handleC(item.id,item.up_id,item.cg_name)"
                     style="margin-top:5px;margin-left:5px"
                     :value="item.cg_name">{{item.cg_name}}</el-button>
          <br>
        </div>
      </div>

      <div class="tagright"
           style="width:890px;margin:30px">
        <a style="display:block;">
          已选择
          <span>{{taglength}}</span>个标签
        </a>
        <div class="tagRcontent"
             v-if="tabchek2.length == 0"
             style>
          <el-tag closable
                  @close="handleClose(index)"
                  v-for="(item,index) in tabchek"
                  :key="index"
                  style="margin-right:5px;margin-top:5px;">{{item.name}}</el-tag>
        </div>

        <div class="tagRcontent"
             v-if="tabchek2.length!= 0 "
             style="max-height:500px;">
          <el-tag closable
                  @close="handleClose(index)"
                  v-for="(item,index) in tabchek2"
                  :key="index"
                  style="margin-right:5px;margin-top:5px;">{{item.categoryName}}</el-tag>
        </div>
      </div>
    </div>
    <div class
         style="height:40px;text-align:center;margin-top:15px">
      <el-button type="primary"
                 round
                 style
                 @click="commit()">选好了</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabArr: [],
      tabchek: [],
      tabchek1: [],
      tabchek2: [],
      tagarr: [],
      lastval: '',
      // lastval1: [],
      lastval1: '',
      lastval2: '',
      tab: [],
      tab1: [],
      tab2: [],
      len: 0,
      arr: [],
      arr3: [],
      ind: [],
      taglength: 0,
      searchval: '',
      open: true,
      flag: false,
      filterText: [],
      dialogForm2Visible: true
    }
  },
  methods: {
    gettaglist () {
      let vm = this
      vm.$axios
        .post('/basedata/category/getUpCgList', {
          types: 1,
          cg_name: ''
        })
        .then(function (res) {
          vm.tab1 = res.data
          vm.len = vm.tab1.length
          vm.arr = [{ id: 1, children: vm.tab1 }]
          vm.arr2 = [{ id: 1, children: vm.tab1 }]
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    gettagarr () {
      let vm = this
      vm.arr = []
      vm.tab1 = []
      vm.tagarr = vm.$store.state.home.mytaskstatus[3]
      let bararr = vm.tagarr.cglist
      for (let i = 0; i < bararr.length; i++) {
        vm.tab1.push({
          id: bararr[i].categoryId,
          cg_name: bararr[i].categoryName
        })
      }
      vm.arr.push({ id: 1, children: vm.tab1 })
      vm.arr2 = JSON.parse(JSON.stringify(vm.arr))
    },
    handleC (val, ...rest) {
      let vm = this
      vm.$axios
        .post('/basedata/category/getCgListByUpId', {
          up_id: val
        })
        .then(function (res) {
          vm.lastval = rest[0]
          vm.lastval1 = rest[1]
          vm.lastval2 = val
          if (
            vm.lastval != null &&
            vm.lastval < vm.arr[vm.arr.length - 1].children[0].up_id
          ) {
            // 当前lastval 小于当前arr 最后一个元素的up_id,则删除最后一个元素。
            vm.arr.splice(-1, 1)
            vm.tab2 = res.data
            vm.arr.push({ id: val, children: vm.tab2 })
          } else if (vm.lastval == null && vm.arr.length > 1) {
            // 如果lastval 小于当前arr最后一个元素的id,则清空当前数组，显示初始数组。
            let len = vm.arr.length
            vm.arr.splice(-1, len)
            vm.tab2 = res.data
            vm.arr = vm.arr2
            vm.arr.push({ id: val, children: vm.tab2 })
          } else if (res.data.length > 0) {
            vm.tab2 = res.data
            vm.arr.push({ id: val, children: vm.tab2 })
          }
          vm.submit()
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    tagclean () {
      let vm = this
      vm.tabchek = []
      vm.arr = vm.arr2
      vm.taglength = vm.tabchek.length
    },
    // 编辑标签
    tabchekedit (data) {
      let vm = this
      vm.tabchek2 = data
      vm.taglength = vm.tabchek2.length
      vm.handleC()
    },
    handleClose (index) {
      let vm = this
      vm.tabchek.splice(index, 1)
      vm.taglength = vm.tabchek.length
    },
    cleansearch () {
      let vm = this
      vm.searchval = ''
      vm.arr = JSON.parse(JSON.stringify(vm.arr2))
    },
    searchTag (val) {
      let vm = this
      if (val) {
        vm.$axios
          .post('/basedata/category/getCgList', {
            types: 1,
            cg_name: val
          })
          .then(function (res) {
            if (res.data !== '') {
              vm.open = false
              vm.arr = []
              vm.arr.push({ id: val, children: res.data })
            } else {
              vm.flag = true
            }
            setTimeout(() => {
              vm.flag = false
            }, 2000)
          })
          .catch(function (err) {
            console.log(err)
          })
      } else {
        vm.open = true
        vm.flag = false
        vm.arr = JSON.parse(JSON.stringify(vm.arr2))
      }
    },
    submit () {
      let vm = this
      if (vm.lastval2 !== undefined) {
        if (vm.tabchek2.length !== 0) {
          console.log(vm.lastval2)
          vm.tabchek2.push({
            categoryId: vm.lastval2,
            categoryName: vm.lastval1
          })
          let result = {}
          let finalResult = []
          for (let i = 0; i < vm.tabchek2.length; i++) {
            result[vm.tabchek2[i].id] = vm.tabchek2[i]
          }
          for (let item in result) {
            if (item !== '' || result[item].id !== '') {
              finalResult.push(result[item])
            }
          }
          vm.tabchek2 = finalResult
          vm.taglength = vm.tabchek2.length
          console.log(vm.tabchek2)
        } else {
          if (vm.lastval2 !== 'undefined') {
            vm.tabchek.push({
              id: vm.lastval2,
              name: vm.lastval1
            })
            let result = {}
            let finalResult = []
            for (let i = 0; i < vm.tabchek.length; i++) {
              result[vm.tabchek[i].id] = vm.tabchek[i]
            }
            for (let item in result) {
              if (item !== '' || result[item].id !== '') {
                finalResult.push(result[item])
              }
            }
            vm.tabchek = finalResult
            vm.taglength = vm.tabchek.length
          }
        }
      }
    },
    commit () {
      let vm = this
      vm.dialogForm2Visible = false
      vm.tabchek1 = vm.tabchek
      if (vm.tabchek2.length !== 0) {
        vm.tabchek3 = vm.tabchek2
        vm.$emit('closew')
        vm.$emit('changestatus', false)
        vm.$emit('checked', vm.tabchek3)
      } else {
        vm.$emit('closew')
        vm.$emit('changestatus', false)
        vm.$emit('checked', vm.tabchek1)
        vm.arr = vm.arr2
      }
      // (vm.tabchek = []),
    },
    tagdel (index) {
      let vm = this
      vm.tabchek.splice(index, 1)
      vm.taglength = vm.tabchek.length
    }
  },
  mounted () { },
  watch: {},
  created () { }
}
</script>
<style>
.el-tab-pane {
  height: 100px;
}
.el-tabs--top {
  height: 180px !important;
  /* width: 680px;
  margin-left: 56px; */
}
.tag >>> .is-round {
  padding: 8px 0px;
  width: 140px;
  margin-top: 11px;
}
.el-tabs__nav {
  transform: translateX(26px) !important;
}
.el-tabs__active-bar {
  /* width:80px !important; */
  /* margin-left:0px !important; */
  /* transform: translateX(80px) !important; */
}
.el-tabs__item {
  padding: 0px !important;
  text-align: center;
  width: 80px;
}

.el-tabs__nav-wrap::after {
  left: 20px !important;
  width: 580px !important;
}

.tag {
  width: 100%;
  min-width: 710px;
}
</style>
