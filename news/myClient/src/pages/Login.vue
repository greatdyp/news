<template>
    <div id="login_module">
    <img src="../assets/1.jpg" alt="">
        <form action="">
            <span>账号<i class="fa fa-user-o"></i></span>：<input v-model="username" type="text"><br><br> 
            <span>密码<i class="fa fa-question-circle-o"></i></span>：<input v-model="password" type="password"><br><br>
            <button @click="login()">登&nbsp;录</button>
            <button @click="zhuce()">注&nbsp;册</button>
        </form>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
            username:'',
            password:''
            }
        },
        methods:{
        zhuce:function(){
            var msg=[this.username,this.password]
                this.$http({
                method: 'POST',
                url: '/news/zhuce',
                data:msg
            }).then(function(result) {
                console.log(result)
            }).catch(function(err) {
                console.log(err)
            })
            },
                login:function(){
            var msg={username:this.username,password:this.password}
                    this.$http({
                method: 'POST',
                url: '/news/login',
                data:msg
            }).then(function(result) {
                 location.href = "/#mine"
                 
            }).catch(function(err) {
                console.log(err)
            })
            }
        }
    
    }
</script>

<style scoped>
    #login_module {
        text-align: center;
    }
    #login_module img{
        width:360px;
        height:150px;
    }
    #login_module form{
        padding:40px;
    }
    #login_module input {
        width: 160px;
        height: 25px;
        border:none;
        border-bottom:solid 1px #ccc;
    }
    #login_module button {
        width: 100px;
        height: 30px;
        background: #0c0c;
        border: none;
        border-radius: 8px;
        color: #fff;
        font-size: 16px;
        margin-left: 10px
    }
</style>
