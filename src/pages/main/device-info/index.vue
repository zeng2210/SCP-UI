<template>
  <div>
    <device-warn v-if="deviceStatus%2===0&&'robot'!==currentCard" :deviceStatus='deviceStatus' :deviceMsg="info"></device-warn>
    <signpost v-else-if="'signpost'===currentCard" :deviceMsg="deviceMsg('signpost')"></signpost>
    <camera v-else-if="'camera'===currentCard" :deviceMsg="deviceMsg('camera')"></camera>
    <elevator v-else-if="'elevator'===currentCard" :deviceMsg="deviceMsg('elevator')"></elevator>
    <broadcast v-else-if="'broadcast'===currentCard" :deviceMsg="deviceMsg('broadcast')"></broadcast>
    <robot v-else-if="'robot'===currentCard" :deviceMsg="deviceMsg('robot')"></robot>
    <fence v-else-if="'fence'===currentCard" :deviceMsg="deviceMsg('fence')"></fence>
    <brake v-else-if="'brake'===currentCard" :deviceStatus='deviceStatus' :deviceMsg="deviceMsg('brake')"></brake>
    <control v-else-if="'control'===currentCard && deviceStatus=== 601" :deviceStatus='deviceStatus' :deviceMsg="deviceMsg('control')"></control>
    <gates v-else-if="'gates'===currentCard && deviceStatus=== 401" :deviceStatus='deviceStatus' :deviceMsg="deviceMsg('gates')"></gates>
    <lock v-else-if="'lock'===currentCard && deviceStatus=== 701" :deviceStatus='deviceStatus' :deviceMsg="deviceMsg('lock')"></lock>
  </div>
</template>

<script>
import signpost from './components/SignPost'
import elevator from './components/CallElevator'
import fence from './components/ElectronicFence'
import camera from './components/CameraInfo'
import broadcast from './components/BroadcastItem'
import robot from './components/Robot'
import lock from './components/LockInfo'
import gates from './components/GateDevice'
import control from './components/ControlDevice'
import brake from './components/BrakeDevice'
import deviceWarn from '@/pages/main/components/DeviceInfoWarning'

export default {
  name: 'deviceInfo',
  components: {
    signpost,
    elevator,
    camera,
    broadcast,
    robot,
    fence,
    gates,
    control,
    brake,
    lock,
    // gatesAbnomal
    deviceWarn
  },
  props: {
    info: {}
  },
  data () {
    return {
      // deviceMsg: this.info
    }
  },
  computed: {
    currentCard: function () {
      if (this.info) {
        return this.info.markerType
      } else {
        return false
      }
    },
    deviceStatus: function () {
      if (this.info) {
        return this.info.markerStatus
      } else {
        return false
      }
    }
  },
  created () {
  },
  mounted () {
    console.log('设备状态:' + this.deviceStatus)
  },
  methods: {
    deviceMsg: function (compName) {
      if (this.info && this.info.markerType === compName) {
        return this.info
      } else {
        return false
      }
    },
  }
}
</script>

<style>

</style>
