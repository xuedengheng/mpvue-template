/* 深度拷贝 */
export function objDeepCopy(source) {
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  }
  return sourceCopy
}

/* 格式数字 */
export function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

/* 当前时间毫秒数 */
export const now = Date.now()

/* 格式化时间 */
export function formatTime(date = now) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 格式化时间
 * @param date 时间
 * @param str 连接符
 * @returns {string}
 */
export function formatTimeYMD(date = now, str = '-') {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const t1 = [year, month, day].map(formatNumber).join(str)

  return `${t1}`
}

/**
 * 记录当前页面栈详细
 */
export function resolvePageDetail(url, options) {
  // 拼接url的参数
  let urlWithArgs = '/' + url + '?'
  for (let key in options) {
    let value = options[key]
    if (value) {
      urlWithArgs += key + '=' + value + '&'
    }
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  return urlWithArgs
}

/**
 * 判断是否为tab页面
 * @param path
 * @returns {*}
 */
export function checkIsTabPage(path) {
  const TAB_REG = /(pages\/guide)|(pages\/shop)|(pages\/dynamic)|(pages\/mine)/
  return TAB_REG.test(path)
}

/**
 * 解析永久二维码参数
 * @param scene
 * @returns {{}}
 */
export function resolveQrCode(scene) {
  if (!scene) {
    return {}
  }
  let params = {}
  let strs = scene.split('&')
  for (let i = 0; i < strs.length; i++) {
    params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
  }
  return params
}

// 解析永久二维码参数
export function getParams (scene) {
  if (!scene) {
    return {}
  }
  let params = {}
  let strs = scene.split('&')
  for (let i = 0; i < strs.length; i++) {
    params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
  }
  return params
}

export function arrayBufferToBase64(raw) {
  let base64 = ''
  let encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let bytes = new Uint8Array(raw)
  let byteLength = bytes.byteLength
  let byteRemainder = byteLength % 3
  let mainLength = byteLength - byteRemainder
  let a, b, c, d
  let chunk // Main loop deals with bytes in chunks of 3
  for (let i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2] // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12 // 258048 = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6 // 4032 = (2^6 - 1) << 6
    d = chunk & 63 // 63 = 2^6 - 1
    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }
  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) { // eslint-disable-line
    chunk = bytes[mainLength]
    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2;
    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4 // 3 = 2^2 - 1;
    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder == 2) { // eslint-disable-line
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
  }
  a = (chunk & 16128) >> 8 // 16128 = (2^6 - 1) << 8;
  b = (chunk & 1008) >> 4 // 1008 = (2^6 - 1) << 4;
  // Set the 2 least significant bits to zero
  c = (chunk & 15) << 2 // 15 = 2^4 - 1;
  base64 += encodings[a] + encodings[b] + encodings[c] + '='
  return 'data:image/jpeg;base64,' + base64
}
