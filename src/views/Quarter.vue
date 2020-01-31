<template>
    <div class="container-fluid mt-5">

        <div class="row">
            <div class="col-sm-4">
                <h6 class="text-secondary mb-2"><i class="fas fa-plus-circle"></i> New Quarter</h6>
                <div class="card shadow">
                    <div class="card-body">
                        <form @submit.prevent="saveQuarter">
                            <div class="form-group">
                                <label for="region_state">Region / State</label>
                                <select id="region_state" required v-model="region_state" class="custom-select" >
                                    <option v-for="r in regions" :key="r.id">{{r.region_state}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="city_township_name">City / Township</label>
                                <select id="city_township_name" required v-model="city_township_name" class="custom-select" >
                                    <option v-for="c in cities" :key="c.id">{{c.city_township_name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="quarter_name">Quarter Name</label>
                                <input v-model="quarter_name" type="text" id="quarter_name" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="alert alert-success sticky-top" v-if="message">
                    <i class="fas fa-check-circle"></i> {{message}}
                </div>
                <h6 class="text-secondary mb-2"><i class="fas fa-city"></i> Quarters</h6>
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="text-center" v-if="loading">
                            <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner" type="grow"></b-spinner>
                        </div>
                        <table class="table table-hover table-borderless">
                            <tr v-for="(r,i) in quarters" :key="i" class="shadow-sm">
                                <td class="col-3">
                                    <div class="small text-secondary">Region or State</div>
                                    <div>

                                        {{r.region_state}}

                                    </div>
                                </td>
                                <td class="col-3">
                                    <div class="small text-secondary">City or Township</div>
                                    <div>

                                        {{r.city_township_name}}

                                    </div>
                                </td>
                                <td class="col-3">
                                    <div class="small text-secondary">Quarter</div>
                                    <div>

                                        {{r.quarter_name}}

                                    </div>
                                </td>
                                <td class="col-2">
                                    <div class="small text-secondary text-center">Actions</div>
                                    <div>
                                        <button  class="btn btn-link btn-sm"><i class="fas fa-edit"></i></button>
                                        <button @click="removeQuarter(r.id)"  class="btn btn-link text-danger btn-sm"><i class="fas fa-times-circle"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Firebase from "../Firebase"
    export default {
        name: "quarter",
        data(){
            return{
                regions:[],
                cities:[],
                quarters:[],
                region_state:'',
                city_township_name:'',
                quarter_name:'',
                error:false,
                message:false,
                loading:false,
            }
        },
        created(){
            this.fetchRegions();
            this.fetchCity();
            this.fetchQuarters();

        },
        methods:{
            removeQuarter(id){
                const result=confirm("The selected quarter will delete, are you sure ?");
                if(result){
                    Firebase.database().ref("/quarters/"+id).remove()
                        .then(()=>{
                            //this.cities.splice(index, 1)
                            this.message="The selected quarter have been deleted."
                            this.clearMessage();
                        })
                        .catch(err=>{
                            console.log(err)
                        })

                }
            },
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
            fetchCity(){
                this.loading=true;
                Firebase.database().ref("/cities").on("value", (res)=>{
                    const city=[];
                    const v=res.val();
                    for(let i in v){
                        const c={
                            id: i,
                            region_state: v[i].region_state,
                            city_township_name: v[i].city_township_name
                        }
                        city.unshift(c)
                        this.loading=false;
                    }
                    this.cities=city;
                })

            },
            fetchQuarters(){
                this.loading=true;
                Firebase.database().ref("/quarters").on("value", (res)=>{
                    const quarter=[];
                    const v=res.val();
                    for(let i in v){
                        const c={
                            id: i,
                            region_state: v[i].region_state,
                            city_township_name: v[i].city_township_name,
                            quarter_name: v[i].quarter_name
                        }
                        quarter.unshift(c)
                        this.loading=false;
                    }
                    this.quarters=quarter;
                })

            },
            saveQuarter(){
                Firebase.database().ref("/quarters").push({
                    region_state: this.region_state,
                    city_township_name: this.city_township_name,
                    quarter_name: this.quarter_name
                })
                    .then(()=>{
                        //console.log()
                        this.message="The new quarter  have been created."
                        this.clearMessage();
                        this.quarter_name="";
                        //this.cities=[];
                        //this.fetchCity();

                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped>

</style>