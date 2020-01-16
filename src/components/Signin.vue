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
                        <div class="text-center mb-4">Sign in</div>
                        <form @submit.prevent="doSignin">
                            <div class="form-group">
                                <label for="email" class="small">Email</label>
                                <input type="email" v-model="user.email" class="form-control-plaintext border-bottom" id="email">
                            </div>
                            <div class="form-group">
                                <label for="password" class="small">Password</label>
                                <input type="password" v-model="user.password" class="form-control-plaintext border-bottom" id="password">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-block btn-primary">Signin
                                    <b-spinner small class="float-right" v-if="showLoading"></b-spinner>
                                </button>
                            </div>

                        </form>
                        <div class="form-group" v-if="resendVerifiedBtn">
                            <button @click="resendEmail" class="btn btn-block btn-outline-info">Resend Email Verification</button>
                        </div>
                    </div>

                </div>
                <div class="small pt-3">
                    Don't have an account ? <router-link to="/auth/signup">
                    Signup

                </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Firebase from "../Firebase";
    export default {
        name: "Signin",
        data(){
            return{
                user: {
                    email: '',
                    password: '',
                },
                error: null,
                success:null,
                resendVerifiedBtn: false,
                tempUser:'',
                showLoading:false
            }
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
            resendEmail(){
                this.tempUser.sendEmailVerification();
                this.resendVerifiedBtn=false
                this.success="Verification link is resend to your email."
                this.clearSuccess();
            },
            doSignin(){

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
                this.showLoading=true;
                Firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
                    .then(()=>{
                        this.showLoading=false
                        const user=Firebase.auth().currentUser;
                        //console.log(user)
                        if(user.emailVerified==true){
                            //console.log(user.displayName)
                            const u={
                                displayName: user.displayName,
                                uid: user.uid,
                            }
                            this.$store.dispatch("setUser", u);
                            this.$router.push("/admin/dashboard")
                        }else{
                            this.error="Your email must be verified."
                            this.clearError();
                            this.tempUser=user;
                            this.resendVerifiedBtn=true;
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                        this.error=err.message
                        this.clearError();
                        this.showLoading=false
                    })

            }
        },
    }
</script>

<style scoped>

</style>