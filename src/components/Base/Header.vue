<template>
  <div class="Header">
    <!-- <div class="headerBottom">
      <div class="headertop"></div>
    </div> -->
    <div class="Logo">
      <img src="../../assets/images/logo1.png"
           alt>
      <span style="width:180px;display:inline-block;font-size:20px;margin-right:70px;margin-left:-10px"></span>
    </div>
    <div class="user">
      <div style="cursor:pointer;">
        <img src="../../assets/images/userinfo1.png"
             alt>
      </div>
      <p class="userInfo"
         style="margin-left:10px;cursor:pointer;margin-top:11px">
        <a href="javascript:;"
           style="color:#fff;font-size:12px">{{userName}}</a>
      </p>
    </div>
    <!-- <ul class="HeadTab">
      <li v-for="(item,index) in menulist"
          :key="index"
          @click="handleclick(index)"
          :class="{'active': index == active}">
        <a href="javascript:;">{{item.menuname}}</a>

      </li>
    </ul> -->
    <el-menu :default-active="$route.path"
             :default-openeds="openlist"
             class="el-menu"
             background-color="#021041"
             style="margin-top:30px;z-index: 111;"
             text-color="#fff"
             :router='true'
             unique-opened
             @select="tabselect">
      <el-submenu index="0"
                  v-if="menulist[0].menuname == '任务大厅'">
        <template slot="title">
          <!-- <div class="el-icon"
               style="background:url(@/assets/images/header.png)"></div> -->
          <i v-if="active3"
             class="el-icon"><img src="@/assets/images/homedeactived.svg"
                 alt=""></i>
          <i v-else
             class="el-icon"><img src="@/assets/images/homeactived.svg"
                 alt=""></i>

          <span style="margin-left:10px">{{menulist[0].menuname}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="0"
                        :route="{ name: 'home',active:0 }"
                        :key="1"
                        @click="changeactive()"
                        :class="active2?'select':'noselect'">
            <i v-if="active2"
               class="el-icon"><img src="@/assets/images/baidian.svg"
                   alt=""></i>
            <i v-else
               class="el-icon"><img src="@/assets/images/huidian.svg"
                   alt=""></i><a style="margin-left:10px;color:#fff">我的任务</a></el-menu-item>
          <el-menu-item index="1"
                        :route="{ name: 'taskpool',active:1 }"
                        :key="2"
                        @click="changeactive2()"
                        :class="actived?'select':'noselect'">
            <i v-if="actived"
               class="el-icon"><img src="@/assets/images/baidian.svg"
                   alt=""></i>
            <i v-else
               class="el-icon"><img src="@/assets/images/huidian.svg"
                   alt=""></i><a style="margin-left:10px;color:#fff">任务池</a>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2"
                    @click="handleselect()"
                    :class="active3?'select':'noselect'"
                    v-if="menulist[2]?(menulist[2].menuname == '任务管理'):''"
                    :route="{ name: 'historytask' }">
        <i v-if="active3"
           class="el-icon">
          <img src="@/assets/images/guanli_actived.svg"
               alt="">
        </i>
        <i v-else
           class="el-icon">
          <img src="@/assets/images/guanli_deactived.svg"
               alt="">
        </i>
        <span slot="title"
              style="margin-left:10px">{{menulist[2].menuname}}</span>
      </el-menu-item>
      <!-- <el-menu-item index="1"
                    v-if="menulist[0]?(menulist[0].menuname == '任务分配'):''"
                    :route="{ name: 'historytask' }">
        <i class="el-icon">
      </i>
      <span slot="title">{{menulist[0].name}}</span>
      </el-menu-item> -->
    </el-menu>
    <div class="Bottom">
      <div class="bottom_a"></div>
    </div>
  </div>
</template>
<script>
import Vuex from 'vuex'
export default {
  data () {
    return {
      actived: '',
      active2: '',
      active3: '',
      openlist: []
    }
  },
  // props: {
  //   active: Number
  // },
  methods: {
    // logout () {
    //   let vm = this
    //   var storage = window.localStorage
    //   vm.actived = false
    //   storage.setItem('select', vm.actived)
    //   storage.setItem('select2', vm.actived)
    //   vm.$router.replace({ path: '/login' })
    //   sessionStorage.removeItem('store')

    //   // }, 500)
    // },
    // handleclick (index) {
    //   let vm = this
    //   // console.log(vm.menulist);
    //   let len = vm.menulist.length
    //   if (len > 1) {
    //     switch (index) {
    //       case 0:
    //         vm.$router.push({ name: 'home' })
    //         break
    //       case 1:
    //         vm.$router.push({ name: 'taskassign' })
    //         break
    //       case 2:
    //         vm.$router.push({
    //           name: 'historytask'
    //         })
    //     }
    //   }
    // },
    changeactive (...rest) {
      let vm = this
      vm.actived = false
      vm.active2 = !vm.actived
      vm.active3 = false
      var storage = window.localStorage
      storage.setItem('select', vm.actived)
      storage.setItem('select2', vm.active3)
    },
    changeactive2 (...rest) {
      let vm = this
      vm.actived = true
      vm.active3 = false
      vm.active2 = !vm.actived
      var storage = window.localStorage
      storage.setItem('select', vm.actived)
      storage.setItem('select2', vm.active3)
    },
    tabselect (index, indexPath) {
      var storage = window.localStorage
      storage.setItem('c', index)
    },
    handleselect () {
      let vm = this
      vm.active3 = true
      vm.actived = false
      vm.active2 = false
      var storage = window.localStorage
      storage.setItem('select2', vm.active3)
    },
    setsublist (index) {
      let vm = this
      vm.openlist[0] = index.toString()
    }
  },
  computed: {
    ...Vuex.mapState({
      menulist: state => state.home.menulist,
      userName: state => state.home.userName
    })
  },
  created () {
    let vm = this
    let storage = window.localStorage
    vm.active3 = JSON.parse(storage.getItem('select2'))
    if (vm.active3) {
      vm.actived = false
      vm.active2 = false
    } else {
      vm.actived = JSON.parse(storage.getItem('select'))
      vm.active2 = false
    }
    vm.setsublist(0)
    if (vm.$route.path === '/home/taskpool') {
      vm.actived = true
      storage.setItem('select', vm.actived)
    } else if (vm.$route.path === '/home') {
      // vm.setsublist(0)
      vm.active2 = true
      storage.setItem('select', !vm.active2)
    } else if (vm.$route.path === '/home/mmain') {
      // vm.setsublist(0)
      vm.actived = JSON.parse(storage.getItem('select'))
      vm.active2 = !vm.actived
    }
  },
  mounted () {

  }
}
</script>
<style scoped>
.Header > .Bottom > .bottom_a {
  width: 180px;
  height: 180px;
  bottom: 0;
  position: absolute;
  border-bottom-right-radius: 360px;
}
/* .el-menu-item-group__title > ul >  */
.el-menu-item:nth-of-type(1) {
  padding-left: 54px !important;
  width: 180px !important;
}
.el-menu-item,
.el-submenu__title,
.is-opened {
  width: 180px !important;
}
.el-menu {
  width: 180px !important;
}
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 180px !important;
}
.select {
  background: #327ed8 !important;
}
</style>
