<template>
  <div v-show="ready" class="el-carousel__item" @click="handleItemClick" :style="{
      msTransform: `translate3d(${ translate }px,0,0)`,
      webkitTransform: `translate3d(${ translate }px,0,0)`,
      transform: `translate3d(${ translate }px,0,0)`,
      transition:'transform '+transTime+'ms',
    }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'carouselItem',

  props: {
    name: String
  },

  data () {
    return {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      transTime: 500
    }
  },

  methods: {
    translateItem (index, activeIndex) {
      const parentWidth = this.$parent.$el.offsetWidth
      this.active = index === activeIndex
      this.translate = parentWidth * (index === activeIndex ? 0 : (index > activeIndex ? 1 : -1))
      this.ready = true
    },
    dragItem (moveX) {
      this.translate = moveX
    },
    setTransTime (time) {
      this.transTime = time
    },
    handleItemClick () {
    }
  },

  created () {
    this.$parent && this.$parent.updateItems()
  },

  destroyed () {
    this.$parent && this.$parent.updateItems()
  }
}
</script>
