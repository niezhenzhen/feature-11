import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/home/home'
import Report from '@/report/report'

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/report',
            name: 'Report',
            component: Report
        }
    ]
})
