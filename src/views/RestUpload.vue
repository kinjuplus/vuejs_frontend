<template>
<div>
<MenuComponent/>
<!-- <v-progress-circular
        :size="70"
        :width="7"
        color="red"
        indeterminate
        v-if="progressStart"
      ></v-progress-circular> -->

<div id="body" class="ui-layout-center">
	<div class="content">
		<br />
		<h3>Call Upload</h3>
        <Loading :value="progressStart" :message="message" v-if="progressStart"></Loading> 
		<form method="POST" enctype="multipart/form-data" @submit="doSubmit">
			<input type="file" ref="file" name="file" v-on:change="handleFileUpload()"/><br />
			<!-- <br /> <input type="submit" value="Submit" /> -->
            <input type="submit" class="leftButton" value="Submit" />
		</form>
		</div>
	</div>
     
</div>       
</template>
<script>
import Loading from '@/components/Loading.vue';
import {HTTP} from '../axios.js';

export default{
    name:'RestUpload',
    components:{Loading},
    data:()=>{
       return {
           progressStart:false,
           message:"uploading",
           file: ''
       }
    },
    created:()=>{
      
    },methods:{
         handleFileUpload(){
           this.file = this.$refs.file.files[0];
        },
        doSubmit(event){
           event.preventDefault();
           this.progressStart = true;
           let formData = new FormData();
           formData.append('file', this.file);
           HTTP.post("/rest/CallUpload/",formData,{
           headers: {
            'Content-Type': 'multipart/form-data'
            }
          }).then(response=>{
              if(response.data.errorCode=="00"){
                 this.progressStart = false;
              }else{
                  alert("Error!");
              }
          }).catch(error=>{
              console.log(error);
          });
        }
    }
}

</script>

<style scoped>
  .leftButton {
      position:absolute;
      left:25px;
	  top: 250px;
      width: 50px;
      background-color: lightgray
  }

 h3 { 
   text-align:left; 
   font-size: 1.75rem;
 }
 

 input {
	border-style: solid;
}

 
</style>
