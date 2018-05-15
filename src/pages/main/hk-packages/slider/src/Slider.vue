<template>
  <div class="hk-slider">
    <div class="hk-slider-cover" v-show="preventClick"></div>
    <div class="hk-slider-container" :style="{transform: `translateX(0px)`}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slider',

  props: {
    paddingRight: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    autoMove: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      dragDom: null,
      dragging: false,
      moving: false,
      pointX: 5, // 滑动多少距离才滑动
      startX: 0,
      downX: 0,
      moveX: 0,
      startTime: 0,
      curTransX: 0,
      offsetWidth: 0,
      lastScrollWidth: 0,
      scrollWidth: 0,
      preventClick: false,
      moveTimer: null
    }
  },

  computed: {
    minDistance: function () {
      return Math.floor(this.offsetWidth - this.scrollWidth - this.paddingRight)
    },
    maxDistance: function () {
      return 0
    },
    blankDistance: function () {
      return Math.floor(this.offsetWidth * 0.1)
    }
  },

  watch: {
    loading: function (val) {
      if (val) {
        this.stopMove()
        this.preventClick = true
      } else {
        this.preventClick = false
        this.setBack(false)
      }
    }
  },

  methods: {
    handleMouseDown (event) {
      event.cancelBubble = false
      event.preventDefault()
      if (this.loading) return
      this.downX = event.clientX
      this.startTime = (new Date()).getTime()
      if (this.moving) this.stopMove()
      window.addEventListener('mousemove', this.onDragging)
      window.addEventListener('mouseup', this.handleMouseUp)
      window.addEventListener('contextmenu', this.handleMouseUp)
    },
    onDragging (event) {
      if (this.dragging) {
        this.moveX = event.clientX - this.startX
        let distance = this.getDistance(this.moveX)
        this.setPosition(distance, 0)
        this.preventClick = true
        window.clearTimeout(this.moveTimer)
        this.moveTimer = null
      } else {
        if (Math.abs(event.clientX - this.downX) > this.pointX) {
          this.dragging = true
          this.startX = event.clientX
        }
      }
    },
    handleMouseUp (event) {
      if (this.loading) return
      if (this.dragging) {
        let differTime = (new Date()).getTime() - this.startTime
        if (differTime < 300) {
          let speed = this.moveX / differTime
          let differ = (speed * Math.abs(speed)) / 0.0012
          let distance = this.getDistance(differ)
          this.setPosition(distance, 500)
          this.moving = true
        } else {
          this.curTransX = this.getChansform()
        }
        setTimeout(() => {
          this.dragging = false
        }, 0)
        if (this.autoMove) this.autoMoveToRight()
      }
      this.preventClick = false
      this.setBack()
      window.removeEventListener('mousemove', this.onDragging)
      window.removeEventListener('mouseup', this.handleMouseUp)
      window.removeEventListener('contextmenu', this.handleMouseUp)
    },
    setPosition (distance, transTime) {
      this.dragDom.style.transform = 'translateX(' + distance + 'px)'
      this.dragDom.style.transition = 'transform ' + transTime + 'ms'
      this.dragDom.style.transition = 'transition-timing-function: ease'
    },
    stopMove () {
      let trans = this.getChansform()
      this.setPosition(trans, 0)
      this.curTransX = trans
      this.preventClick = true
      this.moving = false
    },
    getChansform () {
      let transform = getComputedStyle(this.dragDom).transform
      return parseInt(transform.substring(7).split(',')[4])
    },
    getDistance (differ) {
      let distance = this.curTransX + differ
      if (distance > (this.maxDistance + this.blankDistance)) {
        return this.maxDistance + this.blankDistance
      } else if (distance < (this.minDistance - this.blankDistance)) {
        return this.minDistance - this.blankDistance
      }
      return distance
    },
    transitionEnd (event) {
      this.moving = false
      this.setBack()
      this.curTransX = this.getChansform()
    },
    update () {
      this.lastScrollWidth = this.scrollWidth
      this.offsetWidth = this.$el.offsetWidth
      this.scrollWidth = this.dragDom.scrollWidth
      this.curTransX = this.getChansform()
    },
    setBack (isEmit = true) {
      let distance = this.getChansform()
      if (distance > this.maxDistance) {
        this.setPosition(this.maxDistance, 300)
        this.moving = true
        if (isEmit) this.$emit('reachLeft')
      } else if (distance < this.minDistance) {
        this.setPosition(this.minDistance, 300)
        this.moving = true
        if (isEmit) this.$emit('reachRight')
      }
    },
    setRight () {
      let distan = this.curTransX + this.lastScrollWidth - this.scrollWidth
      if (distan < this.minDistance) distan = this.minDistance
      if (distan > this.maxDistance) distan = this.maxDistance
      this.setPosition(distan, 0)
      this.curTransX = this.getChansform()
    },
    autoMoveToRight () {
      window.clearTimeout(this.moveTimer)
      this.moveTimer = null
      this.moveTimer = window.setTimeout(() => {
        this.setPosition(this.minDistance, 0)
        this.curTransX = this.getChansform()
      }, 3000)
    }
  },

  created () {

  },

  mounted () {
    this.$nextTick(() => {
      this.dragDom = this.$el.querySelector('.hk-slider-container')
      this.dragDom.addEventListener('transitionend', this.transitionEnd)
      this.$el.addEventListener('mousedown', this.handleMouseDown)
      this.update()
    })
  },

  beforeDestroy () {

  }
}
</script>
<style>
.hk-slider {
  overflow-x: hidden;
  position: relative;
}
.hk-slider-container {
  position: relative;
}
.hk-slider-cover {
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
