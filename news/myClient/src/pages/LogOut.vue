<template>
   <div  id="log_list">
        <p><span><i @click="last()" class="fa fa-chevron-left"></i></span><span>设置</span></p>
        <p><span>账户安全</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>隐私设置</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>黑名单</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>清除缓存</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>字体大小</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>非wifi网络流量</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>非wifi网络流量播放提醒</span><span>提醒一次</span></p>
        <p><span>推送通知</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>字体大小</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>离线下载</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>头条封面</span><span><i class="fa fa-chevron-right"></i></span></p>
        <p><span>当前版本</span><span><i class="fa fa-chevron-right"></i></span></p>
        <button @click="logout()">退出登录</button>
        </div>
</template>

<script>
export default{
    data:function(){
        return {

        }
    },
    methods:{
   last:function(){
       window.history.back()
   },
     logout(){
    this.$http({
        method: 'GET',
        url: '/news/logout',
        data:''
        }).then((data)=>{
            console.log(data)
            if(data.data.status==0){
           location.href="/"
           
            }
        })
      }
    }
}
</script>

<style scoped>
#log_list p{
     background:#fff;
     padding:5px;
     border-bottom:solid 1px #eee;
     font-size:15px;
     cursor:pointer;
}
#log_list p:nth-child(1),#log_list p:nth-child(4),#log_list p:nth-child(10){
    margin-bottom:10px;
    cursor:default;
}
#log_list p:nth-child(1) span:nth-child(1){
display:inline-block;
margin-top:5px;
margin-left:5px;
font-size:18px;
}
#log_list p:nth-child(1) span:nth-child(2){
display:inline-block;
margin-left:120px;

font-size:19px;
}
#log_list p i{
    float:right;
    margin-right:10px;
    margin-top:5px;
    color:#ddd;
}
#log_list button{
background:#fff;
border:none;
width:100%;
margin-top:20px;
padding:5px;
font-size:18px;
color:red;
cursor:pointer;
}
</style>