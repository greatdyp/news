<template>
<div id="table_bar">
<ul class="tap_content">
<li  @click="foson(ins)" v-for="(table,ins) in tablelist">{{table}}</li>
</ul>
</div>
</template>
<script>
export default{
    data:function(){
        return {
            tablelist:['图文','视频','推荐','段子']
        }
    },
    methods:{
     foson:function(ins){
    $('.tap_content li').eq(ins).addClass('active').siblings().removeClass('active')
       },
       defaultChioce(){
        $('.tap_content li').eq(0).addClass('active')
       }
    },
    mounted(){
        this.defaultChioce()
    }
}
</script>
<style scoped>
#table_bar{
    height:25px;
    border-bottom:solid 1px #ddd;
    margin-top:60px;
}
#table_bar ul li{
float:left;
list-style:none;
margin:0 13px;
cursor:pointer;
}
#table_bar ul li.active{
    color:red;
}
</style>