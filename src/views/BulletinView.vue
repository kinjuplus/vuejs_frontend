<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
		    <H2>{{$t('admin.bulletinview.bulletinView')}}</H2>
			<br />
			<table class="tb-horizontal" style="width: 95%" align="center">
				<tr>
					<th width="18%">{{$t('admin.bulletinview.subject')}}</th>
					<td width="32%">{{bulletin.subject}}</td>
					<th width="18%">{{$t('admin.bulletinview.enSubject')}}</th>
                    <td width="32%">{{bulletin.subjectEn}}</td>
				</tr>
				<tr>
					<th width="18%">{{$t('admin.bulletinview.priority')}}</th>
					<td width="32%">{{bulletin.priority}}</td>
					<th width="18%">{{$t('admin.bulletinview.top')}}</th>
					<td width="32%">{{bulletin.top}}</td>
				</tr>
				<tr>
					<th width="18%">{{$t('admin.bulletinview.invalid')}}</th>
					<td width="32%">{{bulletin.invalid}}</td>
					<th width="18%">{{$t('admin.bulletinview.creatorNo')}}</th>
					<td width="32%">{{bulletin.creator}}</td>
				</tr>
				<tr>
					<th width="18%">{{$t('admin.bulletinview.creatorName')}}</th>
					<td width="32%">{{bulletin.creatorName}}</td>
					<th width="18%">{{$t('admin.bulletinview.creatorExt')}}</th>
					<td width="32%">{{bulletin.creatorExt}}</td>
				</tr>
				<tr>
					<th width="18%">{{$t('admin.bulletinview.publishDate')}}</th>
					<td width="32%" v-if="bulletin.publishDate">{{ getFormatedDate(bulletin.publishDate)}}</td>
					<th width="18%">{{$t('admin.bulletinview.effectiveDate')}}</th>
					<td width="32%" v-if="bulletin.effectiveDate">{{ getFormatedDate(bulletin.effectiveDate)}}</td>
				</tr>
				
			</table>
			<br />
			<table id="appTable" class="tb-vertical" style="width: 95%" align="center" border="2">
				<thead>
					<tr>
					    <th>{{$t('admin.bulletinview.content')}}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td v-html="bulletin.content"></td>
					</tr>
				</tbody>
			</table>
			<br />
			<div align="center">
				<input type="button" :value="$t('admin.bulletinview.back')" class="normalButton"
					onclick="history.back()" />
			</div>
		</div>
	</div>
</div>

</template>

<script>
import {HTTP} from '../axios.js';

export default {
     name:'BulletinEdit',
     data:function(){
        return {
            bulletin:{}
        }; 
     },created:function(){
        this.getBulletinDetail();
     }, methods:{
         getBulletinDetail(){
             console.log('The bulletin id is: ' + this.$route.params.bulletinId);
             HTTP.get("/bulletinView/"+this.$route.params.bulletinId+"/").then(response=>{
                 if(response.data.errorCode=='00'){
                   this.bulletin = response.data.bulletin;
                 }else{
                   alert('Error!');
                 }
             }).catch(error=>{
                console.log(error);
             });
         },
         getFormatedDate(dateArray){
           return dateArray.join("-");
         }

     }
 }
</script>