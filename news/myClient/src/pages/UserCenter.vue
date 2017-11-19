<template>
    <div id="usercenter-wrap">
        <img src="../assets/2.jpg" alt="">
        <div id="usercenter_msg">
            <img id="ssss" src="../assets/1.jpg" alt="">
            <p id="be_marked"><a href="#/changemsg">修改资料</a></p>
            <p id="usrer_name">{{user.username}}</p>
        </div>
        <tab :line-width=2 active-color='oranged' v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in list" :key="index">{{item}}</tab-item>
        </tab>
        <div v-if="index==0" id="content-wrap">
            <ul>
                <li v-for="data in item">
                    <img :src="'http://localhost:3800/images/'+data.pic_url.split(',')[0]" alt="">
                    <div id="simb_msg" v-if="data.pic_url">
                        <span id="art_title"><a :href="'/#news/' + data._id"> {{data.title}}</a></span><br>
                        <span v-if="data.content.length<30" id="content">{{data.content}}</span>
                        <span v-if="data.content.length>50" id="content">{{data.content.substr(0,30)}}...</span>
                    </div>
                    <div id="simb_msg_w" v-if="!data.pic_url">
                        <span id="art_title_w"><a :href="'/#news/' + data._id"> {{data.title}}</a></span><br>
                        <span v-if="data.content.length<30" id="content">{{data.content}}</span>
                        <span v-if="data.content.length>50" id="content">{{data.content.substr(0,30)}}...</span>
                    </div>
                    <p id="content-msg">
                        <span>浏览：{{data.click_num}}</span>
                        <span><a :href="'/#news/' + data._id">评论：{{data.comment_num}}</a></span>
                        <span>点赞：{{data.like_num}}</span><span>{{data.create_time.substr(0,10)}}</span>
                    </p>
                    <p @click="remove(data._id)" id="delete"><i class="fa fa-trash"></i></p>
                </li>
            </ul>
        </div>
        <div v-if="index==1" id="content-wrap">
            <ul>
                <li v-for="datas in collection">
                    <img :src="'http://localhost:3800/images/'+datas.article.pic_url.split(',')[0]" alt="">
                    <div id="simb_msg" v-if="datas.article.pic_url">
                        <span id="art_title"><a :href="'/#news/' + datas.article._id"> {{datas.article.title}}</a></span><br>
                        <span v-if="datas.article.content.length<30" id="content">{{datas.article.content}}</span>
                        <span v-if="datas.article.content.length>50" id="content">{{datas.article.content.substr(0,30)}}...</span>
                    </div>
                    <div id="simb_msg_w" v-if="!datas.article.pic_url">
                        <span id="art_title_w"><a :href="'/#news/' + datas.article._id"> {{datas.article.title}}</a></span><br>
                        <span v-if="datas.article.content.length<30" id="content">{{datas.article.content}}</span>
                        <span v-if="datas.article.content.length>50" id="content">{{datas.article.content.substr(0,30)}}...</span>
                    </div>
                    <p id="content-msg">
                        <span>浏览：{{datas.article.click_num}}</span>
                        <span><a :href="'/#news/' + datas.article._id">评论：{{datas.article.comment_num}}</a></span>
                        <span>点赞：{{datas.article.like_num}}</span><span>{{datas.article.create_time.substr(0,10)}}</span>
                    </p>
                    <p @click="remove(datas.article._id)" id="delete"><i @click="delecoll(datas.article._id)" style="font-style:normal;font-size:14px;background:orange;color:#fff;padding:3px">取消收藏</i></p>
                </li>
            </ul>
        </div>
        <div v-if="index==2" >
            <p id="score">可用积分：{{user.score}}</p>
            <div id="scoremarket">
                <h4>积分商城</h4>
                <ul>
                    <li v-for="(item,ins) in spin" @click="xchange(ins)">
                        <p><span><i class="fa fa-star"></i></span>
                           <span>{{item.name}}</span>
                           <span class="price">{{item.price}}</span>
                           <span>/{{item.unit}}</span>
                           <span>兑换</span>
                            </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import {
        Tab,
        TabItem
    } from 'vux'
    export default {
        data: function() {
            return {
                user: '',
                item: {},
                collection: {},
                list: ['发 布', '收藏', '积分兑换'],
                index: 0,
                spin:[{name:'头条会员',price:50,unit:'月'},{name:'京东京豆',price:10,unit:'个'},{name:'免流观看',price:20,unit:'月'}]
            }
        },
        components: {
            Tab,
            TabItem
        },
        computed: {
            ...mapState(['nickName'])
        },
        mounted() {
            this.getusermsg();
            this.getnews();
            this.getcollection();
        },
        methods: {
            getusermsg() {
                var that = this
                var username = this.$store.state.nickName
                this.$http.post('/news/getusers').then((res) => {
                    that.user = res.data.msg
                }).catch((err) => {
                    console.log(err)
                })
            },
            getnews() {
                var that = this
                this.$http.post('news/getusernews').then((resdata) => {
                    that.item = resdata.data.msg.reverse();
                }).catch((err) => {
                    console.log(err)
                })
            },
            getcollection() {
                this.$http.post('news/getcollection').then((resdata) => {
                    this.collection = resdata.data.msg.reverse();
                }).catch((err) => {
                    console.log(err)
                })
            },
            remove(id) {
                this.$http.post('/news/remove', {
                    'id': id
                }).then((result) => {
                    this.getnews();
                }).catch((err) => {
                    console.log(err)
                })
            },
            delecoll(id) {
                this.$http.post('/news/delecoll', {
                    'id': id
                }).then((result) => {
                    this.getcollection();
                }).catch((err) => {
                    console.log(err)
                })
            },
            xchange(ins){
                console.log(ins)
                var price=$('.price').eq(ins).html()
               console.log(this.user.score)
               if(this.user.score<price){
                 alert('您的积分不足哟~~')
               }else{
                   this.$http.post('/news/buy',{data:price}).then((resdata)=>{
                       if(resdata.data.err==0){
                            this.getusermsg();
                            alert('兑换成功')
                       }
                       
                   }).catch((err)=>{
                       console.log(err)
                   })
               }
            }
        }
    }
</script>

<style scoped>
     #usercenter-wrap>img {
         width: 100%;
         height: 100px;
     }
     
     #usercenter_msg img {
         width: 65px;
         height: 65px;
         margin-top: -33px;
         margin-left: 10px;
         border-radius: 100%;
         border: solid 1px #fff;
     }
     
     #be_marked {
         border: solid 1px orange;
         width: 60px;
         font-size: 14px;
         color: orange;
         padding: 2px;
         float: right;
         margin-right: 8px;
     }
     
     #be_marked a {
         color: orange;
     }
     
     #usrer_name {
         background: #eee;
         width: 60px;
         font-size: 18px;
         text-align: center;
         padding: 2px;
         color: #000;
         margin-left: 13px;
     }
     
     #content-wrap ul li {
         border: solid 1px #ddd;
         padding: 8px;
         margin-bottom: 10px;
         border-bottom: 15px;
         list-style: none;
         background: #fff;
         cursor: pointer;
         position: relative;
     }
     
     #content-wrap ul li:last-child {
         margin-bottom: 50px;
     }
     
     #content {
         font-size: 13px;
         padding: 3px;
         color: #333;
         text-align: center;
     }
     
     #content a {
         color: #000;
     }
     
     #art_title {
         padding: 5px;
         font-size: 14px;
     }
     
     #art_title a {
         color: #444;
     }
     
     #content-msg {
         font-size: 14px;
     }
     
     #simb_msg {
         width: 75%;
         float: right;
     }
     
     #simb_msg_w {
         width: 98%;
         float: right;
     }
     
     #content-msg span {
         background: #fff;
         color: #999;
         padding: 2px 5px;
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
     
     #content-wrap img {
         width: 70px;
         height: 70px;
     }
     
     #delete {
         color: #aaa;
         position: absolute;
         right: 20px;
         bottom: 80px;
     }
     
     #delete:hover {
         color: red;
     }
     
     #score {
         font-size: 16px;
         color: orange;
         width: 35%;
         float: right;
         text-align: right;
         margin: 10px;
     }
     #scoremarket h4{
          width:100px;
         margin:0 auto;
         font-size:20px;
         color:#777
     }
      #scoremarket ul{
          margin-top:30px;
      }
     #scoremarket ul li{
        list-style:none;
        margin-left:70px;
         margin-top:10px;
         width:80%;
         color:red;
     }
      #scoremarket ul li p span{
          
      }
      #scoremarket ul li p span:last-child{
          background:blue;
          color:#fff;
          padding:2px;
          border-radius:3px;
          cursor:pointer;
          margin-left:40px;
      }
</style>
