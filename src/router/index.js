import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

import goodlist from "../components/goods/goodslist.vue";
import gooddetail from "../components/goods/gooddetail.vue";

import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.baseURL="http://47.106.148.205:8899";


const router = new VueRouter({
    routes:[
        { path: '/', redirect: '/goodslist' },
        { path:'/goodslist',component:goodlist },
        { path:'/gooddetail/:goodId',component:gooddetail },
    ]
})

export default  router
