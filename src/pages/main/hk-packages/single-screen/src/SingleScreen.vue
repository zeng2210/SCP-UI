<template>
  <div class="single-screen">
    <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" ref="singleOcx" class="single-video"></object>
  </div>
</template>
<script>
// import { getDeviceByCameraData } from '@/pages/main/api/video-preview.js'
export default {
  name: 'singleScreen',
  props: {
    videoplayData: Object,
    ocxbgColor: {
      default: 3,
      type: Number,
      required: false
    }
  },
  data () {
    return {
      previewData: []
    }
  },
  mounted () {
    window.addEventListener('beforeunload', () => {
      this.releaseOcx()
    })
    setTimeout(() => {
      this.initOcx()
    }, 20)
  },
  beforeDestroy () {
    this.releaseOcx()
  },
  methods: {
    initOcx () {
      this.$nextTick(() => {
        try {
          let Plugin = this.$refs.singleOcx
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1,
            showMode: 3,
            width: Plugin.offsetWidth,
            height: Plugin.offsetHeight,
            color: this.ocxbgColor
          }))
          Plugin.OCX_SetCallback((data) => { this.ocxCallBack(data) })
          setTimeout(() => {
            this.playPreview()
          }, 1000)
        } catch (e) {
          this.ocxShow = false
        }
      })
    },
    /**
     * 播放预览
     */
    playPreview () {
      this.previewData = [{
        deviceID: this.videoplayData.deviceID,
        parentID: this.videoplayData.parentID,
        mediaIP: this.videoplayData.mediaIP,
        mediaPort: this.videoplayData.mediaPort,
        streamProfile: 1
      }]
      try {
        let Plugin = this.$refs.singleOcx
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 2,
          data: this.previewData
        }))
      } catch (e) { }
    },
    /**
     * ocx回调函数
     */
    ocxCallBack (data) {
      let callBackdata = JSON.parse(data)
      console.log(callBackdata)
    },
    /**
     * 停止预览
     */
    closePreview () {
      try {
        let Plugin = this.$refs.singleOcx
        Plugin.OCX_InformExe(JSON.stringify({ cmd: 3, data: this.previewData }))
      } catch (e) {
      }
    },
    /**
     * 释放ocx资源
     */
    releaseOcx () {
      try {
        let Plugin = this.$refs.singleOcx
        Plugin.OCX_CloseFrame(JSON.stringify({ cmd: 9 }))
      } catch (e) { }
    }
  },
  watch: {
    videoplayData: {
      handler (val, oldVal) {
        if (val.deviceID !== oldVal.deviceID) {
          this.closePreview()
          setTimeout(() => {
            this.playPreview()
          }, 100)
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.single-screen {
  width: 100%;
  height: 100%;
}
.single-screen .single-video {
  width: 100%;
  height: 100%;
}
</style>
