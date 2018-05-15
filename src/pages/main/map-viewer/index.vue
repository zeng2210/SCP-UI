<template>
  <div class="map-content">
    <map-viewer @onMapChange="onMapChange" :class="[mapShow ? 'map-upper' : 'map-lower','map-container']"></map-viewer>
    <park-viewer @onMapChange="onMapChange" :class="[!mapShow ? 'map-upper' : 'map-lower','map-container']"></park-viewer>
  </div>
</template>

<script>
import MapViewer from './MapViewer'
import ParkViewer from './ParkViewer'
export default {
  data () {
    return {
      mapShow: true
    }
  },
  components: {
    MapViewer,
    ParkViewer
  },
  methods: {
    onMapChange (flag) {
      this.mapShow = flag
    }
  }
  //  name: 'MemberEntryControl'
}
</script>

<style scoped>
</style>
