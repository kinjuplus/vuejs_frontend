<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
			<form id="search-form" action="#"  method="post" @submit="doSubmit">
				<h1>{{$t('createSampleForm.editDoc')}}</h1>
				<table class="tb-horizontal" style="width: 100%" align="center">
					<tr>
						<th width="18%">{{$t('createSampleForm.documentNo')}}</th>
						<td width="32%" align="left"><input type="text" id="doc_number"
							th:field="*{docnumber}" required="required" />
							<input type="hidden" id="sampleFormId"/>
							</td>
					</tr>
					<tr>
						<th width="18%">{{$t('createSampleForm.name')}}</th>
						<td width="32%" align="left"><input type="text" id="name"
							th:field="*{name}" required="required" /></td>
					</tr>
					<tr>
						<th width="18%">{{$t('createSampleForm.expectedDate')}}</th>
						<td width="32%" align="left"><input type="date" id="completeDate"
							name="completeDate" th:field="*{completeDate}"
							required="required" /></td>
					</tr>
					<tr>
						<th width="18%">{{$t('createSampleForm.description')}}</th>
						<td width="32%" align="left"><input type="text" id="description"
							th:field="*{description}" required="required" /></td>
					</tr>
					<tr>
						<th width="18%">{{$t('createSampleForm.docType')}}</th>
						<td width="32%" align="left">
						<select  v-model="docType">
								<option v-for="docType in docTypeList" :value="docType.optionkey" :key="docType.optionkey"> {{docType.optionvalue}}</option>
						</select>
						</td>
					</tr>
					<tr>
						<th width="18%" >{{$t('createSampleForm.plant')}}</th>
						<td width="32%" align="left">
							<ul>
								<li v-for="plant in plantList" :key="plant.optionkey">
								 <input type="checkbox"
									name="plantCkb" :value="plant.optionkey" v-model="applyPlant"
									th:checked="${#strings.contains(document.applyplant,ckb.optionkey)} ? 'checked'" />
									<label>{{plant.optionvalue}}</label>
								</li>
							</ul>
						</td>
					</tr>
					<tr>
						<th width="18%">{{$t('createSampleForm.prodPlant')}}</th>
						<td width="32%" align="left">
							<ul>
								<li v-for="plant in plantList" :key="plant.optionkey">
									<input type="radio"
									th:field="*{prodPlantObj.optionkey}" :value="plant.optionkey" v-model="prodPlant"/>
									<label>{{plant.optionvalue}}</label> 
								</li>
							</ul>
						</td>
					</tr>
					
					<tr>
						<th width="18%">{{$t('createSampleForm.testPlant')}}</th>
						<td width="32%" align="left">
							<ul>
								<li v-for="plant in plantList" :key="plant.optionkey">
									<input type="checkbox" th:field="*{testPlants}" :value="plant.optionkey" v-model="testPlant"/>
									<label>{{plant.optionvalue}}</label> 
								</li>
							</ul>
							<input type="hidden" th:field="*{testPlantObjs}"/>
						</td>
					</tr>


				</table>
				<br />
				<div align="center">
					<input type="submit" :value="$t('createSampleForm.submit')" class="normalButton" style="background-color:lightgray"/> &nbsp;
					<input type="button" :value="$t('createSampleForm.back')" class="normalButton" style="background-color:lightgray" onclick="history.back()" />
				</div>
			</form>
			<br/>
		</div>
	</div>
</div>
</template>
<script>
import {HTTP} from '../axios.js';

export default{
    name:'CreateSampleForm',
    data:function(){
        return {
            docTypeList:[],
			plantList:[],
			applyPlant:[],
			prodPlant:'',
			testPlant:[],
			docType:''
        };
    },
    created:function(){
        this.getAllDocType();
        this.getAllPlant();
    },
    methods:{
        getAllDocType(){
            HTTP.get("getAllDocType/").then(response=>{
              if(response.data.errorCode=="00"){
								 this.docTypeList = response.data.docTypeList;
								 console.log(JSON.stringify(this.docTypeList));
              }else{
                 alert("Error!");
              }
            }).catch(error=>{
               console.log(error);
             });
        },
        getAllPlant(){
            HTTP.get("getAllPlant/").then(response=>{
              if(response.data.errorCode=="00"){
								 this.plantList = response.data.plantList;
								 console.log(JSON.stringify(this.plantList));
              }else{
                 alert("Error!");
              }
            }).catch(error=>{
               console.log(error);
             });
		},
		doSubmit(event){
		   event.preventDefault();
		   let requestObject = {};
		   requestObject.id = $('#sampleFormId').val();
		   requestObject.docnumber = $('#doc_number').val();
		   requestObject.name = $('#name').val();
		   requestObject.completeDate = $('#completeDate').val();
		   requestObject.description = $('#description').val();
		   requestObject.applyplant = this.applyPlant.join(",");
		   requestObject.plantCkb = this.applyPlant.join(",");
           let docTypeObj = this.docTypeList.filter(type=>{
			   return type.optionkey == this.docType;
		   })[0];
		   let prodPlantObj = this.plantList.filter(plant=>{
			   return plant.optionkey == this.prodPlant;
		   })[0]
		   requestObject.doctTypeObj = docTypeObj;
		   requestObject.prodPlantObj = prodPlantObj;

		   console.log(JSON.stringify(requestObject));  
		   HTTP.post('/sampleFormSubmit',requestObject).then(response=>{
               if(response.data.errorCode ==="00"){
				   alert("新增成功");
			   }
		   }).catch(error=>{
              console.log(error); 
		   });
		}
    }
}

</script>

<style scoped>
  input {
      border-style: solid;
  }

  select{
     border-style: solid;
     -webkit-appearance: menulist;
     -moz-appearance: menulist;
  }

  h1{
	  text-align: left
  }

</style>
