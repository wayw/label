<template>
  <div class="taskerchan">

    <div class="connection"
         style="width:120px;height:211px;overflow: auto;float:left">
      <vue-tree :tree-data="getDeparList"
                v-model="checkedIds"
                :options="options"
                @handle="select" />
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
    console.log(vm.taskId)
    // if (vm.taskId) {
    vm.getdeparList()
    // vm.handle()
  },
  props: ['taskId'],
  methods: {
    // 获取组织结构
    getdeparList () {
      let vm = this
      vm.$axios
        .post('/basedata/category/get', {
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
    select (val) {
      let vm = this
      console.log(val)
      // let person = []
      vm.sedata.push({
        name: val.label,
        id: val.id.toString()
      })
      vm.$emit('changestatus', false)
      vm.$emit('checked', vm.sedata)
      //
      // console.log(vm.sedata)
    },
    tagclean () {
      let vm = this
      vm.sedata = []
    },
    changestatus () {
      let vm = this
      vm.$emit('changestatus', false)
    }
  },
  mounted () {
    // Mock axios Fig.1
    // let vm = this
    // vm.handle()
  }
}
</script>
<style scoped>
</style>
