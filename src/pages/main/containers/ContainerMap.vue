<script>
import ContainerBase from './extends'
import MapViewer from '../map-viewer'
export default {
  name: 'container-map',
  extends: ContainerBase,
  data () {
    return {
      mods: [{
        name: 'map-viewer',
        shown: true,
        info: {}
      }]
    }
  },
  components: {
    MapViewer
  }
}
</script>
