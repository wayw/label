<template>
  <div class="mytaskdetailslist">
    <div v-if="toggle"
         class="historytable"
         style="overflow:hidden">
      <p style="margin:200px auto;color:#008ce6;font-size:16px">正在加载数据中...</p>
      <img src="@/assets/images/ball-triangle.svg"
           style="margin-top:-300px"
           alt>
    </div>
    <div class="mytaskdetaist-left">
      <div class="mytask-des">
        <p style="font-weight:700;font-size:16px;line-height:50px">项目信息</p>
        <p style="font-size:16px;display:inline-block;width: 360px;line-height:30px
    overflow: hidden;font-weight:700">任务名称:<a style="width:100px;"> {{taskName}}</a></p>

        <a style="font-size:16px;display:inline-block;font-weight:700;line-height:30px">任务简介:</a>
        <div ref="remark"
             :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
          {{remark}}
        </div>
        <div class="unfold"
             v-if="showExchangeButton"
             @click="showTotalIntro">
          <p style="text-align: center;font-size:20px">
            <i v-if="exchangeButton"
               class='el-icon-arrow-down'></i>
            <i v-else
               class='el-icon-arrow-up'></i>
          </p>
        </div>
      </div>
      <div class="mytask-progress">
        <p style="font-weight:700">当前进度</p>
        <div class="slidebox">
          <div class="slide">
            <el-slider style
                       v-model="val1"
                       :min="0"
                       :max="maxlenth"
                       disabled></el-slider>
          </div>
          <div class="slidetotal"
               style="font-size:13px;float:right;margin-top:-25px\9\0;width:15%">
            <a class="slidecount">{{val1}}</a>
            /{{maxlenth}}
          </div>
        </div>
      </div>
      <!-- <div class="mytaskBtn">
        <a class="continue"
           @click="addlist()">再加载10个</a>
      </div> -->
    </div>
    <!-- 框选图谱 -->
    <div class="mytaskdetails-right">
      <!-- <div class="mytaskdetails"
           v-if="taskTypeName !=='选择多分类'">
        <div class="textarea"
             ref="fontlength"
             style="overflow-y:auto;width: 98%;height:100%;max-height: 750px;font-size:14px;text-align:left;text-indent:23px;margin-left:20px;">
          <p style="padding:30px 0px;font-weight:700">
            标注文本：
          </p>
          <p style="line-height:80px;padding:0px 30px;"
             ref='polor'>
          </p>
        </div>
      </div> -->
      <!-- 选择多分类 -->
      <div class="mytaskdetails2">
        <div class="textarea2"
             style=" overflow:hidden;width: 98%;height:100%;max-height: 750px;font-size:14px;text-align:left;text-indent:23px;margin-left:20px;">
          <p style="padding:30px 0px 5px;font-weight:700">
            标注文本：
          </p>
          <p style="overflow-y:auto;width: 99%;font-size:16px;font-weight:300;line-height:75px"
             id="texta">
            17日下午，习近平总书记来到郑州煤矿机械集团股份有限公司考察调研。习近平总书记高度重视实体经济的发展，曾在地方考察中多次强调这件事。新华社《学习进行时》为您梳理回顾总书记关于实体经济的重要论述，与您一起学习感悟。中国必须搞实体经济，制造业是实体经济的重要基础，自力更生是我们奋斗的基点。
          </p>
        </div>
      </div>
      <!-- 选择多分类标签 -->
      <div class="labelcheck"
           v-if="taskTypeName==='选择多分类'"
           style="background:#fff;height:30%">
        <div class="mytaskitem"
             style="height:100%">
          <div class="checktag"
               style="width:97%;height:100%;margin-top:30px;position:relative">
            <span style="display:inline-block;width:88px;height:34px;background：#fff;border:1px solid ;margin-left: 3%;float:left;cursor:pointer; margin-top: 16px;color:#327ed8;line-height:34px;border-radius:34px"
                  @click="checktag()">选择标签</span>
            <p style="width:53px;margin-left:-79px;margin-top:67px;float:left;
           ">已选择：</p>
            <div class="checked"
                 style="
                  margin-left: 90px;
                  text-align: left;
                  height:94px;
                 position:absolute;
                 width:85%;
                  margin-top:62px;
                  overflow-x: hidden;
              ">
              <span style="margin-top:-27px;display:block"
                    v-if="checkedList.length == 0">
                <p style="color:red">当前没有选择标签！</p>
              </span>
              <span style="
                  line-height: 55px;"
                    v-if="checkedList.length != 0">
                <el-tag v-for="(item,index) in checkedList"
                        :key="index"
                        closable
                        @close="handleClose(item,index)"
                        style="
              margin-left:16px">{{item.name}}</el-tag>
              </span>
            </div>
          </div>

        </div>
      </div>

      <!-- <div class="flowchart-demo"
           id="flowchart-demo">
        <div class="window"
             id="flowchartWindow1">1
        </div>
        <div class="window"
             id="flowchartWindow2">2
        </div>
        <div class="window"
             id="flowchartWindow3">3
        </div>
        <div class="window"
             id="flowchartWindow4">4
        </div>
      </div> -->

      <!-- <div>
        <el-dialog title="提示"
                   :visible.sync="labelDialogVisible"
                   width="30%"
                   center>
          <el-radio-group v-if="toggle1"
                          v-model="label1">
            <el-radio v-for="(item,index) in content.labelCategories"
                      :label="item.id"
                      @change="labelchange(item.id)"
                      :key='index'>{{item.text}}</el-radio>
          </el-radio-group>
          <el-radio-group v-else
                          v-model="connect">
            <el-radio v-for="(item,index) in content.connectionCategories"
                      :label="item.id"
                      @change="labelchange(item.id)"
                      :key='index'>{{item.text}}</el-radio>
          </el-radio-group>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="labelDialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="labelsubmit()">确 定</el-button>
          </span>
        </el-dialog>
      </div> -->
      <!-- 标注 -->
      <!-- <div>
        <el-dialog title=""
                   :visible.sync="centerDialogVisible"
                   width="700px"
                   height="556px !important;"
                   center
                   border-radius="20px !important"
                   close-on-press-escape>
          <Tag ref="tagclean"
               :taskId="sendtaskId()"
               :dxtoggle="dxtoggle()"
               v-on:checked="gettag"
               v-on:changestatus="changestate"></Tag>
        </el-dialog>
      </div> -->
      <div>
        <el-dialog title=""
                   :visible="connectionVisible"
                   width="200px"
                   height="211px !important;"
                   border-radius="20px !important"
                   @close='changestate'>
          <Connection ref="connectionClean"
                      v-on:checked="gettag"
                      v-on:changestatus="changestate"></Connection>
        </el-dialog>
      </div>
      <!-- label -->
      <div>
        <el-popover placement="bottom"
                    trigger="manual"
                    class="labelpro"
                    style="top:-20000px;position:absolute"
                    v-model="labelvisible">
          <vue-tree :tree-data="Deparlist2"
                    v-model="checkedIds"
                    :options="options"
                    @handle="select2" />
        </el-popover>
      </div>
      <!-- connect -->
      <div>
        <el-popover placement="bottom"
                    trigger="manual"
                    class="connectlbox"
                    style="position:absolute;top:-20000px;"
                    v-model="connectvisible">
          <vue-tree :tree-data="Deparlist"
                    v-model="checkedIds"
                    :options="options"
                    style="height:200px;overflow-y:scroll"
                    @handle="select" />
        </el-popover>
      </div>
      <div class="btn"
           v-if="taskTypeName!=='选择多分类'">
        <div class="btn_left">
          <el-button round
                     @click="prevtask()">上一个</el-button>
        </div>
        <div class="btn_cen">
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
                @click="giveup()">放弃</span>
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
                @click="save()"
                round>确定</span>
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
                v-if="val1 == 10"
                @click="addlist()">继续</span>
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
                v-if="val1 <10">继续</span>
        </div>
        <div class="btn_right">
          <el-button round
                     @click="nexttask()">下一个</el-button>
        </div>
      </div>
      <div class="btn2"
           v-if="taskTypeName ==='选择多分类'">
        <div class="btn_left">
          <el-button round
                     @click="prevtask()">上一个</el-button>
        </div>
        <div class="btn_cen">
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
                @click="giveup()">放弃</span>
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
                @click="save()"
                round>确定</span>
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
                v-if="val1 == 10"
                @click="addlist()">继续</span>
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
                v-else-if="val1 <10">继续</span>
          <span style="text-align: center;
                width: 80px;
                height: 30px;
                background:#327ed8;
                display: inline-block;
                line-height: 30px;
                border-radius: 4px;
                margin-left: 12px;
                color:#fff;
                cursor:pointer"
                v-if="goback">
            <router-link :to="{path:'/home/taskpool'}"
                         style="color:#fff">返回</router-link>
          </span>
        </div>
        <div class="btn_right">
          <el-button round
                     @click="nexttask()">下一个</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tag from '../components/Base/tag1'
import Connection from '../components/Base/connection'
import VueTree from 'vue-simple-tree/src/components/VueTree.vue'
import jsPlumb from 'jsplumb'
// import { Annotator, Action } from 'poplar-annotation'
// import { Annotator, Action } from 'wway'
import util from '../utils/util'
export default {
  components: {
    Tag: Tag,
    Connection: Connection,
    VueTree: VueTree

  },
  data () {
    return {
      checkedIds: [],
      hover: false,
      labelvisible: true,
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
      id: '',
      val1: 1,
      selectedTextArr: [],
      historyTextArr: [],
      countindex: 0,
      centerDialogVisible: false,
      // value: "",
      value2: '',
      taskdetaisls: [],
      taskName: '',
      remark: '',
      label1: 0,
      taskId: 1,
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示的总条数
      totalNum: 10, // 总条数
      textId: 1, // 文本id
      textContent: '', // 文本内容
      textOldId: '', // 文本原始id
      textOther: '', // 文本内容辅助信息
      labelId: '', // 文本标注id
      categoryId: '', // 文本的标注类别id根据“，”分隔，以“，”结束
      categoryName: '', // 文本的标注类别name根据“，”分隔，以“，”结束
      labelStatus: '', // 文本状态（0未获取1未开始2确定3不确定4放弃）
      indexEnd: '', // 标注结束位置
      indexStart: '', // 标注开始位置
      textLabelContent: '', // 文本标注内容
      labelTime: '', // 标注时间
      labelUserId: '', // 标注人员id
      labelUserName: '', // 标注人员姓名
      // remark: '',
      taskTypeName: '',
      goback: false,
      connect: 0,
      labeluuid: 0,
      checkedList: [],
      dynamicTags: [],
      getDeparList: [],
      connectvisible: false,
      isdel: false,
      Deparlist2: [{
        id: 1,
        label: '1111',
        children: [{
          id: 122,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }, {
        id: 2,
        label: '2222',
        children: [{
          id: 222,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }, {
        id: 3,
        label: '3333',
        children: [{
          id: 322,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }, {
        id: 4,
        label: '4444',
        children: [{
          id: 422,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }, {
        id: 5,
        label: '5555',
        children: [{
          id: 5222,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }, {
        id: 6,
        label: '6666',
        children: [{
          id: 6222,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }],
      Deparlist: [{
        id: 1,
        label: '1111',
        children: [{
          id: 122,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }, {
        id: 2,
        label: '2222',
        children: [{
          id: 222,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }, {
        id: 3,
        label: '3333',
        children: [{
          id: 322,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }, {
        id: 4,
        label: '4444',
        children: [{
          id: 422,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }, {
        id: 5,
        label: '5555',
        children: [{
          id: 5222,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }, {
        id: 6,
        label: '6666',
        children: [{
          id: 6222,
          label: '22222',
          children: [{
            label: '444444'
          }]
        }]
      }],
      connid: 0,
      sedata: [],
      sedata2: [],
      dellabel: [],
      data1: [], // 标注数据
      datasetEdges: [], // 链接数据
      labelendponitArr: [], // endpiontarr
      labelArr: [],
      closable: true,
      connectdata: [],
      t: 0,
      textList1: [],
      textList: '',
      toggle: false,
      cid: '',
      uid: '',
      maxlenth: 10,
      showExchangeButton: false,
      exchangeButton: true,
      showTotal: true,
      labelDialogVisible: false,
      connectionVisible: false,
      toggle1: false,
      annotator: null,
      first: '',
      second: '',
      labelID: 0,
      content: {
        content: '',
        labelCategories: [
          // { id: 0, text: '+ 添加标注', color: '#fff', borderColor: '#fff' }
          { id: 0, text: '', color: '#327ed8', borderColor: '#327ed8' }
        ],
        labels: [],
        connectionCategories: [
          { id: 0, text: '' }
          // { id: 1, text: '限定' },
          // { id: 2, text: '是.、..的动作' }
        ],
        connections: [
          // { id: 0, categoryId: 1, fromId: 7, toId: 6 },
        ]
      }

    }
  },
  inject: ['reload'],
  created () {
    let vm = this
    console.log(vm)
    vm.getparams()
  },
  methods: {
    getparams () {
      let vm = this
      // console.log(vm.$route.params)
      // console.log({})
      if (vm.$route.params.hasOwnProperty('taskId')) {
        console.log(111)
        vm.textList1 = vm.$route.params.tasklist
        vm.gettext()
        vm.maxlenth = vm.textList1.length
        vm.taskId = vm.$route.params.taskId
        vm.remark = vm.$route.params.remark
        vm.cglist = vm.$route.params.cglist
        vm.taskName = vm.$route.params.taskname
        vm.taskTypeName = vm.$route.params.taskTypeName
        vm.gettask()
      } else {
        // console.log(222)
        vm.textList1 = vm.$store.state.home.mytaskstatus.tasklist
        vm.gettext()
        // console.log(vm.textList1)
        vm.maxlenth = vm.textList1.length
        vm.taskName = vm.$store.state.home.mytaskstatus.taskname
        vm.remark = vm.$store.state.home.mytaskstatus.remark
        // console.log(vm.maxlenth)
        vm.taskId = vm.$store.state.home.mytaskstatus.taskId
        // console.log(vm.taskId)
        vm.gettask()
      }
      // vm.getdeparList2()
      // vm.getdeparList()
    },

    gettask () {
      let vm = this
      vm.$axios
        .post('/label/task/querytaskbyid', {
          id: vm.taskId
        })
        .then(function (res) {
          vm.taskTypeName = res.data.taskTypeName
          if (vm.taskTypeName === '选择多分类') {
            vm.taskType = 13
          } else if (vm.taskTypeName === '框选多分类') {
            vm.taskType = 12
          } else {
            vm.taskType = 11
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 获取文本
    gettext () {
      let vm = this
      let m = vm.t
      let cid = vm.textList1[m].id
      vm.uid = cid
      vm.$axios
        .post('label/taskHall/getTextInfoById', {
          id: cid
        })
        .then(function (res) {
          if (vm.taskTypeName !== '选择多分类') {
            // console.log(res)
            vm.textList = res.data
            document.getElementById('texta').innerHTML = vm.textList.textContent
          } else {
            vm.textList = res.data.textContent
          }
          if (vm.taskTypeName !== '选择多分类') {
            vm.getlabel()
          }
          vm.totextlabel()
          if (res.status) {
            setTimeout(() => { vm.$_message.success('加载成功') }, 500)
          } else {
            vm.$_message.error(res.errMsg)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // connection

    // 选择label
    select2 (val) {
      let vm = this
      // console.log(val)
      if (val.up_id !== null || val.up_name !== null) {
        vm.sedata[0] = {
          name: val.label,
          id: val.id.toString()
        }
        // console.log(vm.sedata)
        vm.label1 = vm.sedata[0].id
        vm.labeltext = vm.sedata[0].name
        vm.buildlabel()
        vm.labelvisible = false
      } else {
        return false
      }
    },
    select (val) {
      let vm = this
      // console.log(val)
      // let person = []
      vm.sedata2[0] = {
        name: val.label,
        id: val.id.toString()
      }
      vm.connectlabel = vm.sedata2[0].id
      vm.connecttext = vm.sedata2[0].name
      // vm.buildlabel()
      vm.setLabel2()

      vm.connectvisible = false
      // vm.$emit('changestatus', false)
      // vm.$emit('checked', vm.sedata)
      //
      // console.log(vm.sedata)
      // setTimeout(() => {
      //   vm.connectlabel = false
      // }, 500)
    },
    tagclean () {
      let vm = this
      vm.sedata = []
    },
    // changestatus () {
    //   let vm = this
    //   vm.$emit('changestatus', false)
    // },
    //

    getdeparList () {
      let vm = this
      vm.$axios
        .post('/basedata/category/get', {
          // types: 1,
          // cg_name: ''
        })
        .then(function (res) {
          vm.tab2 = res.data
          // console.log(vm.tab)
          vm.tab3 = JSON.parse(JSON.stringify(vm.tab2).replace(/cg_name/g, 'label'))
          // console.log(vm.tab1)
          vm.DeparList = vm.tab3
          console.log(vm.Deparlist)
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
          // console.log(vm.taskId)
          vm.tab = res.data
          // console.log(vm.tab)
          vm.tab1 = JSON.parse(JSON.stringify(vm.tab).replace(/cg_name/g, 'label'))
          // console.log(vm.tab1)
          vm.Deparlist2 = vm.tab1

          // console.log(vm.Deparlist2)
          vm.isIE = util.isIE()
          // vm.handle()
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // connection () {
    //   let vm = this
    //   vm.connectionVisible = true
    // },
    textselect () {
      // let selection = window.getSelection()
      // console.log(selection)
    },

    // 框选标注
    getlabel () {
      let vm = this
      vm.$nextTick(() => {
        if (vm.annotator) {
          vm.annotator.remove()
        }
        vm.taskTypeName = vm.$store.state.home.mytaskstatus.taskTypeName
        vm.content.content = JSON.parse(JSON.stringify(vm.textList.textContent))
        // macbook 15 arch 70words
        //   vm.annotator = new Annotator(vm.content, vm.$refs['polor'], {
        //     maxLineWidth: vm.$refs.fontlength.clientWidth < 710 ? vm.$refs.fontlength.clientWidth / 30 : vm.$refs.fontlength.clientWidth < 950 ? vm.$refs.fontlength.clientWidth / 23 : vm.$refs.fontlength.clientWidth / 20, // maxlength words on line
        //     allowMultipleLabel: false
        //   })
        //   // 建立标签
        //   vm.annotator.on('textSelected', (startIndex, endIndex) => {
        //     vm.indexEnd = endIndex
        //     vm.indexStart = startIndex
        //     vm.toggle1 = true
        //     vm.centerDialogVisible = true
        //     vm.textLabelContent = vm.textList.textContent.slice(startIndex, endIndex)
        //     // vm.annotator.applyAction(
        //     //   Action.Label.Create(0, vm.indexStart, vm.indexEnd)
        //     // )
        //   })
        //   // 修改标签
        //   if (vm.taskTypeName === '选择多分类') {
        //     vm.annotator.on('label', (id) => {
        //       return false
        //     })
        //   }
        //   if (vm.taskTypeName === '框选多分类') {
        //     // vm.annotator.on('labelClicked', (id) => {
        //     //   return false
        //     // })
        //   }
        //   vm.annotator.on('Closetag', (id, x1, y1) => {
        //     vm.centerDialogVisible = false

        //     vm.annotator.applyAction(
        //       Action.Label.Delete(id)
        //     )
        //   })
        //   vm.annotator.on('labelRightClicked', (id, x1, y1) => {
        //     // vm.centerDialogVisible = false
        //     (() => {
        //       vm.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //       }).then(() => {
        //         vm.annotator.applyAction(
        //           Action.Label.Delete(id)
        //         )
        //         vm.$_message.warning('删除成功!')
        //       }).catch(() => {

        //       })
        //     })()
        //   })
        //   if (vm.taskTypeName === '图谱标注') {
        //     vm.annotator.on('label', (id) => {
        //       // vm.centerDialogVisible = true
        //       // vm.annotator.applyAction(
        //       //   Action.Label.Delete(id)
        //       // )
        //     })
        //     // 建立链接
        //     vm.annotator.on('twoLabelsClicked', (first, second) => {
        //       vm.toggle1 = false
        //       vm.first = first
        //       vm.second = second

        //       // vm.labelDialogVisible = true
        //       // vm.connection()
        //       console.log(vm.$refs)
        //       // vm.$refs.connection.$el.lastChild.style.display = 'block'
        //       vm.connectionVisible = true
        //       // vm.getconnection()
        //     })

        //     // 修改链接

        //     // 删除链接
        //     vm.annotator.on('connectionRightClicked', (id, x, y) => {
        //       (() => {
        //         vm.$confirm('此操作将永久删除该连接, 是否继续?', '提示', {
        //           confirmButtonText: '确定',
        //           cancelButtonText: '取消',
        //           type: 'warning'
        //         }).then(() => {
        //           vm.annotator.applyAction(
        //             Action.Connection.Delete(id)
        //           )
        //           vm.$_message.warning('删除成功!')
        //         }).catch(() => {

        //         })
        //       })()
        //     })
        //   }
      })
    },
    gettag (data) {
      let vm = this
      vm.checkedList = data
      if (vm.taskTypeName !== '选择多分类') {
        vm.label1 = parseInt(data[0].id)
        vm.labeltext = data[0].name
        // for (let i in vm.checkedList) {
        //   vm.content.labelCategories[i].text = vm.checkedList[i].name
        //   vm.content.labelCategories[i].id = parseInt(vm.checkedList[i].id)
        //   vm.content.connectionCategories[i].text = vm.checkedList[i].name
        //   vm.content.connectionCategories[i].id = parseInt(vm.checkedList[i].id)
        //   // vm.content.labelCategories[i].color = ''
        // }
        // // let data1 = [];
        // for (let i in vm.content.labelCategories) {
        //   vm.annotator.store.labelCategoryRepo.add(vm.content.labelCategories[i])
        // }
        // for (let i in vm.content.connectionCategories) {
        //   vm.annotator.store.connectionCategoryRepo.add(vm.content.connectionCategories[i])
        // }
        // if (vm.toggle1) {
        //   vm.creatlabel()
        // } else {
        //   vm.Connectionlabel()
        // }
        // vm.buildlabel()
      }
    },
    creatlabel () {
      let vm = this
      // 建立标签
      // vm.annotator.applyAction(
      //   Action.Label.Create(vm.label1, vm.indexStart, vm.indexEnd)
      // )
      vm.data1.push({
        id: vm.annotator.store.labelRepo.nextId - 1,
        indexStart: vm.indexStart,
        indexEnd: vm.indexEnd,
        textLabelContent: vm.textLabelContent,
        categoryId: vm.checkedList[0].id,
        categoryName: vm.checkedList[0].name
      })
      vm.$refs.tagclean.tagclean()
      vm.content.content = ''
    },
    getconnection () {
      let vm = this
      vm.$axios
        .post('/basedata/category/get', {
          1: ''
        })
        .then(function (res) {
          vm.t = 0
          if (res.status) {
            vm.$_message.success('加载成功')
          } else {
            vm.$_message(res.errMsg)
            vm.maxlenth = 0
            //
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    Connectionlabel () {
      let vm = this
      // console.log(vm.checkedList)
      // vm.annotator.applyAction(
      //   Action.Connection.Create(vm.label1, vm.first, vm.second)
      // )
      vm.connectdata.push({
        id: vm.annotator.store.connectionRepo.nextId - 1,
        categoryId: vm.checkedList[0].id,
        categoryName: vm.checkedList[0].name,
        fromId: vm.first,
        toId: vm.second
      })
      vm.$refs.connectionClean.tagclean()
    },
    addlist () {
      let vm = this
      vm.taskId2 = vm.taskId
      vm.$axios
        .post('/label/taskHall/getTextListByTaskId', {
          id: vm.taskId2
        })
        .then(function (res) {
          vm.textList1 = res.data
          vm.t = 0
          vm.val1 = 1
          vm.maxlenth = vm.textList1.length
          if (res.status) {
            // vm.$_message.success('加载成功')
            vm.gettext()
          } else {
            vm.$_message.warning(res.errMsg)
            vm.maxlenth = 0
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 选择标签
    checktag () {
      let vm = this
      vm.gettagclean2()
      vm.centerDialogVisible = true
      setTimeout(() => {
        vm.gettagarr2()
      }, 50)
    },
    // 获取标签列表
    gettagarr2 () {
      // let vm = this
      // vm.$refs.tagclean.gettagarr()
    },
    changestate (data) {
      let vm = this
      vm.centerDialogVisible = data
      vm.connectionVisible = data
      // if (vm.taskTypeName === '图谱标注') {
      //   setTimeout(() => {
      //     vm.$refs.connectionClean.tagclean()
      //   }, 1000)
      // }
    },
    handleClose (item, index) {
      let vm = this
      vm.checkedList.splice(vm.checkedList.indexOf(item), 1)
      vm.$refs.tagclean.tagdel(index)
    },
    cancelTask () {
      let vm = this
      this.$axios
        .post('/label/taskHall/updateTaskAssignStatus', {
          taskId: vm.taskId,
          assignStatus: 0
        })
        .then(function (res) { })
        .catch(function (err) {
          console.log(err)
        })
    },
    gettagclean2 () {
      let vm = this
      setTimeout(() => {
        vm.$refs.tagclean.tagclean()
      }, 150)
    },
    sendtaskId () {
      let vm = this
      return vm.taskId
    },
    // dxtoggle () {
    //   let vm = this
    //   if (vm.taskTypeName !== '选择多分类') {
    //     return false
    //   } else {
    //     return true
    //   }
    // },
    // save () {
    //   let vm = this
    //   let textLabelArr = []
    //   let textconnectionArr = []
    // let labeldata = []
    // let condata = []
    // if (vm.taskTypeName !== '选择多分类') {
    //   let labelRepo = vm.annotator.store.labelRepo.entities
    //   vm.data1.forEach((arr) => {
    //     labelRepo.forEach((list) => {
    //       if (arr.id === list.id) {
    //         labeldata.push(arr)
    //       }
    //     })
    //   })
    //   let conRepo = vm.annotator.store.connectionRepo.entities
    //   vm.connectdata.forEach((arr) => {
    //     conRepo.forEach((list) => {
    //       if (arr.id === list.id) {
    //         condata.push(arr)
    //       }
    //     })
    //   })
    // }
    // if (vm.checkedList.length > 0) {
    //   if (vm.taskTypeName === '选择多分类') {
    //     textLabelArr = vm.checkedList
    //   }
    //   if (vm.taskTypeName === '框选多分类') {
    //     textLabelArr = JSON.parse(JSON.stringify(labeldata))
    //   }
    //   if (vm.taskTypeName === '图谱标注') {
    //     textLabelArr = JSON.parse(JSON.stringify(labeldata))
    //     textconnectionArr = JSON.parse(JSON.stringify(condata))
    //   }
    // vm.$axios
    //   .post('/label/taskHall/submit', {
    //     textId: vm.uid,
    //     taskId: vm.taskId.toString(),
    //     labels: textLabelArr,
    //     connections: textconnectionArr,
    //     taskType: vm.taskType
    //   })
    //   .then(function (res) {
    //     vm.$_message.success('保存成功')
    //     setTimeout(() => {
    //       vm.gettagclean2()
    //     }, 50)
    //     vm.data1 = []
    //     vm.connectdata = []
    //     vm.nexttask()
    //     textLabelArr = []
    //   })
    //   .catch(function (err) {
    //     console.log(err)
    //   })
    // } else {
    //   vm.$_message.warning('您还没有选择标签')
    // }
    // },
    save () {
      let vm = this
      vm.$axios
        .post('/label/taskHall/submit', {
          textId: vm.uid,
          taskId: vm.taskId.toString(),
          labels: vm.selectedTextArr,
          // connections: textconnectionArr,
          taskType: vm.taskType
        })
        .then(function (res) {
          vm.$_message.success('保存成功')
          setTimeout(() => {
            vm.gettagclean2()
          }, 50)
          vm.data1 = []
          vm.connectdata = []
          vm.nexttask()
          // textLabelArr = []
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    giveup () {
      let vm = this
      vm.data1 = []
      vm.$axios
        .post('/label/taskHall/submit', {
          textId: vm.uid,
          textStatus: 3,
          taskId: vm.taskId.toString(),
          textLabelArr: [
            {
              indexStart: 0,
              indexEnd: 0,
              textLabelContent: '',
              categoryId: '',
              categoryName: ''
            }
          ]
        })
        .then(function (res) {
          if (res.status) {
            vm.$_message.warning('您已放弃标注这个任务')
            setTimeout(() => {
              vm.gettagclean2()
            }, 500)
            vm.nexttask()
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // maybe () {
    //   let vm = this
    //   vm.data1 = []
    //   vm.$axios
    //     .post('/label/taskHall/saveTextLabel', {
    //       textId: vm.uid,
    //       textStatus: 4,
    //       taskId: vm.taskId.toString(),
    //       textLabelArr: [
    //         {
    //           indexStart: 0,
    //           indexEnd: 0,
    //           textLabelContent: '',
    //           categoryId: '',
    //           categoryName: ''
    //         }
    //       ]
    //     })
    //     .then(function (res) {
    //       if (res.status) {
    //         vm.$message({
    //           message: '不确定类别',
    //           type: 'warning'
    //         })
    //         setTimeout(() => {
    //           vm.gettagclean2()
    //         }, 500)
    //         vm.nexttask()
    //       }
    //     })
    //     .catch(function (err) {
    //       console.log(err)
    //     })
    // },
    nexttask () {
      let vm = this
      vm.checkedList = []
      vm.labelvisible = false
      // console.log(vm.j)
      // vm.j.deleteConnectionsForElement()
      vm.j.reset()
      vm.selectedTextArr = []
      if (vm.t >= vm.maxlenth - 1) {
        if (vm.t >= 9) {
          vm.$_message.warning('这个任务已经完成了,试试在加载点数据吧')
        } else {
          vm.goback = true
          vm.$_message.warning('该任务无可获取文本！')
        }
      } else {
        if (vm.val1 >= 1 && vm.val1 <= 9) { ++vm.val1 }
        vm.data1 = []
        ++vm.t
        vm.gettext()
        if (vm.taskTypeName !== '选择多分类') {
          vm.getlabel()
        }
      }
    },
    prevtask () {
      let vm = this
      vm.checkedList = []
      vm.labelvisible = false
      vm.selectedTextArr = []
      vm.data1 = []
      vm.connectdata = []

      if (vm.val1 <= 10 && vm.val1 > 1) {
        --vm.val1
      }
      if (vm.t > 0) {
        --vm.t
        vm.gettext()
        if (vm.taskTypeName !== '选择多分类') {
          vm.getlabel()
        }
      } else {
        vm.$_message.warning('当前已经是第一个文本了')
        vm.val1 = 1
        vm.t = 0
      }
    },
    getHeight () {

    },
    // 显示隐藏简介
    showTotalIntro () {
      this.showTotal = !this.showTotal
      this.exchangeButton = !this.exchangeButton
    },
    remark1 () {
      this.$nextTick(function () {
        let descHeight = window.getComputedStyle(this.$refs.remark).height.replace('px', '')
        if (descHeight > 60) {
          // 显示展开收起按钮
          this.showExchangeButton = true
          this.exchangeButton = true
          // 不是显示所有
          this.showTotal = false
        } else {
          // 不显示展开收起按钮
          this.showExchangeButton = false
          // 没有超过四行就显示所有
          this.showTotal = true
        }
      })
    },
    totextlabel () {
      let vm = this

      // vm.$nextTick(() => {
      window.onload = new function () { // new
        function $ (id) {
          return typeof id === 'string' ? document.getElementById(id) : null
        }

        // 监听鼠标抬起
        $('texta').onmouseup = function (event) {
          var e = event || window.event
          let labelbox = document.getElementsByClassName('labelpro')[0]
          labelbox.style.top = e.clientY + 20 + 'px '
          labelbox.style.left = e.clientX - 200 + 'px '
          labelbox.style.position = 'absolute'

          // 获取选中的文字
          var selectedText
          vm.indexStart1 = window.getSelection().anchorOffset
          vm.indexEnd1 = window.getSelection().focusOffset
          if (vm.indexStart1 > vm.indexEnd1) {
            let t = vm.indexEnd1
            vm.indexEnd1 = vm.indexStart1
            vm.indexStart1 = t
          }
          // 获取绝对位置
          if (e.target.nodeName !== 'SPAN' && e.target.nodeName !== 'I') {
            var range = window.getSelection().getRangeAt(0)
            var offset = 0
            vm.str = ''
            vm.precount = 0
            vm.precountarr = []
            var container = range.startContainer
            while (container.previousSibling) {
              // console.error(container.previousSibling)
              // vm.tfirst = 0
              let reg = /\b(i>).*?(<a)\b/
              if (container.previousSibling.innerHTML !== undefined) {
                vm.tfirst++
                // console.error(container.previousSibling.innerHTML)
                let cstr = container.previousSibling.innerHTML.match(reg)[0]
                cstr.substring(2, cstr.length - 2)
                vm.str += cstr.substring(2, cstr.length - 2).trim()
                offset += cstr.substring(2, cstr.length - 2).trim().length
                container = container.previousSibling
                vm.precount++
                vm.precountarr.push(cstr.substring(2, cstr.length - 2).trim().length)
              } else {
                // if (vm.tfirst === 0) {
                //   vm.nopre = true
                //   offset += container.previousSibling.length
                //   break
                // } else {
                offset += container.previousSibling.length
                container = container.previousSibling
                // }
              }
            }
            vm.offset = offset

            if (util.isIE() === -1 || util.isIE() === 11 || util.isIE() === 'edge') { // 标准模式
              selectedText = window.getSelection().toString()
              // console.log(selectedText)
              // console.log(vm.indexStart1)
              // console.log(vm.indexEnd1)
            } else { // IE 系列
              selectedText = document.selection.createRange().text
            }
            if (selectedText !== '') {
              vm.selectedText = selectedText
              vm.labelvisible = true
            } else {
              vm.labelvisible = false
              labelbox.style.top = -200000 + 'px '
              labelbox.style.left = e.clientX - 200 + 'px '
            }
          }
        }

        // for (let len = vm.countindex, i = 0; i < len; i++) {
        //   document.getElementsByClassName('textselet' + i).onmouseenter = (e) => {
        //     // vm.clearlabel(e.srcElement.classList[0], e.srcElement.parentElement)
        //     document.getElementsByClassName('cl' + vm.countindex).style.display = 'block'
        //   }
        //   document.getElementsByClassName('textselet' + vm.countindex).onmouseleave = (e) => {
        //     // vm.clearlabel(e.srcElement.classList[0], e.srcElement.parentElement)
        //     // vm.hover = false
        //     document.getElementsByClassName('cl' + vm.countindex).style.display = 'none'
        //   }
        // }

        // 监听文档的点击
        document.onmousedown = function (event) {
          var e = event || window.event
          var targetId = e.target ? e.target.id : e.srcElement.id

          if (targetId !== 'share') {
            // $('share').style.display = 'none'
          }
          // console.log(e)
          if (e.srcElement.className.indexOf('textselet') !== -1) {
            let startid = e.target.id.substring(10)
            if (startid) {
              e.target.onclick = (e) => {
                // console.log('222222', startid)
                if (vm.endid !== '') {
                  vm.startid = ''
                  if (vm.startid === '') {
                    vm.endid = ''
                    vm.startid = e.target.id
                  }
                } else {
                  vm.endid = e.target.id
                }
                if (vm.startid !== '' && vm.endid !== '') {
                  if (vm.startid !== vm.endid) {
                    vm.conlabel(vm.labeluuid++)
                  }
                }

                return false
              }
            }
          }
          if (e.srcElement.className.indexOf('labelselet') !== -1) {
            e.target.onclick = (e) => {
              return false
            }
          }
          // 为icon 添加事件
          if (e.srcElement.className.indexOf('cl') !== -1) {
            e.target.onclick = (e) => {
              // console.log(e)
              // console.log(vm)
              var classList = e.target.className.split(' ')[0]
              vm.clearlabel(classList, e.srcElement.parentElement)
            }
          }

          window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
        }
      }()
      // })
    },
    // 创建label
    buildlabel () {
      let vm = this
      function $ (id) {
        return typeof id === 'string' ? document.getElementById(id) : null
      }
      function v (l) {
        return typeof l === 'string' ? document.getElementsByClassName(l) : null
      }

      var text = $('texta')
      var texthtml = vm.textList.textContent
      let isfirst = vm.labelArr.length <= 0
      //
      if (isfirst) {
        vm.indexStart = vm.indexStart1
        vm.indexEnd = vm.indexEnd1
        // console.log(vm.indexStart)
        // console.log(vm.indexEnd)
      } else {
        for (let i = 0; i < vm.defaulttext.length; i++) {
          if (vm.defaulttext[i].length > 2) {
            vm.defaulttext[i] = '*'
          }
        }
        // 计算之前label 所占的位数
        // console.log(vm.precountarr)
        vm.dellcount = 0
        for (let i = 0; i < vm.precountarr.length; i++) {
          vm.dellcount += vm.precountarr[i]
        }
        // console.log(vm.indexStart1)
        // 删除label 后第一次错位，暂时解决办法
        if (vm.isdel) {
          // if (!vm.nopre) {
          vm.indexStart = vm.indexStart1 + vm.offset - vm.dellcount - 1
          vm.indexEnd = vm.indexStart + vm.selectedText.length
          vm.isdel = false
          // } else {
          //   vm.indexStart = vm.indexStart1
          //   vm.indexEnd = vm.indexStart + vm.selectedText.length
          //   vm.isdel = false
          // }
        } else {
          vm.indexStart = vm.indexStart1 + vm.offset - vm.dellcount
          vm.indexEnd = vm.indexStart + vm.selectedText.length
        }
        // console.error(vm.startIndex)
        // console.error(vm.indexEnd)
      }

      var color = '#ffe184'
      vm.selectedTextArr.push({ id: vm.countindex, text: vm.selectedText, startIndex: vm.indexStart, endIndex: vm.indexEnd, categoryName: vm.labeltext, categoryId: vm.label1 })
      vm.historyTextArr.push({ id: vm.countindex, text: vm.selectedText, startIndex: vm.indexStart, endIndex: vm.indexEnd, categoryName: vm.labeltext, categoryId: vm.label1 })

      vm.labelArr.push({ origin: vm.selectedText, text: '<span id="textselect' + vm.countindex.toString() + '"  class="textselet' + vm.countindex.toString() + '" style="background: ' + color + '; display:inline-block;user-select:none;-moz-user-select: none;-ms-user-select: none;-webkit-user-select: none;font-weight:600;line-height:30px;position:relative;border-radius:3px">' + '<i  v-if=' + vm.hover + ' class="cl' + vm.countindex.toString() + ' el-icon-circle-close" style="position:absolute;right:-4px;margin-top:-8px;cursor:pointer;display:none"  ></i>' + vm.selectedText + '<a class="labelselet' + vm.countindex.toString() + '" style = "margin:2px 10px; font-size:14px;color:#583fca"> ' + vm.labeltext + '</a> ' + '</span > ', startIndex: vm.indexStart, endIndex: vm.indexEnd })
      // console.log(vm.labelArr)
      vm.$nextTick(() => {
        let defaulttext = texthtml.split('')
        for (let i = 0, len = vm.labelArr.length; i < len; i++) {
          defaulttext.splice(vm.labelArr[i].startIndex, (vm.labelArr[i].endIndex - vm.labelArr[i].startIndex), vm.labelArr[i].text)

          text.innerHTML = defaulttext.join('')
          vm.defaulttext = defaulttext
        }
      })

      vm.dellabel.push(v('textselet' + vm.countindex.toString())[0])
      vm.countindex++
      if (vm.j !== undefined) {
        vm.$nextTick(() => {
          let setting = {
            paintStyle: { stroke: '#1683F7', strokeWidth: 3 },
            connectorStyle: { stroke: '#1683F7', strokeWidth: 3 },
            connectorHoverStyle: { stroke: '#FF0000', strokeWidth: 3 },
            hoverPaintStyle: { stroke: '#1683F7', strokeWidth: 3 }
          }
          // 初始化 删除所有连接
          vm.j.reset()
          // 重绘链接
          vm.j.setSuspendDrawing(true)

          vm.datasetEdges.forEach(item => {
            vm.j.connect({
              source: item.source,
              target: item.target,
              label: item.label,
              connector: 'Flowchart'
            }, setting)
          })

          vm.j.setSuspendDrawing(false, true)
        })
      }

      // 为每一个添加删除icon
      vm.$nextTick(() => {
        for (let i = 0; i <= vm.labelArr.length; i++) {
          // console.log(document.getElementsByClassName('textselet' + i))
          if (document.getElementsByClassName('textselet' + i).length !== 0) {
            document.getElementsByClassName('textselet' + i)[0].onmouseover = (e) => {
              document.getElementsByClassName('cl' + i)[0].style.display = 'block'
            }
            document.getElementsByClassName('textselet' + i)[0].onmouseleave = (e) => {
              document.getElementsByClassName('cl' + i)[0].style.display = 'none'
            }
          }
        }
      })
    },
    // 清除label
    clearlabel (del, parentElement) {
      let vm = this
      function v (l) {
        return typeof l === 'string' ? document.getElementsByClassName(l) : null
      }

      var textnode = parentElement.textContent
      var textmain = textnode.split(' ')[0]
      var newText = document.createTextNode(textmain)
      v(parentElement.className)[0].parentNode.replaceChild(newText, parentElement)
      if (vm.j !== undefined) {
        vm.$nextTick(() => {
          let setting = {
            paintStyle: { stroke: '#1683F7', strokeWidth: 3 },
            connectorStyle: { stroke: '#1683F7', strokeWidth: 3 },
            connectorHoverStyle: { stroke: '#FF0000', strokeWidth: 3 },
            hoverPaintStyle: { stroke: '#1683F7', strokeWidth: 3 }
          }
          vm.j.reset()
          vm.j.setSuspendDrawing(true)

          vm.datasetEdges.forEach(item => {
            vm.j.connect({
              source: item.source,
              target: item.target,
              label: item.label,
              connector: 'Flowchart'
            }, setting)
          })
          vm.j.setSuspendDrawing(false, true)
        })
      }

      let delid = parseInt(del.slice(2))
      vm.selectedTextArr.splice(delid, 1)
      let deltextstartindex = vm.labelArr[delid].startIndex
      // 删除连线
      let replacetext = textmain.split('')
      // console.log('oneee' + vm.defaulttext)

      vm.defaulttext.splice(deltextstartindex, 1, replacetext)
      // console.log('no' + vm.defaulttext)
      vm.defaulttext = vm.defaulttext.flat()

      // console.error('flat' + vm.defaulttext)
      vm.labelArr.splice(delid, 1)

      console.log(delid)
      for (let i = delid; i < vm.labelArr.length; i++) {
        vm.labelArr[i].startIndex = vm.labelArr[i].startIndex + replacetext.length - 1
        vm.labelArr[i].endIndex = vm.labelArr[i].endIndex + replacetext.length - 1
      }
      console.log(vm.defaulttext)
      console.log(vm.labelArr)
      vm.isdel = true
    },
    conlabel (id) {
      let vm = this
      jsPlumb.jsPlumb.ready(function () {
        vm.j = jsPlumb.jsPlumb.getInstance({
          Anchor: 'TopCenter',
          ConnectionOverlays: [
            ['Label', {
              location: [0.5],
              id: 'label' + id,
              labelStyle: {
                fillStyle: 'white'
              },
              cssClass: 'label' + id
            }]
          ],
          Endpoint: ['Dot', { radius: 1 }], // 这个是控制连线终端那个小点的半径
          Container: 'svg'
        })
      })
      let setting = {
        paintStyle: { stroke: '#1683F7', strokeWidth: 3 },
        connectorStyle: { stroke: '#1683F7', strokeWidth: 3 },
        connectorHoverStyle: { stroke: '#FF0000', strokeWidth: 3 },
        hoverPaintStyle: { stroke: '#1683F7', strokeWidth: 3 }
      }
      vm.conn = vm.j.connect({
        source: vm.startid,
        target: vm.endid,
        label: '',
        connector: 'Flowchart'
      }, setting)

      let connectlbox = document.getElementsByClassName('connectlbox')[0]
      let jsPlumblabel = document.getElementsByClassName('label' + id)[0]
      connectlbox.style.top = jsPlumblabel.style.top
      connectlbox.style.left = jsPlumblabel.style.left
      // connectlbox.style.top = jsPlumblabel.style.top.slice(0, jsPlumblabel.style.top.length - 2) + 30 + 'px'
      // connectlbox.style.left = jsPlumblabel.style.left.slice(0, jsPlumblabel.style.top.length - 2) - 50 + 'px'
      console.log(connectlbox.style.top, connectlbox.style.left)
      vm.connectvisible = true
      vm.changeid = id
      vm.conn.id = vm.connid++
      if (vm.endid !== '') {
        vm.datasetEdges.push({
          id: vm.conn.id,
          source: vm.startid,
          target: vm.endid,
          label: vm.labeltext,
          connector: 'Flowchart'
        })
        console.log(vm.datasetEdges)
      }
      vm.j.bind('click', function (conn, originalEvent) {
        console.log(conn)
        // vm.j.deleteConnection(conn)
        vm.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.j.deleteConnection(conn)
          vm.datasetEdges.splice(conn.id, 1)
          console.log(vm.datasetEdges)
          vm.$_message.warning('删除成功!')
        }).catch(() => {
          console.log('3333')
        })
        // })()
      })
    },
    setLabel2 () {
      let vm = this
      let setting = {
        paintStyle: { stroke: '#1683F7', strokeWidth: 3 },
        connectorStyle: { stroke: '#1683F7', strokeWidth: 3 },
        connectorHoverStyle: { stroke: '#FF0000', strokeWidth: 3 },
        hoverPaintStyle: { stroke: '#1683F7', strokeWidth: 3 }
      }
      vm.c = vm.j.connect({
        source: vm.startid,
        target: vm.endid,
        connector: 'Flowchart'
      }, setting)
      vm.selabel = vm.c.getOverlay('label' + vm.changeid)
      vm.selabel.setLabel(vm.connecttext)
    }
  },
  mounted () {
    let vm = this
    vm.remark1()
    window.screenWidth = document.body.clientWidth
    vm.screenWidth = window.screenWidth
    window.onresize = () => {
      return (() => {
        vm.$nextTick(() => {
          let setting = {
            paintStyle: { stroke: '#1683F7', strokeWidth: 3 },
            connectorStyle: { stroke: '#FF0000', strokeWidth: 3 },
            connectorHoverStyle: { stroke: '#1683F7', strokeWidth: 3 },
            hoverPaintStyle: { stroke: '#1683F7', strokeWidth: 3 }
          }
          vm.j.reset()
          vm.j.setSuspendDrawing(true)

          vm.datasetEdges.forEach(item => {
            vm.j.connect({
              source: item.source,
              target: item.target,
              label: item.label,
              connector: 'Flowchart'
            }, setting)
          })
          vm.j.setSuspendDrawing(false, true)
        })
      })()
    }
  }
}
</script>
<style >
.el-dialog--center {
  height: 550px !important;
}
.el-dialog {
  height: 310px;
}
.el-slider__runway.disabled .el-slider__bar {
  background-color: #409eff;
}

svg > text tspan {
  padding-left: 10px;
  font-size: 20px;
}
svg {
  padding-left: 20px;
  padding-right: 20px;
  overflow: inherit !important;
}
.total-introduce {
  overflow: hidden;
  font-size: 14px;
  color: #434343;
  height: auto;
  width: 290px;
  margin-left: 75px;
  margin-top: -30px;
  line-height: 25px;
}

.detailed-introduce {
  font-size: 14px;
  color: #434343;
  position: relative;
  overflow: hidden;
  height: 52px;
  width: 290px;
  margin-left: 75px;
  margin-top: -30px;
  line-height: 25px;
}
.jtk-overlay {
  background: #fff;
  z-index: 99999;
}
/* a[class*="el-icon-circle-close"] {
  display: block;
  background: #ffff00;
}
a[class*="el-icon-circle-close"] {
  display: block !important;
  /* background: #ffff00; */
/* } */
/* #texta > span > a:hover a[class*="el-icon-circle-close"] {
  display: block;
  background: #ffff00;
} */
</style>
