<template>
  <div class="item-box item-warning community-help-box">
    <div class="ico-btn-group">
      <a class="ico icon-turn-off" href="javascript:;"></a>
      <a class="ico icon-exit-full" href="javascript:;"></a>
    </div>

    <div class="hd">社区求助</div>
    <div class="bd">
      <ul class="help-list-box">
        <li>
          <div class="detail-info-box">
            <div class="left-box">
              <div class="view">
                <img src="/static/images/p06.png" alt="" class="pic">
                <div class="calling">
                  <p class="time">00:06</p>
                  <p class="txt">正在通话</p>
                </div>
              </div>
              <div class="btn-box">
                <button type="button" class="btn green">接 听</button>
                <button type="button" class="btn red">拒 绝</button>
              </div>
              <!-- 接听后按钮显示样式, 添加类 one-btn -->
              <div class="btn-box one-btn" v-show="false">
                <button type="button" class="btn red">挂 断</button>
              </div>
              <!--呼叫、呼梯按钮按时-->
              <div class="btn-box" v-show="false">
                <button type="button" class="btn green">呼 叫</button>
                <button type="button" class="btn green">呼 梯</button>
              </div>
            </div>
            <ul class="right-box">
              <li class="pic-box"><img src="/static/images/p06.png" alt="" class="pic"></li>
              <li><span class="name">事&nbsp;件：</span>发现有人落水</li>
              <li><span class="name">时&nbsp;间：</span>2018-03-23 16:24:26</li>
              <li class="place"><span class="name">地&nbsp;点：</span>3号楼路口</li>
            </ul>
          </div>
        </li>
      </ul>
      <ul class="list-dot">
        <li class="active"></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <!--确定是否解除警报-->
    <div class="clear-confirm-box" v-show="false">
      <div class="bg"></div>
      <div class="con">
        <p class="title">确定要解除该窗口的所有报警吗？</p>
        <div class="btn-box">
          <button type="button" class="btn blue">取 消</button>
          <button type="button" class="btn red">解 除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'community-help',
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
