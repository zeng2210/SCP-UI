<template>
  <div class="multi-screen">
    <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" ref="previewOcx" class="ocx-video"></object>
  </div>
</template>
<script>
import { getVideoData } from '@/pages/main/api/video-preview.js'
import { mapMutations } from 'vuex'
export default {
  name: 'multiScreen',
  data () {
    return {
      videoParams: [],
      ocxMagnify: [],
      deviceID: ''
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
    console.log('销毁')
    this.releaseOcx()
  },
  methods: {
    ...mapMutations(['is_videoocx_downloaded']),
    initOcx () {
      this.$nextTick(() => {
        try {
          let Plugin = this.$refs.previewOcx
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1,
            showMode: 5,
            width: Plugin.offsetWidth,
            height: Plugin.offsetHeight,
            color: 3
          }))
          Plugin.OCX_SetCallback((data) => { this.ocxCallBack(data) })
        } catch (e) {
          this.$store.commit('is_videoocx_downloaded', false)
        }
      })
    },
    // 获取安全指数
    getVideoParams () {
      getVideoData({ groupFlag: 3 }).then(res => {
        this.videoParams = res.map((item) => {
          return {
            deviceID: item.subDeviceID,
            parentID: item.parentID,
            mediaIP: item.mediaIp,
            mediaPort: item.mediaPort,
            streamProfile: 1
          }
        })
        setTimeout(() => {
          this.$nextTick(() => {
            this.playPreview()
          })
        }, 2000)
      }).catch(err => {
        console.warn(err)
      })
    },
    ocxCallBack (data) {
      let callBackdata = JSON.parse(data)
      console.log(callBackdata)
      switch (callBackdata.cmd) {
        case 5:
          this.playSinglePreview(callBackdata.deviceId)
          break
      }
    },
    // 预览
    playPreview () {
      try {
        let Plugin = this.$refs.previewOcx
        Plugin.OCX_InformExe(JSON.stringify({ cmd: 2, data: this.videoParams }))
        console.log('预览多屏：开播成功')
      } catch (e) {
      }
    },
    // 多屏跳单屏通知
    playSinglePreview (data) {
      let Plugin = this.$refs.previewOcx
      this.deviceID = data
      this.ocxMagnify = [{
        deviceID: data,
        fullView: true
      }]
      console.log(this.ocxMagnify)
      Plugin.OCX_InformExe(JSON.stringify({ cmd: 10, data: this.ocxMagnify }))
      this.$emit('multitosingle', data)
    },
    // 单屏跳多屏
    singleToPreview () {
      let Plugin = this.$refs.previewOcx
      this.ocxMagnify = [{
        deviceID: this.deviceID,
        fullView: false
      }]
      console.log(this.ocxMagnify)
      Plugin.OCX_InformExe(JSON.stringify({ cmd: 10, data: this.ocxMagnify }))
      // this.$emit('multitosingle', data)
    },
    /**
   *关闭预览
   */
    closePreview () {
      try {
        let Plugin = this.$refs.previewOcx
        Plugin.OCX_InformExe(JSON.stringify({ cmd: 3, data: this.ocxMagnify }))
      } catch (e) {
      }
    },
    /*
   *释放exe资源
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
