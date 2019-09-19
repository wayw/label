<template>
  <div class="content">

    <div v-if="List == '' "
         style="overflow:hidden;width:100%">
      <p v-if="inde != 0"
         style="margin:200px auto;color:#008ce6;font-size:16px;overflow:hidden;width:100%">暂无结果，请重新输入！</p>

      <div v-if="inde === 0"
           style="position: absolute;
                  left: 43%;
                  top: 44%;
                  width: 218px;">
        <p style="
          color:#008ce6;font-size:16px">正在加载数据中...</p>
        <img src="@/assets/images/ball-triangle.svg"
             alt>
      </div>
    </div>
    <div v-if="List2 == '' "
         style="overflow:hidden;width:100%">
      <div class="historytable"
           style="overflow:hidden">
        <p style="margin:200px auto;color:#008ce6;font-size:16px">正在加载数据中...</p>
        <img src="@/assets/images/ball-triangle.svg"
             style="margin-top:-300px"
             alt>
      </div>
    </div>
    <div v-if="List2 !== '' "
         class="page">
      <div class="list"
           v-for="(item,index) in List "
           :key="index">

        <ul style="padding:21px 0px 0px;"
            @click="mylist(item)">

          <li>
            任务名称：
            <a href="javascript:;">{{item.taskName}}</a>
          </li>
          <li>
            任务类型：
            <a href="javascript:;">{{item.taskTypeName}}</a>
          </li>
          <li>
            任务状态：
            <a href="javascript:;">{{item.dataStatus|tostate}}</a>
          </li>
          <li>
            文本数量：
            <a href="javascript:;">{{item.textCount}}</a>
          </li>
          <li>
            创建时间：
            <a href="javascript:;">{{item.inputTime}}</a>
          </li>
          <li style="width: 270px;
          margin: 1px 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          height:19px;
           ">
            任务简介：
            <a href="javascript:;">{{item.remark}}</a>
          </li>

        </ul>
        <div class="button">
          <a style="display: block;
                height: 100%;
                width: 100%;
                line-height: 30px;
               border:1px solid #eeeeee;border-radius:5px"
             @click="mylist(item)">
            开始任务
          </a>
        </div>

        <div class="images"
             style="position: absolute;
                  margin-top: -167px;
                  margin-left:21px;">
          <img src="../../assets/images/qubiezhen.png"
               alt="">
        </div>

      </div>
      <div class="list2"
           style="background:#f1f1f1;border:0px"
           v-show="(List.length<9?1:0) ">
      </div>
      <div class="list2"
           style="background:#f1f1f1;border:0px"
           v-show="(List.length<10?1:0) ">
      </div>
      <div class="list2"
           style="background:#f1f1f1;border:0px"
           v-show="(List.length<11? 1:0)">
      </div>
      <div class="list2"
           style="background:#f1f1f1;border:0px"
           v-show="(List.length<12 ? 1:0) ">
      </div>
    </div>

  </div>
</template>
<script>
import Vuex from 'vuex'

export default {
  data () {
    return {
      table: [],
      taskName: '',
      currentPage: 1,
      total: 0,
      page: 1,
      pageSize: 9,
      pageNum: 1,
      val: 1,
      taskId: '',
      labeldata: {},
      cglist: [],
      List2: ['1'],
      toggle: false
    }
  },
  props: {
    List: Array,
    active: Number,
    inde: Number
  },
  created () {
  },
  mounted () {
  },
  filters: {
    tostate: val => {
      // console.log(val)
      switch (val) {
        case 1:
          return val.toString().replace(/1/, '未开始')
        case 2:
          return val.toString().replace(/2/, '暂停')
        case 3:
          return val.toString().replace(/3/, '正在进行')
        case 4:
          return val.toString().replace(/4/, '结束')
        case 5:
          return val.toString().replace(/5/, '强制结束')
      }
      // console.log(val)
    }
  },
  methods: {
    ...Vuex.mapActions({
      handlemytask: 'home/getmytask'
    }),
    mylist (item) {
      let vm = this
      vm.labeldata = item
      vm.taskdetails(vm.labeldata.id)
      vm.mytask()
    },
    taskdetails (para) {
      let vm = this
      vm.$axios
        .post('/label/task/querytaskbyid', { id: para })
        .then(function (res) {
          vm.cglist = res.data.cglist
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    mytask () {
      let vm = this

      vm.List2 = ''

      // let status = false
      vm.$emit('clearlist2')
      vm.$router.push({
        name: `mydetails`,
        params: {
          taskId: vm.labeldata.id,
          remark: vm.labeldata.remark,
          taskname: vm.labeldata.taskName,
          taskTypeName: vm.labeldata.taskTypeName,
          cglist: vm.cglist
          // tasklist: res.data
        }
      })
      // vm.$axios
      //   .post('/label/taskHall/getTextListByTaskId', {
      //     id: vm.labeldata.id
      //   })
      //   .then(function (res) {
      //     let data =
      //     {
      //       taskId: vm.labeldata.id,
      //       remark: vm.labeldata.remark,
      //       taskname: vm.labeldata.taskName,
      //       taskTypeName: vm.labeldata.taskTypeName,
      //       cglist: vm.cglist,
      //       tasklist: res.data
      //     }
      //     vm.handlemytask(data)
      //     if (res.status) {
      //       vm.List2 = JSON.parse(JSON.stringify(vm.List))
      //       // vm.handle(data)
      //       vm.$router.push({
      //         name: `mydetails`,
      //         params: {
      //           taskId: vm.labeldata.id,
      //           remark: vm.labeldata.remark,
      //           taskname: vm.labeldata.taskName,
      //           taskTypeName: vm.labeldata.taskTypeName,
      //           cglist: vm.cglist,
      //           tasklist: res.data
      //         }
      //       })
      //     } else {
      //       vm.$message({
      //         message: res.errMsg,
      //         type: 'info',
      //         duration: '500'
      //       })
      //       vm.List2 = [1]
      //     }
      //   }).catch(function (err) {
      //     console.log(err)
      //     vm.$message({
      //       message: err,
      //       type: 'info',
      //       duration: '500'
      //     })
      //     vm.List2 = [1]
      //   })
    }
  },
  computed: {
    ...Vuex.mapState({
      status: state => state.home.taskstatus
    })
  }
}
</script>
<style>
/* .list > ul > li > a:hover {
  color: #008ce6;
} */
.list:hover .button > a {
  background: #327ed8;
  color: #fff;
  border-radius: 5px;
}
.list > .button > a {
  background: #f7f7f7;
  color: #666666;
  border-radius: 5px;
}
.list:hover {
  /* box-shadow: 6px 1px 8px #d2d4da; */
  /* box-shadow: 2px 22px 3px #d2d4da; */
  box-shadow: 0px 0px 19px 1px rgba(1, 16, 64, 0.3);
  transform: scale(1.012);
}
</style>
