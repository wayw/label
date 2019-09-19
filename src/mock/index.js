const Mock = require('mockjs')

let baseUrl = 'http://localhost:8080'
// format： Mock.mock( url, post/get , res)；
// 公共任务列表
Mock.mock(
  baseUrl + '/label/taskHall/queryPublicTaskList',
  'post',
  require('./data/taskHall/queryPublicTaskList.json'
  )
)

Mock.mock(
  baseUrl + '/label/task/historytask',
  'post',
  require('./data/taskHall/historytask.json'
  )
)

// 我的任务列表
Mock.mock(
  baseUrl + '/label/taskHall/queryMyTaskList',
  'post',
  require('./data/taskHall/queryMyTaskList.json'
  )
)

// 任务开始接口
Mock.mock(
  baseUrl + '/label/taskHall/getTextListByTaskId',
  'post',
  require('./data/taskHall/getTextListByTaskId.json'
  )
)

// 文本信息获取接口
Mock.mock(
  baseUrl + '/label/taskHall/getTextInfoById',
  'post',
  require('./data/taskHall/getTextInfoById.json'
  )
)

// 标注保存接口
Mock.mock(
  baseUrl + '/label/taskHall/saveTextLabel',
  'post',
  require('./data/taskHall/saveTextLabel.json'
  )
)

// 任务分配保存接口
Mock.mock(
  baseUrl + '/label/taskHall/saveTaskAssign',
  'post',
  require('./data/taskHall/saveTaskAssign.json'
  )
)

// 任务发布取消接口
Mock.mock(
  baseUrl + '/label/taskHall/updateTaskAssignStatus',
  'post',
  require('./data/taskHall/updateTaskAssignStatus.json'
  )
)

let Random = Mock.Random
Random.cparagraph()
const taskdata = Mock.mock({
  'status': true,
  'data': {
    'user|3': [{
      'name': '@name',
      'task': '@cparagraph'
    }]
  }
})
// 我的任务详情
Mock.mock(
  baseUrl + '/label/taskHall/mytaskdetasils',
  'post',
  taskdata
  // require("./data//label/taskHall/mytaskdetasils.json"
)

Mock.mock(
  baseUrl + '/label/task/querytaskforpage',
  'post',
  require('./data/taskHall/querytaskforpage.json'
  )
)
