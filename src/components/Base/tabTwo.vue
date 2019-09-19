<template>
  <div class="right_top">
    <div class='r-l'>
      <div class="headerBottom">
        <div class="headertop"
             style="border-top-left-radius: 73px;height: 73px;background: #f1f1f1;"></div>
      </div>
      <p style='width:200px;line-height:73px;color:#666666;top:0px;left:47px;position:absolute'>您好,您已经进入欧拉智能标注平台</p>
    </div>
    <div class='r-r'>
      <div class='msg'
           style="position:relative"><img src="../../assets/images/tab.png"
             style="position:absolute;margin-left:-30px;margin-top:28px"><a>消息</a></div>
      <div class='logout'><a @click="logout()">退出</a></div>
    </div>
  </div>
</template>
<script>
import Vuex from 'vuex'
import util from '../../utils/util'
export default {
  data () {
    return {
      List: [],
      taskName: '',
      pageSize: '',
      currentPage: '',
      currentIndex: 0
      // active: 0
      // index:0
    }
  },
  props: {
    tabdata: Array,
    active: String
  },
  computed: {
    ...Vuex.mapState({})
  },
  methods: {
    changeIndex (index) {
      var storage = window.localStorage
      storage.setItem('c', index)
    },

    logout () {
      let vm = this
      var storage = window.localStorage
      let userInfo = util.authorize()
      userInfo.isLoad = false
      util.setCookie('userinfo', JSON.stringify(userInfo), 30)

      storage.setItem('select', '')
      storage.setItem('select2', '')
      vm.$router.replace({ path: '/login' })
      sessionStorage.removeItem('store')
    }
  }
}
</script>
<style>
.right_top {
  height: 73px;
  box-shadow: 13px 4px 13px #ccc;
  transform: scale(1);
}
.right_top > .r-l {
  width: 300px;
  height: 73px;
  float: left;
  position: relative;
  display: flex;
}
.right_top > .r-r {
  width: 200px;
  height: 73px;
  float: right;
  line-height: 73px;
}
.right_top > .r-r > .msg {
  float: left;
  margin-left: 70px;
}
.right_top > .r-r > .logout {
  float: left;
  margin-left: 60px;
  cursor: pointer;
}
</style>
