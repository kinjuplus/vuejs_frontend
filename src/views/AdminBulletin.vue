<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
			<form id="bulletinContent" action="#" ref="saveForm" method="post"  @submit="doSubmit">
	            <table class="tb-horizontal" style="width: 100%" align="center">
					<tr>
						<th width="18%">{{$t('admin.bulletin.subject')}}</th>
						<td width="32%"><input type="text" id="subject" name="subject" style="width: 400px;"/></td>
						<th width="18%">{{$t('admin.bulletin.subjectEn')}}</th>
                        <td width="32%"><input type="text" id="subjectEn" name="subjectEn" style="width: 400px;"/></td>
					</tr>
					<tr>
						<th width="18%">{{$t('admin.bulletin.publishDate')}}</th>
                        <td width="32%"><input type="date" name="publishDate" id="publishDate" /></td>
                        <th width="18%">{{$t('admin.bulletin.effectiveDate')}}</th>
                        <td width="32%"><input type="date" name="effectiveDate" id="effectiveDate" /></td>
					</tr>			
					<tr>
						<th width="18%">{{$t('admin.bulletin.priority')}}</th>
                        <td width="32%">
                        	<input type="radio" id="priorityH" name="priority" value="1" v-model="pickedPriority"><label>{{$t('admin.bulletin.priorityH')}}</label>&nbsp;&nbsp;
							<input type="radio" id="priorityM" name="priority" value="2" v-model="pickedPriority"/><label>{{$t('admin.bulletin.priorityM')}}</label>&nbsp;&nbsp;
							<input type="radio" id="priorityL" name="priority" value="3" v-model="pickedPriority"/><label>{{$t('admin.bulletin.priorityL')}}</label>
						</td>	
						<th width="18%">{{$t('admin.bulletin.top')}}</th>
                        <td width="32%">
                        	<input type="radio" id="topY" name="top" value="Y" v-model="pickedTop"/><label>{{$t('admin.bulletin.topY')}}</label>&nbsp;&nbsp;
							<input type="radio" id="topN" name="top" value="N"  v-model="pickedTop"/><label>{{$t('admin.bulletin.topN')}}</label>&nbsp;&nbsp;
						</td>		
					</tr>				 
					<tr>
						<th width="18%">{{$t('admin.bulletin.invalid')}}</th>
                        <td width="32%">
                        	<input type="radio" name="invalid" value="Y" v-model="pickedInvalid"/><label>{{$t('admin.bulletin.invalidY')}}</label>&nbsp;&nbsp;
							<input type="radio" name="invalid" value="N" v-model="pickedInvalid"/><label>{{$t('admin.bulletin.invalidN')}}</label>&nbsp;&nbsp;
						</td>	
						<th width="18%">{{$t('admin.bulletin.creatorNo')}}</th>
						<td width="32%"><input type="text" id="creator" name="creator" :value="$store.getters.getUserInfo.empNo" readonly='readonly' style="background-color:#DEDEDE"/></td>
					</tr>			
					<tr>
						<th width="18%" th:text="#{admin.bulletin.creatorName}">Creator Name</th>
						<td width="32%"><input type="text" id="creatorName" name="creatorName" :value="$store.getters.getUserInfo.name" readonly='readonly' style="background-color:#DEDEDE"/></td>
						<th width="18%" th:text="#{admin.bulletin.creatorExt}">Creator Extension</th>
						<td width="32%"><input type="text" id="creatorExt" name="creatorExt" :value="$store.getters.getUserInfo.extensionNo" readonly='readonly' style="background-color:#DEDEDE"/></td>
					</tr>
				</table>            
			
	            <textarea name="content" id="content"  rows="10" cols="80" ></textarea><br/><br/>       
	            <input type='submit' class="normalButton" name="save" :value="$t('admin.bulletin.save')"/>
	            <input type='button' class="normalButton" :value="$t('admin.bulletin.cancel')"/>
        	</form>        	
        	<div class="content">
				<H2></H2>
				<br/>
				<!-- <table id="resultTable" class="tb-vertical" style="width: 100%" align="center" border="2">
					<thead>
						<tr>
							<th>{{$t('admin.bulletin.viewEdit')}}</th>
							<th>{{$t('admin.bulletin.no')}}</th>
							<th>{{$t('admin.bulletin.publishDate')}}</th>
							<th>{{$t('admin.bulletin.subject')}}</th>
							<th>{{$t('admin.bulletin.action')}}</th>
							<th>{{$t('admin.bulletin.creator')}}</th>
						</tr>
					</thead>
					<tbody>
						<tr th:each="bulletin,iterStat : ${bulletins}">
							<td>                              
								<a th:href="@{/admin/bulletinview/{id}(id=${bulletin.bulletinId})}" th:text="#{admin.bulletin.view}">View</a>&nbsp;
								<a th:href="@{/admin/bulletinedit/{id}(id=${bulletin.bulletinId})}" th:text="#{admin.bulletin.edit}">Edit</a>
							</td>
							<td th:text="${iterStat.count}"></td>
							<td th:text="${bulletin.bulletinId}"></td>
							<td th:text="${bulletin.publishDate}"></td>
							<td th:text="${bulletin.subject}"></td>
							<td th:text="${bulletin.invalid}"></td>
							<td th:text="${bulletin.creator}"></td>
						</tr>
					</tbody>
				</table> -->
				<v-text-field
               v-model="filter"
               append-icon="search"
               label="Search"
               single-line
               hide-details
               ></v-text-field>
             <v-data-table
               :headers="headers"
               :items="bulletinList"
               :search="filter"
               class="elevation-1"
              >
              <template v-slot:items="props">
				<td class="text-xs-center"><a style="color:blue;cursor:pointer" @click="bulletinView(props.item.bulletinId)">{{$t('admin.bulletin.view')}}</a>&nbsp;&nbsp;<a style="color:blue;cursor:pointer" @click="bulletinEdit(props.item.bulletinId)">{{$t('admin.bulletin.edit')}}</a></td> 
                <td class="text-xs-center">{{ props.item.bulletinId }}</td>
                <td class="text-xs-center"> {{getPublishDateFormat(props.item.publishDate)}}</td>
                <td class="text-xs-center">{{ props.item.subject }}</td>
                <td class="text-xs-center">{{ props.item.invalid }}</td>
				<td class="text-xs-center">{{ props.item.creator }}</td>
              </template>
             </v-data-table>
				<br />
			</div>
		</div>
</div>
</template>
<script>
import {HTTP} from '../axios.js';

export default{
	name:'AdminBulletin',
	data:function(){
		return{
		   filter:'',
		   pickedPriority:'3',
		   pickedTop:'N',
		   pickedInvalid:'N',
		   bulletinList:[],
		   headers:[          
              {
                text: this.$t('admin.bulletin.viewEdit'),
                value: 'bulletinId',
                align:'center'
              },
              {
                text: this.$t('admin.bulletin.no'),
                value: 'bulletinId',
                align:'center'
              },
              {
                text: this.$t('admin.bulletin.publishDate'),
                value: 'publishDate',
                align:'center'
              },
              {
                text: this.$t('admin.bulletin.subject'),
                value: 'subject',
                align:'center'
			  },
			  {
                text: this.$t('admin.bulletin.action'),
                value: 'invalid',
                align:'center'
			  },
			  {
                text: this.$t('admin.bulletin.creator'),
                value: 'creator',
                align:'center'
			  }
           ]
		};
	},
	created:function(){
         this.getBulletinList();
	},methods:{
		getBulletinList(){
           HTTP.get('/getBulletinList').then(response=>{
                this.bulletinList = response.data.bulletinList;
		   }).catch(error=>{
			   console.log(error);
		   });
		},
		bulletinView(bulletinId){
            this.$router.push({ path: `/BulletinView/`+bulletinId }); 
		},
		bulletinEdit(bulletinId){
            this.$router.push({ path: `/BulletinEdit/`+bulletinId }); 
		},
		getPublishDateFormat(publishDate){
           return publishDate.join("-");
		},
		doSubmit(event){
            if(this.$refs.saveForm.checkValidity()){
				 event.preventDefault();
				 let bulletin = {};
				 bulletin.subject = $('#subject').val();
				 bulletin.subjectEn = $('#subjectEn').val();
				 bulletin.publishDate = $('#publishDate').val();
				 bulletin.effectiveDate = $('#effectiveDate').val();
				 bulletin.top = this.pickedTop;
				 bulletin.invalid = this.pickedInvalid;
				 bulletin.priority = this.pickedPriority;
				 bulletin.creator = this.$store.getters.getUserInfo.empNo;
				 bulletin.creatorName = this.$store.getters.getUserInfo.name;
				 bulletin.creatorExt = this.$store.getters.getUserInfo.extensionNo;
				 bulletin.content = $('#content').val();
				 console.log(JSON.stringify(bulletin));
				 HTTP.post('/saveBulletin',bulletin).then(response=>{
          if(response.data.errorCode == "00"){
						alert("新增成功!");
						this.getBulletinList();
					}else{
						alert("Error!");
					}
				 }).catch(error=>{
                   console.log(error);
				 });
			}
		}			
	}
}

</script>

<style scoped>
textarea {
    border: 1px solid grey;
}    
</style>
