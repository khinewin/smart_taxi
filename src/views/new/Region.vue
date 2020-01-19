<template>
    <div class="container mt-5">
        <div class="alert alert-success sticky-top" v-if="message">
           <i class="fas fa-marker"></i> {{message}}
        </div>
        <div class="row">
            <div class="col-sm-4">
                <h6 class="text-secondary mb-2"><i class="fas fa-plus-circle"></i> New Region or State</h6>
                <div class="card shadow">
                    <div class="card-body">
                        <form @submit.prevent="saveRegion">
                            <div class="form-group">
                                <label for="region_state">Region / State</label>
                                <select id="region_state" required v-model="region_state" class="custom-select">
                                    <option>ပြည်နယ်</option>
                                    <option>တိုင်း</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="region_state_name">Region or State Name</label>
                                <input v-model="region_state_name" type="text" id="region_state_name" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <h6 class="text-secondary mb-2"><i class="fas fa-city"></i> Regions or States</h6>
                <div class="card shadow-sm">
                    <div class="card-body">
                        <table class="table table-hover table-borderless">
                            <tr v-for="(r,i) in regions" :key="i" class="shadow-sm">
                                <td class="col-10">
                                    <div class="small text-secondary">Region or State Name</div>
                                    <div>

                                            {{r.region_state_name}}{{r.region_state}}

                                    </div>
                                </td>
                                <td class="col-2">
                                    <div class="small text-secondary text-center">Actions</div>
                                    <div>
                                        <button @click="changeEdit(r)" class="btn btn-link btn-sm"><i class="fas fa-edit"></i></button>
                                        <button @click="removeRegion(r.id)" class="btn btn-link text-danger btn-sm"><i class="fas fa-times-circle"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="myModal" hide-footer hide-header>
            <div>
                <form @submit.prevent="updateRegion">
                    <div class="row">
                        <div class="form-group col-5">
                            <select  v-model="currentRegion" class="custom-select">
                                <option :selected="currentRegion==ပြည်နယ်" >ပြည်နယ်</option>
                                <option :selected="currentRegion==တိုင်း">တိုင်း</option>
                            </select>
                        </div>
                        <div class="form-group col-5">
                            <input type="text" v-model="currentRegionName" class="form-control" placeholder="Region or state name">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>

        </b-modal>
    </div>
</template>

<script>
    import Firebase from "../../Firebase"
    export default {
        name: "region",
        data(){
            return{
                regions:[],
                region_state:'',
                region_state_name:'',
                error:false,
                message:false,
                currentRegion:'',
                currentRegionName:'',
                currentRegionId:''

            }
        },
        created(){
          this.fetchRegions();
        },
        methods:{
            updateRegion(){
                Firebase.database().ref("/regions/"+this.currentRegionId).set({
                    region_state: this.currentRegion,
                    region_state_name: this.currentRegionName
                }).then(()=>{
                    this.$bvModal.hide("myModal")
                    this.regions=[]
                    this.fetchRegions();
                    this.message="The selected region have been udpated."
                    this.clearMessage();
                }).catch(()=>{
                    console.log("error")
                })
            },
            changeEdit(r){
                this.currentRegion=r.region_state;
                this.currentRegionName=r.region_state_name;
                this.currentRegionId=r.id;
              this.$bvModal.show("myModal")
            },
            removeRegion(id){
                const result=confirm("The region you selected will delete. are you sure ?")
                if(result){
                    Firebase.database().ref("/regions/"+id).remove()
                        .then(()=>{
                            this.message="The selected region have been deleted."
                            this.clearMessage();
                            this.regions=[]
                            this.fetchRegions();
                        })

                }
            },
            fetchRegions(){
                Firebase.database().ref('/regions').once("value",(res)=>{
                    const val=res.val();
                    for(let i in val){
                        let region={
                            id: i,
                            region_state: val[i].region_state,
                            region_state_name: val[i].region_state_name
                        }
                        this.regions.unshift(region)
                    }
                })
            },
            clearMessage(){
              setTimeout(()=>{
                  this.message=false
              }, 3000)
            },
            saveRegion(){
                Firebase.database().ref("/regions").push({
                    region_state: this.region_state,
                    region_state_name: this.region_state_name
                })
                    .then(()=>{
                        //console.log()
                        this.message="The new region or state have been created."
                        this.clearMessage();

                        this.regions=[]
                        this.fetchRegions();

                        this.region_state='';
                        this.region_state_name='';


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