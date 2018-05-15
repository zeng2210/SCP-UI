<template>
  <div class="item-box on-duty">
    <!-- <transition name="fade" mode="out-in"> -->
    <security-list v-show="curShow==='list'" @switch="switchShow"></security-list>
    <security-assign v-if="curShow==='assign'" :info="showData.assign" @close="switchShow('list')"></security-assign>
    <!-- </transition> -->
  </div>
</template>

<script>
import securityList from './src/SecurityList'
import securityAssign from './src/SecurityAssign'

export default {
  name: 'security-manage',
  components: {
    securityList,
    securityAssign
  },
  data () {
    return {
      curShow: 'list',
      showData: {
        'list': {},
        'assign': {}
      }
    }
  },
  mounted () {

  },
  methods: {
    switchShow (name, data = {}) {
      this.showData[name] = data
      this.curShow = name
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
