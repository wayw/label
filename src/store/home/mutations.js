export default {
  handlemenulist (state, data) {
    state.menulist = data.rolemenulist
    state.userName = data.userName
  },
  handletextList (state, data) {
    state.textList = data
  },
  handlemytask (state, data) {
    console.log(data)
    state.mytaskstatus = data[1].datal
  }
}
