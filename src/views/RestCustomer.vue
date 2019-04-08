<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
			<form ref="searchForm" id="search-form" action="#" @submit="doSubmit"
				method="post">
				<h1>Call Customer</h1>
				<table class="tb-horizontal" style="width: 100%" align="center">
					<tr>
						<th width="18%">Customer ID</th>
						<td width="32%"><input type="number" id="customerId"
						    v-model="customerId" required="required"/></td>
						<th width="18%"></th>
						<td width="32%"></td>
					</tr>
				</table>
				<br />
				<div align="center">
					<input type="submit" value="Query" class="normalButton" /> &nbsp;
					<input type="button" value="Back" class="normalButton"
						onclick="history.back()" />
					<!--input type="reset" value="Reset" class="normalButton"/-->
				</div>

			</form>

			<br />
			<h2>Query Result</h2>
            <h3>{{customer}}</h3>
		</div>
	</div>
</div>
</template>

<script>
 import {HTTP} from '../axios.js';

export default{
    name:'RestCustomer',
    data:()=>{
        return {
            customerId:'',
            customer:''
        }
    },methods:{
        doSubmit(event){
             if(this.$refs.searchForm.checkValidity()){
                var params = new URLSearchParams();
                params.append('customerId', this.customerId);
                HTTP.post( "CallCustomer/",  params).then(response=>{
                    if(response.data.errorCode == "00"){
                        this.customer = response.data.customer;
                    }else{
                        alert("Error!");
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