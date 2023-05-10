// router.js

import Vue from 'vue'
import Router from 'uni-simple-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/pages/home/home',
			name: 'home',
			component: Home,
			meta: {
				requireAuth: true // 需要登录才能访问的页面
			}
		},
		{
			path: '/pages/login/login',
			name: 'login',
			component: Login
		}
	]
})

export default router
