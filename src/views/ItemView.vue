<template>

<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
		    <H2>{{$t('dynamic.itemView.itemView')}}</H2>
			<br />
			<table class="tb-horizontal" style="width: 95%" align="center">
				<tr>
					<th width="18%" >{{$t('dynamic.itemView.itemNo')}}</th>
					<td width="32%" >{{item.itemNo}}</td>
					<th width="18%" >{{$t('dynamic.itemView.itemName')}}</th>
					<td width="32%" >{{item.name}}</td>
				</tr>
				<tr>
					<th width="18%" >{{$t('dynamic.itemView.releaseDate')}}</th>
					<!-- datetime-local
						  ${#temporals.format(customer.date,'yyyy-MM-dd HH:mm')}-->
					<td width="32%" >{{item.oldFormatReleaseDate | moment('YYYY/MM/DD')}}</td>
					<th width="18%" >{{$t('dynamic.itemView.testDateTime')}}</th>
                    <template v-if="item.testDateTime">
					<td width="32%">{{item.testDateTime | moment('YYYY/MM/DD HH:MM:SS')}}</td>
                    </template>
                    <template v-if="!item.testDateTime">
                        <td width="32%"></td>
                    </template>    
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
					<tr th:each="itemIba : ${item.itemIbas}" v-for="itemIba in item.itemIbas" :key="itemIba.id">
						<td>{{itemIba.ibaDef.attrDisplay}}</td>
						<td>{{itemIba.attrValue}}</td>
					</tr>
				</tbody>
			</table>
			<br />
			<div align="center">
				<input type="button" :value="$t('dynamic.itemView.back')" class="normalButton"
					onclick="history.back()" />
			</div>
		</div>
	</div>
</div>

</template>

<script>
import {HTTP} from '../axios.js';

export default{
    name:'ItemView',
    data:function(){
       return {
           item:{}
       };
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
    }
}

</script>