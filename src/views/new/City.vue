<template>
    <div class="container mt-5">
        <div class="alert alert-success" v-if="message">
            {{message}}
        </div>
        <div class="row">
            <div class="col-sm-4">
                <h6 class="text-secondary mb-2"><i class="fas fa-plus-circle"></i> New City or Township</h6>
                <div class="card shadow">
                    <div class="card-body">
                        <form @submit.prevent="saveCity">
                            <div class="form-group">
                                <label for="region_state">Region / State</label>
                                <select id="region_state" required v-model="region_state" class="custom-select" >
                                    <option v-for="r in regions" :key="r.id">{{r.region_state}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="city_township_name">City or Township Name</label>
                                <input v-model="city_township_name" type="text" id="city_township_name" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">

            </div>
        </div>
    </div>
</template>

<script>
    import Firebase from "../../Firebase"
    export default {
        name: "city",
        data(){
            return{
                regions:[],
                region_state:'',
                city_township_name:'',
                error:false,
                message:false
            }
        },
        created(){
          this.fetchRegions();
        },
        methods:{
            fetchRegions(){
                Firebase.database().ref('/regions').on("value",(res)=>{
                    const val=res.val();
                    for(let i in val){
                        let region={
                            id: i,
                            region_state: val[i].region_state_name+val[i].region_state
                        }
                        this.regions.push(region)
                    }
                })
            },
            clearMessage(){
                setTimeout(()=>{
                    this.message=false
                }, 3000)
            },
            saveCity(){
                Firebase.database().ref("/cities").push({
                    region_state: this.region_state,
                    city_township_name: this.city_township_name
                })
                    .then(()=>{
                        //console.log()
                        this.message="The new city or township have been created."
                        this.clearMessage();
                        this.region_state='';
                        this.city_township_name='';

                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped>
    .alert{
        position: absolute;
        top: 70px;
        right: 10px;
    }
</style>