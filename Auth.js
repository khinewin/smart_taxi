import {store} from './src/store'
export default(to, from, next)=> {

    if(store.getters.user !=null){
        next((vm) => {
            vm.to = to;
        });
    }else{
        next("/auth/signin")
    }
}