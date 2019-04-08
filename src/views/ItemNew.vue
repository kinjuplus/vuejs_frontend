<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
		    <H2 th:text="#{dynamic.itemedit.itemEdit}">Item Maintain</H2>
			<br />
			<form ref="saveForm" id="save-form"  method="post"  @submit="doSubmit">
				<input type="hidden" id="itemId" th:field="*{id}" />
				<table class="tb-horizontal" style="width: 95%" align="center">
					<tr>
						<th width="18%">{{$t('dynamic.itemedit.itemNo')}}</th>
						<td width="32%"><input type="number" id="itemNo" name="itemNo"
							 required="required"/></td>
						<th width="18%">{{$t('dynamic.itemedit.itemName')}}</th>
						<td width="32%"><input type="text" id="itemName" name="name"
							required="required" /></td>
					</tr>
					<tr>
						<th width="18%">{{$t('dynamic.itemedit.releaseDate')}}</th>
						<!-- datetime-local
						  ${#temporals.format(customer.date,'yyyy-MM-dd HH:mm')}-->
						<td width="32%"><input type="date" id="releaseDate" name="releaseDate"/></td>
						<th width="18%">{{$t('dynamic.itemedit.testDateTime')}}</th>
						<td width="32%"><input type="datetime-local" id="releaseDate" name="testDateTime"/></td>
					</tr>

				</table>
				<br />
				<table id="appTable" class="tb-vertical" style="width: 95%"
					align="center" border="2">
					<thead>
						<tr>
							<th>{{$t('dynamic.itemedit.attribute')}}</th>
							<th>{{$t('dynamic.itemedit.value')}}</th>
						</tr>
					</thead>
					<tbody>		
                         <tr v-for="(itemIba, index) in item.itemIbas" :key="itemIba.id">
                             <td>
                                <input type="hidden" :name="'itemIbas['+index+'].id'" :value="itemIba.id" :id="'id-'+index"/>
								<input type="hidden" :name="'itemIbas['+index+'].ibaDef'" :value="itemIba.ibaDef.id" :id="'attrIbaDef-'+index"/>  
								<input type="text" :name="'itemIbas['+index+'].ibaDef.attrDisplay'" :id="'attrDisp-'+index" readonly="readonly" :value="itemIba.ibaDef.attrDisplay"/>
                             </td>
							 <td>
								<input type="text" :name="'itemIbas['+index+'].attrValue'" required="required" :id="'attrValue-'+index"/> 
							 </td>       
						</tr>
					</tbody>
				</table>
				<br />
				<div align="center">
					<input type="submit" :value="$t('dynamic.itemedit.save')" class="normalButton"/> &nbsp; <input
						type="button" :value="$t('dynamic.itemedit.back')" class="normalButton"
						onclick="history.back()" />
					<!--input type="reset" value="Reset" class="normalButton"/-->
				</div>
			</form>
		</div>
	</div>
</div>
</template>
<script>
import {HTTP} from '../axios.js';

export default {
    name:'itemNew',
    data:function(){
        return{
            item:{}
        }
    },
    created:function(){
      HTTP.get("getItemDefinition/").then(response=>{
         if(response.data.errorCode=="00"){
             this.item = response.data.item;
		 }else{
           alert('Error!');
		 }
      }).catch(error=>{
        console.log(error);
      }); 
    },methods:{
		doSubmit:function(event){
			let requestBody = this.getFormData();
			HTTP.post("itemsave/",requestBody).then(response=>{
                if(response.data.errorCode=="00"){
                    this.$router.push({name:'ItemQuery'}); 
				}else{
					alert("Error!");
				}
			}).catch(error=>{
               console.log(error); 
			});
			event.preventDefault();
		},
		getFormData:function(){
		    let requestBody = {};
			requestBody.id = 1;
			requestBody.itemNo = this.$refs.saveForm.itemNo.value;
			requestBody.name = this.$refs.saveForm.name.value;
			requestBody.releaseDate = this.$refs.saveForm.releaseDate[0].value;
			requestBody.testDateTime = this.$refs.saveForm.testDateTime.value;
			requestBody.itemIbas=[];
			let attrKeyArray = ['car.type','car.brand','car.color','car.fluid'];
			for(let i=0;i<4;i++){
				let iba ={};
				iba.attrValue= document.getElementById('attrValue-'+i).value;
				iba.id= i;
				iba.ibaDef = {};
				iba.ibaDef.id = document.getElementById('attrIbaDef-'+i).value;
				iba.ibaDef.id = i+1;
				iba.ibaDef.attrDisplay = document.getElementById('attrDisp-'+i).value;
				iba.ibaDef.attrKey = attrKeyArray[i];
				requestBody.itemIbas.push(iba);
			}
			console.log(JSON.stringify(requestBody));
            return requestBody;
		}
	}
}
</script>