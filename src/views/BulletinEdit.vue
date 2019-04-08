<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
			<div class="content">
		    	<H2>{{$t('admin.bulletinedit.bulletinEdit')}}</H2>
			<!--  <form name = 'form' action = '#' method='post'> -->
			<form id="bulletinContent" action="#" @submit="doSubmit" method="post" ref="saveForm">
	            <table class="tb-horizontal" style="width: 100%" align="center">
					<tr>
						<th width="18%">{{$t('admin.bulletinedit.subject')}}</th>
						<td width="32%">
							<input type="text" id="subject" name="subject" v-model="bulletin.subject" required="required" style="width: 400px;"/>
						</td>
						<th width="18%">{{$t('admin.bulletinedit.subjectEn')}}</th>
                        <td width="32%"><input type="text" id="subjectEn" name="subjectEn" v-model="bulletin.subjectEn" required="required" style="width: 400px;"/>
                        </td>
					</tr>
					<tr>
						<th width="18%">{{$t('admin.bulletinedit.publishDate')}}</th>
                        <td width="32%"><input type="date" id="publishDate" v-if="bulletin.publishDate" name="publishDate" :value="getFormatedDate(bulletin.publishDate)" required="required"/></td>
                        <th width="18%">{{$t('admin.bulletinedit.effectiveDate')}}</th>
                        <td width="32%"><input type="date" id="effectiveDate" v-if="bulletin.effectiveDate" name="effectiveDate" :value="getFormatedDate(bulletin.effectiveDate)" required="required"/></td>
					</tr>			
					<tr>
						<th width="18%">{{$t('admin.bulletinedit.priority')}}</th>
                        <td width="32%">
                        	<input type="radio" id="priorityH" name="priority" value="1" v-model="bulletin.priority" /><label>{{$t('admin.bulletinedit.high')}}</label>&nbsp;&nbsp;
							<input type="radio" id="priorityM" name="priority" value="2"  v-model="bulletin.priority" /><label>{{$t('admin.bulletinedit.mid')}}</label>&nbsp;&nbsp;
							<input type="radio" id="priorityL" name="priority" value="3"  v-model="bulletin.priority" /><label>{{$t('admin.bulletinedit.low')}}</label>
						</td>	
						<th width="18%">{{$t('admin.bulletinedit.top')}}</th>
                        <td width="32%">
                        	<input type="radio" id="topY" name="top" value="Y"  v-model="bulletin.top"/><label>{{$t('admin.bulletinedit.yes')}}</label>&nbsp;&nbsp;
							<input type="radio" id="topN" name="top" value="N"  v-model="bulletin.top"/><label>{{$t('admin.bulletinedit.no')}}</label>&nbsp;&nbsp;
						</td>		
					</tr>
					 
					<tr>
						<th width="18%" th:text="#{admin.bulletinedit.invalid}">Invalid</th>
                        <td width="32%">
                        	<input type="radio" name="invalid" value="Y"  v-model="bulletin.invalid" th:text="#{admin.bulletinedit.yes}"/>Y&nbsp;&nbsp;
							<input type="radio" name="invalid" value="N"  v-model="bulletin.invalid" th:text="#{admin.bulletinedit.no}"/>N&nbsp;&nbsp;
						</td>	
						<th width="18%" th:text="#{admin.bulletinedit.creatorNo}">Creator No</th>
						<td width="32%"><input type="text" id="creator" name="creator" :value="bulletin.creator" required="required" readonly='readonly' style="background-color:#DEDEDE"/>
						</td>
					</tr>			
					<tr>
						<th width="18%" th:text="#{admin.bulletinedit.creatorName}">Creator Name</th>
						<td width="32%"><input type="text" id="creatorName" name="creatorName" :value="bulletin.creatorName" required="required" readonly='readonly' style="background-color:#DEDEDE"/>
						</td>
						<th width="18%" th:text="#{admin.bulletinedit.creatorExt}">Creator Extension</th>
						<td width="32%"><input type="text" id="creatorExt" name="creatorExt" :value="bulletin.creatorExt" required="required" readonly='readonly' style="background-color:#DEDEDE"/>
						</td>
						
					</tr>
				</table>            
				<input type="hidden" th:field="*{bulletinId}" name="bulletinId" />
	            <!-- <textarea name="content" id="content"  rows="10" cols="80" v-html="bulletin.content"></textarea> -->
                 <ckeditor :editor="editor" v-model="bulletin.content" ></ckeditor>       
	            <input type='submit' :value="$t('admin.bulletinedit.save')" class="normalButton" name="save"/>
	            <input type='button' :value="$t('admin.bulletinedit.cancel')" class="normalButton" onclick='history.back()'/>
        	</form>
        	</div>
		</div>
</div>
</template>


<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HTTP} from '../axios.js';

export default {
    name:'BulletinEdit',
    components: {
            // Use the <ckeditor> component in this view.
            ckeditor: CKEditor.component
    }, data:function(){
        return{
           editor: ClassicEditor,
           bulletin:{},
           richText:'<p><em><span style="color:#cc0000"><strong><span style="font-size:36px"><span style="background-color:#1abc9c">測試主題測試主題測試主題測試主題測試主題測試主題測試主題測試主題測試主題測試主題測試主題測試主題測試主題測試主題</span></span></strong></span></em></p>'
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
           return dateArray[0]+"-"+this.getComplementedDatePart(dateArray[1])+"-"+this.getComplementedDatePart(dateArray[2]);
         },
         getComplementedDatePart(datePart){
             return (datePart>10)?datePart:'0'+datePart;
         },
         doSubmit(event){
             if(this.$refs.saveForm.checkValidity()){
                 event.preventDefault();
                 this.bulletin.publishDate = $('#publishDate').val();
                 this.bulletin.effectiveDate = $('#effectiveDate').val();
                 console.log(JSON.stringify(this.bulletin));
                 HTTP.post("/saveBulletin",this.bulletin).then(response=>{
                 if(response.data.errorCode=="00"){
                    alert("更新成功");
                    location.reload(true);
                  }else{
                      alert("Error!!");
                  }
                 }).catch(error=>{
                   console.log(error);
                 });
             } 
         }
    }
}
</script>