<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
import Home from '@/pages/home'
import Header from '@/components/Base/Header'
import TabTwo from '@/components/Base/tabTwo.vue'

require('@/assets/css/style.css')
// require('../node_modules/font-awesome/css/font-awesome.min.css')

export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true
      // screenWidth: document.body.clientWidth, // 屏幕尺寸
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  components: {
    Home: Home,
    Header: Header,
    TabTwo: TabTwo
  },
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (localStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem('store'))
        )
      )
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  methods: {
    reload () {
      let vm = this
      vm.isRouterAlive = false
      vm.$nextTick(() => {
        vm.isRouterAlive = true
      })
    }
  },
  mounted () {

  }
}
</script>

<style>
#app {
  font-family: "SourceHanSans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
}
</style>
