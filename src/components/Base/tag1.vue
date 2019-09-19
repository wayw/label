<template>
  <div class="taskerchan">
    <p style="
          width:107px;
          height: 16px;
          font-family: SourceHanSansCN-Bold;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 20px;
          letter-spacing: 1px;
          color: #333333;margin:15px 240px 30px">选择标注标签</p>
    <div class="center"
         style="height:250px">
      <div class
           style="width:200px;height:211px;overflow: auto;float:left">
        <vue-tree :tree-data="getDeparList"
                  v-model="checkedIds"
                  :options="options"
                  @handle="select" />
      </div>
      <div class="right">
        <!-- <input type="text"
               class="el-input__inner"
               style="width:265px;border-radius:8px;height:39px;margin-left:30px"
               placeholder="搜索标注标签"
               v-model="filterText"> -->
        <!-- <el-autocomplete class="inline-input"
                         v-model="state2"
                         :fetch-suggestions="querySearchAsync"
                         placeholder="请输入内容"
                         :trigger-on-focus="false"
                         style="margin-left:50px"
                         @select="handleSelect"></el-autocomplete> -->
        <el-select v-model="state2"
                   filterable
                   placeholder="请输入关键词"
                   remote
                   :remote-method="userSearch"
                   :automatic-dropdown='true'
                   @change="userSelected">

          <el-option v-for="item in searchList"
                     :key="item.id"
                     :label="item.cg_name"
                     :value="item.id">
          </el-option>
        </el-select>
        <span style="width:63px;height:35px;background:#fff;border:2px solid #92bbea;display:block;border-radius:5px;line-height:35px;color:#fff;float:right">
          <a style="color:#327ed8;display:block;width:100%;height:100%;line-height:35px;"
             @click="cleansearch">清空</a>
        </span>
        <span style="width:63px;height:35px;background:#327ed8;display:block;border-radius:5px;margin:0px 16px;line-height:35px;color:#fff;float:right">
          <a style="color:#fff;display:block;width:100%;height:100%;line-height:35px;"
             @click="userSearch">查询</a>
        </span>
      </div>

    </div>
    <div class="selectlabel"
         style="margin:0px 30px 0px">
      <p>已选择{{sedata.length}}个标签</p>
      <el-tag v-if="tabchek2.length == 0"
              v-for="tag in sedata"
              :key="tag.name"
              closable
              :type="tag.id"
              :disable-transitions='true'
              @close="handleClose(tag)">
        {{tag.name}}
      </el-tag>
      <el-tag v-if='tabchek2.length != 0'
              v-for="tag in sedata"
              :key="tag.name"
              closable
              :type="tag.id"
              :disable-transitions='true'
              @close="handleClose(tag)">
        {{tag.categoryName}}{{tag.name}}
      </el-tag>
    </div>
    <div class="footer"
         style="text-align:center;float:left;margin-left:260px;margin-top:30px">
      <span style="width:63px;height:35px;background:#b1b1b1;display:block;border-radius:5px;line-height:35px;color:#fff;float:left">
        <a style="color:#fff;display:block;width:100%;height:100%;line-height:35px;"
           @click="changestatus()">取消</a>
      </span>
      <span style="width:63px;height:35px;background:#327ed8;display:block;border-radius:5px;margin:0px 16px;line-height:35px;color:#fff;float:left">
        <a style="color:#fff;display:block;width:100%;height:100%;line-height:35px;"
           @click="commit()">确定</a>
      </span>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Base/Header.vue'
import Tab from '@/components/Base/Tab.vue'
import VueTree from 'vue-simple-tree/src/components/VueTree.vue'

export default {
  components: {
    Header: Header,
    Tab: Tab,
    VueTree: VueTree
  },
  data () {
    return {
      data3: [],
      data: [],
      data1: [],
      pageval: 1,
      checkedIds: [],
      ids: [4],
      message: [],
      options: {
        label: 'label',
        checkbox: false,
        checkedOpen: true,
        folderBold: true,
        idsWithParent: true,
        // depthOpen: 2,
        openIcon: 'fa fa-angle-down',
        closeIcon: 'fa fa-angle-right',
        halfCheckedIcon: 'fa fa-minus-square-o fa-fw text-primary',
        // checkedIcon: "fa fa-check-square-o fa-fw text-danger",
        checkedIcon: 'fa fa-plus-square',
        // uncheckedIcon: "fa fa-square-o fa-fw"
        uncheckedIcon: 'fa fa-minus-square'
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tab: [],
      tab1: [],
      tabchek2: [],
      total: 0,
      tab3: [],
      filterText: [],
      value: [1],
      value4: [1],
      multipleSelection: [],
      multipleSelection2: [],
      state2: '',
      sedata: [],
      seldata: [],
      dataList: [],
      dataList2: [], // 选中（已选)的数据
      checklength: 0,
      selectList: [],
      totalPage: 0,
      getDeparList: [],
      firstflag: true,
      // data: [],
      dataListDel: [],
      dataListNoCheck: [], // 未选中的的数据
      selectListCheck: [], // 已选中的（或已搜索）的数据
      noCheckData: [], // 未选中区域的已勾选的数据（待添加到已选区域)
      hasCheckData: [], // 已选中区域的已勾选的数据（从未选区域中待删除)
      selectlabel: [],
      searchList: [],
      form: {
        id: '', // 任务id
        taskName: '', // 任务名称
        taskTypeCode: '', // 任务类型ID（选择多分类、框选多分类、图谱标注）
        taskTypeName: '', // 任务类型名称
        taskLabel: [], // 任务标签
        algoFlowId: '', // 算法流程ID
        algoFlowName: '', // 算法流程名称
        algoHint: '', // 算法提示1是2否
        singleCount: '', // 单个任务文本数
        assingUserId: '', // 分配人ID
        assingUserName: '', // 分配人姓名
        fbArea: '', // 发布范围1公开2指派
        textCount: '', // 文本总数
        handCount: '', // 处理总数 预留字段
        dataStatus: '', // 1未开始2暂停3正在进行4结束5强制结束
        remark: '', // 备注
        cglist: [{ categoryId: '', categoryName: '' }]
      },
      task: [
        { path: '/task/newtask', assingUserName: 'newtask', title: '新建任务' },
        {
          path: '/task/historytask',
          assingUserName: 'historytask',
          title: '任务列表'
        }
      ]
    }
  },
  created () {

    // vm.handle()
  },
  props: ['taskId', 'dxtoggle'],
  methods: {
    // 获取组织结构
    getdeparList () {
      let vm = this
      vm.$axios
        .post('basedata/category/list', {
          // types: 1,
          // cg_name: ''
        })
        .then(function (res) {
          vm.tab = res.data
          // console.log(vm.tab)
          vm.tab1 = JSON.parse(JSON.stringify(vm.tab).replace(/cg_name/g, 'label'))
          // console.log(vm.tab1)
          vm.getDeparList = vm.tab1
          // vm.handle()
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getdeparList2 () {
      let vm = this
      vm.$axios
        .post('basedata/category/list', {
          types: 1,
          taskId: vm.taskId
        })
        .then(function (res) {
          console.log(vm.taskId)
          vm.tab = res.data
          // console.log(vm.tab)
          vm.tab1 = JSON.parse(JSON.stringify(vm.tab).replace(/cg_name/g, 'label'))
          // console.log(vm.tab1)
          vm.getDeparList = vm.tab1
          // vm.handle()
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    selectdata (data) {
      // let vm = this
      console.log(data)
    },
    // getdeparList () {
    //   let vm = this
    //   vm.$axios
    //     .post('/basedata/category/getUpCgList', {
    //       types: 1,
    //       cg_name: ''
    //     })
    //     .then(function (res) {
    //       vm.tab = res.data
    //       console.log(vm.tab)
    //       for (let i = 0; i < vm.tab.length; i++) {
    //         console.log(vm.tab[i].up_id)
    //         if (vm.tab[i].up_id === null) {
    //           vm.tab1.push({
    //             label: vm.tab[i].cg_name,
    //             children: [],
    //             id: vm.tab[i].id
    //           })
    //         }
    //       }
    //       console.log(vm.tab1)
    //       vm.getDeparList = vm.tab1
    //       vm.handle()
    //     })
    //     .catch(function (err) {
    //       console.log(err)
    //     })
    // },
    // handle (val, ...rest) {
    //   let vm = this
    //   // console.log(val)
    //   // console.log(val.id)
    //   vm.obj = [{}]
    //   for (let m in vm.tab1) {
    //     vm.$axios
    //       .post('/basedata/category/getCgListByUpId', {
    //         up_id: vm.tab1[m].id
    //       })
    //       .then(function (res) {
    //         vm.tab2 = res.data
    //         for (let a = vm.tab1.length, j = 0; j < a; j++) {
    //           if (vm.tab2[0].up_name === vm.tab1[j].label) {
    //             for (let d in vm.tab2) {
    //               vm.obj[d] =
    //                 {
    //                   label: vm.tab2[d].cg_name,
    //                   children: '',
    //                   id: vm.tab2[d].id
    //                 }
    //             }
    //             vm.tab1[j].children = vm.obj
    //           }
    //         }
    //         vm.obj = []
    //         vm.getDeparList = vm.tab1
    //         vm.tab2 = []
    //         console.log(vm.tab1)
    //       })
    //       .catch(function (err) {
    //         console.log(err)
    //       })
    //   }
    // },
    select (val) {
      let vm = this
      console.log(val)
      console.log(vm.dxtoggle)
      if (val.up_id !== null || val.up_name !== null) {
        if (vm.dxtoggle) {
          vm.sedata.push({
            name: val.label,
            id: val.id.toString()
          })
          let hash = {}
          vm.sedata = vm.sedata.reduce((preVal, curVal) => {
            // console.log(hash[curVal.id])
            if (hash[curVal.id] === undefined) {
              // console.log(preVal)
              hash[curVal.id] = true && preVal.push(curVal)
            }
            return preVal
          }, [])
        } else {
          vm.sedata[0] = {
            name: val.label,
            id: val.id.toString()
          }
          let hash = {}
          vm.sedata = vm.sedata.reduce((preVal, curVal) => {
            // console.log(hash[curVal.id])
            if (hash[curVal.id] === undefined) {
              // console.log(preVal)
              hash[curVal.id] = true && preVal.push(curVal)
            }
            return preVal
          }, [])
        }
        console.log(vm.sedata)
      } else {
        return false
      }
    },
    handleClose (tag) {
      this.sedata.splice(this.sedata.indexOf(tag), 1)
    },
    userSearch (query) {
      let vm = this
      console.log(query)
      if (query !== '') {
        vm.$axios
          .post('/basedata/category/query', {
            tag: query,
            taskId: vm.taskId
          })
          .then(function (res) {
            vm.searchList = res.data
            console.log(vm.searchList)
            //     this.userSearchLoading = false
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    userSelected (data) {
      let vm = this
      console.log(data)
      if (vm.dxtoggle) {
        let selectname = ''
        selectname = vm.searchList.find((item) => {
          console.log(item)
          return item.id === data
        })
        console.log(selectname)
        vm.sedata.push({
          name: selectname.cg_name,
          id: data.toString()
        })
        let hash = {}
        vm.sedata = vm.sedata.reduce((preVal, curVal) => {
          // console.log(hash[curVal.id])
          if (hash[curVal.id] === undefined) {
            // console.log(preVal)
            hash[curVal.id] = true && preVal.push(curVal)
          }
          return preVal
        }, [])
      } else {
        let selectname = ''
        selectname = vm.searchList.find((item) => {
          console.log(item)
          return item.id === data
        })
        console.log(selectname.cg_name)
        vm.sedata[0] = {
          name: selectname.cg_name,
          id: data.toString()
        }
        let hash = {}
        vm.sedata = vm.sedata.reduce((preVal, curVal) => {
          // console.log(hash[curVal.id])
          if (hash[curVal.id] === undefined) {
            // console.log(preVal)
            hash[curVal.id] = true && preVal.push(curVal)
          }
          return preVal
        }, [])
      }

      console.log(vm.sedata)
      setTimeout(() => {
        vm.searchList = []
      }, 2000)
      // vm.getDeparList
    },
    handleSelect (item) {
      // console.log(item)
    },
    loadAll () {
      return this.getDeparList
    },
    tagclean () {
      let vm = this
      vm.tabchek = []
      vm.tabchek2 = []
      vm.sedata = []
      vm.arr = vm.arr2
      vm.taglength = vm.tabchek.length
    },
    // 编辑标签
    tabchekedit (data) {
      let vm = this
      console.log(data)
      vm.tabchek2 = data
      console.log(vm.tabchek2)
      vm.sedata = vm.tabchek2
      // vm.taglength = vm.tabchek2.length
      // vm.handleC()
    },
    cleansearch () {
      let vm = this
      vm.searchval = ''
      vm.searchList = []
      vm.state2 = ''
      // vm.arr = JSON.parse(JSON.stringify(vm.arr2))
    },
    saveState (data) {
      console.log(data)
    },
    searchTag (val) {
      let vm = this
      console.log(vm.state2)
      if (val) {
        vm.$axios
          .post('/basedata/category/query', {
            tag: val,
            taskId: vm.taskId
          })
          .then(function (res) {
            vm.searchList = res.data
            vm.searchList = vm.searchList.filter(item => {
              return item.cg_name.indexOf(val) > -1
            })
            console.log(vm.searchList)
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
    changestatus () {
      let vm = this
      vm.$emit('changestatus', false)
    },
    commit () {
      let vm = this
      vm.$emit('getlabel2', vm.getDeparList)
      vm.$emit('closew')
      vm.$emit('changestatus', false)
      vm.$emit('checked', vm.sedata)
      // (vm.tabchek = []),
    },
    tagdel (index) {
      let vm = this
      vm.tabchek.splice(index, 1)
      vm.taglength = vm.tabchek.length
    },
    filterMethod (val) {
      // vm.data = vm.data1;
      let vm = this
      if (val) {
        // vm.$refs.multipleTable.data
        let res = vm.$refs.multipleTable.data.filter(a => {
          return a.username.indexOf(val) > -1
        })
        vm.data3 = res
      } else {
        vm.data3 = vm.data1
      }
    },
    clearsearchval () {
      // let vm = this
      // vm.
    }
  },

  mounted () {
    // Mock axios Fig.1
    // let vm = this
    // vm.handle()
    let vm = this
    // console.log()
    console.log(vm.taskId)
    if (vm.taskId) {
      vm.getdeparList2()
    } else {
      vm.getdeparList()
    }
  }
}
</script>
<style scoped>
.el-input,
.tabledetail {
  width: 518px;
  height: 40px;
}
.tableleft > el-radio {
  margin-left: -100px;
}
.newtaskform > .form > .typeof {
  height: 20px;
}
.el-transfer__buttons {
  padding: 100px 30px !important;
}
.el-form-item {
  margin-bottom: 5px;
}
.el-form-item__label {
  width: 150px !important;
  margin-left: -20px;
}
.el-transfer__button:first-child {
  margin-bottom: 10px;
  margin-top: 100px;
}
.el-transfer-panel__filter .el-input__inner {
  width: 100%;
  margin-left: -422px;
  /* border-radius: 20px; */
}

.el-transfer[data-v-3ac627d1] >>> .is-checked {
  background: #eae5e5;
  color: #000;
  width: 200px;
  margin-left: -23px;
}

.transfer >>> .el-transfer-panel {
  height: 230px;
}
/* .el-input__inner {
  margin-left: 200px;
} */
.taskinfo > .el-input__inner {
  height: 60px;
  margin-bottom: 20px;
}
.transfer >>> .el-transfer-panel__header {
  display: none !important;
}
.transfer
  >>> .el-transfer-panel__filter
  .el-input
  .el-input--small
  .el-input--prefix {
  margin-top: 0px;
}
.transfer >>> .el-input__inner {
  margin-top: -10px;
  width: 210px;
  margin-left: -7px;
  border-radius: 10px;
}
.transfer >>> .el-transfer-panel__filter .el-input__icon {
  margin-left: -5px;
}

.transfer >>> .el-transfer-panel__body {
  height: 230px;
  width: 134px;
  border-radius: 30px;
}
.transfer >>> .el-transfer-panel__list.is-filterable {
  height: 144px;
  padding-top: 0;
  width: 209px;
}
.transfer >>> .el-transfer__buttons {
  margin-top: 50px;
}
.transfer[data-v-3ac627d1] >>> .el-transfer-panel__body {
  height: 230px;
  width: 204px;
  border-radius: 30px;
}
.transfer[data-v-3ac627d1] >>> .el-input__inner {
  margin-top: -4px;
  width: 205px;
  margin-left: -6px;
  border-radius: 10px;
  height: 36px;
  display: none;
}
.transfer >>> .el-form-item__content {
  margin-top: 0px;
}

.transfer >>> .el-transfer-panel__filter {
  text-align: center;
  margin: 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  width: auto;
}

.el-transfer__button[data-v-3ac627d1]:first-child {
  margin-bottom: 10px;
  margin-top: 100px;
  margin: 0 20px 0 10px;
}
.el-transfer__button:nth-child(2) {
  margin: 0 20px 0 10px;
}

.transfer[data-v-3ac627d1]
  >>> .el-checkbox
  .el-transfer-panel__item
  .is-checked {
  background: red;
}
.transfer[data-v-3ac627d1] >>> .is-checked {
  background: red;
}

.transfer[data-v-3ac627d1] >>> .el-dialog__body {
  height: 613px;
}
.transfer[data-v-3ac627d1] >>> .el-dialog__footer {
  text-align: center;
  width: 100px;
  height: 30px;
  backgorund: red;
}

.el-checkbox-group[data-v-6cd51020] >>> .el-table__empty-text {
  line-height: 60px;
  width: 50%;
  color: #909399;
  height: 340px;
}

.is-scrolling-left[data-v-6cd51020]
  >>> .el-table__body-wrapper
  .yarnis-scrolling-left {
  height: 353px;
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
.selectlabel {
  height: 95px;
  overflow-y: auto;
}
.selectlabel > span {
  margin-left: 5px;
  margin-top: 5px;
}
.center > .right {
  /* width: 380px; */
  float: left;
  margin-left: 31px;
  text-align: center;
}
</style>
