<template>

<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
        <div class="content">
            <br />
            <form id="search-form">
                <div class="form-group blu-margin">
                    <select v-model="selected" class="form-control" id="countryid">
						<option v-for="country in countryList" :value="country.id" :key="country.id">
                            {{ country.name }}</option>
					</select>
                    <!-- <div th:fragment="cityFragment" id="cityblock">
                        <select class="form-control" th:field="${cityid}" id="cityid">
                            <option th:each="city : ${citys}" th:value="${city.cityid}"
                                th:text="${city.cityName}"></option>
                        </select>
                    </div> -->
                    <SelectCityComponent  v-bind:country="selected"></SelectCityComponent>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
import SelectCityComponent from '@/components/SelectCityComponent.vue';
import {HTTP} from '../axios.js';

export default{
    name:'CountryFragment',
    components:{
       SelectCityComponent 
    },
    data:function(){
       return {
           countryList:[],
           selected: "TW"
       }   
    },
    created: function(){
       HTTP.get("getCountries").then(response=>{
           console.log(response);
           this.countryList = response.data.countryList;  
       }).catch(error=>{
          console.log(error);
       });
    },methods:{
        showCity(){

        }
    }
}

</script>