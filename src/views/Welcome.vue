<template>
  <div id="homePage">
  <MenuComponent/>
  <div id="body" class="ui-layout-center">
			<BR />
			<BR />
			<form method="GET" action="/impersonate" class="form" id="switch-user-form">
                <table class="tb-vertical center" style="width: 90%" align="center">
                <tr>
                    <td>
                    <table border="2" width="90%" class="tb-vertical">
                       
                        <tr>
                            <th width="10%">Switch User</th>
                           
                        </tr>
							<tr>
								<td><label for="usernameField">User name:</label> <input
									type="text" name="username" id="usernameField" /> 
									<input type="button" id="searchEmp" value="search" @click="openSearchWindow"/>
									<input type="submit" value="Switch User" />
								</td>
							</tr>
						</table></td>
                </tr>
            </table>
        </form>
			<table class="tb-vertical center" style="width: 90%" align="center">
				<tr>
					<td>
					<table border="2" width="90%" class="tb-vertical">
						<tr>
							<th colspan="4" th:text="#{welcome.bulletin}">welcome.bulletin</th>
						</tr>
						<tr>
							<th width="10%" th:text="#{welcome.no}">welcome.No</th>
							<th width="40%" th:text="#{welcome.subject}">welcome.Subject</th>
							<th width="25%" th:text="#{welcome.attachment}">welcome.Attachment</th>
							<th width="25%" th:text="#{welcome.issuedDate}">welcome.IssuedDate</th>
						</tr>
						<tr>
							<td>1</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</table></td>
				</tr>
			</table>
		    <BR />
			<BR />
			<BR />
			<BR />

			<table class="tb-vertical" style="width: 90%" align="center">
				<tr>
					<td style="border: none">當您登入本系統時，您明白且同意：本系統下之各項資訊，係屬群創光電股份有限公司之機密資料，嚴禁使用者將其洩漏予任何第三人。All information under this system is
					INNOLUX's confidential information. Upon login of this system, you are bound by the agreement
					herein and agree not to disclose such information to any third parties. </td>
				</tr>
			</table>
		</div>
  </div>	
</template>
 <script>
 export default {
   name: 'Welcome',
   methods:{
	   openSearchWindow(){
		   let routeData = this.$router.resolve({name: 'SearchUser', query: {elementId: "usernameField"}});
           window.open(routeData.href, '_blank','width=1050,height=610,top=0,left=0,resizable=no,scrollbars=yes');
	   }
   }
 }
 </script>
 <style scoped>
 
 table.center {
    margin-left:auto; 
    margin-right:auto;
  }


 </style>
 

