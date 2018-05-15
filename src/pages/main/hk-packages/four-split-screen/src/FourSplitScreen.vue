<template>
  <div class="four-split-screen">
    <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" ref="previewOcx" class="ocx-video"></object>
  </div>
</template>
<script>
export default {
  name: 'FourSplitScreen',
  props: {
    fourSplitData: Array,
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
          let Plugin = this.$refs.previewOcx
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1,
            showMode: 4,
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
      this.previewData = this.fourSplitData.map((item) => {
        return {
          deviceID: item.deviceID,
          parentID: item.parentID,
          mediaIP: item.mediaIP,
          mediaPort: item.mediaPort,
          streamProfile: 1
        }
      })
      try {
        let Plugin = this.$refs.previewOcx
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
        let Plugin = this.$refs.previewOcx
        Plugin.OCX_InformExe(JSON.stringify({ cmd: 3, data: this.previewData }))
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
  },
  watch: {
    fourSplitData: {
      handler (val, oldVal) {
        if (val[0].deviceID !== oldVal[0].deviceID) {
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
.four-split-screen {
  width: 100%;
  height: 100%;
}
.four-split-screen .ocx-video {
  width: 100%;
  height: 100%;
}
</style>
