import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import './axios.js';
import './permission.js' // 路由拦截
import Echarts from 'echarts'
Vue.config.productionTip = false;
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype.$axios=axios
Vue.use(Echarts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
