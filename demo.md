#demo

业务流程：
          1.获取所有文本
          2.获取开始位置,结束位置。 
          3.添加mark 选择标签。<SAPN>标签</SAPN>追加到mark
          4.在mark最左端添加删除按钮。定义删除事件
    

          5.点击label 添加链接

                       

初始化：


          label 仓库
          进入标注页面时将标签添加到labelcate
          id: 获取 labelcate 唯一
          text:获取 label名称
          color:标签颜色


          connection 仓库
          图谱标注时添加
          id: 获取  唯一
          text: 获取 唯一



输出数据：

          框选标注：
          labels ：所有的框选文本 格式 array
                  id：前端控制,labels内唯一
                  categoryId：标签ID
                  categoryName：标签名称
                  startIndex：所选文本的在当前内容的开始位置
                  endIndex：所选文本在当前内容的结束位置
          图谱标注：
          labels ：所有的框选文本 格式 array
                  id：前端控制,labels内唯一
                  categoryId：标签ID
                  categoryName：标签名称
                  startIndex：所选文本的在当前内容的开始位置
                  endIndex：所选文本在当前内容的结束位置

          connections： 定义所有的图谱关系，如果是框选标注，可以没有
                  id：前端控制，connections 内唯一
                  categoryId：关系ID
                  categoryName： 关系名称
                  fromId：关系开始ID  指向labels中的节点
                  endId：关系结束ID  指向labels中的节点
