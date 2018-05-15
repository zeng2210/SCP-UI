<script>
import ContainerBase from './extends'
import LiveMonitor from '../live-monitor'
import CommunityHelp from '../community-help/CommunityHelp'

import { mapState } from 'vuex'

export default {
  name: 'container-w2',
  extends: ContainerBase,
  data () {
    return {
      mods: [{
        name: 'live-monitor',
        shown: true,
        info: {}
      }, {
        name: 'community-help',
        shown: false,
        info: {}
      }]
    }
  },
  components: {
    LiveMonitor,
    CommunityHelp
  },
  methods: {
    // TODO:W2窗口需要特殊处理，因为底下的实时监控是OCX，上面不能有覆盖物，如果有东西覆盖的话，会导致显示错乱
    showCover () {
      this.mods[0].shown = false
      this.mods[1].shown = true
    },
    hideCover () {
      this.mods[0].shown = true
      this.mods[1].shown = false
    }
  },
  computed: {
    ...mapState({
      isAlarmShown: state => state.secondary_alarm.shown,
      alarmInfo: state => state.secondary_alarm.data
    })
  },
  watch: {
    isAlarmShown (shown) {
      this[shown ? 'showCover' : 'hideCover']('community-help')
    },
    alarmInfo (data) {
      this.setCover('community-help', data)
    }
  }
}
</script>
