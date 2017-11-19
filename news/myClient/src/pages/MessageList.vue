<template>
    <div id="mag-wrap">
        <div id="msg_bar"><span><i class="fa fa-chevron-left"></i></span><span>消 息</span></div>
        <div id="msg_cont">
            <ul>
                <li v-for="data in msg">
                     <img src="../assets/1.jpg" alt="">
                    <p id="author">{{data.author}}</p>
                    <p id="content"><span>{{data.content}}</span><br><span>{{data.create_time.substring(5,10)}}</span></p>
                    <p id="ori_article"><a href="">{{data.article}}</a></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                msg: []
            }
        },
        mounted() {
            this.getmsg();
        },
        methods: {
            getmsg() {
                    var that = this
                    this.$http({
                        method: 'POST',
                        url: '/news/getmessages',
                        data: ''
                    }).then((response) => {
                        if( response.data.err==0){
                       that.msg = response.data.msg.reverse()
                        }else{
                            alert('请先登录')
                        }
                        
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped>
      #msg_bar {
        font-size: 20px;
        color: #777;
         margin-bottom: 7px;
        border-bottom: solid 1px #ddd;

    }
    #msg_bar span:first-child {
        margin-top: -8px;
        margin-left: 8px;
    }
    #msg_bar span:last-child {
        float: right;
        padding:7px;
        margin-right: 170px;
        margin-top: -7px;
    }
    #msg_cont{
        padding:15px;
    }
    #msg_cont ul li{
        list-style:none;
        margin-bottom:10px;
        border-bottom:solid 1px #ddd;
        overflow:hidden;
        position:relative;
         background:#fff;
    }
    #msg_cont ul li img{
        width: 30px;
        border-radius: 20px;
        margin:10px 8px
    }
      #author{
         width:80px;
         text-align:left;
         float:right;
         margin-right:200px;
         margin-top:8px;
         font-size:14px;
     }
     #content span:first-child{
         width:170px;
         float:right;
         margin-right:110px;
         margin-top:-20px;
         font-size:14px;
     }
      #content span:last-child{
         width:50px;
         position:absolute;
         top:13px;
         left:93px;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
          font-size:10px;
          color:#777;
     }
     #ori_article{
         width:100px;
         height:70px;
         overflow:hidden;
         line-height:22px;
         font-size:12px;
         color:#666;
         position:absolute; 
         left:220px;
         top:10px;
     }
</style>
