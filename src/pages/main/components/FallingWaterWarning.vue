<template>
  <park-warning :warnType="warnType" @closeWarnEvent="closeWarnEvent" v-if="warnType!== ''"></park-warning>
  <!-- <div class="item-box item-danger falling-water-box">
     <em class="subscript subscript1"></em>
     <em class="subscript subscript2"></em>
     <em class="subscript subscript3"></em>
     <em class="subscript subscript4"></em>
     <div class="ico-btn-group">
       <a class="ico icon-turn-off" href="javascript:;"></a>
       <a class="ico icon-exit-full" href="javascript:;"></a>
     </div>

     <div class="hd">落水预警</div>
     <div class="detail-info-box">
       <div class="left-box">
         <div class="view">
           <img src="/static/images/p06.png" alt="" class="pic">
         </div>
         <button type="button" class="btn blue">派   遣</button> -->
  <!--派遣添加类.doing-->
  <!--<button type="button" class="btn blue doing">处   理   中</button>-->
  <!-- </div>
       <ul class="right-box">
         <li class="pic-box"><img src="/static/images/p06.png" alt="" class="pic"></li>
         <li><span class="name">事&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</span>发现有人落水</li>
         <li><span class="name">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间：</span>2018-03-23 16:24:26</li>
         <li><span class="name">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</span>3号楼路口</li>
         <li><span class="name">推荐保安：</span>张夏
           <a href="javascript:;" class="icon-send"></a> -->
  <!--派遣添加类.doing-->
  <!--<a href="javascript:;" class="icon-send doing"></a>-->
  <!-- </li>
       </ul>
     </div> -->

  <!--查看-->
  <!-- <div class="info-box look" style="display:none;">
        <div class="info">
          <img src="/static/images/p08.png" alt="" class="pic">
          <p><b>事件：</b>发现有人落水</p>
          <p><b>时间：</b>2018-03-23  16:24:23</p>
          <p><b>地点：</b>亲水平台</p>
          <p><b>保安：</b><span class="name">张晓</span></p>
          <p><b>状态：</b>处理中</p>
        </div>
      </div> -->

  <!--处理完成-->
  <!-- <div class="info-box done" style="display: none">
        <div class="info">
          <p><b>状态：</b>处理完成</p>
          <p><b>保安：</b><span class="name">张晓</span><span class="name">张晓</span></p>
          <div class="result"><b>处理结果：</b><br>已拨打120把落水人员送往医院，现场已清理，并联系了落水人员家属。</div>
        </div>
        <div class="btn-box">
          <button type="button" class="btn red">解除警报</button>
        </div>
      </div> -->
  <!-- </div> -->
  <!--选择需要派遣的保安-->
  <!-- <div class="select-guards-box" v-show="false">
      <p class="title">选择保安</p>
      <ul class="guards-list center"> -->
  <!--事件列表小于或等于3，添加类.center，反之移除-->
  <!-- <li class="active">
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
    </div> -->
  <!--确定是否解除警报-->
  <!-- <div class="clear-confirm-box" v-show="false">
       <div class="bg"></div>
       <div class="con">
         <p class="title">确定要解除该窗口的所有报警吗？</p>
         <div class="btn-box">
           <button type="button" class="btn blue">取   消</button>
           <button type="button" class="btn red">解   除</button>
         </div>
       </div>
     </div>
   </div> -->
</template>

<script>
export default {
  name: 'falling-water-warning',
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
