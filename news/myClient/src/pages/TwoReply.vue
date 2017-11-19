<template>
    <div id="cont_page_wrap">
        <div id="cont_header"><span @click="conpage()"><i class="fa fa-chevron-left"></i></span ><span>...</span></div>
        <div id="reply_msg">
            <img src="../assets/1.jpg" alt="">
            <p id="reply_main">
                <span>{{reply.author}}</span><br><span>{{reply.content}}</span></p>
            <p id="reply_footer">
                <span><i class="fa fa-thumbs-o-up"></i>{{reply.likes}}</span><span>回复：{{reply.comment_num}}</span>
            </p>
        </div>
        <div id="reply">
            <h5>评论 |</h5>
            <textarea v-model="replycontent" name="" id="" cols="38" rows="4" placeholder="  写下你的神评论..."></textarea>
            <button @click="addreply">发表</button>
        </div>
         <div id="reply_msg">
            <h5>全部评论|</h5>
            <ul>
                <li v-if="replies.length" v-for="(rep,ins) in replies">
                    <img src="../assets/1.jpg" alt="">
                    <p id="reply_main">
                    <span>{{rep.author}}</span><br><span>{{rep.content}}</span></p>
                    <p id="reply_footer">
                    <span>{{replytime}}</span>
                    </p>
                    <p id="likes"><span @click="reply_likes(ins)"><i class="fa fa-thumbs-o-up"></i> {{rep.likes}}</span></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                reply: [],
                replies:[],
                 item: {},
                like_num:'',
                dislike_num:'',
                replycontent: '',
                time:'',
                replytime:'',
                url:[]
            }
        },
        mounted() {
            this.getreply()
        },
        methods: {
            getreply() {
                var id = this.$route.params.id
                var data=this.reply._id
                this.$http.post('/news/tworeply' + id,data).then((resdata) => {
                    this.reply = resdata.data.res
                    this.replies=resdata.data.rep
                    this.replytime=resdata.data.rep[0].create_time.substr(0,10)
                })
            },
            addreply() {
                if (this.$store.state.nickName) {
                    if (this.replycontent.trim() == '') {
                        alert('内容不能为空')
                    } else {
                        var that = this
                        this.$http.post('/news/addtworeply', {
                            content: that.replycontent,
                            article_author_id: that.reply.article_id,
                            reply_id: that.reply._id,
                            reply_title:that.reply.content
                        }).then(function(result) {
                            console.log(1)
                            console.log(result.data.msg)
                             that.getreply();
                           that.replycontent=''
    
                        }).catch(function(err) {
                            console.log(err)
                        })
                    }
                } else {
                    alert('您还为登录，请先登录')
                    location.href = "/#/login"
                }
            },
            conpage() {
                window.history.back()
            },
        }
    }
</script>

<style scoped>
    #cont_page_wrap {
        padding: 10px 10px;
        margin: 0 auto;
        background: #fff;
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
    
    #reply_msg {
        list-style: none;
        position: relative;
        margin-top: 20px;
    }
    
    #reply_msg:last-child {
        margin-bottom: 50px;
    }
    
    #reply_msg img {
        width: 30px;
        border-radius: 20px;
        margin: 10px 8px;
    }
    
    #reply_main {
        width: 60%;
        float: right;
        margin-right: 85px;
    }
    
    #reply_footer {
        width: 50%;
        margin-left: 50px;
    }
    
    #reply_footer span {
        margin-right: 10px;
        font-size: 12px;
        color: #333;
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
