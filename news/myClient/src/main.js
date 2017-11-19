// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router';

import Vuex from 'vuex'

import { AlertPlugin, ToastPlugin } from 'vux';
import './assets/font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import { AjaxPlugin } from 'vux';

Vue.use(Vuex);

Vue.use(AjaxPlugin)
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);

FastClick.attach(document.body)
//创建状态
const store = new Vuex.Store({
  state: {
    nickName:''
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, nickName) {
      state.nickName = nickName;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  mounted(){
    this.checkLogin()
  },
    methods:{
    checkLogin(){
       this.$http({
                method: 'GET',
                url: '/news/checkLogin',
                data:''
                 }).then(res=> {
        var res = res.data;
        if (res.status == "0") {
          this.$store.commit("updateUserInfo", res.result);
        }
      })
    }
  },
  render: h => h(App)
}).$mount('#app')
// 可以通过el属性将vue实例挂载在DOM上
// 也可以通过 new Vue().$mount('#app'),手动将实例挂载在DOM上
