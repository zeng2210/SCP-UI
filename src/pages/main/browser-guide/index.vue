<template>
<div>
  <browser-tip v-if="showBrowserTip"></browser-tip>
  <ocx-download v-if="showOcxDownload"></ocx-download>
</div>
</template>

<script>
import BrowserTip from './BrowserTip'
import OcxDownload from './OcxDownload'
// import { mapState } from 'vuex'
export default {
  name: 'browser-guide',
  components: {
    BrowserTip,
    OcxDownload,
  },
  data () {
    return {
      showBrowserTip: false,
      showOcxDownload: false,
    }
  },
  computed: {
  },
  mounted () {
    this.judgeToTip()
  },
  methods: {
    // 判断应该给出哪种提示：【使用IE】或【下载ocx】
    judgeToTip () {
      let _this = this
      window.onload = function () {
        // 判断浏览器环境
        if ('ActiveXObject' in window) {
          // 只要其中一个没有下载，都会显示下载提示
          if (!(_this.$store.state.is_callocx_downloaded && _this.$store.state.is_videoocx_downloaded)) {
            _this.showOcxDownload = true
          }
          // console.log('$$$$$$$$是否需要下载OCX', _this.$store.state.is_callocx_downloaded, _this.$store.state.is_videoocx_downloaded, _this.showOcxDownload)
        } else {
          // console.log('正在使用非非非IE浏览器')
          _this.showBrowserTip = true
        }
      }
    }
  }
}
</script>

<style>

</style>
