<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-sm-4 offset-sm-4">
                <div class="card shadow">
                    <div class="card-body px-5 pb-5">
                        <div class="sticky-top">
                            <div class="alert alert-danger small" v-if="error">
                                <i class="fas fa-exclamation-circle"></i> {{error}}
                            </div>
                            <div class="alert alert-success small" v-if="success">
                                <i class="fas fa-marker"></i> {{success}}
                            </div>
                        </div>
                        <h2 class="text-success text-center">
                            <i class="fas fa-taxi"></i>
                        </h2>
                        <div class="text-center mb-4">Sign up</div>
                        <form @submit.prevent="doSignup">
                            <div class="form-group">
                                <label for="name" class="small">Name</label>
                                <input type="text" v-model="user.name" class="form-control-plaintext border-bottom" id="name">
                            </div>
                            <div class="form-group">
                                <label for="email" class="small">Email</label>
                                <input type="email" v-model="user.email" class="form-control-plaintext border-bottom" id="email">
                            </div>
                            <div class="form-group">
                                <label for="password" class="small">Password</label>
                                <input type="password" v-model="user.password" class="form-control-plaintext border-bottom" id="password">
                            </div>
                            <div class="form-group">
                                <label for="retype_password" class="small">Retype Password</label>
                                <input type="password" v-model="user.retype_password" class="form-control-plaintext border-bottom" id="retype_password">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-block btn-primary">
                                    Signup
                                    <b-spinner small class="float-right" v-if="showLoading"></b-spinner>
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
                <div class="small pt-3">
                    Already have an account ? <router-link to="/auth/signin">Signin</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Firebase from "../Firebase"
    export default {

        name: "Signup",
        data(){
            return{

                user: {
                    name: '',
                    email: '',
                    password: '',
                    retype_password: ''
                },
                error: null,
                success:null,
                showLoading:false,
            }
        },
        created(){

        },
        methods:{

            clearError(){
                setTimeout(()=>{
                    this.error=null;
                }, 5000)
            },
            clearSuccess(){
                setTimeout(()=>{
                    this.success=null;
                }, 5000)
            },
            doSignup(){
                if(this.user.name.length <=0 ){
                    this.error="The name field is required."
                    this.clearError();
                    return;
                }
                if(this.user.email.length <=0 ){
                    this.error="The email field is required."
                    this.clearError();
                    return
                }

                if(this.user.password.length <=0 ){
                    this.error="The password field is required."
                    this.clearError();
                    return
                }
                if(this.user.retype_password.length <=0 ){
                    this.error="The retype password field is required."
                    this.clearError();
                    return
                }
                if(this.user.password != this.user.retype_password ){
                    this.error="The password and retype must match."
                    this.clearError();
                    return
                }
                this.showLoading=true;
                Firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
                    .then(()=>{
                        this.showLoading=false
                        const user=Firebase.auth().currentUser;
                        user.updateProfile({
                            displayName: this.user.name
                        })
                            .then(()=>{
                                user.sendEmailVerification();
                                this.success="The email verification link is send to your email.";
                                this.user.name=""
                                this.user.email=""
                                this.user.password=""
                                this.user.retype_password=""
                                this.clearSuccess();

                            }).catch((e)=>{
                                console.log(e)
                            this.showLoading=false
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                        this.error=err.message
                        this.clearError();
                        this.showLoading=false;
                        this.user.password='';
                        this.user.retype_password=''
                    })

            }
        },

    }
</script>

<style scoped>


</style>