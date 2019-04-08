<template>

<div>
 <MenuComponent></MenuComponent>
 <div id="body" class="ui-layout-center">
		<div class="content">
		    <H2>{{$t('dynamic.courseedit.courseEdit')}}</H2>
			<br />
			<form ref="saveForm" id="save-form" action="#" @submit="doSubmit"
				th:object="${course}" method="post">
				<input type="hidden" id="courseId" th:field="*{id}" />
				<table class="tb-horizontal" style="width: 100%" align="center">
					<tr>
						<th width="18%" th:text="#{dynamic.courseedit.courseName}">{{$t('dynamic.courseedit.courseName')}}</th>
						<td width="32%"><input type="text" id="courseName" v-model="course.name" required="required" /></td>
						<th width="18%" th:text="#{dynamic.courseedit.instructor}">{{$t('dynamic.courseedit.instructor')}}</th>
						<td width="32%"><input type="text" id="instructor"	v-model="course.instructor"  required="required" /></td>
					</tr>
					<tr>
						<th width="18%" th:text="#{dynamic.courseedit.location}">{{$t('dynamic.courseedit.location')}}</th>
						<td width="32%"><input type="text" id="location" v-model="course.location" /></td>
						<th width="18%" th:text="#{dynamic.courseedit.hours}">{{$t('dynamic.courseedit.hours')}}</th>
						<td width="32%"><input type="number" id="hours" v-model="course.hours" /></td>
					</tr>

				</table>
				<br />
				<h3>{{$t('dynamic.courseedit.textbooks')}}</h3>
				<div th:fragment="bookFragment" id="bookblock">
					<table id="textbookTable" class="tb-vertical" style="width: 100%" align="center" border="2">
						<thead>
							<tr>
								<th>{{$t('dynamic.courseedit.name')}}</th>
								<th>{{$t('dynamic.courseedit.author')}}</th>
								<th>{{$t('dynamic.courseedit.publisher')}}</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(textbook,index ) in course.textbooks" :key="index">
								<td><input type="hidden" name="bookid" /> 
                                    <input type="text"	name="bookname" v-model="textbook.name" required="required" /></td>
								<td><input type="text" name="author" v-model="textbook.author"  required="required" /></td>
								<td><input type="text" name="publisher"	v-model="textbook.publisher"  required="required" /></td>
								<td><input type="button" name="removeRow" @click="removeRow(index,textbook)" value="Remove" /></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div align="right">
					<input type="button" :value="$t('dynamic.courseedit.addBook')" class="normalButton"
						id="newBookBtn" name="addRow" @click="addRow"/>
				</div>
				<br />
				<div align="center">
					<input type="submit" :value="$t('dynamic.courseedit.save')" class="normalButton" name="save"/> &nbsp;
					<input type="button" :value="$t('dynamic.courseedit.back')" class="normalButton"
						onclick="window.location.href='/dynamic/coursequery'" />
				</div>
			</form>
		</div>
  </div>   
</div>   


</template>
<script>
 import {HTTP} from '../axios.js';

export default{
    name:'courseNew',
    data:function(){
       return {
          course:{}
       }
    },
    created:function(){
        HTTP.get("coursenew/").then(response=>{
           if(response.data.errorCode=='00'){
               this.course = response.data.course;
           }else{
               alert('Error!');
           }
        }).catch(error=>{
            console.log(error);
        });
    },
    methods:{
      doSubmit(event){
          if(this.$refs.saveForm.checkValidity()){
              HTTP.post("saveCourse/",this.course).then(response=>{
                 if(response.data.errorCode=='00'){
                     this.$router.push({name:'CourseQuery'}); 
                 }else{
                     alert('Error');
                 }
              }).catch(error=>{
                console.log(error);
              }); 
              event.preventDefault();
          }    
      },
      removeRow(index, textbook){
          let idx =this.course.textbooks.indexOf(textbook);
          if(idx>-1){
             this.course.textbooks.splice(idx,1);
          }
      },
      addRow(){
        this.course.textbooks.push({
            name:'',
            author:'',
            publisher:''
        });
      }
    }
}

</script>