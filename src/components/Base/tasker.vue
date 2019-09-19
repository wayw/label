<template>
  <div class="taskerchan">
    <p style="
          width:87px;
          height: 16px;
          font-family: SourceHanSansCN-Bold;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 20px;
          letter-spacing: 1px;
          color: #333333;margin:15px 261px 30px">选择分配人</p>
    <div class="el-transfer-panel__filter el-input el-input--small el-input--prefix"
         style="margin-top:10px !important; margin-left:14px !important;margin-bottom:32px !important;width:449px;display:flex;line-height:30px">
      <!-- 姓名： -->
      <input type="text"
             class="el-input__inner"
             style="width:265px;margin-left:131px;border-radius:8px;height:39px;background:#f7f7f7;border:1px solid #e1e1e1"
             placeholder="搜索分配人"
             v-model="filterText">
      <i class="el-icon-circle-close"
         v-show="filterText !== ''"
         @click="clearsearch"
         style="margin-left:-28px;margin-top:14px"></i>
      <span class="el-input__prefix"
            style="width:63px;height:35px;background:#327ed8;display:block;border-radius:5px;margin-left:408px;line-height:35px;color:#fff">
        <a style="color:#fff;display:block;width:100%;height:100%;line-height:35px;"
           @click="filterMethod(filterText)">查询</a>
      </span>
    </div>
    <div class
         style="width:200px;height:211px;float:left;overflow: auto;margin-left:22px">
      <vue-tree :tree-data="getDeparList"
                v-model="checkedIds"
                :options="options"
                @handle="handle" />
    </div>

    <div class="el-transfer"
         style="display:flex;
                     height:211px;
                    margin-left: 22px;
                    margin-bottom:20px;
                    ">
      <div class="el-transfer-panel"
           data-v-3ac627d1
           style="width:328px;height:480px;margin-left:19px">
        <div class="el-transfer-panel__body"
             data-v-3ac627d1
             style="width:328px;height:480px">

          <el-table ref="multipleTable"
                    :data="data3"
                    height="211"
                    tooltip-effect="dark"
                    style="width: 100%;height:384px"
                    :header-cell-style="{background:'#f7f7f7'}"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             width="55"></el-table-column>
            <el-table-column prop="userName"
                             label="姓名"
                             width="120"></el-table-column>
            <el-table-column prop="id"
                             label="账号"
                             show-overflow-tooltip></el-table-column>
          </el-table>

          <!-- <div class="pagecount1" style="margin-top: 5px;
    margin-left: -2px;">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
             @current-change="handleCurrentChange"
             :page-count="totalPage"
              hide-on-single-page
              :pager-count="5"
              :page-size="7"
            ></el-pagination>
          </div>-->

          <!-- </div> -->
        </div>
      </div>

      <!-- <div class="el-transfer__buttons"
           style="width:85px;padding:0px 24px !important;">
        <span class="el-input__prefix"
              style="width:80px;height:30px;background:#008ce6;display:block;border-radius:5px;margin:200px 590px;line-height:30px;color:#fff">
          <a style="color:#fff;display:block;width:100%;height:100%;line-height:30px;"
             @click="addData1">移入</a>
        </span>
        <span class="el-input__prefix"
              style="width:80px;height:30px;background:#008ce6;display:block;border-radius:5px;margin:260px 590px;line-height:30px;color:#fff">
          <a style="color:#fff;display:block;width:100%;height:100%;line-height:30px;"
             @click="deleteData">删除</a>
        </span>
        <span class="el-input__prefix"
              style="width:80px;height:30px;background:#008ce6;display:block;border-radius:5px;margin:320px 590px;line-height:30px;color:#fff">
          <a style="color:#fff;display:block;width:100%;height:100%;line-height:30px;"
             @click="addDataAll">全部移入</a>
        </span>
        <span class="el-input__prefix"
              style="width:80px;height:30px;background:#008ce6;display:block;border-radius:5px;margin:380px 590px;line-height:30px;color:#fff">
          <a style="color:#fff;display:block;width:100%;height:100%;line-height:30px;"
             @click="deleteData2">全部删除</a>
        </span>
      </div>
      <div class="el-transfer-panel"
           data-v-3ac627d1
           style="width:240px !important;height:480px">
        <div class="el-transfer-panel__header"
             style="width:240px;">
          <span class="el-checkbox__label">已选择:{{checklength}}</span>
        </div>
        <div class="el-transfer-panel__body"
             data-v-3ac627d1
             style="width:240px;height:480px">
          <div role="group"
               aria-label="checkbox-group"
               style="width:240px;height:470px"
               class="el-checkbox-group el-transfer-panel__list">
            <el-table :data="sedata"
                      tooltip-effect="dark"
                      style="width: 100%;height:386px"
                      @selection-change="handleSelectionChange2">
              <el-table-column type="selection"
                               width="35"></el-table-column>
              <el-table-column prop="username"
                               label="姓名"
                               width="110"></el-table-column>
              <el-table-column prop="id"
                               label="账号"
                               show-overflow-tooltip></el-table-column>
            </el-table> -->

      <!-- <div class="pagecount" style="margin-top: 5px;
    margin-left: -2px;">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
                hide-on-single-page
              ></el-pagination>
            </div>-->
      <!-- </div>
        </div> -->
      <!-- </div> -->
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
      total: 0,
      tab3: [],
      filterText: '',
      value: [1],
      value4: [1],
      multipleSelection: [],
      multipleSelection2: [],
      sedata: [],
      seldata: [],
      dataList: [],
      dataList2: [], // 选中（已选)的数据
      checklength: 0,
      selectList: [],
      totalPage: 0,
      getDeparList: [],
      // data: [],
      dataListDel: [],
      dataListNoCheck: [], // 未选中的的数据
      selectListCheck: [], // 已选中的（或已搜索）的数据
      noCheckData: [], // 未选中区域的已勾选的数据（待添加到已选区域)
      hasCheckData: [], // 已选中区域的已勾选的数据（从未选区域中待删除)
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
    let vm = this
    vm.getdeparList()
  },
  methods: {
    // 获取组织结构
    getdeparList () {
      let vm = this
      vm.$axios
        .post('/basedata/depar/getDeparList', {})
        .then(function (res) {
          vm.tab = res.data
          for (let i = 0; i < vm.tab.length; i++) {
            if (vm.tab[i].upId === '0') {
              vm.tab1.push({
                label: vm.tab[i].deparName,
                children: [],
                id: vm.tab[i].id
              })
            }
          }
          for (let i = 0, j = 0, len = vm.tab.length; i < len; i++) {
            if (vm.tab[i].upName === vm.tab1[j].label) {
              vm.obj = [
                {
                  label: vm.tab[i].deparName,
                  children: '',
                  id: vm.tab[i].id
                }
              ]
              vm.tab3.push({
                id: vm.tab1[j].id,
                children: vm.obj,
                label: vm.tab1[j].label
              })
            } else {
              for (let a = vm.tab1.length; j < a; j++) {
                if (vm.tab[i].upName === vm.tab1[j].label) {
                  vm.obj = [
                    {
                      label: vm.tab[i].deparName,
                      children: '',
                      id: vm.tab[i].id
                    }
                  ]
                  vm.tab3.push({
                    id: vm.tab1[j].id,
                    children: vm.obj,
                    label: vm.tab1[j].label
                  })
                }
              }
              j = 0
            }
          }
          vm.getDeparList = vm.tab3
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    handle (item) {
      let vm = this
      vm.$axios
        .post('/basedata/user/userlist', {
          currentPage: vm.pageval,
          pageSize: '3'
        })
        .then(function (res) {
          vm.selectList = res.data.l
          vm.data = vm.selectList
        })
        .catch(function (err) {
          console.log(err)
        })
      // vm.message.push(`节点 ${JSON.stringify(item)} 作为事件参数传递`);
      vm.data3 = []
      let len = vm.data.length
      for (let i = 0; i < len; i++) {
        if (item.id === vm.data[i].deparid || item.id === vm.data[i].cityId) {
          vm.data3.push({
            userName: vm.data[i].userName,
            id: vm.data[i].id,
            userTypeId: vm.data[i].userTypeId,
            proId: vm.data[i].proId,
            cityId: vm.data[i].cityId,
            deaprId: vm.data[i].deparid
          })
        }
      }
      // console.log(vm.data3);
      vm.total = vm.data3.length
      vm.data1 = vm.data3
    },
    addClass (index) {
      let vm = this
      vm.current = index
    },
    checked (index, ...rest) {
      console.log(rest)
    },
    handleSelectionChange (val) {
      let vm = this
      vm.multipleSelection = val
    },
    handleSelectionChange2 (val, ...rest) {
      let vm = this
      vm.multipleSelection2 = val
    },
    addData1 () {
      let vm = this
      vm.sedata = vm.multipleSelection
      vm.$emit('gettaskcheck', vm.sedata)
      vm.checklength = vm.sedata.length
      vm.sendtask()
      vm.toggleSelection()
    },
    sendtask () {
      let vm = this
      console.log(vm.sedata)
      vm.sedata = vm.multipleSelection
      vm.$emit('gettasker', vm.sedata)
    },
    deleteData (event) {
      let vm = this
      for (let i = 0; i < vm.sedata.length; i++) {
        for (let j = 0; j < vm.multipleSelection2.length; j++) {
          if (vm.sedata[i].username === vm.multipleSelection2[j].username) {
            vm.sedata.splice(i, 1)
          }
        }
      }
      vm.checklength = vm.sedata.length
      vm.sendtask()
    },
    addDataAll () {
      let vm = this
      vm.sedata = vm.multipleSelection
      vm.checklength = vm.sedata.length
      vm.sendtask()
      vm.toggleSelection()
    },
    deleteData2 (event) {
      let vm = this
      vm.sedata = vm.multipleSelection = []
      vm.checklength = vm.sedata.length
      vm.sendtask()
    },
    handleChange (value, direction, movedKeys) { },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    filterMethod (val) {
      // vm.data = vm.data1;
      let vm = this
      console.log(val)
      console.log(vm.$refs.multipleTable.data)
      if (val) {
        // vm.$refs.multipleTable.data
        let res = vm.$refs.multipleTable.data.filter(a => {
          return a.userName.indexOf(val) > -1
        })
        vm.data3 = res
      } else {
        vm.data3 = vm.data1
      }
    },
    clearsearch () {
      let vm = this
      vm.filterText = ''
      vm.data3 = vm.data1
    }
  },

  mounted () {
    // Mock axios Fig.1
    let vm = this
    vm.handle()
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
.el-input__inner {
  margin-left: 200px;
}
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
</style>
