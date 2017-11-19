
// 导入vue
import Vue from 'vue';
// 导入路由
import VueRouter from 'vue-router';
// 导入路径所对应的组件
import HomeIndex from '../pages/HomeIndex.vue';
import ContentMsg from '../pages/ContentMsg.vue';
import MessageList from '../pages/MessageList.vue';
import TwoReply from '../pages/TwoReply.vue';
import UserCenter from '../pages/UserCenter.vue';
import ChangeMsg from '../pages/ChangeMsg.vue';
import Add from '../pages/Add.vue';
import Zhuan from '../pages/Zhuan.vue';
import search from '../pages/search.vue';
import Mine from '../pages/Mine.vue';
import Login from '../pages/Login.vue';
import LoginOut from '../pages/LogOut.vue';
Vue.use(VueRouter);
// 路由配置
const routes = [
  {
    path: '/',
    component: HomeIndex,
  },
    {
    path:'/add',
    component:Add
  },
  {
    path:'/message',
    component:MessageList
  },
  {
    path:'/mine',
    component:Mine
  },
   {
    path:'/login',
    component:Login
  },
   {
    path:'/loginout',
    component:LoginOut
  },
    {
    path:'/news/:id',
    component:ContentMsg
  },
   {
    path:'/usercenter',
    component:UserCenter
  },
    {
    path:'/tworeply:id',
    component:TwoReply
  },
    {
    path:'/search',
    component:search
  },
  {
    path:'/changemsg',
    component:ChangeMsg
  },
   {
    path:'/zhuan:id',
    component:Zhuan
  }
]
// 导出实例
export default new VueRouter({
  routes
})
