import videoPlayback from './src/VideoPlayback.vue'

/* istanbul ignore next */
videoPlayback.install = function (Vue) {
  Vue.component(videoPlayback.name, videoPlayback)
}
export default videoPlayback
