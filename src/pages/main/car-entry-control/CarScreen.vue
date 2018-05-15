<template>
  <div class="multi-screen">
    <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" ref="previewOcx" class="ocx-video"></object>
  </div>
</template>
<script>
import { getVideoInfo } from '@/pages/main/api/car-entry'
export default {
  name: 'car-screen',
  data () {
    return {
      videoParams: Array,
      videoPlayParams: [],
      singlePreview: []
    }
  },
  mounted () {
    window.addEventListener('beforeunload', () => {
      this.releaseOcx()
    })
    setTimeout(() => {
      this.initOcx()
      this.getVideoParams()
    }, 20)
  },
  beforeDestroy () {
    this.releaseOcx()
  },
  methods: {
    /**
     * 初始化ocx
     */
    initOcx () {
      this.$nextTick(() => {
        try {
          let Plugin = this.$refs.previewOcx
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1,
            showMode: 204,
            width: Plugin.width,
            height: Plugin.height
          }))
          Plugin.OCX_SetCallback((data) => { this.ocxCallBack(data) })
        } catch (e) {
          this.ocxShow = false
        }
      })
    },
    /**
     * 获取视频数据
     */
    getVideoParams () {
      getVideoInfo().then(res => {
        console.log('获取到的视频设备信息res' + JSON.stringify(res))
        this.videoParams = res.map((item) => {
          return {
            deviceID: item.deviceId,
            parentID: item.parentId,
            mediaIP: item.mediaIP,
            mediaPort: item.mediaPort,
            streamProfile: 1
          }
        })
        console.log('转换后的视频设备参数videoParams' + JSON.stringify(this.videoParams))
        setTimeout(() => {
          this.$nextTick(() => {
            this.playPreview()
          })
        }, 1000)
      }).catch(err => {
        console.warn(err)
      })
    },
    ocxCallBack (data) {
      let callBackdata = JSON.parse(data)
      console.log(callBackdata)
    },
    /**
     * 视频数据
     */
    playPreview () {
      try {
        let Plugin = this.$refs.previewOcx
        Plugin.OCX_InformExe(JSON.stringify({ cmd: 2, data: this.videoParams }))
      } catch (e) {
      }
    },
    /**
      * 关闭预览
      */
    closePreview () {
      try {
        let Plugin = this.$refs.previewOcx
        Plugin.OCX_InformExe(JSON.stringify({ cmd: 3, data: this.videoParams }))
      } catch (e) {
      }
    },
    /**
      * 释放ocx资源
      */
    releaseOcx () {
      try {
        let Plugin = this.$refs.previewOcx
        Plugin.OCX_CloseFrame(JSON.stringify({ cmd: 9 }))
      } catch (e) { }
    }
  }
}
</script>
<style scoped>
.multi-screen {
  width: 100%;
  height: 100%;
}
.multi-screen .ocx-video {
  width: 100%;
  height: 100%;
}
</style>
