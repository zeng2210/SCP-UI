<script>
import ContainerBase from './extends'
import SecurityManage from '../security-manage'
import DeviceInfo from '../device-info/'
import MemberInfo from '../member-info'
import CarInfo from '../car-info/CarInfo'
// import mutationTypes from '../store/mutation-types'

import { mapState } from 'vuex'

export default {
  name: 'container-d',
  extends: ContainerBase,
  data () {
    return {
      mods: [{
        name: 'security-manage',
        shown: true,
        info: {}
      }, {
        name: 'member-info',
        shown: false,
        info: {}
      }, {
        name: 'device-info',
        shown: false,
        info: {}
      }, {
        name: 'car-info',
        shown: false,
        info: {}
      }]
    }
  },
  components: {
    SecurityManage,
    MemberInfo,
    DeviceInfo,
    CarInfo
  },
  // TODO: 这里的computed和下面的watch写法有点繁琐，后面看怎样优化一下
  computed: {
    ...mapState({
      isDeviceShown: state => state.device_info.shown,
      deviceInfo: state => state.device_info.data,
      isMemberShow: state => state.member_info.shown,
      memberInfo: state => state.member_info.data,
      isCarShow: state => state.car_info.shown,
      carInfo: state => state.car_info.data
    })
  },
  watch: {
    // 两种场景：1）false->true: 点击打开或者由隐藏态恢复; 2）true->false: 最小化。
    isDeviceShown (shown) {
      this[shown ? 'showCover' : 'hideCover']('device-info')
    },
    // 两种场景：1）已经显示，切换数据， 2）没显示到显示
    deviceInfo (data) {
      // TODO: 切换的时候，info没有透传给子组件，此处为临时解决办法
      // this.hideCover('device-info')
      // this.showCover('device-info')
      this.setCover('device-info', data)
    },
    isMemberShow (shown) {
      this[shown ? 'showCover' : 'hideCover']('member-info')
    },
    memberInfo (data) {
      // 诡异问题同上
      // this.hideCover('member-info')
      // this.showCover('member-info')
      this.setCover('member-info', data)
    },
    isCarShow (shown) {
      this[shown ? 'showCover' : 'hideCover']('car-info')
    },
    carInfo (data) {
      this.setCover('car-info', data)
    }
  }
}

</script>
