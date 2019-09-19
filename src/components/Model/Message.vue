<template lang="html">
    <transition name="c_message-fade">
        <div class="c_message" v-if="show"  :style="{zIndex:zIndex}" style="font-weight: 600;">
        <img v-if="type=='success'" class="c_message__img" style="width: 30px;margin-left: 10px;" :src="typeImg" alt="">
  <img v-if="type=='error'" class="c_message__img" style="width: 22px;margin-left: 15px;" :src="typeImg" alt="">
  <img v-if="type=='warning'" class="c_message__img" style="width: 22px;margin-left: 15px;" :src="typeImg" alt="">{{ text }}
        </div>
    </transition>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      type: 'info'
    }
  },
  computed: {
    typeImg () {
      return require(`./assets/${this.type}.svg`)
    }
  },
  mounted () {
    setTimeout(() => {
      this.closed()
      this.show = false
    }, 1500)
  },
  methods: {
    closed () {
      this.$el.addEventListener('transitionend', this.removeDom)
    },
    removeDom () {
      this.$el.removeEventListener('transitionend', this.removeDom)
      this.$destroy(true)
      this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
<style>
.c_message {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  min-width: 120px;
  padding: 10px 12px 10px 50px;
  box-sizing: border-box;
  border-radius: 4px;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  transition: opacity 0.3s, transform 0.4s;
  overflow: hidden;
  color: #8391a5;
  background-color: #fff;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
}
.c_message-fade-enter,
.c_message-fade-leave-to {
  transform: translate(-50%, -100%);
  opacity: 0;
}
.c_message img {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -20px;
}
</style>
