<template>
 <div>
 <MenuComponent/>
 <div id="body" class="ui-layout-center">
		<div class="content">
             <h1>{{$t('queryWorkList.workList')}}</h1>
              <!-- <div class="row">
                 <div class="col-xs-6 form-inline">
                    <div class="form-group">
                      <input type="button" value="Excel" @click="exportWorkItemListExcel"/>
                      <label for="filter" class="sr-only">Filter</label>
                      <input type="text" class="form-control" v-model="search" placeholder="Filter">
                      <label>每頁顯示</label>
                      <input type="text" class="form-control" v-model="per_page" placeholder="10">項結果
                     </div>
                  </div>
              </div>
             <div class="row">
             <div id="table" class="col-xs-6 table-responsive" style="border:1px solid">
                 <datatable :columns="columns" :data="workItemList" :filter-by="search"></datatable>
             </div>
             </div>
             
             <div class="row">
              <div class="col-xs-6 form-inline">
                  <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
              </div>
             </div> -->
             <!-- <input type="button" value="Excel" @click="exportWorkItemListExcel" style="float:left"/>
             <br/>
             <br/> -->
             <v-btn small color="blue"  @click="exportWorkItemListExcel" style="float:left">Excel</v-btn>
             <br/>
             <br/>
             <v-text-field
               v-model="search"
               append-icon="search"
               label="Search"
               single-line
               hide-details
               ></v-text-field>
             <v-data-table
               :headers="headers"
               :items="workItemList"
               :search="search"
               class="elevation-1"
              >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.taskname }}</td>
                <td class="text-xs-center">{{ props.item.docNumber }}</td>
                <td class="text-xs-center">{{ props.item.docName }}</td>
                <td class="text-xs-center">{{ props.item.taskOwner.name }}</td>
                <td class="text-xs-center">{{ props.item.taskStartTime | moment('YYYY/MM/DD HH:MM:ss')}}</td>
              </template>
             </v-data-table>
		</div>
 </div>               
 </div>       
</template>
<script>
import {HTTP} from '../axios.js';
import moment from 'moment-timezone';
import {ExcelDownloader} from '../downloadExcel.js';

export default{
    name:'WorkItemList',
    data:function(){
        return {
          workItemList:[],
          search:'',
          pagination: {},
           columns: [
            { label: this.$t('queryWorkList.taskName'), field: 'taskname', align: 'center', filterable: false },
            { label: this.$t('queryWorkList.documentNo'), field: 'docNumber',align: 'center' },
            { label: this.$t('queryWorkList.docName'), field: 'docName',align: 'center' },
            { label: this.$t('queryWorkList.taskOwner'), field: 'taskOwner.name', align: 'center', sortable: true },
            { label: this.$t('queryWorkList.startTime'), representedAs: function (row) {
                 return moment(row.taskStartTime).format('YYYY-MM-DD HH:MM:ss');
                }, align: 'center', sortable: true }
          ],
           left:true,
           page: 1,
           per_page: 10,
           headers: [
           {
              text: this.$t('queryWorkList.taskName'),
              value: 'taskname',
              align:'center'
           },
           { 
              text:  this.$t('queryWorkList.documentNo'), 
              value:'docNumber',
              align:'center' 
           },
           {  
              text: this.$t('queryWorkList.docName'), 
              value:'docName',
              align:'center' 
           },
           { 
              text: this.$t('queryWorkList.taskOwner'), 
              value:'taskOwner.name',
              align:'center'  
           },
           { 
              text:  this.$t('queryWorkList.startTime'), 
             value:'taskStartTime',
             align:'center' 
           }
         ],
        };
    },
    created:function(){
      this.queryWorkItemList(); 
    },methods:{
        queryWorkItemList(){
            HTTP.get("/queryWorkItemList").then(response=>{
                this.workItemList = response.data.workItemList;
                console.log(JSON.stringify(this.workItemList));
            }).catch(error=>{
              console.log(error);
            });
        },
        exportWorkItemListExcel: function(){
           let downloader = new ExcelDownloader();
           downloader.download('/exportWorkItemListExcel');
        }
    }
}

</script>

<style scoped>
h1{
    text-align: left
}

</style>
