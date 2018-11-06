import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyLoad from 'vue-lazyload'



Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(VueLazyLoad,{
  loading:require('./assets/load.gif')
})




import router from "./router";
import "./filters/index.js";
import "./statics/site/css/style.css";
import store from "./store/index.js";
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

