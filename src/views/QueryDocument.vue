<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
			<Loading :value="progressStart" :message="message" v-if="progressStart"></Loading> 
			<form ref="searchForm" id="search-form"  method="post" @submit="submitFormData">
				<h1>{{$t('menu.queryDoc')}}</h1>
				<table class="tb-horizontal" style="width: 100%" align="center">
					<tr>
						<th width="18%">{{$t('label.documentNo')}}</th>
						<td width="32%"><input type="text" id="documentNo" outline
							 v-model="documentNo" required="required"/></td>
						<th width="18%">{{$t('label.creator')}}</th>
						<td width="32%"><input type="text" id="creator"
							v-model="creator" required="required" /></td>
					</tr>
				</table>
				<br />
				<div align="center">
					<input type="submit" :value="$t('button.query')"  class="normalButton"/> &nbsp;
					<input type="button" :value="$t('button.back')" class="normalButton"
						onclick="history.back()" />
					<!--input type="reset" value="Reset" class="normalButton"/-->
				</div>

			</form>

			<br />
			<h2 th:text="#{title.queryResult}">Query Result</h2>
			<table class="tb-vertical" style="width: 100%" align="center" id="resultTable">
				<thead>
					<tr>
						<th width="10%">{{$t('label.documentNo')}}</th>
						<th width="10%">{{$t('label.version')}}</th>
						<th width="50%">{{$t('label.name')}}</th>
						<th width="15%">{{$t('label.creator')}}</th>
						<th width="15%">{{$t('label.updater')}}</th>
					</tr>
				</thead>
				<tbody>
					<template v-if=" documentList.length>0 ">
						<tr v-for="doc in documentList" :key="doc.id">
							<td><a>{{doc.docMaster.documentNo}}</a></td>
							<td>{{doc.versionInfo}}</td>
							<td>{{doc.docMaster.documentName}}</td>
							<td>{{doc.creatorName}}</td>
							<td>{{doc.updaterName}}</td>
						</tr>
					</template>
					<template v-if="documentList.length==0">
						<tr>
							<td colspan="5">Not Data Found!</td>
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
	name:'queryDocument',
	components:{Loading},
    data:function(){
        return {
            documentList:[],
            creator:null,
			documentNo:null,
			progressStart:false,
			message:'查詢中'
        }
    },
    methods:{ 
        submitFormData(event){
           if(this.$refs.searchForm.checkValidity()){
              let requestObj = {};
              requestObj.creator = this.creator;
              requestObj.docMaster = {};
			  requestObj.docMaster.documentNo = this.documentNo;
			  this.progressStart = true;
              HTTP.post("/pdm/doc/querydocument",requestObj).then(response=>{
					this.documentList = response.data.documentList;
					console.log(JSON.stringify(this.documentList));
              }).catch(error=>{
                console.log(error);
              }).then( ()=>{
                 this.progressStart = false;
			  });
              event.preventDefault();
           }
        }
    }    
}

</script>
<style scoped>

body, div, td { background: url('/api/watermark'); background-attachment: fixed; }  

input {
	border-style: solid
}

</style>
