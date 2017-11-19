<template>
    <div id="cont_page_wrap">
        <div id="cont_header"><span @click="conpage()"><i class="fa fa-chevron-left"></i></span ><span>...</span></div>
        <div id="cont_page">
            <h3>{{item.title}}</h3>
            <div id="author_msg">
                <img src="../assets/1.jpg" alt="">
                <p id="msg"><span><a href="/#/usercenter">{{item.author}}</a></span><br>
                <span>{{time}}</span>
                <span class="collect" v-show="isShow" v-if="this.$store.state.nickName != item.author" @click="care()">收藏</span>
                <span v-else @click="removeart(item._id)">删除</span>
                </p> 
            </div> 
            <p id="content">{{item.content}}</p>
              <div v-if="url">
              <img v-if="url.length<=2"  v-for="urll in url " style="width:250px" :src="'http://localhost:3800/images/'+urll" alt="">
              <img v-if="url.length>2 && url.length<=4"  v-for="urll in url " style="width:150px" :src="'http://localhost:3800/images/'+urll" alt="">
              <img v-if="url.length>4"  v-for="urll in url " style="width:100px" :src="'http://localhost:3800/images/'+urll" alt="">
              </div>
            <p id="likes_up"><span @click.once="likes()"><i class="fa fa-thumbs-o-up"></i>：{{like_num}}</span><span @click.once="dislikes()"><i class="fa fa-thumbs-o-down"></i>：{{dislike_num}}</span></p>
            <div id="reply">
                <h5>评论 |</h5>
                <textarea v-model="replycontent" name="" id="" cols="38" rows="4" placeholder="  写下你的神评论..."></textarea>
                <button @click="addreply">发表</button>
            </div>
        </div>
        <div id="reply_msg">
            <h5>全部评论|</h5>
            <ul>
                <li v-if="reply.length" v-for="(rep,ins) in reply">
                    <img src="../assets/1.jpg" alt="">
                    <p id="reply_main">
                    <span>{{rep.author}}</span><br><span>{{rep.content}}</span></p>
                    <p id="reply_footer">
                    <span>{{replytime}}</span><span>{{rep.comment_num}}<a :href="'#/tworeply' + rep._id">回复</a></span>
                    </p>
                    <p id="likes"><span @click="reply_likes(ins)"><i class="fa fa-thumbs-o-up"></i> {{rep.likes}}</span></p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                item: [],
                id:'',
                like_num:'',
                dislike_num:'',
                reply:[],
                replycontent: '',
                time:'',
                replytime:'',
                url:[],
                isShow:true
            }
        },
           computed:{
      ...mapState(['nickName'])
    },
        mounted(){
       this.fetchData()
       this.getusermsg()
       
        },
        methods: {
            fetchData() {
                var that = this
                var id = this.$route.params.id
                axios.post('news/news' + id).then((resdata) => {
                     var urler=resdata.data.msg.pic_url.split(',')
                      that.url=urler
                    that.item = resdata.data.msg
                    that.id = resdata.data.msg._id
                    that.like_num = resdata.data.msg.like_num
                    that.dislike_num = resdata.data.msg.dislike_num
                    that.reply = resdata.data
                    that.time=resdata.data.msg.create_time.substr(0,10)
                    that.replytime=resdata.data.resdata[0].create_time.substr(0,10)
                    that.reply=resdata.data.resdata
                }).catch((err) => {
                    console.log(err)
                })
            },
             getusermsg(){
              this.$http.post('/news/getusermsg',{data:this.item._id}).then((resdata)=>{
                if(resdata.data.msg.article==this.item._id){
                this.isShow = !this.isShow
                }
              }).catch((err)=>{
                console.log(err)
              })
            },
            addreply() {
                if(this.$store.state.nickName){
                    if (this.replycontent.trim() == '') {
                    alert('内容不能为空')
                } else {
                    var that = this
                    axios.post('/news/addreply', {
                        content:that.replycontent,article_id:that.item._id,title:that.item.title,art_author:that.item.author
                    }).then(function(result) {
                        console.log(result.data.msg)
                             that.fetchData();
                           that.replycontent=''
                    }).catch(function(err) {
                        console.log(err)
                    })
                }
                }else{
                    alert('您还为登录，请先登录')
                    location.href="/#/login"
                }
                
            },
            conpage(){
                 window.history.back()
            },
            likes(){
             $('#likes_up span').eq(0).addClass('active').siblings().removeClass('active');
             this.like_num+=1;
             axios.post('/news/likes',{id:this.item._id,likes:this.like_num,dislikes:this.dislike_num}).then((result)=>{
                 console.log(result)
             }).catch((err)=>{
                 console.log(err)
             })
            },
             dislikes(){
             $('#likes_up span').eq(1).addClass('active').siblings().removeClass('active');
             this.dislike_num+=1;
              axios.post('/news/dislikes',{id:this.item._id,likes:this.like_num,dislikes:this.dislike_num}).then((result)=>{
                 console.log(result)
             }).catch((err)=>{
                 console.log(err)
             })
            },
           care(){
                $('.collect').fadeOut();
               var id=this.item._id
               this.$http.post('/news/care',{data:id}).then((resdata)=>{
                   console.log(resdata)
               }).catch((err)=>{
                   console.log(err)
               })
           },
        removeart(id){
           this.$http.post('/news/remove',{'id':id}).then((resdata)=>{
                   location.href=('/#')
               }).catch((err)=>{
                   console.log(err)
               })
        }
        }
    }
</script>

<style scoped>
    #cont_page_wrap {
        padding: 10px 10px;
        margin: 0 auto;
        background: #fff;
    }
    
    #cont_page {
        padding: 10px;
    }
    
    #cont_header {
        font-size: 20px;
        color: #777;
        border-bottom: solid 1px #ddd;
    }
    
    #cont_header span:first-child {
        margin-top: -8px;
        margin-left: 8px;
    }
    
    #cont_header span:last-child {
        float: right;
        margin-top: -8px;
        margin-right: 10px;
    }
    
    #cont_page h3 {
        width: 80%;
        overflow:hidden;
    }
    
    #author_msg {
        margin: 10px 0;
        font-size: 12px;
    }
    
    #author_msg img {
        width: 30px;
        border-radius: 20px;
    }
    
    #msg {
        width: 80%;
        float: right;
        margin-right: 28px;
        margin-top: -3px;
    }
    
    #msg span:last-child {
        float: right;
        background: red;
        color: #fff;
        padding: 3px 10px;
        margin-top: -15px;
        border-radius: 5px;
    }
    
    #content {
        font-size: 16px;
        text-indent: 1em;
        line-height: 30px;
    }
    
    #likes_up {
        width: 70%;
        margin: 0 auto;
        margin-top: 20px;
    }
    
    #likes_up span {
        border: solid 1px #ccc;
        padding: 0 8px;
        border-radius: 10px;
        cursor:pointer;
    }
     #likes_up span:first-child.active{
     color:red;
     }
     #likes_up span:last-child.active{
     color:red;
     }
    #likes_up span:last-child {
        float: right;
    }
    
    #reply {
        margin-top: 10px;
    }
    
    #reply h5 {
        font-size: 16px;
    }
    
    #reply textarea {
        border: solid 1px #ddd;
        border-radius: 5px;
        margin-left: 8px;
        margin-top: 8px;
    }
    
    #reply button {
        background: #f85959;
        border: none;
        color: #fff;
        padding: 3px 8px;
        border-radius: 5px;
        margin-left: 265px;
        margin-top: 10px;
    }
     #reply_msg h5{
         margin:10px;
     }
    #reply_msg ul li {
        list-style:none;
        position:relative;
        margin-top:20px;
    }
     #reply_msg ul li:last-child{
         margin-bottom:50px;
     }
     #reply_msg ul li img{
          width: 30px;
        border-radius: 20px;
        margin:10px 8px;
     }
      #reply_main{
           width:60%;
           float:right;
           margin-right:85px;
      }
       #reply_main span:first-child{
          font-size:12px;
            color:#333;
       }
       #reply_main span:last-child{
          font-size:15px;
          color:#111
       }
       #reply_footer{
            width:50%;
            margin-left:50px;
       }
       #reply_footer span{
            margin-right:10px;
         font-size:12px;
            color:#333;
       }
      #likes{
          position:absolute;
          left:300px;
          bottom:50px;
          font-size:14px;
      }
      #likes span.active{
      color:red;
      }
</style>
