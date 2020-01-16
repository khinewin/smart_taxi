import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from '../components/Welcome'
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Home from "../components/Home";
import Auth from '../../Auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: Welcome
  },
  {
    path:'/auth/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/auth/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path:'/admin/dashboard',
    name: "Home",
    component: Home,
    beforeEnter: Auth
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
