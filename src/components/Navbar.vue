<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
        <div class="container">
        <router-link to="/"><a class="navbar-brand text-success"> <i class="fas fa-taxi"></i> Smart Taxi</a></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class="navbar-nav ml-auto small" v-if="isAuth">
               <li class="nav-item" v-for="url in authUrl" :key="url.name">
                   <router-link :to="url.path">
                        <a class="nav-link"> <i :class="url.icon"></i> {{url.name}}</a>
                   </router-link>
               </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-user-circle"></i> {{isAuth.displayName}}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a @click="doSignout" class="dropdown-item small" href="#!"><i class="fas fa-power-off"></i> Signout </a>

                    </div>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto" v-else>
                <li class="nav-item" v-for="url in notAuthUrl" :key="url.name">
                    <router-link :to="url.path">
                        <a class="nav-link small"> <i :class="url.icon"></i> {{url.name}}</a>
                    </router-link>
                </li>
            </ul>

        </div>
        </div>
    </nav>
</template>

<script>
    import Firebase from "../Firebase";
    export default {
        name: "Navbar",
        data(){
            return{
                isAuth:false,
                authUrl: [

                    {
                        name: "Home",
                        path: "/admin/dashboard",
                        icon: "fas fa-tachometer-alt",
                    },

                ],
                notAuthUrl:[
                    {
                        name: "Signin",
                        path: "/auth/signin",
                        icon: "fas fa-sign-in-alt",
                    },
                ]
            }
        },
        created(){
        },
        methods:{
            doSignout(){
                Firebase.auth().signOut();
                this.$store.dispatch("doSignout")
                this.$router.push("/auth/signin")
            }
        },
        watch:{
            checkAuth(u){
                if(u!=null){
                    this.isAuth=u;
                }else{
                    this.isAuth=null;
                }
            }
        },
        computed:{
            checkAuth(){
                 return this.$store.getters.user;
            }
        }
    }
</script>

<style scoped>

</style>