<template>
<div>
<MenuComponent/>
 <div id="body" class="ui-layout-center">
			<br/>
			<table  class="tb-vertical" style="width: 95%" align="center" border="2">
				<thead>
					<tr>
						<th width="10%">{{$t('messages.id')}}</th>
						<th width="40%">{{$t('messages.name')}}</th>
						<th width="25%">{{$t('messages.email')}}</th>
						<th width="25%">{{$t('messages.date')}}</th>
					</tr>
				</thead>
				<tbody>
					<tr  v-for="customer in loadCustomers" :key="customer.id" >
						<td>{{customer.id}}</td>
						<td>{{customer.name}}</td>
						<td>{{customer.email}}</td>
                        <td>{{customer.date}}</td>
					</tr>
				</tbody>
			</table>
	</div>
 </div>       
</template>
<script>
export default{
    name:'QueryCustomer',
    created(){
     this.$store.dispatch('findCustomers')
    },
    computed:{
        loadCustomers(){
            return this.$store.getters.getCustomers;
        },
        
    },methods:{
       getCustomerDate(customerDate){
            let targetDate = customerDate.date;
            let targetTime = customerDate.time;
            let result = new Date(targetDate.year,targetDate.month,targetDate.day,targetTime.hour,targetTime.minute);
            return result;
        }
    } 
}
</script>