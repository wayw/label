const util = {
  setCookie (key, value, date) {
    let encodeValue = this.encode(value)
    if (date) {
      var oDate = new Date()
      oDate.setDate(oDate.getDate() + date)
      document.cookie = key + '=' + encodeValue + '; path=/; EXPIRES=' + oDate.toUTCString()
    } else {
      document.cookie = key + '=' + encodeValue + '; path=/'
    }
  },
  getCookie (name) {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(name + '=')
      if (cStart !== -1) {
        cStart = cStart + name.length + 1
        let cEnd = document.cookie.indexOf('; ', cStart)
        if (cEnd === -1) cEnd = document.cookie.length
        return this.decode(document.cookie.substring(cStart, cEnd))
      }
      return ''
    }
    return ''
  },
  clearCookie (key, value, date) {
    // let encodeValue = this.encode(value);
    document.cookie = key + '=' + value + '; path=/'
  },
  encode (str) {
    // return str;
    let newStr = ''
    for (var i = 0; i < str.length; i++) {
      newStr += String.fromCharCode(str.charCodeAt(i) + 3)
    }
    return newStr
  },
  decode (str) {
    // return str;
    let newStr = ''
    for (var i = 0; i < str.length; i++) {
      newStr += String.fromCharCode(str.charCodeAt(i) - 3)
    }
    return newStr
  },
  authorize () {
    let userInfo = this.getCookie('userinfo')
    if (userInfo) {
      let user = userInfo.replace(/<$/g, '}')
      return JSON.parse(user)
    } else {
      return false
    }
  },
  clone (obj) {
    // Handle the 3 simple types, and null or undefined
    if (obj == null || typeof obj !== 'object') return obj

    // Handle Date
    if (obj instanceof Date) {
      var copy = new Date()
      copy.setTime(obj.getTime())
      return copy
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = []
      for (var i = 0; i < obj.length; ++i) {
        copy[i] = this.clone(obj[i])
      }
      return copy
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {}
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr])
      }
      return copy
    }
  },
  shadeColor (color, percent) {
    let f = parseInt(color.slice(1), 16)
    let t = percent < 0 ? 0 : 255
    let p = percent < 0 ? percent * -1 : percent
    let R = f >> 16
    let G = f >> 8 & 0x00FF
    let B = f & 0x0000FF
    return '#' + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)
  },
  randomcolor () {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16)
  },
  isIE () {
    var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    var isIE =
      userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
    var isIE11 =
      userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
      reIE.test(userAgent)
      var fIEVersion = parseFloat(RegExp['$1'])
      if (fIEVersion === 7) {
        return 7
      } else if (fIEVersion === 8) {
        return 8
      } else if (fIEVersion === 9) {
        return 9
      } else if (fIEVersion === 10) {
        return 10
      } else {
        return 6 // IE版本<=7
      }
    } else if (isEdge) {
      return 'edge' // edge
    } else if (isIE11) {
      return 11 // IE11
    } else {
      return -1 // 不是ie浏览器
    }
  }
}

export default util
