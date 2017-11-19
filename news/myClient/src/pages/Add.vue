<template>
  <div id="photo_wrap">
     <div id="addnews_header"><span @click="conpage()">取消</span ><span @click="add()">发布</span></div>
        <form action="">
         <input id="title" v-model="title" type="text" placeholder="请输入标题" required>
          <textarea name="" v-model="content" id="newsthing" cols="50" rows="10" placeholder="分享新鲜事" required></textarea>
         添加图片：<br><input id="photo" name="file" type="file" multiple accept="image/png,image/jpeg,image/gif" @change="update">
        </form>
        <section id="picture"></section>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                photo:[],
                title:'',
                content:''
            }
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
            data.append('title',this.title)
             data.append('content',this.content)
                if (this.$store.state.nickName) {
          if (this.title.trim() == '') {
            alert('内容不能为空')
          } else {
                this.$http.post('/news/add',data,{
                headers:{'Content-Type':'multipart/form-data'}
                }).then(resdata=>{
                console.log(resdata)
                alert('发布成功')
                location.href="/#"
            }).catch((err)=>{
                console.log(err)
            })
          }
        } else {
          alert('您还为登录，请先登录')
          location.href = "/#/login"
        }
     },
     conpage(){
        window.history.back()
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