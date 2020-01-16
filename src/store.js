import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export const store=new Vuex.Store({
    state:{
        user : null
    },
    getters:{
        user(state){
            return state.user;
        }
    },
    actions:{
        setUser({commit}, payload){
            commit("setUser", payload)
        },
        doSignout({commit}){
            commit("doSignout")
        }
    },
    mutations:{
        setUser(state, payload){
            return state.user=payload
        },
        doSignout(state){
            return state.user=null
        }
    }
})