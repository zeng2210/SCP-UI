/**
 * @desc 基础选项
 */
export default {
  props: {
    xtag: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      mods: [{
        // 组件名
        name: '',
        // 是否显示
        shown: false,
        // 组件所需的数据
        info: {}
      }]
    }
  },
  template: `<div class="item-wrap" :xtag="xtag">
                <component :is="mod.name" v-show="mod.shown" 
                  :info="mod.info" v-for="(mod, index) in mods" :key="index"></component>  
             </div>`,
  // template: `<div class="item-wrap" :xtag="xtag">
  //               <component :is="mod.name" :class="modClassList[index]"
  //                   :info="mod.info" v-for="(mod, index) in mods" :key="index"></component>
  //            </div>`,
  // computed: {
  //   // 计算mod的类名。特殊处理了一下实时监控和社区呼叫两个ocx叠加时的问题，对应W2里面overwrite的setCover method.
  //   modClassList () {
  //     return this.mods.map(mod => {
  //       if (mod.name !== 'live-monitor') {
  //         return 'mod-base ' + (mod.shown ? 'mod-shown' : 'mod-hidden')
  //       } else {
  //         return ''
  //       }
  //     })
  //   }
  // },
  methods: {
    process (info) {
      console.log(`some method`, info)
    },
    // 找到`name`这个组件，设置其show，其余除第一个背景组件以外的兄弟组件都hide，并且设置其info
    setCover (name, info) {
      // TODO: 这个name对应的mod一定存在。
      this.mods.forEach((mod, index) => {
        if (index > 0 && mod.name === name) {
          mod.info = info
        }
      })
    },
    // // 卸载覆盖层的组件
    // unsetCover () {
    //   this.mods.splice(1, 1)
    // },
    // 隐藏覆盖层的组件
    hideCover (name) {
      this.mods.forEach((mod, index) => {
        // 把自身hide，其他的不管。
        if (index > 0 && mod.name === name) {
          mod.shown = false
        }
      })
    },
    // 恢复显示已经隐藏的覆盖层组件
    showCover (name) {
      this.mods.forEach((mod, index) => {
        // 把自身show，其余hide
        if (index > 0 && mod.name === name) {
          mod.shown = true
        }
      })
    }
  }
}
