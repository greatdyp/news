<template>
  <div id="photo_wrap">
     <div id="addnews_header"><span @click="conpage()">取消</span ><span @click="add()">转发</span></div>
         <input id="title" type="text" placeholder="转：" required>
         <div id="ori_article">
           &nbsp; &nbsp;来自：
         <div>
              <img  style="width:100px" :src="'http://localhost:3800/images/'+url[0]" alt="">
              </div>
              <p id="msg">
         <span><a href="/#/usercenter">{{item.author}}</a></span>:<br>Title:<span>{{item.title}}</span><br>
         content:<span v-if="item.content.length<20">{{item.content}}</span>
         <span v-else>{{item.content.substr(0,25)}}...</span>
         </p> 
         </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                 item: [],
                  url:[]
            }
        },
        mounted(){
       this.getarticle()
        },
        methods: {
           add(){
             var id=this.$route.params.id
             var content=$('#title').val()
                if (this.$store.state.nickName) {
                this.$http.post('/news/zhuan',{'id':id,'content':content}).then(resdata=>{
                if(resdata.data.err==0){
                 alert('转发成功')
                location.href="/#"
                }
            }).catch((err)=>{
                console.log(err)
            })
          }
     },
     conpage(){
        window.history.back()
     },
      getarticle() {
                var that = this
                var id = this.$route.params.id
                this.$http.post('news/news' + id).then((resdata) => {
                    var urler=resdata.data.msg.pic_url.split(',')
                    that.url=urler
                    that.item = resdata.data.msg
                }).catch((err) => {
                    console.log(err)
                })
            },
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
  #ori_article{
    background:#eee;
    height:150px;
    color:#555;
    line-height:30px;
  }
  #msg{
    width:70%;
   position:relative;
   left:100px;
   bottom:120px;
  }
</style>