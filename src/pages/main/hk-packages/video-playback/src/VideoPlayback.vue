<template>
  <div class="video-playback">
    <object classid="clsid:d97c5a6f-1b81-4ccc-8c3f-1c9860e57567" ref="playbackOcx" class="playback"></object>
  </div>
</template>
<script>
import {
  getDeviceByCameraData,
  getvideoRecordData
} from '@/pages/main/api/video-preview.js'
export default {
  name: 'videoPlayback',
  props: {
    warningData: {}
  },
  data () {
    return {
      previewData: [],
      deviceData: {},
      recordPlayData: [],
      manufacturer: ''
    }
  },
  mounted () {
    window.addEventListener('beforeunload', () => {
      this.releaseOcx()
    })
    setTimeout(() => {
      this.initOcx()
      this.getVideoData()
    }, 20)
  },
  beforeDestroy () {
    console.log('销毁')
    this.releaseOcx()
  },
  methods: {
    initOcx () {
      this.$nextTick(() => {
        try {
          let Plugin = this.$refs.playbackOcx
          Plugin.OCX_SetFrame(JSON.stringify({
            cmd: 1,
            showMode: 0,
            width: Plugin.offsetWidth,
            height: Plugin.offsetHeight
          }))
          Plugin.OCX_SetCallback((data) => { this.ocxCallBack(data) })
        } catch (e) {
          this.ocxShow = false
        }
      })
    },
    getVideoData () {
      this.$nextTick(() => {
        if (this.warningData.deviceId && this.warningData.occurTime) {
          getDeviceByCameraData({ cameraCode: this.warningData.deviceId }).then(res => {
            console.log(res)
            this.deviceData = {
              startTime: this.warningData.occurTime,
              endTime: this.warningData.occurTime,
              ip: res.deviceIP,
              port: Number(res.devicePort)
            }
            this.getRecordData()
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    /**
     * 获取回放数据
     */
    getRecordData () {
      this.$nextTick(() => {
        getvideoRecordData(this.deviceData).then(res => {
          console.log(res)
          this.recordPlayData = res.rows
          this.manufacturer = res.manufacturer || ''
          this.setPlayback()
        }).catch(err => {
          console.log(err)
        })
      })
    },
    /**
     * 播放回放
     */
    setPlayback () {
      let Plugin = this.$refs.playbackOcx
      try {
        Plugin.OCX_InformExe(JSON.stringify({
          cmd: 7,
          play: 1,
          manufacturer: this.manufacturer,
          data: this.recordPlayData
        }))
      } catch (e) {
      }
    },
    /**
     * 播放预览
     */
    ocxCallBack (data) {
      let callBackdata = JSON.parse(data)
      console.log(callBackdata)
    },
    /**
     * 释放ocx资源
     */
    releaseOcx () {
      try {
        let Plugin = this.$refs.playbackOcx
        Plugin.OCX_CloseFrame(JSON.stringify({ cmd: 9 }))
      } catch (e) { }
    }
  }
}
</script>
<style scoped>
.video-playback {
  width: 100%;
  height: 100%;
}
.video-playback .playback {
  width: 100%;
  height: 100%;
}
</style>
