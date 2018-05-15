<template>
  <div class="multi-screen">
    <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" ref="previewOcx" class="ocx-video"></object>
  </div>
</template>
<script>
import { getVideoData } from '@/pages/main/api/video-preview.js'
import { mapMutations } from 'vuex'
export default {
  name: 'memberScreen',
  data () {
    return {
      videoParams: [],
      videoPlayParams: [],
      singlePreview: [],
      cameraCodeParams: []
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
    ...mapMutations(['is_videoocx_downloaded']),
    initOcx () {
      this.$nextTick(() => {
        try {
          let Plugin = this.$refs.previewOcx
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1,
            showMode: 203,
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
    /**
     * 获取视频数据
     */
    getVideoParams () {
      getVideoData({ groupFlag: 2 }).then(res => {
        this.cameraCodeParams = res.map((item) => {
          return item.cameraID
        })
        this.$emit('cameraCodeParams', this.cameraCodeParams)
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
        console.log('预览多屏：开播成功')
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
