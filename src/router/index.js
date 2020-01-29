import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from '../components/Welcome'
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Home from "../components/Home";
import Auth from '../../Auth'

import Region from "../views/Region";
import City from "../views/City";
import Quarter from "../views/Quarter";
import Driver from "../views/Driver";
import Street from "../views/Street";

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
    path:'/admin/region',
    name: "region",
    component: Region,
    beforeEnter: Auth
  },
  {
    path:'/admin/city',
    name: 'city',
    component: City,
    beforeEnter: Auth
  },
  {
    path:'/admin/quarter',
    name: "quarter",
    component: Quarter,
    beforeEnter: Auth
  },
  {
    path: '/admin/driver',
    name: "driver",
    component: Driver,
    beforeEnter: Auth
  },
  {
    path: '/admin/street',
    name: "street",
    component: Street,
    beforeEnter: Auth
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
