import { Home, textList, mytask } from '../../apis/api'
export default {
  async getmenulist ({ commit }, datal) {
    let data = await Home(datal)
    let data1 = data.data
    commit('handlemenulist', data1)
  },

  async gettextList ({ commit }, datal) {
    let data = await textList({ 'id': datal })
    commit('handletextList', data)
  },

  async getmytask ({ commit }, datal) {
    // console.log(datal)
    let data = await mytask({ 'id': datal.taskId })
    // console.log(data)
    let datalist = [{
      data: data
    }, {
      datal: datal
    }]
    commit('handlemytask', datalist)
  }
}
