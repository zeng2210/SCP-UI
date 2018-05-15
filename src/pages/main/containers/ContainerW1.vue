<script>
import ContainerBase from './extends'
import WeatherForecast from '../weather-forecast'

import { mapState } from 'vuex'

export default {
  name: 'container-w1',
  extends: ContainerBase,
  data () {
    return {
      // 初始化天气预报和落水预警(默认不展示)俩组件
      mods: [{
        name: 'weather-forecast',
        shown: true,
        info: {}
      },
      {
        name: 'park-warning',
        shown: false,
        info: {}
      }]
    }
  },
  components: {
    WeatherForecast
  },
  computed: {
    ...mapState({
      isAlarmShown: state => state.primary_alarm.shown,
      alarmInfo: state => state.primary_alarm.data
    })
  },
  watch: {
    isAlarmShown (shown) {
      this[shown ? 'showCover' : 'hideCover']('park-warning')
    },
    alarmInfo (data) {
      this.setCover('park-warning', data)
    }
  }
}
</script>
