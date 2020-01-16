import {store} from './src/store'

export default(to, from, next)=> {
    if(store.getters.user !=null){
        next();
    }else{
        next("/auth/signin")
    }
}