<template>
  <div class="home">
    <div class="left">
      <Header></Header>
    </div>
    <div class="right">
      <Tab></Tab>
      <div class="mytasktab">
        <TabTwo v-if="active == 'false'"
                :tabdata="List1"></TabTwo>
        <TabTwo v-if="active == 'true'"
                :tabdata="List"></TabTwo>
      </div>
      <div class="mydetailslist">
        <div class="mydetails-content">
          <Detailslist></Detailslist>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Detailslist from '@/pages/tasklabel.vue'
import Tag from '@/components/Base/tag.vue'
import TabTwo from '@/components/Base/Tab'
import Header from '@/components/Base/Header.vue'
import Tab from '@/components/Base/tabTwo.vue'

export default {
  components: {
    Tag: Tag,
    Detailslist: Detailslist,
    TabTwo: TabTwo,
    Header: Header,
    Tab: Tab
  },
  inject: ['reload'],
  data () {
    return {
      List: [
        { title: '任务大厅', name: 'home', path: '/home/taskpool' },
        { title: '任务池', name: 'taskpool', path: '/home/taskpool' }
      ],
      List1: [
        { title: '任务大厅', name: 'taskpool', path: '/home/taskpool' },
        { title: '我的任务', name: 'home', path: '/home' }
      ],
      active1: 0,
      active: 0

    }
  },
  methods: {
    tagchange (item, e) {
      let vm = this
      console.log(item)
      console.log(event.target.className)
      if (event.target.className === item) {
        vm.flag = !vm.flag
      }
    }

  },
  mounted () {

  },
  created () {
    let vm = this
    // vm.reload()
    let storage = window.localStorage
    vm.active = storage.getItem('select')
    console.log(vm.active)
  }
}
</script>
<style scoped>
.mytaskdetails > .mydetailslist {
  /* width: 1280px; */
  height: calc(100% - 70px);
  /* min-width: 1116px; */
  background: #f1f1f1;
  margin: 0 1%;
}
.mytaskdetails > .mydetailslist > .mydetails-content {
  /* margin-left: 140px; */
  padding-top: 2px;
  height: 100%;
  box-sizing: border-box;
}
</style>
