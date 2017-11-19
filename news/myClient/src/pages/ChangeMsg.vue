<template>
  <div id="photo_wrap">
     <div id="addnews_header"><span @click="conpage()">取消</span ><span @click="add()">确认</span></div>
        <form action="">
         <input id="title"  type="text" :placeholder=usermsg.username disabled>
         <input id="title" v-model="motto" type="text" :placeholder=usermsg.motto required>
          <input @click="xs()" v-model="isMale"  id="title" type="text" placeholder="性别" >
          <datetime v-model="value1" @on-change="change" title="生日"></datetime>
         上传头像：<br><input id="photo" name="file" type="file" multiple accept="image/png,image/jpeg,image/gif" @change="update">
        </form>
        <section id="picture"></section>
          <div class="actionsheet">
      <actionsheet style="cursor: pointer"  @on-click-menu-menu1="click1" @on-click-menu-menu2="click2" v-model="show1" theme="android" :menus="menus" show-cancel cancel-text="取消"></actionsheet>
    </div> 
  </div>
</template>
<script>
 import {Actionsheet,Datetime} from 'vux';
    export default {
        data() {
            return {
                photo:[],
                motto:'',
                content:'',
                 show1:true,
                 value1: '',
                 isMale:'男',
                 menus:{
                    menu1:'男',
                    menu2:'女'
                },
                usermsg:[]
            }
        },
         components:{
          Actionsheet,
          Datetime
      },
      mounted(){
      this.getusermsg();
      },
        methods: {
           update(e){
            var that=this
            var html=''
            for(var i = 0;i<e.target.files.length;i++){
            var f = e.target.files[i];
            that.photo.push(f);
                }
            for(var i = 0 ; i < e.target.files.length ;i ++){
             var file = e.target.files[i]
             html  += '<img style="width:100px" src='+  URL.createObjectURL(file) + '>'
             $('section').append(html) 
              }
           },
           add(){
            
            var data=new FormData()
            for(var i = 0;i<this.photo.length;i++){
            data.append("img",this.photo[i]);
            }
             data.append('url',this.files)
             data.append('motto',this.motto)
                this.$http.post('/news/newusermsg',data,{
                headers:{'Content-Type':'multipart/form-data'}
                }).then(resdata=>{
                if(resdata.data.err==0){
                  location.href=('/#mine')
                }
            }).catch((err)=>{
                console.log(err)
            })
     },
     conpage(){
        window.history.back()
     },
      xs:function(){
                this.show1 =!this.show1 
            },
             click1(){
              this.isMale='男'
            },
            click2(){
              this.isMale='女'
            },
            change(value){
              console.log('change',value)
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
#photo_wrap{
    padding:5px;
}
  #addnews_header {
    height: 35px;
    margin-bottom :5px;
    border-bottom:solid 1px #ddd;
  }
  
  #addnews_header span {
    margin-top: 8px;
    margin-left: 8px;
    font-size: 18px;
    display: inline-block;
    color: #aaa;
    cursor: pointer;
  }
  #title {
    padding: 10px;
    width: 93%;
    height: 20px;
    margin:10px auto;
    border: solid 1px #eee;
  }
  
  #addnews_header span:last-child {
    float: right;
   padding:0 7px;
  }
  
  #addnews_header span:hover {
    color: #000;
  }
  
  #newsthing {
      width:98%;
      margin:0 auto;
    border: solid 1px #eee;
    text-indent: 10px;
  }
 section{
   margin-bottom:50px;
 }

</style>