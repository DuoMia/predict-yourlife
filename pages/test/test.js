//引入精确计算的js
const acc = require('../test/accurate');
 
Page({
  data: {
    counter: {
      posture: ['', '', ''], //存放式子，比如   1    +   12 
      ansType: false, //判断是否是手动点击的等于号
    },
  },
  //输入数字
  numBtn(e) {
    let num = e.currentTarget.dataset.val
    let posture = this.data.counter.posture
    if (posture[1] === '') { //如果运算符为空，就在式子数组第0个位置放入内容
      //判断特殊情况1： 小数点
      if (num == '.' && posture[0] == '') { //如果是点，且字符串为空，就默认加上 0
        posture[0] = '0'
      } else if (num == '.' && posture[0].indexOf('.') > -1) { //如果已经有点了还按
        console.log('已经有点，不能再按');
        return
      }
      //判断特殊情况2：如果是手动点了等号之后，再按数字，不应该在原位置加，而是清空再加 （通过其它方式比如 “1+2+“ 调用的finish函数不算，需要是手动点击的，判断方法：手动点击的等号有事件对象e）
      if (this.data.counter.ansType) {
        posture[0] = ''
        this.setData({
          'counter.ansType': false //生效一次即可取消
        })
      }
      //判断特殊情况3：如果这里面只有0，那么就删掉这个0，再增加（想输入小数点除外）
      if (num !== '.' &&posture[0] == '0') {
        posture[0] = ''
      }
      this.setData({
        'counter.posture[0]': posture[0] + num
      })
    } else { //如果运算符不为空，就在式子数组第2个位置放入内容
      //判断特殊情况： 小数点
      if (num == '.' && posture[2] == '') { //如果是点，且字符串为空，就默认加上 0
        posture[2] = '0'
      } else if (num == '.' && posture[2].indexOf('.') > -1) { //如果已经有点了还按
        console.log('已经有点，不能再按');
        return
      }
      //判断特殊情况2：如果这里面只有0，那么就删掉这个0，再增加 （想输入小数点除外）
      if (num !== '.' && posture[2] == '0') {
        posture[2] = ''
      }
      this.setData({
        'counter.posture[2]': posture[2] + num
      })
    }
    console.log(this.data.counter.posture);
  },
  //输入运算符
  opBtn(e) {
    let op = e.currentTarget.dataset.val
    let posture = this.data.counter.posture
    if (posture[2] == '') { //如果式子最后一位为空的话，就把符号放进去运算符位置
      this.setData({
        'counter.posture[1]': op
      })
    } else { //否则就先运算，再放进去
      this.finish()
      this.setData({
        'counter.posture[1]': op
      })
    }
    console.log(this.data.counter.posture);
  },
  //运算
  finish(e) {
    let posture = this.data.counter.posture
    let left = parseFloat(posture[0] || 0) //左数字 如果是空字符串就设置为0
    let right = parseFloat(posture[2] || 0) //右数字 如果是空字符串就设置为0
    let ans = 0 //答案
    console.log(left, right);
    switch (posture[1]) { //根据不同运算符，进行不同的运算
      case '+':
        ans = acc.add(left, right)
        break;
      case '-':
        ans = acc.sub(left, right)
        break;
      case '×':
        ans = acc.mul(left, right)
        break;
      case '÷':
        if (right == 0) { //如果数字不合规
          wx.showToast({
            title: '不能除 0 哦',
            icon: 'none'
          })
          ans = left
        } else {
          let _ans = acc.div(left, right)
          let x = String(_ans).indexOf('.') + 1;
          let y = String(_ans).length - x;
          if (y > 10) {
            ans = _ans.toFixed(10);
          } else {
            ans = _ans
          }
        }
        break;
      case '%':
        if (right == 0) { //如果数字不合规
          wx.showToast({
            title: '不能余 0 哦',
            icon: 'none'
          })
          ans = left
        } else {
          ans = left % right
        }
        break;
      default:
        ans = left
        break;
    }
    console.log(ans);
 
    posture = ['' + ans, '', ''] //清空数组，把答案放在第一位
 
    let ansType = false
    if (e) { //如果有事件对象，说明是手动点击的”=“，应该加一个标识符，点了=再点数字的时候，应该把左边数字清空再处理数字
      console.log('手动点击的等于号，后面点击数字时，将清空左边数字');
      ansType = true
    }
    this.setData({
      'counter.posture': posture,
      'counter.ansType': ansType
    })
  },
  //清空
  resetBtn() {
    this.setData({
      'counter.posture': ['', '', ''],
    })
  },
  //退位
  delBtn() {
    let posture = this.data.counter.posture
    //从右到左的顺序删除
    if (posture[2]) { //如果最后一位不为空，就先删它
      posture[2] = posture[2].substr(0, posture[2].length - 1)
    } else if (posture[1]) { //如果符号位不为空，就删它
      posture[1] = ''
    } else if (posture[0]) { //如果第一位不为空，就删它
      posture[0] = posture[0].substr(0, posture[0].length - 1)
    } else return //否则就不做事
    this.setData({
      'counter.posture': posture
    })
    console.log(this.data.counter.posture);
  },
 
 
})