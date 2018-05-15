<script>
import ContainerBase from './extends'
import MemberEntryControl from '../member-entry-control'
// import MemberEntryControl from '../../../demo/member-entry-control'
export default {
  name: 'container-b',
  extends: ContainerBase,
  data () {
    return {
      mods: [{
        name: 'member-entry-control',
        shown: true,
        info: {}
      }]
    }
  },
  components: {
    MemberEntryControl
  }
}
</script>
