<template>
  <div>
    <router-view></router-view>

    <div class="tabbar">
      <tabbar>
        <tabbar-item show-dot link="/">
          <i slot="icon" class="fa fa-home"></i>
          <span slot="label"> 首页 </span>
        </tabbar-item>
        
       <div style="margin-left:30px;margin-right:30px" @click="xs()" v-model="show1" :value="true">
        <tabbar-item selected>
          <i slot="icon"  class="fa fa-plus"></i>
          <span slot="label"> 发布 </span>
        </tabbar-item>
       </div>

        <tabbar-item  :badge="count" link="/message">
          <i slot="icon" class="fa fa-envelope-o"></i>
          <span slot="label"> 消息 </span>
        </tabbar-item>

        <tabbar-item  link="/mine">
          <i slot="icon" class="fa fa-user"></i>
          <span slot="label"> 我的 </span>
        </tabbar-item>
      </tabbar>
    </div>
    <div class="actionsheet">
      <actionsheet style="cursor: pointer"  @on-click-menu-menu2="click2" v-model="show1" theme="android" :menus="menus" show-cancel cancel-text="取消"></actionsheet>
    </div>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem,Actionsheet  } from 'vux';
  export default {
    data: function () {
            return {
                show1:true,
                menus:{
                    menu2:'文字/图片',
                    menu3:'视频(时间不得超过30s)'
                },
                count:''
            }
        },
      components:{
          Tabbar,
          TabbarItem,
          Actionsheet
      },
      mounted(){
       this. getmsg();
      },
      methods:{
       xs:function(){
                this.show1 =!this.show1 
            },
             click2:function(){
             location.href="/#add"
            },
            getmsg(){
              this.$http.post('/news/getreplymsg').then((resdata)=>{
                console.log(resdata)
                this.count=resdata.data.msg
              }).catch((err)=>{
                console.log(err)
              })
            }
      }
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fff;
}
  div.tabbar{
    position:fixed;
    bottom:0; width:100%;
  }
</style>
