<template>
  <div class="el-carousel" @mouseenter.stop="handleMouseEnter" @mouseleave.stop="handleMouseLeave">
    <div class="el-carousel__container" :style="{ height: height }">
      <div class="el-carousel_cover" v-show="dragging"></div>
      <slot></slot>
    </div>
    <a v-show="noAction&&itemLength>1" class="arrow icon-arrow-l" @click="prev"></a>
    <a v-show="noAction&&itemLength>1" class="arrow icon-arrow-r" @click="next"></a>
    <ul v-if="itemLength>1&&itemLength<=10" class="list-dot" v-show="showDot" :style="'top:'+dotTop+';'" style="position:relative;">
      <li v-for="index in itemLength" :key="index" :class="{ 'active': index-1 === activeIndex }" @click.stop="handleIndicatorClick(index-1)">
      </li>
    </ul>
    <div v-if="itemLength>10" class="list-dot" v-show="showDot" :style="'top:'+dotTop+';'" style="position:relative;">
      <span>{{(activeIndex+1)+'/'+itemLength}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carousel',

  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    showDot: {
      type: Boolean,
      default: true
    },
    dotTop: {
      type: String,
      default: '0px'
    },
    noAction: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      items: [],
      activeIndex: 0,
      hover: false,
      dragging: false,
      pointX: 5,
      startX: 0,
      downX: 0,
      moveX: 0,
      offsetWidth: 0,
      currentX: 0,
      itemLength: 0
    }
  },

  computed: {
    changX: function () { // 滑动多少距离才翻页
      return Math.floor(this.offsetWidth * 0.16)
    }
  },

  watch: {
    items (val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex)
    },
    activeIndex (val) {
    }
  },

  methods: {
    handleMouseEnter () {
      this.hover = true
    },

    handleMouseLeave () {
      this.hover = false
    },

    updateItems () {
      this.items = this.$children.filter(child => child.$options.name === 'carouselItem')
      if (!this.noAction) this.itemLength = this.items.length
      this.$nextTick(() => {
        this.offsetWidth = this.$el.offsetWidth
        this.items.forEach((item, index) => {
          item.translateItem(index, this.activeIndex)
        })
      })
    },
    setItemLength (length) {
      this.itemLength = length
    },
    updateItemLength (index, num) {
      let leng = this.itemLength + num
      if (leng < 0) return
      this.itemLength = leng
      if (num > 0) {
        if (index <= this.activeIndex) this.activeIndex += num
        if (this.activeIndex >= leng) this.activeIndex = leng - 1
      } else {
        if (index === this.activeIndex) {
          if (this.activeIndex >= leng) this.activeIndex -= 1
          this.$emit('change', this.activeIndex)
        } else if (index < this.activeIndex) {
          this.activeIndex += num
        }
      }
    },
    setItemPosition () {
      if (this.noAction) return
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex)
      })
    },

    setActiveItem (index) {
      if (this.disabled || this.itemLength <= 0) return
      index = Number(index)
      const oldIndex = this.activeIndex
      if (index < 0) {
        this.activeIndex = this.itemLength - 1
      } else if (index >= this.itemLength) {
        this.activeIndex = 0
      } else {
        this.activeIndex = index
      }
      if (oldIndex !== this.activeIndex) {
        this.$emit('change', this.activeIndex)
      }
      this.setItemPosition()
    },

    prev () {
      this.setActiveItem(this.activeIndex - 1)
    },

    next () {
      this.setActiveItem(this.activeIndex + 1)
    },

    handleIndicatorClick (index) {
      this.setActiveItem(index)
    },
    setTransTime (time) {
      this.items.forEach((item, index) => {
        item.setTransTime(time)
      })
    },
    handleMouseDown (event) {
      event.stopPropagation()
      event.cancelBubble = false
      event.preventDefault()
      this.downX = event.clientX
      window.addEventListener('mousemove', this.onDragging)
      window.addEventListener('mouseup', this.onDragEnd)
      window.addEventListener('contextmenu', this.onDragEnd)
    },
    handleMouseUp (event) {
      if (this.noAction) return
      this.setTransTime(500)
      const length = this.itemLength
      if (length >= 2 && Math.abs(this.moveX) > this.changX) {
        if (this.activeIndex === 0) {
          if (this.moveX > 0) this.setItemPosition()
          else this.next()
        } else if (this.activeIndex === length - 1) {
          if (this.moveX > 0) this.prev()
          else this.setItemPosition()
        } else {
          if (this.moveX > 0) this.prev()
          else this.next()
        }
      } else {
        this.setItemPosition()
      }
    },
    onDragging (event) {
      if (this.dragging) {
        this.currentX = event.clientX
        this.moveX = this.currentX - this.startX
        this.setPosition()
      } else {
        if (Math.abs(event.clientX - this.downX) > this.pointX) {
          this.dragging = true
          this.startX = event.clientX
          this.setTransTime(0)
        }
      }
    },
    onDragEnd (event) {
      if (this.dragging) {
        setTimeout(() => {
          this.dragging = false
        }, 0)
        this.handleMouseUp(event)
      }
      window.removeEventListener('mousemove', this.onDragging)
      window.removeEventListener('mouseup', this.onDragEnd)
      window.removeEventListener('contextmenu', this.onDragEnd)
    },
    setPosition () {
      if (this.noAction) return
      const length = this.items.length
      this.items[this.activeIndex].dragItem(this.moveX)
      if (length >= 2) {
        if (this.activeIndex === 0) {
          this.items[this.activeIndex + 1].dragItem(this.offsetWidth + this.moveX)
        } else if (this.activeIndex === length - 1) {
          this.items[this.activeIndex - 1].dragItem(this.offsetWidth * -1 + this.moveX)
        } else {
          this.items[this.activeIndex + 1].dragItem(this.offsetWidth + this.moveX)
          this.items[this.activeIndex - 1].dragItem(this.offsetWidth * -1 + this.moveX)
        }
      }
    }
  },

  created () {

  },

  mounted () {
    this.$nextTick(() => {
      let dragDom = this.$el.querySelector('.el-carousel__container')
      dragDom.addEventListener('mousedown', this.handleMouseDown)
    })
  },

  beforeDestroy () {

  }
}
</script>
<style>
.el-carousel {
  overflow-x: hidden;
  position: relative;
}
.el-carousel__container {
  position: relative;
}
.el-carousel__item {
  width: 100%;
  overflow: hidden;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
.el-carousel_cover {
  width: 100%;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
