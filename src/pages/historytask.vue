<template>
  <div class="home">
    <div class="left">
      <Header></Header>
    </div>
    <div class="right">
      <TabTwo></TabTwo>
      <div class="historytable-top">
        <Tab :tabdata="task"></Tab>
        <span href="javascript:;"
              @click="gonewtask()"
              style="width: 96px;height: 38px;background-color: #2d71c2;line-height:38px;
                 margin-top: 20px;color:#fff;border-radius: 10px;cursor:pointer;position:absolute;top:72px;right:28px">新建任务</span>
      </div>
      <div class="
                 historytable-content">
        <div class="historytable"
             v-if="tableData.length == 0"
             style="overflow:hidden;">
          <div style="position: absolute;
                    left: 43%;
                    top: 44%;
                    width: 218px;">
            <p style="
          color:#008ce6;font-size:16px">正在加载数据中...</p>
            <img src="../assets/images/ball-triangle.svg"
                 alt>
          </div>

        </div>
        <div class="historytable"
             v-if="tableData.length !== 0">
          <!-- <div class="historytabletop"
             style="width:100%;background:#fff;text-align:left;padding-left:13px">
          <el-checkbox style="padding:2px 0px;"
                       @change="selectall(tableData)">全选</el-checkbox>
          <a style="height:70px;display:inline-block;line-height:70px;padding:0px 10px">发布</a>
          <a style="height:70px;display:inline-block;line-height:70px;padding:0px 10px">取消发布</a>
        </div> -->
          <div class="tableborder"
               style="border: 1px solid #eeeeee;">
            <el-table ref="table"
                      :data="tableData"
                      style="width: 100%"
                      :height="tableHeight"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)"
                      current-row-key
                      :fit="true"
                      :header-cell-class-name='cellclass'
                      :highlight-current-row="true"
                      :header-cell-style="{background:'#f7f7f7'}"
                      lazy>

              <!-- <el-table-column type="index" prop="id"  label="序号"></el-table-column> -->
              <el-table-column type="selection"></el-table-column>
              <el-table-column prop="taskName"
                               label="任务名称"
                               style="padding: 16px !important;"
                               align="center"></el-table-column>
              <el-table-column prop="taskTypeName"
                               label="任务类型"
                               align="center"></el-table-column>

              <el-table-column prop="inputUserName"
                               label="创建人"
                               align="center"></el-table-column>
              <el-table-column prop="inputTime"
                               label="创建时间"
                               align="center"></el-table-column>
              <el-table-column prop="algoFlowName"
                               label="算法流程"
                               align="center"></el-table-column>
              <el-table-column prop="dataStatus"
                               label="状态"
                               align="center"></el-table-column>
              <el-table-column label="操作"
                               width="250%"
                               height="30"
                               align="center">
                <template slot-scope="scope">
                  <!-- <el-tooltip class="item"
                            effect="dark"
                            content="公开任务不可分配"
                            v-if="tableData[scope.$index].fbArea =='1'"
                            placement="top-start"> -->
                  <el-button type="text"
                             size="small"
                             v-if="tableData[scope.$index].dataStatus =='未开始' || tableData[scope.$index].dataStatus =='已完成'  "
                             href="javascript:;"
                             style="color:#adadad;margin-right:7px;">分配</el-button>
                  <!-- </el-tooltip> -->
                  <el-button type="text"
                             size="small"
                             href="javascript:;"
                             v-if="tableData[scope.$index].dataStatus =='正在进行' && tableData[scope.$index].fbArea =='2'  "
                             @click="taskfp(scope.row,scope.$index)"
                             style="color:#008ce6;margin-right:7px;">分配</el-button>
                  <el-button type="text"
                             size="small"
                             href="javascript:;"
                             v-if="tableData[scope.$index].dataStatus =='正在进行' && tableData[scope.$index].fbArea =='1'  "
                             @click="taskfp(scope.row,scope.$index)"
                             style="color:#adadad;margin-right:7px;">分配</el-button>
                  <el-button type="text"
                             v-if="tableData[scope.$index].dataStatus =='未开始'"
                             size="small"
                             href="javascript:;"
                             @click="edittask(scope.row,scope.$index)"
                             style="color:#008ce6;margin-right:7px;">修改</el-button>
                  <el-button v-if="tableData[scope.$index].dataStatus =='正在进行'"
                             type="text"
                             size="small"
                             href="javascript:;"
                             style="color:#adadad;margin-right:7px;">修改</el-button>
                  <el-button v-if="tableData[scope.$index].dataStatus =='正在进行'"
                             type="text"
                             size="small"
                             href="javascript:;"
                             @click="taskqxfb(scope.row.id,scope.$index)"
                             style="color:#008ce6;margin-right:7px;">下线</el-button>
                  <el-button v-if="tableData[scope.$index].dataStatus =='已完成'"
                             type="text"
                             size="small"
                             href="javascript:;"
                             @click="taskdel(scope.$index.id)"
                             style="color:#adadad;margin-right:7px;">删除</el-button>
                  <el-button v-if="tableData[scope.$index].dataStatus =='未开始'"
                             type="text"
                             size="small"
                             href="javascript:;"
                             @click="btnchecked(scope.row,scope.$index)"
                             style="color:#008ce6;margin-right:7px;">发布</el-button>
                  <el-button v-if="tableData[scope.$index].dataStatus =='未开始'"
                             type="text"
                             size="small"
                             href="javascript:;"
                             style="color:#adadad;margin-right:7px;">开始训练</el-button>
                  <el-button v-if="tableData[scope.$index].dataStatus =='未开始'"
                             type="text"
                             size="small"
                             href="javascript:;"
                             style="color:#adadad;margin-right:7px;">下载数据</el-button>
                  <el-button v-if="tableData[scope.$index].dataStatus =='正在进行' || tableData[scope.$index].dataStatus =='已结束'"
                             type="text"
                             size="small"
                             href="javascript:;"
                             @click="training(scope.row,scope.$index)"
                             style="color:#008ce6;margin-right:7px;">开始训练</el-button>
                  <el-button v-if="tableData[scope.$index].dataStatus =='正在进行' || tableData[scope.$index].dataStatus =='已结束'"
                             type="text"
                             size="small"
                             href="javascript:;"
                             @click="download(scope.row,scope.$index)"
                             style="color:#008ce6;margin-right:7px;">下载数据</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <div class="dataupload">
          <el-dialog title="上传数据"
                     style="text-align:left;margin: 0px auto 50px;top:10%;"
                     center
                     :show-close='false'
                     :visible.sync="dialogFormVisible">
            <div class="upload">
              <el-upload class="upload"
                         ref="upload"
                         action="http://172.18.49.167:88/label/task/importExcel/"
                         :auto-upload="false"
                         :on-success="Success"
                         :before-upload="beforeUpload"
                         :on-progress="process"
                         :with-credentials="true"
                         :on-exceed="handleExceed"
                         :data="uploadData"
                         :limit="1">
                <div class="uploadfile1"
                     style="margin-left:55px;display:flex;width:314px">
                  <div class="el-input">
                    <input type="text"
                           autocomplete="off"
                           class="el-input__inner"
                           style="width:100%">
                  </div>
                  <el-button class="checkfile"
                             style="margin-left: -1%;
                                              background-color: #327ed8;
                                              border-color: #327ed8;
                                              width:98px;
                                              height:40px;
                                              position:absolute;
                                              color:#fff;
                                              right:191px"
                             type="text">选择文件</el-button>
                </div>
              </el-upload>
              <div style="color: #999999;text-align:center;top:170px;
                    left:82px;position:absolute">文件大小：不超过10M， 格式：xls、xlsx</div>
            </div>
            <div class="downfile">
              <a href="../../static/aaa.xls"
                 download="模板文件.xls"
                 style="display: inline-block;
                              width: 96px;
                            color: #327ed8;
                              height: 38px;
                              right:77px;
                              top:118px;
                              position: absolute;
                              border-radius:4px;
                              border: solid 2px #327ed8;
                              font-size:14px;
                              line-height:38px;
                              text-align:center"
                 mce_href="#">模板下载</a>
            </div>
            <div slot="footer"
                 class="dialog-footer"
                 style="text-align:center;">
              <el-button type="primary"
                         @click="importexcel()">上传</el-button>
              <el-button type="info"
                         @click="closedialog()">关闭</el-button>
            </div>

        <el-dialog width="30%"
                   title
                   :modal="false"
                   :close-on-click-modal="false"
                   :show-close="false"
                   :visible.sync="innerVisible"
                   append-to-body>
          <div class="info"
               style="margin-left:166px;height:200px;margin-top:100px">
            <p style="width:269px;color:#409eff;">
              正在解析数据中,请稍后
              <img src="../assets/images/bars.svg"
                   alt>
            </p>
          </div>
        </el-dialog>
        </el-dialog>
      </div>-->

        </div>
        <el-dialog title=""
                   :visible.sync="dialogVisible2"
                   width="644px"
                   height="613px !important;"
                   :append-to-body="true"
                   center>

          <Tasker ref="tasker"
                  v-on:gettasker="gettasker"></Tasker>
          <span style="text-align: center;
                width: 80px;
                height: 30px;
                background: #b1b1b1;
                display: inline-block;
                line-height: 30px;
                border-radius: 4px;
                margin-left: 205px;
                color:#fff;
                cursor:pointer;
                margin-top:30px;"
                @click="taskqx() ">取消</span>
          <span style="text-align: center;
                width: 80px;
                height: 30px;
                background: #327ed8;
                display: inline-block;
                line-height: 30px;
                border-radius: 4px;
                margin-left: 12px;
                color:#fff;
                cursor:pointer"
                @click="taskfp3()">确 定</span>
        </el-dialog>
        <div class="foot"
             style="height:60px;margin-top:-13px;margin-top:18px\9\0;">
          <el-pagination :page-size="pageSize"
                         background
                         layout="prev, pager, next,total"
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
import Tab from '@/components/Base/Tab.vue'
import taskassign from '@/pages/taskassign.vue'
import Tasker from '@/components/Base/tasker.vue'
import Header from '@/components/Base/Header.vue'
import TabTwo from '@/components/Base/tabTwo.vue'
export default {
  components: {
    Tab: Tab,
    taskassign: taskassign,
    Tasker: Tasker,
    Header: Header,
    TabTwo: TabTwo

  },
  data () {
    return {
      task: [
        { path: '/task/historytask', name: 'historytask', title: '任务列表' }
      ],
      tableData: [],
      // tag: [
      //   '编辑',
      //   '删除',
      //   '上传数据',
      //   '发布',
      //   '暂停',
      //   '结束',
      //   '取消发布',
      //   '文本导出',
      //   '算法训练',
      //   '算法导出'
      // ],
      sc: null, // 任务id
      dialogFormVisible: false,
      currentPage: 1,
      page: 1,
      pageSize: 10,
      pageNum: 1,
      totalNum: 0,
      inde: 0,
      taskId: 1,
      files: [], // 要上传的文件对象
      uploadData: null,
      loading: false,
      flag: false,
      innerVisible: false,
      dialogVisible2: false,
      multipleSelection: [],
      userArr: [],
      tableHeight: 50

    }
  },
  // inject: ["reload"],
  created () {
    let vm = this
    vm.getList()
  },
  mounted () {

  },
  // watch: {
  //   tableHeight () {
  //     return (window.innerHeight) - 50
  //   }
  // },
  methods: {
    // ...mapActions({getList1:TYPES.getList1}),
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
    // 获取列表数据
    getList (val) {
      let vm = this
      vm.$axios
        .post('/label/task/querytaskforpage', {
          taskName: '',
          currentPage: val,
          pageSize: vm.pageSize
        })
        .then(function (res) {
          // console.log(res)
          if (res) {
            vm.loading = false
          }
          vm.current = res.data.currentPage

          vm.tableData = res.data.l
          vm.totalNum = res.data.totalNum
          // let len1 = vm.tableData.length
          // for (let i = 0; i < len1; i++) {
          //   vm.tableData[i].inputUserName = vm.$store.state.home.userName
          // }
          let arr = vm.tableData
          for (var i = 0; i < arr.length; i++) {
            switch (arr[i].dataStatus) {
              case 0:
                break
              case 1:
                arr[i].dataStatus = '未开始'
                break
              case 2:
                arr[i].dataStatus = '暂停'
                break
              case 3:
                arr[i].dataStatus = '正在进行'
                break
              case 4:
                arr[i].dataStatus = '结束'
                break
              case 5:
                arr[i].dataStatus = '强制结束'
                break
            }
          }
          // console.log(window.innerHeight)
          vm.$nextTick(function () {
            // console.log(this.$refs)

            // console.log(this.$refs.table)

            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 240
            // 监听窗口大小变化
            let self = this
            window.onresize = function () {
              self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 240
            }
          })
          // console.log(vm.$refs)
        })
        .catch(function (err) {
          if (err) {
            console.log(err)
          }
        })
    },
    // 改变时
    handleSizeChange (val) {
      /// /console.log(val)
      this.pageSize = val
      this.getList()
    },
    // 条目改变时
    handleCurrentChange (val) {
      let vm = this
      vm.pageNum = val
      this.getList(val)
    },
    // 任务发布
    btnchecked (...rest) {
      let vm = this
      // console.log(...rest)
      vm.sc = rest[0].id
      // console.log(vm.sc)
      vm.key = rest[1]
      vm.taskName = rest[0].taskName
      vm.taskrelease(vm.sc, vm.key)
    },
    taskassign () {
      let vm = this
      vm.$refs.taskassign.toggle()
    },
    handleSelectionChange (val) {
      let vm = this
      vm.multipleSelection = val
    },
    gettasker (data) {
      let vm = this
      vm.selectList = data
      // console.log(vm.selectList)
    },
    taskqx (index, ...rest) {
      let vm = this
      vm.key = rest[1]
      vm.$refs.tasker.toggleSelection(vm.key)
      vm.dialogVisible2 = false
    },
    // 分配任务
    taskfp (...rest) {
      let vm = this
      vm.sc = rest[0].id
      vm.key = rest[1]
      let taskfbArea = rest[0].fbArea
      // console.log(vm.sc, taskfbArea)
      vm.key = rest[1]
      vm.taskName = rest[0].taskName
      if (taskfbArea === 1) {
        vm.dialogVisible2 = false
      } else if (taskfbArea === 2) {
        vm.dialogVisible2 = true
      }
      vm.taskId = vm.sc
    },
    // 开始分配
    taskfp3 (index, ...rest) {
      let vm = this
      vm.$refs.tasker.sendtask()
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
          vm.$refs.tasker.toggleSelection()
          vm.dialogFormVisible = false
          vm.dialogVisible2 = false
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 新建任务按钮
    gonewtask () {
      let vm = this
      vm.$router.push({
        name: 'newtask'
      })
    },
    // 修改任务
    edittask (...rest) {
      // console.log(rest)
      let vm = this
      vm.$router.push({
        name: 'newtask',
        query: {
          form: rest[0]
        }
      })
    },
    // 取消发布
    taskqxfb (id, key) {
      // console.log(id)
      let vm = this
      this.$confirm('此操作将下线该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: 'true',
        showClose: false
      })
        .then(() => {
          vm.$axios
            .post('/label/task/updatetaskforunstart', {
              id: id
            })
            .then(function (res) {
              // console.log(res)
              console.log(vm)
              if (res.status) {
                vm.$_message.success('任务已下线')
                vm.tableData[key].dataStatus = '未开始'
                vm.tableData[key].inputUserName =
                  vm.$store.state.home.userName
              } else {
                vm.$_message.error(
                  res.errMsg
                )
              }
            })
            .catch(function (err) {
              if (err) {
                console.log(err)
              }
            })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        })
    },
    // 删除任务
    taskdel (id) {
      let vm = this
      vm.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: 'true',
        showClose: false
      })
        .then(() => {
          vm.$axios
            .post('/label/task/deletetaskbyid', {
              id: id
            })
            .then(function (res) {
              // console.log(res);
              if (res.status) {
                vm.$message({
                  message: '任务已删除',
                  type: 'success',
                  duration: '1000'
                })
              } else {
                vm.$message({
                  message: res.errMsg,
                  type: 'warning',
                  duration: '1000'
                })
              }
              vm.getList(vm.current)
            })
            .catch(function (err) {
              if (err) {
                console.log(err)
              }
            })
        })
        .catch(() => {
          vm.$_message.warning('已取消删除')
        })
    },
    // 普通任务发布
    taskrelease (id, key) {
      let vm = this
      vm.$axios.post('/label/task/updatetaskforstart', {
        id: id
      })
        .then(function (res) {
          // console.log(res);
          vm.$_message.success('任务已发布')
          vm.tableData[key].dataStatus = '正在进行'
          // vm.reload();
        })
        .catch(function (err) {
          if (err) {
            console.log(err)
          }
        })
    },
    // 导出文档
    importexcel () {
      let vm = this
      vm.$refs.upload.submit()
      // vm.dialogFormVisible = false;
    },
    closedialog () {
      let vm = this
      vm.dialogFormVisible = false
    },
    training (...rest) {
      let vm = this
      vm.sc = rest[0].id
      // console.log(vm.sc)
      vm.key = rest[1]
      vm.$axios
        .post('/label/task/algo/run', {
          taskId: vm.sc
        })
        .then(function (res) {
          vm.$_message.success(res.data)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    download (...rest) {
      let vm = this
      vm.sc = rest[0].id
      // console.log(vm.sc)
      vm.key = rest[1]
      vm.taskName = rest[0].taskName
      vm.$axios
        .post('/label/task/algo/download', {
          taskId: vm.sc
        }, {
          responseType: 'blob', // 表明返回服务器返回的数据类型
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (res) {
          // vm.$_message.info('正在下载...')
          const blob = new Blob([res])
          const fileName = vm.taskName + '.zip'
          // for IE
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName)
          } else {
            // for Non-IE (chrome, firefox )
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }
    // handleExceed (files, fileList) {
    //   let vm = this
    //   vm.$message({
    //     message: '当前限制选择 1 个文件!',
    //     type: 'warning'
    //   })
    //   // this.$message.warning(`当前限制选择 1 个文件`);
    //   // 本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件
    // },
    // process (event, file, fileList) {
    //   // console.log(event.percent)
    //   // console.log(file)
    //   // console.log(fileList)
    //   let vm = this
    //   console.log(vm.innerVisible)
    //   if (event.percent === 100) {
    //     vm.innerVisible = true
    //     console.log(vm.innerVisible)
    //   }
    // },
    // Success (response, file, fileList) {
    //   // console.log(response);
    //   let vm = this
    //   // console.log(vm.sc);
    //   vm.$message({
    //     message: '文件上传成功!',
    //     type: 'success'
    //   })
    //   vm.innerVisible = false
    //   setTimeout(() => {
    //     vm.$refs.upload.clearFiles()
    //   }, 2000)
    // },
    // beforeUpload (file) {
    //   let vm = this
    //   let i = vm.sc
    //   vm.uploadData = { id: i }
    //   var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    //   const extension = testmsg === 'xls'
    //   const extension2 = testmsg === 'xlsx'
    //   const isLt2M = file.size / 1024 / 1024 < 10
    //   if (!extension && !extension2) {
    //     vm.$message({
    //       message: '上传文件只能是 xls、xlsx格式!',
    //       type: 'warning'
    //     })
    //   }
    //   if (!isLt2M) {
    //     vm.$message({
    //       message: '上传文件大小不能超过 10MB!',
    //       type: 'warning'
    //     })
    //   }
    //   let promise = new Promise(resolve => {
    //     vm.$nextTick(function () {
    //       resolve(true)
    //     })
    //   })
    //   return (extension || (extension2 && isLt2M)) && promise
    // }
    // btnchecked (index, ...rest) {
    //   let vm = this
    //   // let task = vm.tableData
    //   console.log(...rest)
    //   vm.sc = rest[0].id

    //   console.log(vm.sc)
    //   vm.key = rest[1]
    //   vm.taskName = rest[0].taskName

    //   switch (index) {
    //     case 0:
    //       // console.log(vm.tableData);
    //       // console.log(rest);
    //       vm.$router.push({
    //         name: 'newtask',
    //         query: {
    //           form: rest[0]
    //         }
    //       })
    //       break
    //     case 1:
    //       vm.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //         center: 'true',
    //         showClose: false
    //       })
    //         .then(() => {
    //           vm.$axios
    //             .post('/label/task/deletetaskbyid', {
    //               id: vm.sc
    //             })
    //             .then(function (res) {
    //               // console.log(res);
    //               if (res.status) {
    //                 vm.$message({
    //                   message: '任务已删除',
    //                   type: 'success',
    //                   duration: '1000'
    //                 })
    //               } else {
    //                 vm.$message({
    //                   message: res.errMsg,
    //                   type: 'warning',
    //                   duration: '1000'
    //                 })
    //               }
    //               vm.getList(vm.current)
    //             })
    //             .catch(function (err) {
    //               if (err) {
    //                 console.log(err)
    //               }
    //             })
    //         })
    //         .catch(() => {
    //           this.$message({
    //             type: 'info',
    //             message: '已取消删除',
    //             duration: '1000'
    //           })
    //         })
    //       break
    //     case 2:
    //       vm.dialogFormVisible = true
    //       break
    //     case 3:
    //       vm.$axios
    //         .post('/label/task/updatetaskforstart', {
    //           id: vm.sc
    //         })
    //         .then(function (res) {
    //           // console.log(res);
    //           vm.$message({
    //             message: '任务已发布',
    //             type: 'success',
    //             duration: '1000'
    //           })
    //           vm.tableData[vm.key].dataStatus = '正在进行'
    //           // vm.reload();
    //         })
    //         .catch(function (err) {
    //           if (err) {
    //             console.log(err)
    //           }
    //         })
    //       break
    //     case 4:
    //       vm.$confirm('此操作暂停该任务, 是否继续?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //         center: 'true',
    //         showClose: false
    //       })
    //         .then(() => {
    //           vm.$axios
    //             .post('/label/task/updatetaskforpause', {
    //               id: vm.sc
    //             })
    //             .then(function (res) {
    //               console.log(res)
    //               if (res.status) {
    //                 vm.$message({
    //                   message: '任务已暂停',
    //                   type: 'success',
    //                   duration: '1000'
    //                 })
    //                 vm.tableData[vm.key].dataStatus = '暂停'
    //               } else {
    //                 vm.$message({
    //                   message: res.errMsg,
    //                   type: 'warning',
    //                   duration: '1000'
    //                 })
    //               }
    //             })
    //             .catch(function (err) {
    //               if (err) {
    //                 console.log(err)
    //               }
    //             })
    //         })
    //         .catch(() => {
    //           vm.$message({
    //             type: 'info',
    //             message: '已取消',
    //             duration: '1000'
    //           })
    //         })

    //       break
    //     case 5:
    //       vm.$confirm('此操作将结束该任务, 是否继续?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //         center: 'true',
    //         showClose: false
    //       })
    //         .then(() => {
    //           vm.$axios
    //             .post('/label/task/updatetaskforend', {
    //               id: vm.sc
    //             })
    //             .then(function (res) {
    //               console.log(res)
    //               if (res.status) {
    //                 vm.$message({
    //                   message: '任务已结束',
    //                   type: 'success',
    //                   duration: '1000'
    //                 })
    //                 vm.tableData[vm.key].dataStatus = '结束'
    //               } else {
    //                 vm.$message({
    //                   message: res.errMsg,
    //                   type: 'warning',
    //                   duration: '1000'
    //                 })
    //               }
    //             })
    //             .catch(function (err) {
    //               if (err) {
    //                 console.log(err)
    //               }
    //             })
    //         })
    //         .catch(() => {
    //           this.$message({
    //             type: 'info',
    //             message: '已取消',
    //             duration: '1000'
    //           })
    //         })

    //       break
    //     case 6:
    //       this.$confirm('此操作将取消发布该任务, 是否继续?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //         center: 'true',
    //         showClose: false
    //       })
    //         .then(() => {
    //           vm.$axios
    //             .post('/label/task/updatetaskforunstart', {
    //               id: vm.sc
    //             })
    //             .then(function (res) {
    //               console.log(res)
    //               if (res.status) {
    //                 vm.$message({
    //                   message: '任务已取消发布',
    //                   type: 'success',
    //                   duration: '1000'
    //                 })
    //                 vm.tableData[vm.key].dataStatus = '未开始'
    //                 vm.tableData[vm.key].inputUserName =
    //                   vm.$store.state.home.userName
    //               } else {
    //                 vm.$message({
    //                   message: res.errMsg,
    //                   type: 'warning',
    //                   duration: '1000'
    //                 })
    //               }
    //             })
    //             .catch(function (err) {
    //               if (err) {
    //                 console.log(err)
    //               }
    //             })
    //         })
    //         .catch(() => {
    //           // this.$message({
    //           //   type: 'info',
    //           //   message: '已取消删除'
    //           // });
    //         })

    //       break
    //     case 7:
    //       vm.$axios
    //         .post(
    //           '/label/task/exportExcel',
    //           { taskId: vm.sc },
    //           {
    //             responseType: 'blob', // 表明返回服务器返回的数据类型
    //             headers: {
    //               'Content-Type': 'application/json'
    //             }
    //           }
    //         )
    //         .then(function (res) {
    //           // console.log("数据导出");
    //           const blob = new Blob([res])
    //           const fileName = vm.taskName + '.xlsx'
    //           // for IE
    //           if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //             window.navigator.msSaveOrOpenBlob(blob, fileName)
    //           } else {
    //             // for Non-IE (chrome, firefox )
    //             const elink = document.createElement('a')
    //             elink.download = fileName
    //             elink.style.display = 'none'
    //             elink.href = URL.createObjectURL(blob)
    //             document.body.appendChild(elink)
    //             elink.click()
    //             URL.revokeObjectURL(elink.href) // 释放URL 对象
    //             document.body.removeChild(elink)
    //             vm.reload()
    //           }
    //         })
    //         .catch(function (err) {
    //           if (err) {
    //             console.log(err)
    //           }
    //         })
    //       break
    //     case 8:
    //       break
    //   }
    // },
  }
}
</script>
<style scoped>
.dataupload >>> .el-dialog__header {
  /* border-bottom: 1px solid #ccc; */
  padding-top: 60px;
}

.dataupload >>> .el-dialog__footer {
  /* width: 600px; */
  height: 100px;
  margin: 0 auto;
}

.dataupload >>> .el-dialog {
  margin: 40px auto 50px;
  width: 100%;
}
.dataupload >>> .el-button--default {
  width: 100px;
  height: 30px;
  display: inline-block;
  line-height: 0px;
}
.dataupload >>> .el-button--primary {
  width: 63px;
  height: 34px;
  padding-right: 46px;
  padding-top: 10px;
  background-color: #327ed8;
  margin-right: 12px;
}
.dataupload >>> .el-button--info {
  width: 63px;
  height: 34px;
  padding-right: 46px;
  padding-top: 10px;
  background-color: #b1b1b1;
  margin-right: 12px;
}
.historytask >>> .historytable > .foot {
  margin: 46px 320px;
  float: left;
}
.historytable >>> .el-button--small > span {
  flex-wrap: wrap;
  white-space: normal;
  word-break: break-word;
  /* display: block; */
  text-align: center;
  width: 63px;
  height: 34px;
}
.dataupload >>> .el-button--small > span {
  text-align: left;
  width: 158px;
  height: 50px;
  margin-left: 0px;
  white-space: nowrap;
}
.historytable >>> .el-button--small > span > a {
  margin-right: 9px;
  margin-top: 10px;
  font-size: 12px;
  margin-left: 0px;
  line-height: 20px;
  color: red;
}

.el-dialog__wrapper >>> .el-button--success {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.el-dialog__wrapper >>> .checkfile > span {
  display: inline-block;
  color: #fff;
}
.el-dialog__wrapper >>> .el-upload-list--text {
  width: 340px !important;
  margin-left: 95px !important;
  margin-top: 31px;
}

.el-dialog__wrapper >>> .el-dialog {
  width: 644px !important;
  top: 3%;
}

.el-message-box__wrapper >>> .el-message-box__content {
  position: relative;
  padding: 64px 39px;
  color: #606266;
  font-size: 14px;
}
.el-button {
  margin-left: 0px !important;
}
.el-dialog__wrapper {
  background: rgb(red, green, blue);
}

.historytask > .right > .historytable-content {
  margin: 73px 22px 0px;
  background: #fff;
  height: 800px;
}
.historytask > .right > .historytable-content > .historytable {
  margin: 20px 20px;
  height: 650px;
}
.el-table /deep/ .DisableSeletion > .cell {
  display: none !important;
}
</style>
