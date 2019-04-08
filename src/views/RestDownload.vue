<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
            <h2><a style="cursor:pointer;color:blue"   @click="doRestDownload">Call Download</a></h2>
		</div>
</div>
</div>
</template>
<script>
import {HTTP} from '../axios.js';

export default{
    name:'RestDownload',
    methods:{
       doRestDownload(){
           HTTP.get('CallDownload/Link/',{responseType: 'blob'})
           .then(function (response) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'file.ppt');
             document.body.appendChild(link);
             link.click();
         })
         .catch(function (error) {
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
