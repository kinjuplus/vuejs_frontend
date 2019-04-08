<template>
<div>
<MenuComponent v-on:switchLang="redraw"></MenuComponent>
<!-- <div class="row">
    <div class="col-xs-12 form-inline">
        <div class="form-group">
            <input type="button" value="Excel" @click="exportExcel()"/>
            <label for="filter" class="sr-only">Filter</label>
            <input type="text" class="form-control" v-model="filter" placeholder="Filter">
            <label>每頁顯示</label>
            <input type="text" class="form-control" v-model="per_page" placeholder="10">項結果
        </div>
    </div>
</div>

<div class="row">
    <div id="table" class="col-xs-12 table-responsive">
        <datatable :columns="columns" :data="loadCustomers" :filter-by="filter"></datatable>
    </div>
</div>

<div class="row">
    <div class="col-xs-12 form-inline">
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
    </div>
</div> -->
<v-btn small  color="blue"  @click="exportExcel" style="float:left">Excel</v-btn>
             <br/>
             <br/>
             <v-text-field
               v-model="filter"
               append-icon="search"
               label="Search"
               single-line
               hide-details
               ></v-text-field>
             <v-data-table
               :headers="headers"
               :items="customerList"
               :search="filter"
               class="elevation-1"
              >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.id }}</td>
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.email }}</td>
                <td class="text-xs-center">{{ props.item.date | moment('YYYY/MM/DD HH:MM:ss')}}</td>
              </template>
             </v-data-table>
</div>
</template>
<script>

import moment from 'moment-timezone';
import {HTTP} from '../axios.js';
import {ExcelDownloader} from '../downloadExcel.js';

 export default{
    name: 'CustomerDataTableClient',
    data: function(){
	 return {
        filter: '',
        customerList:[],
        headers:[          
           {
              text: this.$t('messages.id'),
              value: 'id',
              align:'center'
           },
           {
              text: this.$t('messages.name'),
              value: 'name',
              align:'center'
           },
           {
              text: this.$t('messages.email'),
              value: 'email',
              align:'center'
           },
           {
              text: this.$t('messages.date'),
              value: 'date',
              align:'center'
           }
        ],
        columns: [
            { label: this.$t('messages.id'), field: 'id', align: 'center', filterable: false },
            { label: this.$t('messages.name'), field: 'name',align: 'center' },
            { label: this.$t('messages.email'), field: 'email',align: 'center' },
            { label: this.$t('messages.date'), representedAs: function (row) {
                 return row.date;
                }, align: 'center', sortable: true }
        ],
        rows:[],
        page: 1,
        per_page: 10  
	  };	  
   },
    created:function(){
      //this.$store.dispatch('findCustomers');
      this.getCustomers();
    },
    methods:{
        exportExcel: function(){
           let downloader = new ExcelDownloader();
           downloader.download('/exportCustomerExcel');
        },
        redraw(){
             console.log("force update vvv");
             this.$forceUpdate();
             this.getCustomers();
        },
        getCustomers:function(){
           HTTP.get('getQueryCustomers/').then(response => {
               this.customerList = response.data.customerList;
           }).catch( error => {
               console.log(error);
            }); 
        }
   }
 }

</script>
<style>
  @import '../assets/css/bootstrap.min.css'
</style>
