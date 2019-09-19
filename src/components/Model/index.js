import Message from './Message'

var zIndex = 2000

const model = {
  installed: false
}

// function getDomRect (event) {
//   let rect = event.target.getBoundingClientRect()
//   let top = document.documentElement.scrollTop || document.body.scrollTop
//   let left = document.documentElement.scrollLeft || document.body.scrollLeft
//   return {
//     left: rect.left + left,
//     top: rect.top + top,
//     bottom: rect.bottom + top,
//     width: rect.width,
//     // width:10,
//     height: rect.height
//   }
// }

model.install = function (Vue, options) {
  if (model.installed) return
  // const componentMenu = Vue.extend(MenuDropList);
  const ComponentMessage = Vue.extend(Message)

  // Vue.prototype.$_menuDropList = (ev,list,callback) => {
  //     let rect = getDomRect(ev);
  //     let vm = new componentMenu({
  //         data:{
  //             list:list,
  //             style:{
  //                 zIndex:zIndex++,
  //                 top:rect.bottom+'px',
  //                 left:(rect.left + rect.width/2)+'px',
  //             },
  //             callback:callback
  //         }
  //     }).$mount();
  //     document.body.appendChild(vm.$el);
  // };

  Vue.prototype.$_message = (text, type) => {
    let vm = new ComponentMessage({
      data: { zIndex: zIndex++, text: text, type: type || 'info' }
    }).$mount()
    vm.show = true

    document.body.appendChild(vm.$el)
  };

  ['success', 'warning', 'info', 'error'].forEach(type => {
    Vue.prototype.$_message[type] = text => {
      return Vue.prototype.$_message(text, type)
    }
  })

  model.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(model)
};
export default model
