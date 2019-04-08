<template>
<div th:fragment="cityFragment" id="cityblock">
    <select class="form-control" id="cityid">
       <option v-for="city in cityList" :value="city.cityid" :key="city.cityid">
           {{ city.cityName }}
        </option>
    </select>
</div>
</template>
<script>
import {HTTP} from '../axios.js';

export default{
    name:'SelectCityComponent',
    props: ['country'],
    data:function(){
        return {
            cityList:[]
        }
    },
    created:function(){
        this.showCity(this.country);
    },
     methods:{
        showCity(country){
           HTTP.get("getCities",{
               params: {
                 countryId: country
               }
           }).then(response=>{
              this.cityList = response.data.cityList;
           }).catch(error=>{
              console.log(error);
           });
        }
    },
    watch : {
       country : function (value) {
          this.showCity(value);
       }
    }
    
}
</script>