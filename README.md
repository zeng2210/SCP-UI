# scp-ui

> 新版监控大屏。git: http://gitlab/root/SCP-UI.git

## 四条常规命令
注意[在windows上安装依赖需要加上no optional参数](https://segmentfault.com/q/1010000004498934)
``` bash
npm install --no-optional
npm run dev
npm run build
# 构建同时输出分析报告
npm run build --report
```
> 当前项目采用了4个页面，访问路径如下:
> + 园区安防: `/garden-security.html`
> + 人员统计: `/person-statistics.html`
> + 车辆统计: `/car-statistics.html`
> + 右边3*3区域: `/main.html`


## 基本目录说明
+ 产品图片统一放在`/static`目录，不要放在`/src/assets/`下。（其他纯静态的js或者css
也可以这么做）
+ 各页面下`/src/pages/{page-name}/api/` 下放所有接口，接口统一在此目录下管理，
  不同模块可以增加`js` 文件或者目录；同时所有`mock`数据也放在`api/mock/`目录下管理

+ `/src/pages/`下固定四个页面各自的目录，页面内的私有资源放在各自目录内.公共资源在外
  部有对应位置，例如公共组件、`websocket`等。
+ 主页(main.html)对应目录 `src/pages/main/`下特殊的目录管理策略如下：
  - `containers` 为所有容器的集合
  - `controller` 为中央处理器
  - `store` 为 `vuex` 相关
  - 所有容器内的一级组件都以组件名命名，且必须至少有两个单词组成，如`weather-forecast`
    ，且没一个一级组件的目录下，必须有一个`index.vue`(或`.js`)，以方便外部引用，
    所有该组件内部的组件都在自己目录内处理。

## 主页(main)的容器组件模型

### 容器(`container`)和一级组件(`mod`)
+ 划分6个区块的容器`Container`（B/C/D/Map/W1/W2），每个容器管理固定的一级组件`mod`
  (`container`的下一级组件称为一级组件，即`mod`)，这些`mod`(如`MemberInfo`，
  `MapViewer`等)各自作为具体业务组件的容器(也就是其父组件)。
+ 每个`container`的`mod`在一开始都初始化出来，但默认只显示其默认组件（如B区域的
  `MemberEntryControl`，W1区域的`WeatherForecast`等），其余`mod`在需要的时候激活。
+ 每个`container`都监听了自身`mod`可能的状态变化(数据变化和显示态的变化)：
  + 如果数据变化，那么`mod`通过固定的`props`(`info`)传递给子组件更新数据
  + 如果显示态变化，那么切换`mod`自身的`v-show`。当监听到某个`mod`的显示态为显示时，
    将除默认组件外的其他兄弟组件全部`hide`，自身置为`show`。
+ 所有需要依赖`controller.register`监听`WebSocket`推送消息的组件必须全局初始化就
  挂载，并且不得销毁，只能切换显示隐藏(因为一个组件需要监听`ws`本身就必须尽早进行，并且
  如果销毁后再次初始化会导致监听多次)

### 场景举例
初始化或者无一级告警发生时，W1区域的结构如下：
```xml
<W1>
    <天气预报组件 show="true" desc="默认组件，并且永远不隐藏" />
    <告警组件 show="false" data="null" desc="集成了包括落水|越界等所有一级告警的入口" />
</W1>
```

当`警告组件`监听的ws的消息段中带有一级告警 或者 用户在地图上点击了告警设备点时，都往`vuex`
上提交了一个状态值变更，在W1这个容器上监听到了对应的变化，于是其状态切换如下：
```xml
<W1>
    <天气预报组件 show="true" desc="默认组件，并且永远不隐藏" />
    <告警组件 show="true" data="data" desc="切换到显示状态，并且更新对应的数据" />
</W1>
```
`data`为`ContainerW1`监听到的数据体，传给`告警组件`





