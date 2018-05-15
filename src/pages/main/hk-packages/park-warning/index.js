import parkWarning from './src/ParkWarnEvent.vue'

/* istanbul ignore next */
parkWarning.install = function (Vue) {
  Vue.component(parkWarning.name, parkWarning)
}
export default parkWarning
