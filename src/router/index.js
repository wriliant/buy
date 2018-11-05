import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

import goodlist from "../components/goods/goodslist.vue";
import gooddetail from "../components/goods/gooddetail.vue";
import shopcart from "../components/shopcart/shopcart.vue";
import login from "../components/account/login.vue";
import order from "../components/order/order.vue";

import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.baseURL="http://47.106.148.205:8899";
// 允许axios携带cooking
axios.defaults.withCredentials = true


const router = new VueRouter({
    routes:[
        { path: '/', redirect: '/goodslist' },
        { name:'GOODSLIST', path:'/goodslist',component:goodlist },
        { path:'/gooddetail/:goodId',component:gooddetail },
        { path:'/shopcart',component:shopcart },
        { path:'/login',component:login },
            // 需要进行登录校验模块
        { path:'/order',component:order,meta: { checkOutLogin: true }},
    ]
})

//导航守卫
router.beforeEach((to, from, next) => {
    console.log(to);
    //记录登录后要跳去的页面
    if (to.path !=='/login') {
        localStorage.setItem('wantToVisitPath',to.fullPath)
    }
    if (to.meta.checkOutLogin) {//需要校验的代码
        axios.get('/site/account/islogin').then(response=>{
            if(response.data.code == 'logined'){
                next();
            }else{
                router.push('/login');
            }
        })
    }else{
        next();
    }
  })

export default  router