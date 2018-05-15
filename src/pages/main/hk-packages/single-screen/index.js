import singleScreen from './src/SingleScreen.vue'

/* istanbul ignore next */
singleScreen.install = function (Vue) {
  Vue.component(singleScreen.name, singleScreen)
}
export default singleScreen
