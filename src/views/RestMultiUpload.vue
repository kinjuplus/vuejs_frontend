<template>

<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
	<div class="content">
		<br />
		<h3>Call Multiple Upload</h3>
        <Loading :value="progressStart" :message="message" v-if="progressStart"></Loading> 
		<form method="POST"  enctype="multipart/form-data" @submit="doSubmit">
			<input type="file" id="files" ref="files" v-on:change="handleFileUpload()"/><br />
			<input type="file" id="files" ref="files2" v-on:change="handleFileUpload2()"/><br />
			<br /> <input type="submit" value="Submit"  class="leftButton"/>
		</form>
		</div>
</div>
</div>

</template>
<script>
import Loading from '@/components/Loading.vue';
import {HTTP} from '../axios.js';

export default{
    name:'RestMultiUpload',
     components:{Loading},
    data:function(){
       return {
           progressStart:false,
           message:"uploading",
           files:[]
       }
    },
    methods:{
         handleFileUpload(){
            this.files = this.files.concat(this.$refs.files.files);
        },
        handleFileUpload2(){
            this.files = this.files.concat(this.$refs.files2.files);
        },
        doSubmit(event){
           event.preventDefault();
           this.progressStart = true;
           let formData = new FormData();
           console.log(this.files);
           for( var i = 0; i < this.files.length; i++ ){
             let file = this.files[i];
             formData.append('files[]', file[0]);
           }
           
           HTTP.post("/rest/CallMultiUpload/",formData,{
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

 h3 { 
   text-align:left; 
   font-size: 1.75rem;
 }


 .leftButton {
      position:absolute;
      left:25px;
	  top: 300px;
      width: 50px;
      background-color: lightgray
  }


 input {
	border-style: solid;
}

</style>
