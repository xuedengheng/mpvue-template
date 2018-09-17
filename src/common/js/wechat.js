import wx from './wx'

export function login () {
  return new Promise((resolve, reject) => {
    wx.login({success: resolve, fail: reject})
  })
}

export function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({success: resolve, fail: reject})
  })
}

export function setStorage (key, value) {
  return new Promise((resolve, reject) => {
    wx.setStorage({key: key, data: value, success: resolve, fail: reject})
  })
}

export function getStorage (key) {
  return new Promise((resolve, reject) => {
    wx.getStorage({key: key, success: resolve, fail: reject})
  })
}

export function getLocation (type) {
  return new Promise((resolve, reject) => {
    wx.getLocation({type: type, success: resolve, fail: reject})
  })
}

export function showLoading (title = '加载中') {
  if (wx.showLoading) {
    wx.showLoading({
      title: title,
      mask: true
    })
  } else {
    wx.showNavigationBarLoading()
  }
}

export function hideLoading () {
  if (wx.hideLoading) {
    wx.hideLoading()
  } else {
    wx.hideNavigationBarLoading()
  }
}

/**
 * 弹出提示框
 */

export function tipSuccess (title, duration = 500) {
  wx.showToast({
    title: title,
    image: '/static/img/icon-global_success@2x.png',
    mask: true,
    duration: duration
  })
  if (duration > 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }
}

/**
 * 微信页面滚动
 * @param scrollTop
 * @param duration
 */
export function pageScrollTo (scrollTop = 0, duration = 0) {
  wx.pageScrollTo({
    scrollTop,
    duration
  })
}

/**
 * 设置系统剪贴板的内容
 * @param data
 * @returns {Promise<any>}
 */
export function setClipboardData (data) {
  return new Promise((resolve, reject) => {
    wx.setClipboardData({data: data, success: resolve, fail: reject})
  })
}

/**
 * 获取系统剪贴板内容
 * @returns {Promise<any>}
 */
export function getClipboardData () {
  return new Promise((resolve, reject) => {
    wx.getClipboardData({success: resolve, fail: reject})
  })
}

/**
 * 选择照片
 * @returns {Promise<any>}
 */
export function chooseImage (data = {count: 1, sizeType: ['original', 'compressed'], sourceType: ['album', 'camera']}) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      ...data,
      // count, // 默认9
      // sizeType, // 可以指定是原图还是压缩图，默认二者都有 ['original', 'compressed']
      // sourceType, // 可以指定来源是相册还是相机，默认二者都有 ['album', 'camera']
      success: resolve,
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 选择预览图片
 * @returns {Promise<any>}
 */
export function previewImage (data = {urls: [], current: ''}) {
  return new Promise((resolve, reject) => {
    wx.previewImage({
      ...data,
      // current, // 当前显示图片的http链接
      // urls, // 需要预览的图片http链接列表
      success: resolve,
      fail: (err) => {
        reject(err)
      }
    })
  })
}
