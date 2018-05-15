>四分屏引用
`<four-split-screen :fourSplitData="fourSplitData"></four-split-screen>`

>需要参数子设备id（此参数需要传递进子组件）
>fourSplitData是数组
 `fourSplitData: [`
 `{`
 `deviceID: '30011238222980110001',`子设备id（string）
 `parentID: '10012001123822298011',`父设备id（string）
  `mediaIP: '192.168.0.109',`       流媒体ip（string）
  `mediaPort: 10000`                流媒体端口（number）
  `}`
  `]`