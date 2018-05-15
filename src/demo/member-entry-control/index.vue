<template>
  <!-- 人员管理 -->
  <div class="item-box member-entry-box">
    <div class="hd">人员出入</div>
    <div class="bd">
      <div class="view-wrap">
        <div class="view-list">
          <!--多路预览-->
          <!--<member-screen></member-screen>-->
        </div>

      </div>

      <div class="member-list-wrap">
        <div class="list-wrap">
          <slider >
            <ul class="list-box">
              <li v-for="(item,index) in member" :key="index" @click="showMenberInfo(item.id)">
                <img :src="item.img" alt="" class="pic">
                <p class="txt">{{item.name}}</p>
              </li>
            </ul>
          </slider>
        </div>
        <div class="view-box">
          <div class="subscript-box">
            <img :src="imgSrc" alt="" class="pic">
            <em class="subscript subscript1"></em>
            <em class="subscript subscript2"></em>
            <em class="subscript subscript3"></em>
            <em class="subscript subscript4"></em>
          </div>
          <p class="txt focus">重点人员</p>
          <!-- 重点人员添加类focus -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mutationTypes from '@/pages/main/store/mutation-types'
export default {
  name: 'member-entry-control',
  components: {

  },
  data () {
    return {
      member: [
        { id: 1000, img: '/static/images/p06.png', name: '张三' },
        { id: 2000, img: '/static/images/p06.png', name: '李四' },
        { id: 3000, img: '/static/images/p06.png', name: '王五' },
        { id: 1000, img: '/static/images/p06.png', name: '张三' },
        { id: 2000, img: '/static/images/p06.png', name: '李四' },
        { id: 3000, img: '/static/images/p06.png', name: '王五' },
        { id: 1000, img: '/static/images/p06.png', name: '张三' },
        { id: 2000, img: '/static/images/p06.png', name: '李四' },
        { id: 3000, img: '/static/images/p06.png', name: '王五' }
      ],
      imgSrc: '/static/images/p06.png'
    }
  },
  mounted () {

  },
  methods: {
    showMenberInfo (memberId) {
      // TODO: 点击一个人物头像，将数据提交到vuex中；另一条链路是在container中监听数据的变化，切换组件的状态（结合这里提交的data参数）
      // 如果是ws的推送的数据，可以在mounted里面register回调里面类似的处理方式。
      console.log('-----memberId:', memberId)
      this.$store.commit(mutationTypes.SHOW_MEMBER_INFO, {
        // 将member info 组件需要的数据交给vuex中转，在container里面 监听数据变化
        data: {
          id: memberId
        },
        shown: true
      })
    }
  }
}
</script>

<style>

</style>
