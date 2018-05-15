<template>
  <div class="item-box item-warning key-person-box">
    <div class="ico-btn-group">
      <a class="ico icon-turn-off" href="javascript:;"></a>
      <a class="ico icon-exit-full" href="javascript:;"></a>
    </div>

    <div class="hd">重点人员</div>
    <div class="detail-info-box">
      <div class="left-box">
        <div class="view">
          <img src="/static/images/p06.png" alt="" class="pic">
        </div>
        <button type="button" class="btn blue">派   遣</button>
        <!--派遣添加类.doing-->
        <button type="button" class="btn blue doing" v-show="false">处   理   中</button>
      </div>
      <ul class="right-box">
        <li class="pic-box"><img src="/static/images/p06.png" alt="" class="pic"></li>
        <li><span class="name">事&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</span>发现可疑人员</li>
        <li><span class="name">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间：</span>2018-03-23 16:24:26</li>
        <li><span class="name">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</span>3号楼路口</li>
        <li><span class="name">推荐保安：</span>张夏
          <a href="javascript:;" class="icon-send"></a>
          <!--派遣添加类.doing-->
          <a href="javascript:;" class="icon-send doing" v-show="false"></a>
        </li>
      </ul>
    </div>

    <a href="javascript:;" class="arrow icon-arrow-l"></a>
    <a href="javascript:;" class="arrow icon-arrow-r"></a>
    <ul class="list-dot"><li class="active"></li><li class=""></li><li class=""></li><li class=""></li></ul>
    <!--解除警报-->
    <div class="detail-info-box">
      <div class="left-box">
        <div class="view">
          <img src="/static/images/p06.png" alt="" class="pic">
        </div>
        <button type="button" class="btn blue">解除警报</button>
      </div>
      <ul class="right-box">
        <li><span class="name">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>处理完成</li>
        <li><span class="name">保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;安：</span><span class="people">张夏</span></li>
        <li class="result"><span class="name">处理结果：</span>尚未发现该人员危险行为，已记录该人员信息，该可以人员现已离开园区</li>
      </ul>
    </div>
    <!--选择需要派遣的保安-->
    <div class="select-guards-box" v-show="false">
      <p class="title">选择保安</p>
      <ul class="guards-list center"><!--事件列表小于或等于3，添加类.center，反之移除-->
        <li class="active">
          <div class="guard-info">
            <div class="pic-box">
              <p class="success"><span>系统推荐</span></p>
              <img src="/static/images/p06.png" alt="" class="pic">
            </div>

            <p class="name">保安-张晓</p>
            <p class="distance icon-place">路程最近</p>
          </div>
        </li>
        <li>
          <div class="guard-info">
            <div class="pic-box">
              <img src="/static/images/p06.png" alt="" class="pic">
            </div>

            <p class="name">保安-张晓</p>
            <p class="distance icon-place">路程最近</p>
          </div>
        </li>
        <li>
          <div class="guard-info">
            <div class="pic-box">
              <img src="/static/images/p06.png" alt="" class="pic">
            </div>

            <p class="name">保安-张晓</p>
            <p class="distance icon-place">路程最近</p>
          </div>
        </li>
      </ul>

      <div class="btn-box">
        <button type="button" class="btn red">取消</button>
        <button type="button" class="btn blue">派遣</button>
      </div>
    </div>
    <!--确定是否解除警报-->
    <div class="clear-confirm-box" v-show="false">
      <div class="bg"></div>
      <div class="con">
        <p class="title">确定要解除该窗口的所有报警吗？</p>
        <div class="btn-box">
          <button type="button" class="btn blue">取   消</button>
          <button type="button" class="btn red">解   除</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'key-person-control',
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
