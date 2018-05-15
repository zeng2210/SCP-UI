import multiScreen from './src/MultiScreen.vue'

/* istanbul ignore next */
multiScreen.install = function (Vue) {
  Vue.component(multiScreen.name, multiScreen)
}
export default multiScreen
