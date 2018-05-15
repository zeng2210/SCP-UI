
// 创建一个小div单例用于做动画。
const el = document.createElement('div')
// const TransitionString = 'transform .5s ease, width .5s ease, height .5s ease'
const TransitionString = 'all .5s ease'
el.style.cssText = `
      display:none;position:absolute;z-index:100;background:#6a6b6a;left:0;top:0;width:0;height:0;opacity:.5;
      transform:translate3d(0,0,0);transition:none;
    `
document.body.appendChild(el)

/**
 * @title 提供地图上的设备点位点击放大到对应区块屏幕的动画
 * @param pointer { object|element } 起始点的绝对坐标或者html元素本身
 * @param target {string} 目标容器的id，对应划分的6个容器
 * @return { Promise }
 * @e.g castAnimate({x:670, y: 820}, "W1").then(()=>{ console.log('动画播放结束') })
 */
export default function (pointer, target) {
  // 拿到当前页面的滚动举例，在正常的情况下，这两个值应该都是0
  let docScrollTop = document.documentElement.scrollTop
  let docScrollLeft = document.documentElement.scrollLeft

  // 如果起始点是一个element，计算其中心点
  if (pointer instanceof HTMLElement) {
    let pointElement = pointer
    let rect = pointElement.getBoundingClientRect()

    pointer = {
      x: rect.left + docScrollLeft - (rect.width / 2),
      y: rect.top + docScrollTop - (rect.height / 2)
    }
  }

  // 设置元素的起始位置和状态
  startEl(pointer)

  return new Promise(resolve => {
    // // IE11只会响应`transitionend`, chrome只会响应`webkitTransitionEnd`
    // el.addEventListener('transitionend', callback)
    // el.addEventListener('webkitTransitionEnd', callback)
    let transitionEvent = whichTransitionEvent()
    transitionEvent && el.addEventListener(transitionEvent, callback)

    let rect = getTargetRect(target)
    moveEl(rect)

    function callback (ev) {
      // 恢复初始状态
      resetEl()
      // TODO:设置三个属性会导致callback三次，但是不remove也没啥大问题，因为resolve只有一次。
      // console.log(ev.type, 'resolved!!!!!!!!!')
      el.removeEventListener(ev.type, callback)
      resolve()
    }
  })
}

// 计算目标元素的中心点（动画目标位置），这里假设页面不发生滚动，容器的位置固定不变 TODO：需耦合容器的xtag，有点不好。
function getTargetRect (targetTag) {
  let targetEl = document.querySelector(`[xtag="${targetTag}"]`)
  let rect = targetEl.getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height,
    x: rect.left,
    y: rect.top
  }
}

// 准备开始动画，调整好位置，并加上transition
function startEl ({x, y}) {
  let radius = 20
  css(el, {
    display: 'block',
    width: radius,
    height: radius,
    transform: `translate3d(${x - radius / 2}px, ${y - radius / 2}px, 0)`
  })
}

// 运行动画。 目标的高宽、坐标
function moveEl ({x, y, width, height}) {
  css(el, {
    'transition': TransitionString,
    'transform': `translate3d(${x}px, ${y}px, 0)`,
    'width': width,
    'height': height
  })
}

// 事务结束后重置el的状态和位置
function resetEl () {
  css(el, {
    display: 'none',
    width: 0,
    height: 0,
    transition: 'none'
  })
}

// 设置CSS属性（集），致敬jQuery.
function css (ele, k, v) {
  if (arguments.length === 3 && typeof k === 'string') {
    if (typeof v === 'number') {
      v = v + 'px'
    }
    ele.style[k] = v
  } else if (arguments.length === 2) {
    let kType = typeof k
    if (kType === 'object') {
      let map = k
      for (let key in map) {
        css(ele, key, map[key])
      }
    } else if (kType === 'string') {
      return window.getComputedStyle(ele, null)[k]
    }
  }
}

/* From Modernizr */
function whichTransitionEvent () {
  // var el = document.createElement('fakeelement')
  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  }

  for (let t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t]
    }
  }
}
