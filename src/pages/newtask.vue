<template>
  <div class="home">
    <div class="left">
      <Header></Header>
    </div>
    <div class="right">
      <TabTwo></TabTwo>
      <div class="newtask-top">
        <Tab :tabdata="task"
             :active="active"></Tab>
      </div>
      <div class="newtaskcontent">
        <div class="newtaskform">
          <el-form v-on:taskedit="taskedite"
                   v-loading="loading"
                   element-loading-text="正在提交中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)"
                   ref="form"
                   :rules="rules"
                   :model="form"
                   width="calc(100% - 30px)"
                   label-width="100px"
                   class="form tabledetail"
                   style="text-align:left;height: calc(100% - 70px);">
            <el-form-item label="任务名称"
                          prop="taskName">
              <el-input v-model="form.taskName"></el-input>
            </el-form-item>
            <el-form-item label="任务说明"
                          prop="remark">
              <el-input :autosize="{ minRows: 2, maxRows: 2}"
                        v-model="form.remark"
                        class="remark"
                        type="textarea"
                        resize="none"
                        style="width:516px;height:45px;max-height:45px;margin-bottom:10px "
                        placeholder="不能超过300字符"></el-input>
            </el-form-item>
            <el-form-item label="上传数据"
                          style="height:60px"
                          prop="uploaddata">
              <el-upload class="upload"
                         ref="upload"
                         action="action"
                         :on-success="Success"
                         :before-upload="beforeUpload"
                         :on-progress="process"
                         :with-credentials="true"
                         :on-exceed="handleExceed"
                         :http-request="unloadpost"
                         :data="uploadData"
                         :limit="1">
                <el-input placeholder="点击上传数据,文件大小：不超过10M， 格式：xls、xlsx"></el-input>
              </el-upload>
              <!-- post-action="http://172.18.233.80:8092/label/task/add" -->
              <!-- <file-upload ref="upload"
                           v-model="files"
                           @input-file="inputFile"
                           :custom-action="customAction"
                           style="width:518px;height:40px;background:#fff;border:1px solid #ccc;border-radius:4px"
                           placeholder="点击上传数据,文件大小：不超过10M， 格式：xls、xlsx"
                           :maximum="1"
                           extensions="xls,xlsx">
              </file-upload> -->

              <!-- <button v-show="!$refs.upload || !$refs.upload.active"
                      @click.prevent="$refs.upload.active = true"
                      type="button">开始上传</button>
              <button v-show="$refs.upload && $refs.upload.active"
                      @click.prevent="$refs.upload.active = false"
                      type="button">停止上传</button> -->
              <ul style="margin-top:-55px;margin-left:20px;position:absolute">
                <li v-for="(file,index) in files"
                    :key="index">{{file.name}} </li>
              </ul>
              <el-progress v-if="taskprocess!= 0"
                           style="width:516px"
                           :text-inside="true"
                           :stroke-width="15"
                           :percentage="taskprocess"></el-progress>
              <div class="downfile">
                <a href="../../static/模版文件.xls"
                   download="模板文件.xls"
                   style="display: inline-block;
                              width: 90px;
                            color: #327ed8;
                              height: 34px;
                              right:-98px;
                              top:2px;
                              position: absolute;
                              border-radius:4px;
                              border: solid 2px #327ed8;
                              font-size:14px;
                              line-height:34px;
                              text-align:center"
                   mce_href="#">模板下载</a>
              </div>
            </el-form-item>
            <el-form-item label="算法流程绑定"
                          class="algoflow"
                          style=" padding: 0 4px 0 0 !important;"
                          prop="algoFlowName">
              <el-select placeholder="无"
                         v-model="form.algoFlowName"
                         style="width:267px">
                <!-- <el-option label="区域一" value="shanghai"></el-option> -->
                <el-option v-for="(item,index) in algoflowlist"
                           :label="item.flowName"
                           :key="index"
                           :value="item.flowName">{{item.flowName}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="算法提示"
                          class="tableleft"
                          style="text-align:left"
                          prop="algoHint">
              <el-radio-group v-model="form.algoHint">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="任务类型"
                          prop="taskTypeName">
              <el-radio-group v-model="form.taskTypeName">
                <el-radio v-for="(item,index) in bqlist"
                          :key="index"
                          :label="item.dicname">{{item.dicname}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="分配规则"
                        prop="assignRuleId"
                        style="height:50px;line-height:50px">
            <el-radio-group v-model="form.assignRuleId"
                            style="display: flex;
                    height: 50px;
                    flex-wrap: wrap;
                    width: 560px;">
              <el-radio label="1"
                        style="margin-right:86px">平均分配</el-radio>
              <el-radio label="2"
                        style="margin-right:58px">按照用户分配</el-radio>
              <el-radio label="3">按照用户专业分配</el-radio>
              <el-radio label="4">按照用户类型分配</el-radio>
              <el-radio label="5">按照用户地市分配</el-radio>
              <el-radio label="6">按照用户部门分配</el-radio>
            </el-radio-group>
          </el-form-item> -->
            <el-form-item ref="checklistForm"
                          label="任务标签"
                          v-if="form.id==''|| form.id == 'undefined'"
                          prop="checkedList"
                          style="height:60px">
              <input class="input-new-tag"
                     size="small"
                     style="position:relative;width:520px;height:82px;overflow-y:auto"
                     type="text"
                     readonly="readonly">
              <div style="position:absolute;margin-top:-81px;margin-left:2px;overflow-y:auto;height:79px;width:520px">
                <el-tag style="margin-right:10px;margin-top:7px"
                        v-for="(tag,index) in checkedList"
                        closable
                        :disable-transitions="false"
                        @close="handleCloseq(tag,index)"
                        :key="index">
                  <a style="color:black">
                    <span v-for="(ite,index) in tag.name"
                          :key="index"
                          style="color:#933;margin-left:6px">{{ite}}</span>
                  </a>
                </el-tag>

                <!-- <el-tag
                style="margin-right:10px;margin-top:7px"
                v-if="checkedList1.length != 0"
                v-for="(tag,index) in checkedList1"
                closable
                :disable-transitions="false"
                @close="handleCloseq(tag,index)"
              >
                <a style="color:black">
                  <span v-for="ite in tag.name" style="color:#933;margin-left:6px">{{ite}}</span>
                </a>
              </el-tag>-->
              </div>
              <a href="javascript:;"
                 @click="gettaskcg"
                 style="font-size:29px;color:#ccc;margin-top:-3px;display:inline-block">+</a>
              <!-- </input> -->
            </el-form-item>
            <el-form-item label="任务标签"
                          v-if="form.id != ''"
                          prop="checkedList"
                          ref="checklistForm"
                          style="height:83px">
              <input class="input-new-tag"
                     size="small"
                     style="position:relative;width:520px;height:86px;overflow-y:auto;"
                     type="text"
                     disabled="disabled"
                     readonly="readonly">
              <div style="position:absolute;margin-top:-81px;margin-left:2px;overflow-y:auto;height:79px;width:520px;">
                <el-tag style="margin-right:10px;margin-top:7px"
                        v-if="tag.categoryName"
                        v-for="(tag,index) in checkedList"
                        closable
                        :key="index"
                        :disable-transitions="false"
                        @close="handleCloseq(tag,index)">
                  <a style="color:black">
                    <span style="color:#933;margin-left:6px">{{tag.categoryName}}</span>
                  </a>
                </el-tag>

                <el-tag style="margin-right:10px;margin-top:7px"
                        v-if="item.name"
                        v-for="(item,index) in checkedList"
                        closable
                        :key="index"
                        :disable-transitions="false"
                        @close="handleClose2(item,index)">
                  <a style="color:black">
                    <span style="color:#933;margin-left:6px">{{item.name}}</span>
                  </a>
                </el-tag>
              </div>

              <!-- </input> -->
              <a href="javascript:;"
                 @click="gettaskcg"
                 style="font-size:29px;color:#ccc;margin-top:-3px;display:inline-block;borer:1px solid #ccc;border-radius:20px;height:10px;width:10px">+</a>
            </el-form-item>

            <el-form-item label="发布范围"
                          class="tableleft"
                          prop="fbArea">
              <el-radio-group v-model="form.fbArea">
                <el-radio :label="1">公开</el-radio>
                <el-radio :label="2">指派</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="taskee"
                 v-if="form.fbArea ==2">
              <el-tooltip class="item"
                          effect="dark"
                          content="仅支持选择一个任务分配人，选取多个默认保留第一个。"
                          placement="top">
                <el-button type="text"
                           @click="dialogVisible2 = true"
                           style="width:180px;height:35px;background:#fff;border:1px solid #409eff;border-radius:30px;margin-left:100px">
                  <a style="font-weight:800 ;line-height:5px;font-size:20px;color:#409eff">+</a> 选择任务分配人
                </el-button>
              </el-tooltip>

              <div class="tasker">
                <el-dialog title=""
                           :visible.sync="dialogVisible2"
                           width="644px"
                           height="613px !important;"
                           show-close>
                  <Tasker v-on:gettasker="gettask"
                          ref="tasker"></Tasker>

                  <!-- <span class="btntask2"
                      style="text-align: center;width:70px;height:40px;background:#409eef;display: inline-block;
                  line-height: 20px;
                  border-radius: 4px;margin-left:430px;">
                  <a style="color:#fff;wdith:100%;height:100%;display:block;line-height:40px"
                     @click="dialogVisible2 =false ">确 定</a>
                </span> -->
                  <span style="text-align: center;
                                width: 80px;
                                height: 30px;
                                background: #b1b1b1;
                                display: inline-block;
                                line-height: 30px;
                                border-radius: 4px;
                                margin-left: 238px;
                                margin-top:47px;
                                color:#fff;
                                cursor:pointer"
                        @click="dialogVisible2 = false ">取消</span>
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
                        @click="sendtasker()">确 定</span>
                </el-dialog>
              </div>
              <p style="margin:10px 0px 0px 110px;width:530px">
                <a style="color:#409eef">
                  分配人：
                  <el-tag v-if="sedata.length>0"
                          :disable-transitions="false"
                          size="medium"
                          closable
                          @close="handleClose()"
                          style="margin-right:8px;margin-top:5px">{{sedata[0].userName}}</el-tag>
                </a>
              </p>
            </div>

            <div class="tag">
              <el-dialog title=""
                         class="tagch"
                         width="700px"
                         height="613px !important;"
                         :visible.sync="dialogForm2Visible">
                <Tag ref="tagclean"
                     v-on:checked="gettag"
                     :dxtoggle="dxtoggle()"
                     v-on:closew="closew"
                     v-on:changestatus="changestate"></Tag>
              </el-dialog>
            </div>
          </el-form>
          <div style="margin-top:20px;margin-left:-393px">
            <span style="text-align: center;
                width: 80px;
                height: 30px;
                background: #b1b1b1;
                display: inline-block;
                line-height: 30px;
                border-radius: 4px;
                margin-left: 12px;
                color:#fff;
                cursor:pointer"
                  @click="Goback()">返回</span>
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
                  @click="onSubmit('form')">确定</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vuex from 'vuex'
import Tasker from '@/components/Base/tasker.vue'
import Tag from '@/components/Base/tag1.vue'
import Tab from '@/components/Base/Tab'
import Header from '@/components/Base/Header.vue'
import TabTwo from '@/components/Base/tabTwo.vue'
import VueUploadComponent from 'vue-upload-component'
import utils from '@/utils/util'
export default {
  components: {
    Tasker: Tasker,
    Tag: Tag,
    Header: Header,
    Tab: Tab,
    TabTwo: TabTwo,
    FileUpload: VueUploadComponent
  },
  data () {
    return {
      data: [],
      active: '0',
      checkedList: [],
      checkedList1: [],
      active1: 2,
      loading: false,
      loading1: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      algoflowlist: [],
      checktreedata: [],
      filedata: '',
      files: [],
      // value: [1],
      value4: [1],
      sedata: [],
      seldata: {},
      dataList: [],
      dataList2: [], // 选中（已选)的数据
      checklength: 0,
      dialogVisible2: false,
      dialogForm2Visible: false,
      // innerVisible: true,
      selectList: [],
      tab: [],
      bqlist: [],
      treecheck: [],
      value: '',
      value2: '',
      taskdata: [],
      bqlblist: [],
      uploadData: null, // 上传携带的数据
      // data: [],
      taskprocess: 0,
      dataListDel: [],
      dataListNoCheck: [], // 未选中的的数据
      selectListCheck: [], // 已选中的（或已搜索）的数据
      noCheckData: [], // 未选中区域的已勾选的数据（待添加到已选区域)
      hasCheckData: [], // 已选中区域的已勾选的数据（从未选区域中待删除)
      action: '',
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
        fbArea: 1, // 发布范围1公开2指派
        textCount: '', // 文本总数
        handCount: '', // 处理总数 预留字段
        dataStatus: '', // 1未开始2暂停3正在进行4结束5强制结束
        remark: '', // 备注
        cglist: [{ categoryId: '', categoryName: '' }],
        assignRuleId: ''
        // index:1
      },
      task: [
        {
          path: '/task/historytask',
          assingUserName: 'historytask',
          title: '任务列表'
        },
        { path: '/task/newtask', assingUserName: 'newtask', title: '新建任务' }
      ],
      rules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'change' }
        ],
        remark: [
          { required: true, message: '请输入任务说明', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '长度不能超过300个字符',
            trigger: 'change'
          },
          {
            min: 1,
            max: 300,
            message: '长度不能超过300个字符',
            trigger: 'blur'
          }
        ],
        algoHint: [
          { required: true, message: '请选择算法提示类型', trigger: 'change' }
        ],
        fbArea: [
          { required: true, message: '请选择发布范围', trigger: 'change' }
        ],
        taskTypeName: [
          {
            required: true,
            message: '请至少选择一个任务类型',
            trigger: 'change'
          }
        ],
        algoFlowName: [
          { required: true, message: '请选择算法流程', trigger: 'change' }
        ],
        assignRuleId: [
          { required: true, message: '请选择分配规则', trigger: 'change' }
        ],
        checkedList: [{ required: false, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...Vuex.mapActions({
      handle: 'home/edittask'
    }),
    onSubmit (form) {
      let vm = this
      let formdata = new FormData()
      vm.$refs['checklistForm'].clearValidate()
      vm.form.id = vm.uid
      vm.$refs[form].validate(valid => {
        vm.$refs['checklistForm'].clearValidate()
        if (valid) {
          if (vm.form.fbArea === 2) {
            vm.formdata = {
              id: vm.form.id,
              taskName: vm.form.taskName,
              taskTypeCode: vm.form.taskTypeCode,
              taskTypeName: vm.form.taskTypeName,
              taskLabel: '',
              algoFlowId: vm.form.algoFlowId,
              algoFlowName: vm.form.algoFlowName,
              algoHint: vm.form.algoHint,
              singleCount: vm.form.singleCount,
              assingUserId: vm.sedata[0].id,
              assingUserName: vm.sedata[0].userName,
              fbArea: vm.form.fbArea,
              remark: vm.form.remark,
              assignRuleId: vm.form.assignRuleId,
              cglist: []
              // inputUserName:vm.inputUserName
            }
            // console.log(vm.checkedList)
            if (vm.checkedList.length !== 0) {
              for (let z = 0; z < vm.checkedList.length; z++) {
                if (vm.checkedList[z].name) {
                  vm.formdata.cglist[z] = {
                    categoryId: vm.checkedList[z].id,
                    categoryName: vm.checkedList[z].name
                  }
                  //  console.log(vm.formdata.cglist)
                } else {
                  //  console.log(vm.checkedList);
                  vm.formdata.cglist[z] = {
                    categoryId: vm.checkedList[z].categoryId,
                    categoryName: vm.checkedList[z].categoryName
                  }
                }
              }
            } else {
              vm.$_message.warning('当前未选择标签')
              setTimeout(() => {
                vm.gettaskcg()
              }, 1000)
            }
          } else {
            vm.formdata = {
              id: vm.form.id,
              taskName: vm.form.taskName,
              taskTypeCode: vm.form.taskTypeCode,
              taskTypeName: vm.form.taskTypeName,
              taskLabel: '',
              algoFlowId: vm.form.algoFlowId,
              algoFlowName: vm.form.algoFlowName,
              algoHint: vm.form.algoHint,
              assingUserId: '',
              assingUserName: '',
              singleCount: vm.form.singleCount,
              fbArea: vm.form.fbArea,
              remark: vm.form.remark,
              assignRuleId: vm.form.assignRuleId,
              //  inputUserName: vm.inputUserName
              cglist: []
            }
            // 选择标签
            if (formdata.id !== 'undefined') {
              // alert(1)
              if (vm.checkedList.length !== 0) {
                for (let z = 0; z < vm.checkedList.length; z++) {
                  if (vm.checkedList[z].name) {
                    vm.formdata.cglist[z] = {
                      categoryId: vm.checkedList[z].id,
                      categoryName: vm.checkedList[z].name
                    }
                    //  console.log(vm.formdata.cglist)
                  } else {
                    //  console.log(vm.checkedList);
                    vm.formdata.cglist[z] = {
                      categoryId: vm.checkedList[z].categoryId,
                      categoryName: vm.checkedList[z].categoryName
                    }
                  }
                }
                console.log(vm.checkedList)
              } else {
                vm.$_message.warning('当前未选择标签')
                setTimeout(() => {
                  vm.gettaskcg()
                }, 1000)
                return
                // vm.onSubmit(c);
              }
            } else {
              // console.log(vm.checkedList);
              for (let i = 0; i < vm.checkedList.length; i++) {
                vm.formdata.cglist.push({
                  categoryId: vm.checkedList[i].id,
                  categoryName: vm.checkedList[i].name
                })
              }
            }
          }
          let param = new FormData()
          if (vm.filedata.length !== 0) {
            param.append('file', vm.datalist.file)
          }
          // vm.loading = true;
          param.append('taskinfo', JSON.stringify(vm.formdata))

          console.log(formdata)
          const loading = this.$loading({
            lock: true,
            text: '正在解析数据...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          vm.$axios
            .post('/label/task/add', param, {
              headers: {
                'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
              }
            })
            .then(function (res) {
              // console.log(res);
              if (res.status) {
                loading.close()
                // vm.loading = false;
                vm.$message({
                  message: '任务添加成功',
                  type: 'success',
                  duration: '1000'
                })
                if (res.data) {
                  vm.$refs.tagclean.tagclean()
                }
                vm.$router.push({
                  name: 'historytask'
                })
              } else {
                loading.close()

                vm.$message({
                  message: res.errMsg,
                  type: 'warning'
                })
              }
            })
            .catch(function (err) {
              console.log(err)
            })
        } else {
          // alert(2)
          vm.$refs['checklistForm'].clearValidate()
          if (vm.checkedList.length > 0) {
            vm.checkedList1 = JSON.parse(JSON.stringify(vm.checkedList))
          }
        }
      })
    },

    sendtasker () {
      let vm = this
      vm.$refs.tasker.sendtask()
      vm.$refs.tasker.toggleSelection()
      vm.dialogFormVisible = false
      vm.dialogVisible2 = false
    },
    Goback () {
      let vm = this
      vm.$router.push({
        name: 'historytask'
      })
    },
    getbqlb () {
      let vm = this
      vm.$axios
        .post('/basedata/category/getCgTypesList', {})
        .then(function (res) {
          vm.bqlblist = res.data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    gettag (data) {
      let vm = this
      vm.checkedList = data
    },
    changestate (data) {
      let vm = this
      vm.dialogForm2Visible = data
    },
    closew () {
      let vm = this
      vm.dialogForm2Visible = false
    },
    getCheckedKeys () {
      let vm = this
      vm.treecheck = vm.$refs.treef.getCheckedKeys()
    },
    gettaskbq () {
      let vm = this
      vm.$axios
        .post('/basedata/dic/getDicList', { types: 3 })
        .then(function (res) {
          vm.bqlist = res.data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 获取算法流程
    getsf () {
      let vm = this
      vm.$axios
        .post('/label/task/queryalgoflowlist', { types: 1 })
        .then(function (res) {
          // console.log(res);
          vm.algoflowlist = res.data

          // console.log(vm.algoflowlist);
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    gettaskedit () {
      let vm = this
      vm.$axios
        .post('/label/task/querytaskbyid', { id: vm.form.id })
        .then(function (res) {
          // console.log(res);
          vm.form = res.data
          // vm.form.cglist = vm.form.cglist;
          vm.checkedList = res.data.cglist
          // console.log(vm.checkedList);
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    gettask (data) {
      let vm = this
      vm.sedata = data
    },
    dxtoggle () {
      return true
    },
    handleCloseq (item, index) {
      let vm = this
      vm.checkedList.splice(vm.checkedList.indexOf(item), 1)
      vm.$refs.tagclean.tagdel(index)
    },
    handleClose2 (item, index) {
      let vm = this
      vm.checkedList1.splice(vm.checkedList1.indexOf(item), 1)
      vm.checkedList = JSON.parse(JSON.stringify(vm.checkedList1))
      vm.$refs.tagclean.tagdel(index)
    },
    handleClose (item) {
      let vm = this
      let len = vm.sedata.length
      vm.sedata.splice(0, len)
    },
    gettaskcg () {
      let vm = this
      vm.dialogForm2Visible = true
      vm.dialogFormVisible = true
      setTimeout(() => {
        vm.getchildren()
      }, 50)
    },
    getchildren () {
      let vm = this
      // vm.$refs.tagclean.gettaglist()
      if (vm.form.id !== '' || vm.form.id !== 'undefined') {
        //  console.log(vm.$refs);
        let data = vm.checkedList
        if (vm.$refs.tagclean !== undefined) {
          vm.$refs.tagclean.tabchekedit(data)
        }
      }
    },
    taskedite () {
      // console.log();
      let vm = this
      if (vm.$route.query.form !== undefined) {
        vm.form.id = vm.$route.query.form.id
        vm.uid = vm.form.id
        vm.taskdata = vm.$route.query.form
      }
    },
    taskedited () {
      let vm = this
      vm.form = vm.taskdata

      vm.task = [
        {
          path: '/task/historytask',
          assingUserName: 'historytask',
          title: '任务列表'
        },
        { path: '/task/newtask', assingUserName: 'newtask', title: '编辑任务' }

      ]
      vm.sedata = [
        {
          userName: '',
          id: ''
        }
      ]
      // console.log(vm.sedata)
      vm.form.id = vm.taskdata.id
      vm.gettaskedit()
      vm.sedata[0].userName = vm.taskdata.assingUserName
      vm.sedata[0].id = vm.taskdata.assingUserId
    },
    handleExceed (files, fileList) {
      let vm = this
      vm.$message({
        message: '当前限制选择 1 个文件!',
        type: 'warning'
      })
      // this.$message.warning(`当前限制选择 1 个文件`);
      // 本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件
    },
    process (event, file, fileList) {
      // let vm = this
      // if (event.percent === 100) {
      //   vm.loading1 = this.$loading({
      //     lock: true,
      //     text: '服务器解析数据中',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   })
      // }
    },
    Success (response, file, fileList) {
      // console.log(response);
      let vm = this
      // console.log(vm.sc);
      vm.$message({
        message: '文件上传成功!',
        type: 'success'
      })
      // vm.loading1.close()
      // setTimeout(() => {
      //   vm.closedialog()
      //   vm.$refs.upload.clearFiles()
      // }, 2000)
    },
    unloadpost (file) {
      let vm = this
      console.log(file)
      vm.datalist = {
        file: file.file,
        fileType: file.file.type,
        fileId: file.file.uid,
        fileName: file.file.name
      }
      vm.filedata = vm.datalist
    },
    beforeUpload (file) {
      let vm = this
      let i = vm.form.id
      vm.uploadData = { id: i }
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xls'
      const extension2 = testmsg === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        vm.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        vm.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        })
        // vm.file
      }
      let promise = new Promise(resolve => {
        vm.$nextTick(function () {
          resolve(true)
        })
      })
      return ((extension && isLt2M) && promise) || ((extension2 && isLt2M) && promise)
    },
    customAction (file, component) {
      let vm = this
      console.log(file)
      console.log(component)
      vm.datalist = {
        file: file.file,
        fileType: file.file.type,
        fileId: file.file.uid,
        fileName: file.file.name
      }
      vm.filedata = vm.datalist
      console.log(vm.filedata)
      let isIE9 = utils.isIE()
      if (isIE9 === 9) {
        return component.uploadHtml4(file)
      } else {
        return component.uploadHtml5(file)
      }
    },
    inputFile (newFile, oldFile) {
      let vm = this
      if (newFile && !oldFile) {
        // 添加文件
      }

      if (newFile && oldFile) {
        // 更新文件
        if (newFile.size > 10 * 1024 * 1024) {
          vm.$_message.error('文件大小不能超过10M!')
          this.$refs.upload.remove(newFile)
        }
        // 开始上传
        if (newFile.active !== oldFile.active) {
          console.log('Start upload', newFile.active, newFile)
          // this.$refs.upload.active = true

          // 限定最da字节
        }

        // 上传进度
        if (newFile.progress !== oldFile.progress) {
          console.log('progress', newFile.progress, newFile)
          if (newFile.putaction === undefined) {
            // newFile.postAction =
          }
          if (newFile.progress === '100.00') {
            setTimeout(() => {
              vm.taskprocess = 0
            }, 1000)
          }
          vm.taskprocess = parseInt(newFile.progress)
        }

        // 上传错误
        if (newFile.error !== oldFile.error) {
          console.log('error', newFile.error, newFile)
          if (newFile.error === 'extension') {
            vm.$_message.error('文件类型错误！')
            this.$refs.upload.remove(newFile)
          }
        }

        // 上传成功
        if (newFile.success !== oldFile.success) {
          console.log('success', newFile.success, newFile)
          setTimeout(() => {
            vm.taskprocess = 0
          }, 1000)
        }
      }

      if (!newFile && oldFile) {
        // 删除文件

        // 自动删除 服务器上的文件
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/file/delete?id=' + oldFile.response.id,
          // });
        }
      }

      // 自动上传
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    },
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(xls|xlsx)$/i.test(newFile.name)) {
          return prevent()
        }
      }

      // 创建 blob 字段 用于图片预览
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
    remove (file) {
      this.$refs.upload.remove(file)// 会触发inputFile中删除条件
    }
  },
  created () {
    let vm = this
    // console.log(vm.form)
    vm.$axios
      .post('/basedata/user/userlist', { currentPage: '1', pageSize: '10' })
      .then(function (res) {
        // console.log(res);
        vm.selectList = res.data.l
      })
      .catch(function (err) {
        console.log(err)
      })
    vm.getsf()
    vm.gettaskbq()
    // console.log(vm.form);
    vm.taskedite()
    if (vm.form.id !== '') {
      vm.taskedited()
    }
    vm.getbqlb()
  },
  computed: {
    ...Vuex.mapState({
      menulist: state => state.home.menulist
    })
  }
}
</script>
<style scoped>
.el-input {
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
  margin-bottom: 24px;
  height: 41px;
}
.el-form-item:nth-child(2) {
  margin-bottom: 24px;
  height: 51px;
}
.el-form-item__label {
  width: 150px !important;
  margin-left: -20px;
}
/*  */

.tagch >>> .el-tabs--top {
  width: 340px;
}

.tabledetail >>> .el-form-item__label {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0px 5px 0px 0px !important;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.tabledetail >>> .el-form-item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  width: 541px;
}
/* .tabledetail >>> .algoflow > .el-form-item__label {
  width: 13% !important;
} */

.el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}

.el-dialog__wrapper >>> .el-dialog {
  width: 720px !important;
  height: 550px;
  top: 3%;
}
/* .el-table__body-wrapper,
.el-table__footer-wrapper,
.el-table__header-wrapper {
  width: 101%;
} */
</style>
