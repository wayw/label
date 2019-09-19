<template>
  <div class="taskassign">
    <div class='left'>
      <Header :active="active1"></Header>
    </div>
    <!-- <Tab :tabdata="assign"
         :active="active"></Tab> -->
    <div class="right">
      <TabTwo></TabTwo>

      <div class="taskassigncontent"
           v-if="tableData2.length == 0">
        <p style="margin:300px auto;color:#008ce6;font-size:16px">正在加载数据中...</p>
        <img src="../assets/images/ball-triangle.svg"
             style="margin-top:-521px"
             alt>
      </div>
      <div class="taskassigncontent"
           v-if="tableData2.length !=0"
           style="position:relative">
        <div class="taskassigntop"
             style="width:100%;background:#fff;text-align:left;padding-left:13px">
          <el-checkbox style="padding:2px 0px;"
                       @change="selectall(tableData2)">全选</el-checkbox>
          <a style="height:70px;display:inline-block;line-height:70px;padding:0px 10px">发布</a>
          <a style="height:70px;display:inline-block;line-height:70px;padding:0px 10px">取消发布</a>
        </div>
        <div class="tableborder"
             style="border: 1px solid #eeeeee;">
          <el-table :data="tableData2"
                    style="width: 100%;"
                    :fit="true"
                    :default-sort="{prop: 'date', order: 'descending'}"
                    :highlight-current-row="true"
                    :header-cell-class-name='cellclass'
                    lazy
                    ref="table"
                    :header-cell-style="{background:'#f7f7f7'}">
            <el-table-column type="selection"
                             select-all></el-table-column>
            <el-table-column prop="taskName"
                             label="任务名称"
                             height="10"></el-table-column>
            <el-table-column prop="taskTypeName"
                             label="任务类型"
                             height="5"
                             sortable></el-table-column>
            <el-table-column prop="assignStatus"
                             label="状态"
                             height="10"
                             sortable></el-table-column>
            <el-table-column prop="inputUserName"
                             label="创建人"
                             height="10"
                             sortable></el-table-column>
            <el-table-column prop="inputTime"
                             label="创建时间"
                             height="30"
                             width
                             sortable></el-table-column>
            <el-table-column label="操作"
                             width>
              <template slot-scope="scope">
                <a href="javascript:;"
                   style="color:#008ce6"
                   @click=" taskassign(scope.row)">分配</a>
                <a href="javascript:;"
                   style="color:#008ce6;margin-left:10px"
                   @click="taskchangf(scope.row)">发布</a>
                <a href="javascript:;"
                   style="color:#008ce6;margin-left:10px"
                   @click="taskchangq(scope.row)">取消发布</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="assigntask2">
          <el-dialog title="任务分配"
                     class="assigntask3"
                     width="694px"
                     :visible.sync="dialogFormVisible">
            <div class="btn"
                 style="position:absolute;margin-top:130px">
              <div class="leftbtn"
                   style="width: 46px;height: 35px;border: solid 2px #666;float:left;margin-left:39px;border-radius:20px;line-height:35px"
                   @click="taskassign(tableData2[i--])"><i class="el-icon-arrow-left"
                   style="color:#666"></i></div>
              <div class="rightbtn"
                   style="width: 46px;height: 35px;border: solid 2px #327ed8;float:left;margin-left:482px;border-radius:20px;line-height:35px;"
                   @click="taskassign(tableData2[i++])"><i class="el-icon-arrow-right"
                   style="color:#327ed8"></i></div>
            </div>
            <div class="assigntasker"
                 style="width:405px;margin:0px 130px ;border:1px solid #eeeeee ;border-bottom:0px">

              <el-table class="aperson"
                        v-if="!falg"
                        :data="selectList"
                        height="300px"
                        max-height="300px"
                        :header-cell-style="{background:'#f7f7f7'}">
                <el-table-column type="index"
                                 :index="indexMethod"
                                 label="序号"></el-table-column>
                <el-table-column prop="username"
                                 label="分配人"></el-table-column>
                <el-table-column prop="textCount"
                                 label="文本数"></el-table-column>
              </el-table>
              <el-table class="aperson"
                        v-if="falg"
                        :data="selectList"
                        fit
                        :header-cell-style="{background:'#f7f7f7'}">
                <el-table-column type="index"
                                 :index="indexMethod"
                                 label="序号"></el-table-column>
                <el-table-column prop="handUserName"
                                 label="分配人"></el-table-column>
                <el-table-column prop="textCount"
                                 label="文本数"></el-table-column>
              </el-table>
              <div class="pagecount"
                   style="margin-top: 25px;
                  margin-left: -2px;
                  margin-bottom:30px">
                <el-pagination background
                               layout="prev, pager, next"
                               :total="1"
                               hide-on-single-page
                               :pager-count="5"></el-pagination>
              </div>
            </div>
            <el-button type="text"
                       @click="dialogVisible2 = true"
                       style="width:141px;height:34px;background:#327ed8;border:1px solid #409eff;border-radius:3px;color:#fff;font-size:12px">
              <a style="font-weight:800 ;line-height:2px;font-size:20px;color:#fff">+</a> 选择任务分配人
            </el-button>
            <span style="width:84px;height:34px;background:#b1b1b1;display:inline-block;line-height:34px;margin-left:12px;border-radius:3px;color:#fff;cursor:pointer"
                  @click="taskfp3">开始分配</span>
          </el-dialog>
        </div>

        <el-dialog title="选择分配人"
                   :visible.sync="dialogVisible2"
                   width="992px"
                   height="613px !important;"
                   :append-to-body="true">
          <Tasker v-on:gettaskcheck="gettask2"></Tasker>
          <span style="text-align: center;
                width: 80px;
                height: 30px;
                background: rgb(64, 158, 239);
                display: inline-block;
                line-height: 30px;
                border-radius: 4px;
                margin-left: 430px;
                color:#fff;
                cursor:pointer"
                @click="dialogVisible2 =false ">确 定</span>
        </el-dialog>
        <div class="foot"
             style="margin-top:2%">
          <el-pagination :page-size="pageSize"
                         background
                         layout="prev, pager, next"
                         :total="totalNum"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         @prev-click="handleCurrentChange"
                         @next-click="handleCurrentChange"
                         :current-page="currentPage"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Base/Header.vue'
import Tab from '@/components/Base/Tab.vue'
import Tasker from '@/components/Base/tasker.vue'
import TabTwo from '@/components/Base/tabTwo.vue'

export default {
  components: {
    Header: Header,
    Tab: Tab,
    Tasker: Tasker,
    TabTwo: TabTwo
  },
  data () {
    return {
      checklength: 0,
      dataList: [], // 未选中（已过滤出已选)的数据
      dataListNoCheck: [], // 未选中的（或已搜索）传递到子组件的数据
      selectListCheck: [], // 已选中的（或已搜索）传递到子组件的数据
      noCheckData: [], // 未选中区域的已勾选的数据（待添加到已选区域)
      hasCheckData: [], // 已选中区域的已勾选的数据（从未选区域中待删除)
      assign: [{ name: 'taskassign', path: '/taskassign', title: '任务分配' }],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogVisible2: false,
      tableData2: [],
      tableData: [],
      filterMethod (query, item) {
        return item.pinyin.indexOf(query) > -1
      },
      val: 1,
      currentPage: 1,
      page: 1,
      pageSize: 16,
      pageNum: 1,
      totalNum: 0,
      inde: 0,
      i: 0,
      sedata: {},
      seldata: {},
      dataList2: [], // 选中（已选)的数据
      userArrB: [],
      data: [],
      dataListDel: [],
      selectList: [],
      userArr: [],
      falg: true,
      active1: 1,
      active: '0',
      rowid: '',
      form: {
        id: '',
        taskName: '',
        taskTypeCode: '',
        taskTypeName: '',
        taskLabel: [],
        algoFlowId: '',
        algoFlowName: '',
        algoHint: '',
        singleCount: '',
        assingUserId: '',
        assingUserName: '',
        fbArea: '',
        textCount: '',
        handCount: '',
        dataStatus: '',
        remark: ''
      },
      task: [
        { path: '/task/newtask', assingUserName: 'newtask', title: '新建任务' },
        {
          path: '/task/historytask',
          assingUserName: 'historytask',
          title: '历史任务'
        }
      ]
    }
  },
  created () {
    let vm = this
    vm.getList()
  },
  mounted () {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  },
  inject: ['reload'],
  methods: {
    cellclass (row) {
      if (row.columnIndex === 0) {
        return 'DisableSeletion'
      }
    },
    selectall (rows) {
      console.log(rows)
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    indexMethod (index) {
      return index < 9 ? '0' + (index + 1) : index + 1
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f7f7f7fa;font-weight: 500;'
      }
    },
    // 获取列表数据
    getList (val) {
      let vm = this
      vm.$axios
        .post('/label/task/querytaskforpagebyassing', {
          assingUserId: '',
          currentPage: val,
          pageSize: '15',
          pageNo: '1'
        })
        .then(function (res) {
          vm.tableData2 = res.data.l
          console.log(vm.tableData2)
          vm.rowid = vm.tableData2[0].id
          let len1 = vm.tableData2.length
          for (let i = 0; i < len1; i++) {
            vm.tableData2[i].inputUserName = vm.$store.state.home.userName
          }

          vm.totalNum = res.data.totalNum
          let arr = vm.tableData2
          for (var i = 0; i < arr.length; i++) {
            switch (arr[i].assignStatus) {
              case 0:
                arr[i].assignStatus = '未发布'
                break
              case 1:
                arr[i].assignStatus = '已发布'
                break
            }
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    addClass (index) {
      this.current = index
    },
    gettask2 (data) {
      let vm = this
      vm.selectList = data
      vm.falg = false
    },
    taskfp3 () {
      let vm = this
      if (vm.assign_status === '未发布') {
        if (vm.selectList[0].textCount === undefined) {
          if (vm.userArr.length === 0) {
            for (let i = 0; i < vm.selectList.length; i++) {
              vm.userArr.push({
                userId: vm.selectList[i].id,
                userName: vm.selectList[i].username,
                userTypeId: vm.selectList[i].userTypeId,
                proId: vm.selectList[i].proId,
                cityId: vm.selectList[i].cityId,
                deaprId: vm.selectList[i].deaprId
              })
            }
            vm.$axios
              .post('/label/taskHall/saveTaskAssign', {
                taskId: vm.taskId,
                userArr: vm.userArr
              })
              .then(function (res) {
                vm.$message({
                  message: res.errMsg,
                  type: 'info',
                  duration: '1000'
                })
                vm.reload()
                vm.dialogFormVisible = false
              })
              .catch(function (err) {
                console.log(err)
              })
          }
          console.log(vm.userArr.length)
        } else {
          this.$confirm(
            '当前已经选择了分配人, 但未发布，不能分配任务。如需修改分配人请点击确认后重新选择分配人',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              vm.userArr = []
            })
            .catch(() => { })
        }
      } else {
        console.log('1212')
        vm.$axios
          .post('/label/taskHall/saveTaskAssign', {
            taskId: vm.taskId
          })
          .then(function (res) {
            vm.$message({
              message: res.errMsg,
              type: 'info',
              duration: '1000'
            })
            vm.reload()
            vm.dialogFormVisible = false
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    taskassign (...rest) {
      let vm = this
      vm.dialogFormVisible = true
      if (vm.i < 0) {
        vm.$message({
          message: '当前已经是第一个任务了',
          type: 'success',
          duration: '1000'
        })
      } else if (vm.i >= 0 && vm.i <= 11) {
        vm.falg = true
        console.log(rest)
        vm.taskId = rest[0].id
        vm.assign_status = rest[0].assignStatus
        vm.$axios
          .post('/label/task/queryassignbytaskid', { taskId: vm.taskId })
          .then(function (res) {
            vm.selectList = res.data
            let len = res.data.length
            if (len === 0) {
              vm.falg = false
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      } else if (vm.i >= 12) {
        return vm.$message({
          message: '当前已经是最后一个任务了',
          type: 'success',
          duration: '1000'
        })
      }
    },
    taskchangf (...rest) {
      let vm = this
      vm.taskId = rest[0].id
      vm.$axios
        .post('/label/taskHall/updateTaskAssignStatus', {
          taskId: vm.taskId,
          assignStatus: '1'
        })
        .then(function (res) {
          vm.$message({
            message: '任务已发布',
            type: 'success',
            duration: '1000'
          })
          vm.userArr = []
          vm.reload()
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    taskchangq (...rest) {
      let vm = this
      vm.taskId = rest[0].id
      vm.$axios
        .post('/label/taskHall/updateTaskAssignStatus', {
          taskId: vm.taskId,
          assignStatus: '0'
        })
        .then(function (res) {
          if (res.status) {
            vm.$message({
              message: '任务已取消发布',
              type: 'success',
              duration: '1000'
            })
            vm.reload()
          } else {
            vm.$message({
              message: res.errMsg,
              type: 'warning',
              duration: '1000'
            })
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 改变时
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    // 条目改变时
    handleCurrentChange (val) {
      let vm = this
      vm.pageNum = val
      this.getList(val)
    }
  }
}
</script>
<style  scoped>
.foot[data-v-25efbe38] {
  margin: 20px 10px;
}
.foot >>> .taskassign > .taskassigncontent > .foot {
  bottom: 20px;
  float: left;
}

.taskassigncontent[data-v-25efbe38] >>> .el-table .cell {
  line-height: 22px;
}
.el-table /deep/ .DisableSeletion > .cell {
  display: none !important;
}
.rightbtn:hover i {
  color: red;
}
</style>
