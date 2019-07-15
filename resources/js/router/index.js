import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Layout from '../views/layout/Layout'
import EventMain from '../views/events/Main'

export const constantRouterMap = [
    { path: '/404', component: () => require('../views/404'), hidden: true },
    {
      path: '/',
      component: Layout,
      name: 'Events',
      children: [
        {
            path: '',
            name: 'Calendar',
            component: EventMain
          },
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })
