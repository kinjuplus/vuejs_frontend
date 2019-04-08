<template>
	<div id="body" class="ui-layout-center">
		<div class="content">
			<form ref="queryEmpForm" id="queryEmpForm" method="post" v-on:submit="doSubmit" action="#">
				<h1>Query Employee</h1>
				<table class="tb-horizontal" style="width: 100%" align="center">
					<tr>
						<th width="18%">Emp No</th>
						<td width="32%">
							 <input type="text" id="empNo" v-model="empNo" />
						</td>
						<th width="18%">EMAIL</th>
                        <td width="32%">
							<input type="text" id="empId" v-model="empId" />
						</td>
                        <th width="18%">Name</th>
                        <td width="32%">
							<input type="text" id="name" v-model="name" />
						</td>
					</tr>
				</table>
				<br />
				<div align="center">
				    <input type="hidden" :value="this.$route.query.elementId" id="elementId" name="elementId"/> 
				    <!-- <input type="hidden" th:value="${singleSelect}" id="singleSelect" name="singleSelect"/>  -->
					<input type="submit" value="Query" class="normalButton" /> &nbsp;
					<input type="button" value="Back" class="normalButton"
						onclick="history.back()" />
					<!--input type="reset" value="Reset" class="normalButton"/-->
				</div>

			</form>

			<br />
			<h2>Query Result</h2>
			<table class="tb-vertical" style="width: 100%" align="center" id="resultTable">
				<thead>
					<tr>
						<th width="10%">Emp No</th>
						<th width="50%">EMAIL</th>
						<th width="15%">Name</th>
					</tr>
				</thead>
				<tbody>
					
					
					
					<template v-if="userList.length>0">
                        <tr v-for="user in getUserList" :key="user.empNo">
                            <td> <input type="radio" id="selectedEmpId" :value="user.empId" />
                                    <label>{{user.empNo}}</label> </td>
                                    <td >{{user.empId}}</td>
                            <td>{{user.name}}</td>
                            
                           
                            <!--LocalDate use temporals.format, old Date use date.format-->
                            <!--td th:text="${#temporals.format(customer.date,'yyyy-MM-dd HH:mm')}">date</td-->
                        </tr>
                    </template>
					
					
					<template v-if="userList.length==0">
						<tr>
							<td colspan="5">Not Data Found!</td>
						</tr>
					</template>
				</tbody>
			</table>
			<input type="button" value="OK" class="normalButton"
                        v-on:click="callBackValue();" />
		</div>
	</div>

</template>
<script>
import {HTTP} from '../axios.js';

export default {
    name:'SearchUser',
    data:function(){
       return {
           empNo:'',
           empId:'',
           name:'',
           userList:[]
       }
	},computed:{
        getUserList(){
			return this.userList;
		}
	},
    methods:{
        doSubmit(event){
		  let requestBody = {};
		  requestBody.empNo = this.empNo;
		  requestBody.empId = this.empId;
		  requestBody.name = this.name; 
		  HTTP.post("queryEmp/", requestBody).then(response=>{
			 console.log(response);
			 if(response.data.errorCode="00"){
			  this.userList = response.data.userList;
			 }else{
				 alert("Error!");
			 }
		  }).catch(error=>{
            console.log(error);  
		  });
          event.preventDefault();
		},
		
		callBackValue(){
			var radioValue=document.getElementById('selectedEmpId');
			var elementId = document.getElementById('elementId');
			var obj = window.opener.document.getElementById(elementId.value);
	        if(obj.value==null || obj.value==''){
	    	   obj.value=radioValue.value;
	        }else{
	    	   obj.value+=','+radioValue.value;
	        }
	        window.close();
		}
    }
}

</script>