import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/views/index'
import User from '@/views/user'

Vue.use(Router)

export default new Router({
    //base: '/suanban/',
    routes: [
        {
            path: '/start',
            name: 'index',
            component: Index
        },
        {
            path: '/',
            component: () => import('@/views/login')
        },
        {
            path:'/user',
            name:'user',
            component:User
        }
    ]
})
