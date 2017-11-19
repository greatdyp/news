<template>
  <div id="">
    <div id="home_page_header">
     NEWS头条&nbsp;&nbsp;&nbsp;<input type="text" placeholder="输入关键字以搜索"><span @click="btnClick()" id="search_btn"><i class="fa fa-search"></i></span>
    </div>
    <div id="search_list" v-if="!item.length">
   <p id="hotsearch_icon"><span>特朗普访华</span>
   <span>携程虐童事件</span>
   <span></span>
   <span>上海小学生地铁写作业</span>
   <span>王者荣耀张大仙分手</span>
   <span>胡歌猎场开播</span>
   </p>
    </div>
   <div id="content-wrap">
             <ul>
                <li  v-for="data in item">
                    <h4><a :href="'/#news/' + data._id"> {{data.title}}</a></h4>
                    <p v-if="data.content.length<50" id="content">{{data.content}}</p>
                    <div v-if="data.pic_url">
                  <img :src="'http://localhost:3800/images/'+data.pic_url.split(',')[0]" alt="">
                  <img :src="'http://localhost:3800/images/'+data.pic_url.split(',')[1]" alt="">
                  <img :src="'http://localhost:3800/images/'+data.pic_url.split(',')[2]" alt="">
                 </div>
                    <p v-if="data.content.length>50" id="content">{{data.content.substr(0,70)}}<a :href="'/#news/' + data._id">...全文</a></p>
                    <p id="content-msg"><span><a href="/#/usercenter">{{data.author}}</a></span><span>浏览：{{data.click_num}}</span><span><a :href="'/#news/' + data._id">评论：{{data.comment_num}}</a></span><span>{{data.create_time.substr(0,10)}}</span></p>
                 
                </li>
            </ul>
        </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                item:[],
                
            }
        },
        methods: {
       btnClick(){
         var content = $('input').val().trim();
         if(content){
           var that=this
           this.$http.post('/news/search',{'content':content}).then((resdata)=>{
            if(resdata.data.err==0){
             that.item=resdata.data.msg
            }
             if(resdata.data.err==1){
             alert('无内容')
            }
           })
         }else{
           console.log(12313)
           alert('内容不能为空')
         }
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
        width: 100%;
    }
    #home_page_header input {
        width: 220px;
        height: 25px;
        border: none;
        border-radius: 5px;
    }
    #hotsearch{
      width:70px;
      background:rgb(20,140,250);
      color:#fff;
      padding:2px;
      margin:7px;
    }
    #hotsearch_icon{
      padding:5px;
    }
    #hotsearch_icon span{
       background:rgb(200,160,250);
       color:#fff;
    }
    #search_btn{
      position:relative;
      right:20px;
      color:#999;
      cursor:pointer;
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
    img{
        width:100px;
    }      
</style>