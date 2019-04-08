<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
			<Loading :value="progressStart" :message="message" v-if="progressStart"></Loading> 
			<form id="search-form" action="#"  method="post"  @submit="doSubmit">
				<h1 th:text="#{querySampleForm.queryDoc}">{{$t('querySampleForm.queryDoc')}}</h1>
				<table class="tb-horizontal" style="width: 100%" align="center">
					<tr>
					   <th width="10%">{{$t('createSampleForm.docType')}}</th>
                        <td width="20%">
                        <select v-model="docType" required>
								<option v-for="docType in docTypeList" :value="docType.optionkey" :key="docType.optionkey"> {{docType.optionvalue}}</option>
						</select>
						</td>
						<th width="10%" >{{$t('createSampleForm.documentNo')}}</th>
						<td width="20%"><input type="text" id="doc_number"/></td>
						<th width="10%" >{{$t('createSampleForm.name')}}</th>
                        <td width="20%"><input type="text" id="docName"/></td>
					</tr>
				</table>
				<br />
				<div align="center">
					<input type="submit" :value="$t('createSampleForm.submit')" class="normalButton" /> &nbsp;
					<input type="button" :value="$t('createSampleForm.back')" class="normalButton"
						onclick="history.back()" />
					<!--input type="reset" value="Reset" class="normalButton"/-->
				</div>

			</form>

			<br />
			<h2 th:text="#{querySampleForm.queryResult}">Query Result</h2>
			<table class="tb-vertical" style="width: 100%" align="center" id="resultTable">
				<thead>
					<tr>
						<th width="10%" th:text="#{querySampleForm.no}">No</th>
						<th width="50%" th:text="#{querySampleForm.name}">Name</th>
						<th width="15%" th:text="#{querySampleForm.description}">Description</th>
						<th width="15%" th:text="#{querySampleForm.docPattern}">Doc Pattern</th>
					</tr>
				</thead>
				<tbody>
					
					
					
					<template v-if="this.documentList && this.documentList.length > 0">
                        <tr v-for="doc in documentList" :key="doc.id">
                            <td><a th:href="@{/sample/sampleformdetail(docid=${doc.id})}">{{doc.docnumber}}</a></td>
                            <td th:text="${doc.name}">{{doc.name}}</td>
                            <td th:text="${doc.description}">{{doc.description}}</td>
                            <td th:text="${doc.doctTypeObj.optionvalue}">{{doc.doctTypeObj.optionvalue}}</td>
                            <!--LocalDate use temporals.format, old Date use date.format-->
                            <!--td th:text="${#temporals.format(customer.date,'yyyy-MM-dd HH:mm')}">date</td-->
                        </tr>
                    </template>
					
					
					<template v-if="!this.documentList || this.documentList.length == 0">
						<tr>
							<td colspan="5" th:text="#{querySampleForm.notFound}">Not Data Found!</td>
						</tr>
					</template>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>
<script>
import {HTTP} from '../axios.js';
import Loading from '@/components/Loading.vue';

export default{
	name:'QuerySampleForm',
	components:{Loading},
    data:function(){
        return {
            docTypeList:[],
			documentList:[],
			docType:'',
			message:'查詢中',
			progressStart:false
        };
	},
	created:function(){
	   this.getAllDocType(); 
	},
	methods:{
	   getAllDocType(){
            HTTP.get("getAllDocType/").then(response=>{ 
			  if(response.data.errorCode=="00"){
                 this.docTypeList = response.data.docTypeList;
              }else{
                 alert("Error!");
              }
            }).catch(error=>{
               console.log(error);
            })
       },
	   doSubmit(event){
          event.preventDefault();
		  let requestObject = {};
		  requestObject.docnumber = ($('#doc_number').val())?$('#doc_number').val():'';
		  requestObject.name = ($('#docName').val())?$('#docName').val():'';
		  let docTypeObj = this.docTypeList.filter(type=>{
			   return type.optionkey == this.docType;
		   })[0];
		   requestObject.doctTypeObj = docTypeObj;
		   
           this.progressStart = true; 

		   HTTP.post("/querySampleFormSubmit",requestObject).then(response=>{
				  this.documentList = response.data.documentList;
		   }).catch(error=>{
              console.log(error);
		   }).then(()=>{
                this.progressStart = false;
		   });
	   }
	}	
}   


</script>
<style scoped>

h1{
 text-align: left
}

input {
      border-style: solid;
  }

  select{
     border-style: solid;
     -webkit-appearance: menulist;
     -moz-appearance: menulist;
  }

</style>
    

