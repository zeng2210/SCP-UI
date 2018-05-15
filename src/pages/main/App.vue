<template>
  <div class="home-wrap" @contextmenu.prevent>
    <browser-guide></browser-guide>
    <no-signal></no-signal>
    <div class="main">
      <div class="main-top">
        <container-b xtag="B"></container-b>
        <container-c xtag="C"></container-c>
      </div>
      <container-map xtag="Map"></container-map>
    </div>
    <aside>
      <container-d xtag="D"></container-d>
      <container-w1 xtag="W1"></container-w1>
      <container-w2 xtag="W2"></container-w2>
    </aside>

  </div>
</template>

<script>
import {
  ContainerB,
  ContainerC,
  ContainerD,
  ContainerMap,
  ContainerW1,
  ContainerW2
} from './containers'
import BrowserGuide from '@/pages/main/browser-guide'
import NoSignal from './components/NoSignal'
export default {
  components: {
    ContainerB,
    ContainerC,
    ContainerD,
    ContainerMap,
    ContainerW1,
    ContainerW2,
    BrowserGuide,
    NoSignal
  },
  name: 'app'
}
</script>
