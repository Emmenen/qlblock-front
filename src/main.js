import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store/'
import ElementUI from 'element-ui'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import 'element-ui/lib/theme-default/index.css'


Vue.config.productionTip = false;

// 挂载全局
Vue.use(ElementUI);
Vue.use(VueCookies)
Vue.prototype.$http = httpRequest // ajax请求方法

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
