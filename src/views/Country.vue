<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
			<br />
			<form id="search-form">
				<div class="form-group blu-margin">
					<select v-model="selected" class="form-control" th:field="${countryid}" id="countryid" @change="showCity">
						<option v-for="country in countryList" :value="country.id" :key="country.id">
                            {{ country.name }}</option>
					</select> <select class="form-control" id="cityid">
                          <option v-for="city in cityList" :value="city.cityid" :key="city.cityid">
                            {{ city.cityName }}</option>
                    </select>
				</div>
		</form>
	</div>
</div>
</div>
</template>

<script>
import {HTTP} from '../axios.js';

export default{
    name:'Country',
    data:function(){
       return {
           countryList:[],
           selected: "TW",
           cityList:[]
       }   
    },
    created: function(){
       HTTP.get("getCountries").then(response=>{
           console.log(response);
           this.countryList = response.data.countryList;  
       }).catch(error=>{
          console.log(error);
       });
       this.showCity();
    },
    methods:{
        showCity(){
           HTTP.get("getCities",{
               params: {
                 countryId: this.selected
               }
           }).then(response=>{
              this.cityList = response.data.cityList;
           }).catch(error=>{
              console.log(error);
           });
        }
    }
}

</script>