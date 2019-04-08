<template>
    
<div>
   <MenuComponent/>
   <div id="body" class="ui-layout-center">
		<div class="content">
		<H2 th:text="#{dynamic.courseMaintain.courseMaintain}">Course Maintain</H2>
		<br/>
         <div class="row">
           <div id="table" class="col-xs-12 table-responsive">
             <datatable :columns="columns" :data="rows" :filter-by="filter"></datatable>
           </div>
          </div>

          <div class="row">
            <div class="col-xs-12 form-inline">
              <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
            </div>
          </div>  
			<br />
			<div align="left">
				<input type="button" :value="$t('dynamic.courseMaintain.new')" class="normalButton"
					@click="courseNew" />
			</div>
		</div>
	</div> 
</div>    

</template>
<script>
   import {HTTP} from '../axios.js';
   import blank from '@/components/blank.vue';
   import CourseDetailLink from '@/components/CourseDetailLink.vue';

   export default {
       name:'courseQuery',
       data:function(){
           return {
              filter: '',
              search:'',
              columns: [
                { label: '', component: CourseDetailLink, headerComponent: blank },
                { label: this.$t('dynamic.courseMaintain.courseName'), field: 'name', align: 'center', filterable: false },
                { label: this.$t('dynamic.courseMaintain.instructor'), field: 'instructor',align: 'center' },
                { label: this.$t('dynamic.courseMaintain.location'), field:'location',align: 'center' },
                { label: this.$t('dynamic.courseMaintain.creator'), field: 'creatorDisplay',align: 'center' }
              ],
              rows:[],
              page: 1,
              per_page: 10,
              pagination: {}
           }
       },
       created: function(){
          HTTP.get("findAllCourse/").then(response=>{
              console.log(response);
              if(response.data.errorCode == '00'){
                 this.rows = response.data.courseList;
              }else{
                  alert('Error!');
              }
          }).catch(error=>{
            console.log(error);
          });
       },methods:{ 
          courseNew(){
             this.$router.push({name:'CourseNew'});  
          }
       }
   }
</script>
