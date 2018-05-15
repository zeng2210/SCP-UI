<script>
import ContainerBase from './extends'
import CarEntryControl from '../car-entry-control'
export default {
  name: 'container-c',
  extends: ContainerBase,
  data () {
    return {
      mods: [{
        name: 'car-entry-control',
        shown: true,
        info: {}
      }]
    }
  },
  components: {
    CarEntryControl
  }
}
</script>
