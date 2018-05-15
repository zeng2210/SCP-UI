<template>
  <div>
    <div class="item-box item-warning patrol-report-box">
      <div class="ico-btn-group">
        <a class="ico icon-turn-off" href="javascript:;"></a>
        <a class="ico icon-exit-full" href="javascript:;"></a>
      </div>

      <div class="hd">巡更报事</div>
      <div class="detail-info-box">
        <div class="left-box">
          <div class="view">
            <img src="/static/images/p06.png" alt="" class="pic">
          </div>
          <button type="button" class="btn blue">派   遣</button>
        </div>
        <ul class="right-box">
          <li class="accident"><span class="name">事&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</span>6栋2单元门口有很多垃圾还有污水流出，请派人整理。</li>
          <li><span class="name">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间：</span>2018-03-23 16:24:26</li>
          <li><span class="name">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</span>3号楼路口</li>
          <li><span class="name">推荐保安：</span>张夏
            <a href="javascript:;" class="icon-send"></a>
          </li>
        </ul>
      </div>
      <a href="javascript:;" class="arrow icon-arrow-l"></a>
      <a href="javascript:;" class="arrow icon-arrow-r"></a>
      <ul class="list-dot"><li class="active"></li><li class=""></li><li class=""></li><li class=""></li></ul>
    </div>
    <div class="item-box item-warning" v-show="false">
      <div class="ico-btn-group">
        <a class="ico icon-turn-off" href="javascript:;"></a>
        <a class="ico icon-exit-full" href="javascript:;"></a>
      </div>

      <div class="hd">保安异常</div>
      <div class="detail-info-box">
        <div class="left-box">
          <div class="view">
            <img src="/static/images/p06.png" alt="" class="pic">
          </div>
          <button type="button" class="btn blue">派   遣</button>
        </div>
        <ul class="right-box">
          <li class="accident"><span class="name">事&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</span>保安人员偏离巡更轨道请立即派人处理或联系该人员。</li>
          <li><span class="name">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间：</span>2018-03-23 16:24:26</li>
          <li><span class="name">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</span>3号楼路口</li>
          <li><span class="name">推荐保安：</span>张夏
            <a href="javascript:;" class="icon-send"></a>
          </li>
        </ul>
      </div>

      <a href="javascript:;" class="arrow icon-arrow-l"></a>
      <a href="javascript:;" class="arrow icon-arrow-r"></a>
      <ul class="list-dot"><li class="active"></li><li class=""></li><li class=""></li><li class=""></li></ul>
    </div>
  </div>

</template>

<script>
export default {
  name: 'patrol-report-accident',
  data () {
    return {
      warnType: 'lackWarn'
    }
  },
  methods: {
    closeWarnEvent () {
      this.warnType = ''
    }
  }
}
</script>

<style scoped>

</style>
