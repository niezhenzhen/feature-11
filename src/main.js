// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import VueResource from 'vue-resource'
import 'swiper/dist/css/swiper.css'
import '../static/styles/global.scss'
import axios from 'axios'
import Qs from 'qs'
import 'babel-polyfill'

Vue.prototype.axios = axios
Vue.prototype.qs = Qs
Vue.use(VueResource)

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
