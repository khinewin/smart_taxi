<template>
    <div class="container-fluid mt-5">

        <div class="row">
            <div class="col-sm-4">
                <h6 class="text-secondary mb-2"><i class="fas fa-plus-circle"></i> New Street</h6>
                <div class="card shadow">
                    <div class="card-body">
                        <form @submit.prevent="saveStreet">
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
                                <label for="quarter_name">Quarter</label>
                                <select id="quarter_name" required v-model="quarter_name" class="custom-select" >
                                    <option v-for="q in quarters" :key="q.id">{{q.quarter_name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="street_name">Street Name</label>
                                <input v-model="street_name" type="text" id="street_name" class="form-control" required>
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
                <h6 class="text-secondary mb-2"><i class="fas fa-street-view"></i> Streets</h6>
                <div class="card shadow-sm">
                    <div class="card-body">
                        <div class="text-center" v-if="loading">
                            <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner" type="grow"></b-spinner>
                        </div>
                        <table class="table table-hover table-borderless">
                            <tr v-for="(s,i) in streets" :key="i" class="shadow-sm">
                                <td class="col-sm-2">
                                    <div class="small text-secondary">Region or State</div>
                                    <div>

                                        {{s.region_state}}

                                    </div>
                                </td>
                                <td class="col-sm-2">
                                    <div class="small text-secondary">City or Township</div>
                                    <div>

                                        {{s.city_township_name}}

                                    </div>
                                </td>
                                <td class="col-sm-2">
                                    <div class="small text-secondary">Quarter</div>
                                    <div>

                                        {{s.quarter_name}}

                                    </div>
                                </td>
                                <td class="col-sm-4">
                                    <div class="small text-secondary">Street</div>
                                    <div>

                                        {{s.street_name}}

                                    </div>
                                </td>
                                <td class="col-2">
                                    <div class="small text-secondary text-center">Actions</div>
                                    <div>
                                        <button  class="btn btn-link btn-sm"><i class="fas fa-edit"></i></button>
                                        <button @click="removeStreet(s.id)"  class="btn btn-link text-danger btn-sm"><i class="fas fa-times-circle"></i></button>
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
                streets:[],
                region_state:'',
                city_township_name:'',
                quarter_name:'',
                street_name:'',
                error:false,
                message:false,
                loading:false,
            }
        },
        created(){
            this.fetchRegions();
            this.fetchCity();
            this.fetchQuarters();
            this.fetchStreets();

        },
        methods:{
            removeStreet(id){
                const result=confirm("The selected street will delete, are you sure ?");
                if(result){
                    Firebase.database().ref("/streets/"+id).remove()
                        .then(()=>{
                            //this.cities.splice(index, 1)
                            this.message="The selected street have been deleted."
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
            fetchStreets(){
                this.loading=true;
                Firebase.database().ref("/streets").on("value", (res)=>{
                    const street=[];
                    const v=res.val();
                    for(let i in v){
                        const c={
                            id: i,
                            region_state: v[i].region_state,
                            city_township_name: v[i].city_township_name,
                            quarter_name: v[i].quarter_name,
                            street_name: v[i].street_name
                        }
                        street.unshift(c)
                        this.loading=false;
                    }
                    this.streets=street;
                })

            },
            saveStreet(){
                Firebase.database().ref("/streets").push({
                    region_state: this.region_state,
                    city_township_name: this.city_township_name,
                    quarter_name: this.quarter_name,
                    street_name: this.street_name
                })
                    .then(()=>{
                        //console.log()
                        this.message="The new street  have been created."
                        this.clearMessage();
                        this.street_name="";
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