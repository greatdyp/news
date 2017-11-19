<template>
    <div id="home_page">
        <div id="home_page_header">
            NEWS头条&nbsp;&nbsp;&nbsp;<a href="#/search"><input  type="text" placeholder="  花儿为什么这样红|英雄联盟总决赛|react"></a>
        </div>
        <tableBar></tableBar>
        <swiper :list="baseList" auto></swiper>
        <div id="content-wrap">
             <ul>
              <li v-if="zhuan.length" v-for="data in zhuan">
                    <div id="zhuan"><h3>转：</h3>{{data.zhuan_reply}}</div>
                    <h4 v-if="data.title.length>30"><a :href="'/#news/' + data.zhuan_id"> {{data.title.substr(0,20)}}...</a></h4>
                    <h4 v-if="data.title.length<30"><a :href="'/#news/' + data.zhuan_id"> {{data.title}}</a></h4>
                    <p v-if="data.content.length<50" id="content">{{data.content}}</p>
                    <div v-if="data.pic_url">
                  <img :src="'http://localhost:3800/images/'+data.pic_url.split(',')[0]" alt="">
                  <img :src="'http://localhost:3800/images/'+data.pic_url.split(',')[1]" alt="">
                  <img :src="'http://localhost:3800/images/'+data.pic_url.split(',')[2]" alt="">
                 </div>
                    <p v-if="data.content.length>50" id="content" >{{data.content.substr(0,70)}}<a :href="'/#news/' + data.zhuan_id">...全文</a></p>
                    <p id="content-msg"><span><a href="/#/usercenter">{{data.zhuan_author}}</a></span>
                    <span>浏览：{{data.click_num}}</span>
                    <span><a :href="'/#news/' + data.zhuan_id">评论：{{data.comment_num}}</a></span>
                    <span>{{data.create_time.substr(0,10)}}</span>
                    <span><a :href="'#/zhuan'+data._id">转发</a></span>
                    </p>
                </li>
                <li  v-for="data in item">
                    <h4 v-if="data.title.length>30"><a :href="'/#news/' + data._id"> {{data.title.substr(0,20)}}...</a></h4>
                    <h4 v-if="data.title.length<30"><a :href="'/#news/' + data._id"> {{data.title}}</a></h4>
                    <p v-if="data.content.length<50" id="content">{{data.content}}</p>
                    <div v-if="data.pic_url">
                  <img :src="'http://localhost:3800/images/'+data.pic_url.split(',')[0]" alt="">
                  <img :src="'http://localhost:3800/images/'+data.pic_url.split(',')[1]" alt="">
                  <img :src="'http://localhost:3800/images/'+data.pic_url.split(',')[2]" alt="">
                 </div>
                    <p v-if="data.content.length>50" id="content" >{{data.content.substr(0,70)}}<a :href="'/#news/' + data._id">...全文</a></p>
                    <p id="content-msg"><span><a href="/#/usercenter">{{data.author}}</a></span>
                    <span>浏览：{{data.click_num}}</span>
                    <span><a :href="'/#news/' + data._id">评论：{{data.comment_num}}</a></span>
                    <span>{{data.create_time.substr(0,10)}}</span>
                    <span><a :href="'#/zhuan'+data._id">转发</a></span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import TableBar from '../components/TableBar.vue'
 import {Swiper} from 'vux';
import axios from 'axios'
 const baseList = [{
            img: 'https://p3.pstatp.com/origin/40340003c077e628151e',
            title: '中国最美大学之云南大学'
        }, {
            img: 'https://p1.pstatp.com/large/436000028ecaa4381134',
            title: '阿里巴巴达摩院正式成立'
        },
        {
            img: 'https://p3.pstatp.com/large/3f030013facf8d70874b',
            title: '詹姆斯57分11板7助3断2帽，骑士胜奇才止4连败'
        },
        {
            img: 'https://p9.pstatp.com/large/4367000031ec09e81159',
            title: '七常委从上海离开三天后',
            fallbackImg: 'https://static.vux.li/demo/3.jpg'
        }
    ]
    export default {
        data: function() {
            return {
                 baseList: baseList,
                news: [],
                item:[],
                images:[],
                zhuan:[]
            }
        },
         components: {
            TableBar,
            Swiper
        },
        mounted(){
          this.getnews();
          this.getmorenews();
          this.getzhuan();
        },
        methods: {
            getnews() {
                var that = this;
                axios.post('news/getnews').then((resdata) => {
                    console.log(resdata.data.msg+2)
                   that.item = resdata.data.msg.reverse();
                }).catch((err) => {
                    console.log(err)
                })
            },
            getmorenews(){
                var num=0;
                 var that = this;
                $(document).on("scroll",window,function(){
                    var height=$(this).height();
                    var screenHeight=$(window).height();
                    var scrollTop=$(window).scrollTop();
                    if(scrollTop + screenHeight >height -2){
                        num +=1;
                       axios.get("/news/more?page="+num).then((resdata)=>{
                            resdata.data.msg.forEach((newss)=>{
                               that.item.push(newss) 
                            })
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }
                })
            },
            getzhuan(){
            this.$http.post('/news/getzhuan').then((resdata)=>{
                this.zhuan=resdata.data.msg
            }).catch((err)=>{
                console.log(err)
            })
            }
        }
    }
</script>

<style scoped>
  #home_page_header {
        border: solid 1px red;
        font-size: 20px;
        height: 40px;
        background: red;
        color: #fff;
        padding: 8px;
        position: fixed;
        margin-top: -60px;
        width: 100%;
        z-index: 5;
    }
    
    #home_page_header input {
        width: 220px;
        height: 25px;
        border: none;
        border-radius: 5px;
    }
    
    #content-wrap ul li {
        border: solid 1px #ddd;
        padding: 8px;
        margin-bottom: 10px;
        border-bottom: 15px;
        list-style: none;
        background: #fff;
        cursor: pointer;
    }
    
    #content-wrap ul li:last-child {
        margin-bottom: 50px;
    }
    
    #content {
        font-size: 15px;
        line-height: 30px;
        padding: 3px;
        text-indent: .5em;
        color: #333;
    }
    
    #content a {
        color: blue;
    }
    
    #content-wrap h4 {
        padding:5px;
        width:300px;
        overflow:hidden;
    }
    
    #content-wrap h4 a {
        padding: 5px;
        text-indent: .5em;
        color: #444;
        line-height:30px;
    }
    
    #content-msg {
        font-size: 14px;
    }
    
    #content-msg span {
        background: #fff;
        color: #999;
        padding: 2px;
        margin: 5px;
        border-radius: 8px;
        border: solid 1px #ddd;
        font-size: 12px;
    }
    
    #content-msg span a {
        color: #999;
    }
    
    #content-msg span:hover {
        background: red;
        color: #fff;
    }
    img{
        width:100px;
    }
    #zhuan{
        background:#eee;
        color:#000;
        width:98%;
        margin:0 auto;
    }
    #zhuan h3{
         width:40px;
         display:inline;
    }             
</style>
