import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex)
import {store} from './store'


Vue.config.productionTip = false

import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/fontawesome-free/css/all.css"
import "jquery"
import "bootstrap"

import {BootstrapVue} from 'bootstrap-vue'
import Firebase from "./Firebase";

Vue.use(BootstrapVue)


new Vue({
  router,
  store,
  created(){
      Firebase.auth().onAuthStateChanged((user)=>{
        const u={
          displayName: user.displayName,
          uid: user.uid,
        }
        store.dispatch("setUser", u);
      })
  },
  render: h => h(App)
}).$mount('#app')
