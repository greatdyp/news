<template>
    <div id="mine-wrap">
        <div v-if="!nickName" id="zhuce_denglu">
            <div id="zhuce_denglu_header">登录推荐更精确</div>
            <p id="zhuce_denglu_body">
                <span id="phone"><a href="#/login"><i  class="fa fa-mobile" ></i></a></span>
                <span><i class="fa fa-weixin"></i></span>
                <span><i class="fa fa-qq"></i></span>
                <span><i class="fa fa-weibo"></i></span>
            </p>
        </div>
       <div v-if="nickName" id="had-login">
            <a href="#/loginout" id="logout">设置</a>
            <img src="../assets/1.jpg" alt="">
            <p id="user_name">{{nickName}}</p>
            <p id="user_intro">{{usermsg.motto}}</p>
            <ul id="user_list">
            <li><span><i class="fa fa-star-o"></i></span><br><span>动态</span></li>
             <li><span><i class="fa fa-history"></i></span><br><span>历史</span></li>
              <li @click="night()"><span><i class="fa fa-moon-o"></i></span><br><span>夜间</span></li>
            </ul>
        </div>
        <div  id="mine_list">
        <a href="/#usercenter"><p><span>个人中心</span><span><i class="fa fa-chevron-right"></i></span></p></a>
        <p><span>一元抽奖</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>京东特供</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>小米商城</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>我要爆料</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>用户反馈</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>友情链接</span><span><i class="fa fa-chevron-right"></i></span></p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        data: function() {
            return {
          usermsg:[]
            }
        },
        computed:{
      ...mapState(['nickName'])
    },
    mounted(){
      this.checkLogin();
      this.getusermsg();
    },
    methods:{
      checkLogin(){
           this.$http({
                method: 'GET',
                url: '/news/checkLogin',
                data:''
                 }).then((response)=>{
          var res = response.data;
          if(res.status=="0"){
            this.$store.commit("updateUserInfo",res.result);
          }
        })
      },
        getusermsg(){
              this.$http.post('/news/getusers').then((resdata)=>{
                console.log(resdata)
                this.usermsg=resdata.data.msg
              }).catch((err)=>{
                console.log(err)
              })
            }
    } 
}
</script>

<style scoped>
    #zhuce_denglu {
        width: 100%;
        background: #1158;
        color: #fff;
    }
    
    #zhuce_denglu_header {
        width: 140px;
        margin: 0 auto;
    }
    
    #zhuce_denglu_body {
        width: 260px;
        margin: 5px auto;
    }
    
    #zhuce_denglu_footer {
        width: 160px;
        margin: 18px auto;
        font-size: 14px;
        cursor: pointer;
    }
    
    #zhuce_denglu span {
        display: inline-block;
        width: 50px;
        height: 50px;
        margin: 4px;
        border-radius: 100%;
        cursor: pointer;
    }
    
    #zhuce_denglu i {
        display: inline-block;
        font-size: 35px;
        margin: 5px;
    }
    #phone a>i {
        color:#fff;
        display: inline-block;
        font-size: 50px;
        position: relative;
        top: 6px;
        left: 15px
    }
     #mine_list{
          margin-top:10px;
     }
    #mine_list p{
        border-bottom:solid 1px #fff;
        background:#fff; 
        padding:5px;
        color:#888;
        cursor:pointer;
    }
    #mine_list p a{
        color:#888;
    }
     #mine_list p:hover{
         background:#ddd;
         color:#000;
     }
     #mine_list p span{
          margin-left:10px;
     }
     #mine_list p:nth-child(2){
         margin-bottom:15px
     }
      #mine_list p:nth-child(4){
         margin-bottom:15px
     }
     #mine_list p span:last-child{
         float:right;
         margin-right:20px;
     }
      #mine_list p span i{
          color:#999;
          font-size:14px
      }
      #had-login{
    background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#FF7744), to(#FF3333));
    color:#fff;
    height:150px;
      }
       #had-login img{
           width:50px;
           height:50px;
           margin-top:20px;
           margin-left:20px;
           border-radius:100%;
           border:solid 1px #fff;
       }
       #logout{
          float:right;
         margin:5px 10px;
       }
        #logout{
            color:#fff
        }
        #user_name{
            width:80px;
           float:right;
           margin-right:140px;
            margin-top:20px;
        }
        #user_intro{
            width:275px;
            float:right;
           margin-right:1px;
            margin-top:-30px;
            font-size:14px;
            color:#ddd;
        }
        #user_list{
            list-style:none;
        }
         #user_list li span i{
             font-size:24px
         }
          #user_list li:first-child{
              margin-left:20px;
          }
        #user_list li{
            width:80px;
            float:left;
            margin-right:30px;
            margin-top:10px;
            text-align:center;
            color:#fff;
        }
</style>
