import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from '../components/Welcome'
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Home from "../components/Home";
import Auth from '../../Auth'

import Region from "../views/new/Region";
import City from "../views/new/City";
import Quarter from "../views/new/Quarter";
import Driver from "../views/new/Driver";

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
  },
  {
    path:'/new/region',
    name: "region",
    component: Region,
    beforeEnter: Auth
  },
  {
    path:'/new/city',
    name: 'city',
    component: City,
    beforeEnter: Auth
  },
  {
    path:'/new/quarter',
    name: "quarter",
    component: Quarter,
    beforeEnter: Auth
  },
  {
    path: '/new/driver',
    name: "driver",
    component: Driver,
    beforeEnter: Auth
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
