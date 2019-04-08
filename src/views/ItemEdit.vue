<template>

<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
		    <H2 th:text="#{dynamic.itemedit.itemEdit}">Item Maintain</H2>
			<br />
			<form id="save-form" action="#" th:action="@{/dynamic/itemsave}" ref="saveForm"
				th:object="${item}" method="post"  @submit="doSubmit">
				<input type="hidden" id="itemId" th:field="*{id}" />
				<table class="tb-horizontal" style="width: 95%" align="center">
					<tr>
						<th width="18%">{{$t('dynamic.itemView.itemNo')}}</th>
						<td width="32%"><input type="number" id="itemNo"
							:value="item.id" required="required" readonly/></td>
						<th width="18%" >{{$t('dynamic.itemView.itemName')}}</th>
						<td width="32%"><input type="text" id="itemName"
							v-model="item.name" required="required" /></td>
					</tr>
					<tr>
						<th width="18%">{{$t('dynamic.itemView.releaseDate')}}</th>
						<!-- datetime-local
						  ${#temporals.format(customer.date,'yyyy-MM-dd HH:mm')}-->
                        <td width="32%" v-if="item.releaseDate">
                            <input type="date" id="releaseDate"
							:value="item.releaseDate.join('-')" /></td>

						<th width="18%" >{{$t('dynamic.itemView.testDateTime')}}</th>
						<td width="32%" v-if="item.testDateTime"><input type="datetime-local" id="testDateTime"
							:value="getTestDateTime" /></td>
					</tr>

				</table>
				<br />
				<table id="appTable" class="tb-vertical" style="width: 95%"
					align="center" border="2">
					<thead>
						<tr>
							<th>{{$t('dynamic.itemView.attribute')}}</th>
							<th>{{$t('dynamic.itemView.value')}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="itemIba in item.itemIbas" :key="itemIba.id">
							<td>
								<input type="text" readonly="readonly"
								  name="attrDisp" 
                                :value="itemIba.ibaDef.attrDisplay"/>
                            </td>
							<td><input type="text" name="attrValue"
                                v-model="itemIba.attrValue"
                                required="required" />
                            </td>
						</tr>
					</tbody>
				</table>
				<br />
				<div align="center">
					<input type="submit"  class="normalButton" /> &nbsp; <input
						type="button" :value="$t('dynamic.itemView.back')" class="normalButton"
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

export default{
    name:'ItemEdit',
    data:function(){
       return {
           item:{}
       };
    },computed:{
       getTestDateTime(){
          let testTime = this.item.testDateTime;
          let month = this.getComplementedTimePart(testTime[1]);
          let day = this.getComplementedTimePart(testTime[2]);
          let hour = this.getComplementedTimePart(testTime[3]);
          let min = this.getComplementedTimePart(testTime[4]);
          return testTime[0]+"-"+month+"-"+day+ "T"+hour+":"+min;
       }
    },
    created:function(){
        console.log('The item id is: ' + this.$route.params.itemId);
        HTTP.get("/itemview/"+this.$route.params.itemId+"/").then(response=>{
           if(response.data.errorCode=='00'){
               this.item = response.data.item;
               console.log(this.item);
           }else{
               alert('Error!');
           }
        }).catch(error=>{
           console.log(error);
        });
    },methods:{
        getComplementedTimePart(timePart){
           if(timePart>10){
               return timePart;
           }else{
               return "0"+timePart;
           }
        },
        doSubmit(event){
            if(this.$refs.saveForm.checkValidity()){
               this.item.releaseDate = $('#releaseDate').val();
               this.item.testDateTime = $('#testDateTime').val();
               console.log(this.item); 
               HTTP.post("itemsave/",this.item).then(response=>{
                 if(response.data.errorCode=='00'){
                    alert('更新成功');
                    location.reload(true);
                 }else{
                     alert('Error');
                 }
              }).catch(error=>{
                console.log(error);
              });
               event.preventDefault();
            }    
        }
    }
}

</script>