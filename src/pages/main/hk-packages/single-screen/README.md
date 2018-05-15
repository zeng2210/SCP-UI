>单屏播放引用
`<single-screen :videoplayData="videoplayData" :ocxbgColor="ocxbgColor"></single-screen>`

>需要参数子设备id（此参数需要传递进子组件）
`videoplayData: {`
` deviceID: '30010000001310000001',` 子设备id（string）
` parentID: '10012001001110004444',` 父设备id（string）
` mediaIP: '192.168.0.207',`         流媒体ip（string）
` mediaPort: 10000`                  流媒体端口（number）
 ` }` 
 `ocxbgColor:1`                      1代表红色，2代表黄色，3代表蓝色