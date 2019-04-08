<template>

<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
		<div class="content">
			<H2 th:text="#{dynamic.courseview.courseView}">Course Maintain</H2>
			<br />
			<table class="tb-horizontal" style="width: 95%" align="center">
				<tr>
					<th width="18%">{{$t('dynamic.courseview.courseName')}}</th>
					<td width="32%">{{course.name}}</td>
					<th width="18%">{{$t('dynamic.courseview.instructor')}}</th>
					<td width="32%">{{course.instructor}}</td>
				</tr>
				<tr>
					<th width="18%">{{$t('dynamic.courseview.location')}}</th>
					<td width="32%">{{course.location}}</td>
					<th width="18%">{{$t('dynamic.courseview.hours')}}</th>
					<td width="32%">{{course.hours}}</td>
				</tr>

			</table>
			<br />
			<h3 th:text="#{dynamic.courseview.textbooks}">Textbooks</h3>
			<table id="appTable" class="tb-vertical" style="width: 95%"
				align="center" border="2">
				<thead>
					<tr>
						<th>{{$t('dynamic.courseview.name')}}</th>
						<th>{{$t('dynamic.courseview.author')}}</th>
						<th>{{$t('dynamic.courseview.publisher')}}</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="textbook in course.textbooks">
						<td th:text="${textbook.name}">{{textbook.name}}</td>
						<td th:text="${textbook.author}">{{textbook.author}}</td>
						<td th:text="${textbook.publisher}">{{textbook.publisher}}</td>
					</tr>
				</tbody>
			</table>
			<br />
			<div align="center">
				<input type="button" :value="$t('dynamic.courseview.back')" class="normalButton"
					onclick="history.back()" />
			</div>
		</div>
	</div>
</div>

</template>
<script>
 import {HTTP} from '../axios.js';

export default{
    name:'CourseView',
    data:function(){
       return{
           course:{}
       }
    },
    created:function(){
        console.log('The course id is: ' + this.$route.params.courseId);
        HTTP.get("/courseview/"+this.$route.params.courseId+"/").then(response=>{
           if(response.data.errorCode=='00'){
               this.course = response.data.course;
           }else{
               alert('Error!');
           }
        }).catch(error=>{
           console.log(error);
        });
    }
}

</script>