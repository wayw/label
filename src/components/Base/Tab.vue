<template>
  <div class="Tab">
    <!-- <ul>
      <li v-for="(item,index) in tabdata"
          :key="index"
          :class="{'active': index == active}"
          @click="changeIndex(index)">
        <router-link :to="item.path">{{item.title}}</router-link>
      </li>
    </ul> -->
    <p style="display:inline-block;color:#333;font-size:16px;">当前位置：</p>

    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-top: 4px;font-size: 16px;color:#333">
      <el-breadcrumb-item v-for="(item,index) in tabdata"
                          :key="index"
                          :to="{ path:item.path }">{{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    tabdata: Array,
    active: String
  },
  methods: {
    changeIndex (index) {
      console.log(index)
      var storage = window.localStorage
      storage.setItem('c', index)
    }
  },
  created () {
  }
}
</script>
<style>
.Tab > ul > .active > a {
  color: #fff !important;
}
.Tab {
  margin-left: 18px;
  /* margin-top: 32px; */
  /* display: flex; */
  height: 70px;
  line-height: 70px;
  width: 400px;
}
.Tab > ul > li {
  float: left;
  margin-left: 18px;
  height: 52px;
  width: 127px;
  background: #f1f1f1;
}
.Tab > ul > .active {
  background: #337ed9;
  display: inline-block;
  height: 52px;
  width: 127px;
}
.Tab > ul > li > a {
  display: inline-block;
  height: 52px;
  width: 127px;
  line-height: 52px;
  color: #666666;
}
</style>
