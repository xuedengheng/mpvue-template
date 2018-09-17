import wx from 'wx'
const device = wx.getSystemInfoSync()
export const deviceInfo = {
  device: device,
  width: device.windowWidth,
  height: device.windowHeight,
  screenW: device.screenWidth,
  screenH: device.screenHeight,
  pixelRatio: device.pixelRatio
}
const width = deviceInfo.width
const height = deviceInfo.height

export const CUT_CONFIG = {
  default: {
    id: 'cropper',
    width: width,
    height: height - 0.2 * width,
    scale: 2.5,
    zoom: 8,
    cut: {
      x: (width - width * 0.7) / 2,
      y: (height - width * 0.7) / 2,
      width: width * 0.7,
      height: width * 0.7
    }
  },
  one: {
    id: 'cropper',
    width: width,
    height: height - 0.2 * width,
    scale: 2.5,
    zoom: 8,
    cut: {
      x: (width - width * 0.7) / 2,
      y: (height - width * 0.7) / 2,
      width: width * 0.3,
      height: width * 0.7
    }
  },
  two: {
    id: 'cropper',
    width: width,
    height: height - 0.2 * width,
    scale: 2.5,
    zoom: 8,
    cut: {
      x: (width - width * 0.7) / 2,
      y: (height - width * 0.7) / 2,
      width: width * 0.5,
      height: width * 0.7
    }
  }
}
