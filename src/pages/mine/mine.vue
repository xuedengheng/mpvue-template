<template>
  <div class="demo">
    <button @click="editorAvatar">切图</button>
    <we-paint ref="wePaint" @drawDone="drawDone"></we-paint>
    <button @click="createQrCode">生成二维码</button>
    <button @click="testToast">toast</button>
    <img style="width: 100%" mode="widthFix" v-if="testSrc" :src="testSrc" alt="">
  </div>

</template>

<script type="text/ecmascript-6">
  import clearWatch from 'common/mixins/clear-watch'
  import WePaint from 'components/we-paint/we-paint'
  import qr from 'qr-image'
  import { arrayBufferToBase64 } from 'common/js/util'

  export default {
    mixins: [clearWatch],
    components: {
      WePaint
    },
    data() {
      return {
        testSrc: ''
      }
    },
    onShow() {
      if (getApp().globalData.imgUrl) {
        this.testSrc = getApp().globalData.imgUrl
      }
    },
    methods: {
      testToast() {
        this.$wechat.showToast('123123')
      },
      createQrCode() {
        let str = JSON.stringify({ 'code': 8297128291, 'store_id': 8 }) // todo
        let code = qr.imageSync(str, { type: 'png' })
        let img = arrayBufferToBase64(code)
        this.testSrc = img
      },
      async editorAvatar() {
        try {
          let res = await this.$wechat.chooseImage()
          let file = res.tempFilePaths[0]
          getApp().globalData.imgUrl = file
          this.$wx.navigateTo({ url: '/pages/cut-picture?cutType=avatar' })
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
  // todo() {
  //   let options = {
  //     canvasId: 'we-paint',
  //     multiple: 1,
  //     panel: {
  //       el: '.panel'
  //     },
  //     els: [
  //       {
  //         el: '.panel',
  //         drawType: 'rect',
  //         color: '#fff'
  //       },
  //       {
  //         el: '.h-avatar',
  //         drawType: 'img',
  //         source: this.avatarUrlTmp,
  //         mode: 'aspectFill',
  //         unLoad: false
  //       },
  //       {
  //         el: '.h-bg',
  //         drawType: 'img',
  //         source: this.imageUrl + '/zd-image/dynamic/bg-card_trends@2x.png',
  //         unLoad: false
  //       },
  //       {
  //         el: '.h-name',
  //         drawType: 'text',
  //         source: this.name,
  //         fontSize: 20,
  //         align: 'center',
  //         color: '#fff',
  //         yAdjust: -3
  //       },
  //       {
  //         el: '.h-title',
  //         drawType: 'text',
  //         source: this.hTitle,
  //         fontSize: 12,
  //         align: 'center',
  //         color: '#fff',
  //         yAdjust: -3
  //       },
  //       {
  //         el: '#icon',
  //         drawType: 'img',
  //         source: this.imageUrl + '/zd-image/dynamic/icon-time@2x.png',
  //         unLoad: false
  //       },
  //       {
  //         el: '#time',
  //         drawType: 'text',
  //         source: createdAt,
  //         fontSize: 12,
  //         color: '#828AA2',
  //         yAdjust: -3
  //       },
  //       {
  //         el: '.content > .words',
  //         drawType: 'text-area',
  //         source: content,
  //         fontSize: 16,
  //         color: '#333'
  //       },
  //       {
  //         el: cnameImgs,
  //         drawType: 'img',
  //         isSelectAll: true,
  //         sourceArr: newImgArr,
  //         mode: modeImgs,
  //         unLoad: false
  //       },
  //       {
  //         el: '.right > .txt',
  //         drawType: 'text',
  //         isSelectAll: true,
  //         sourceArr: this.qrCodeTxt,
  //         color: '#828AA2',
  //         fontSize: 12
  //       },
  //       {
  //         el: '.line',
  //         drawType: 'rect',
  //         color: '#EDEDEF'
  //       },
  //       {
  //         el: '.qr-code-wrapper',
  //         drawType: 'img',
  //         source: this.qrCodeUrlTmp,
  //         unLoad: false
  //       }
  //     ]
  //   }
  //   this.$refs.wePaint.action(options)
  // },
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
</style>
