<template>
  <ul class="right-box">
    <li>{{deviceName}}</li>
    <li><span class="name">位&nbsp;置：</span>{{orgName}}</li>
    <li><span class="name">编&nbsp;码：</span>{{deviceCode}}</li>
    <li><span class="name">类&nbsp;型：</span>{{deviceTypeDesc}}</li>
    <li><span class="name">厂&nbsp;商：</span>{{providerName}}</li>
    <li><span class="name">IP和端口：</span>{{deviceIP || '-'}}：{{devicePort || '-'}}</li>
  </ul>
</template>

<script>
export default {
  name: 'device-desc-box',
  props: {
    deviceName: {
      type: String
    },
    orgName: {
      type: String
    },
    deviceCode: {
    },
    deviceTypeDesc: {
      type: String
    },
    providerName: {
      type: String
    },
    deviceIP: {
    },
    devicePort: {
      type: String
    }
  },
}
</script>

<style>

</style>
