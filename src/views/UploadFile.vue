<template>
<div>
<MenuComponent/>
<div>
	<div align="left">
		<br />
		<h3>{{$t('upload.uploadExample')}}</h3>
		<form method="POST" enctype="multipart/form-data">
			<input type="file" id="files" ref="file" name="file" v-on:change="handleFileUpload()"/><br />
			<br /> <input type="button" :value="$t('upload.submit')"  v-on:click="submitFile()"/>
		</form>
 	</div>
</div>
</div>
</template>
<script>
import {HTTP} from '../axios.js';

export default{
    name:'UploadFile',
    data:function(){
      return {
       file: ''
      }
    },
    methods:{
        handleFileUpload(){
           this.file = this.$refs.file.files[0];
        },
        submitFile(){
           let formData = new FormData();
           formData.append('file', this.file);
           HTTP.post("/uploadSingleFile",formData,{
            headers: {
            'Content-Type': 'multipart/form-data'
            }
          }).then(response=>{
              if(response.data.errorCode=="00"){
                  alert("上傳成功");
              }
              console.log("upload success");
          }).catch(error=>{
              console.log(error);
          });
        }
    }
}

</script>
<style scoped>
h3 {
  font-size: 1.75rem;
}
</style>
