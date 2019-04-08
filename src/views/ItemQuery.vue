<template>
<div data-app>
<MenuComponent/>
<!-- <div class="row">
    <div class="col-xs-12 form-inline">
        <div class="form-group">
            <input type="button" value="Excel" @click="exportExcel()"/>
            <label for="filter" class="sr-only">Filter</label>
            <input type="text" class="form-control" v-model="filter" placeholder="Filter">
            <label>每頁顯示</label>
            <input type="text" class="form-control" v-model="per_page" placeholder="10">項結果
             <button type="button" @click="doCopy">Copy!</button>
        </div>
    </div>
</div>

<div class="row">
    <div id="table" class="col-xs-12 table-responsive">
        <datatable :columns="columns" :data="loadItemList" :filter-by="filter"></datatable>
    </div>
</div>

<div class="row">
    <div class="col-xs-12 form-inline">
        <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
    </div>
</div> -->
<div align="left">
<v-btn small @click="exportExcel" color="green">Excel</v-btn>   
<v-btn small @click="doCopy" color="green">Copy!</v-btn>   
</div>    
             <v-data-table
               :headers="headers"
               :items="itemList"
               class="elevation-1"
              >
              <template v-slot:items="props">
                <td class="text-xs-center"><a style="color:blue;cursor:pointer" @click="itemView(props.item.id)">檢視</a>&nbsp;&nbsp;<a style="color:blue;cursor:pointer" @click="itemEdit(props.item.id)">編輯</a></td> 
                <td class="text-xs-center">{{ props.item.itemNo }}</td> 
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.oldFormatReleaseDate | moment('YYYY/MM/DD')}}</td>
                <td class="text-xs-center">{{ props.item.creator.displayName}}</td>
              </template>
             </v-data-table>
<div align="left">
	<!-- <input type="button" v-bind:value="$t('itemMaintain.new')" class="normalButton"
		@click="itemNew" /> -->
     <v-btn small @click="itemNew" color="green">{{$t('itemMaintain.new')}}</v-btn>  
</div>
</div>
</template>

<script>
import moment from 'moment-timezone';
import itemDetailLink from '@/components/itemDetailLink.vue';
import blank from '@/components/blank.vue';
import {HTTP} from '../axios.js';
import {ExcelDownloader} from '../downloadExcel.js';

export default{
    name:'ItemQuery',
    data:function(){
       return {  
         filter: '',
         columns: [
            { label: '', component: itemDetailLink, headerComponent: blank },
            { label: this.$t('itemMaintain.itemNo'), field: 'itemNo', align: 'center', filterable: false },
            { label: this.$t('itemMaintain.itemName'), field: 'name',align: 'center' },
            { label: this.$t('itemMaintain.releaseDate'), representedAs: function (row) {
                    let targetDate = row.releaseDate;
                    let result = new Date(targetDate.year,targetDate.month,targetDate.day);
                    return moment(result).format('YYYY-MM-DD');
               },align: 'center' },
             { label: this.$t('itemMaintain.creator'), field: 'creator.name',align: 'center' }
        ],
        headers:[
           {
               text:'',
               value:'id',
               align:'center',
               sortable:false
           },
           {
               text:this.$t('itemMaintain.itemNo'),
               value:'itemNo',
               align:'center'
           },
           {
               text:this.$t('itemMaintain.itemName'),
               value:'name',
               align:'center'
           },
           {
               text:this.$t('itemMaintain.releaseDate'),
               value:'releaseDate',
               align:'center'
           },
           {
               text:this.$t('itemMaintain.creator'),
               value:'creator.displayName',
               align:'center'
           }
        ],
        rows:[],
        page: 1,
        per_page: 10,
        pagination: {},
        itemList:[],
        selected:[],
     }
   },
   created: function(){
       //this.$store.dispatch('findItems');
       this.getItemList();
   },
   computed:{
        // loadItemList(){
        //     return this.$store.getters.getItemList;
        // }
    },
   methods:{
       exportExcel: function(){
           let downloader = new ExcelDownloader();
           downloader.download('/exportItemExcel');
       },
       showAlert:function(){
           console.log(this.selected);
       },
       doCopy:function(){
           var result = '';
           var oTable = document.getElementsByClassName('v-datatable v-table theme--light')[0];
           //gets rows of table
           var rowLength = oTable.rows.length;
           //loops through rows    
          for (var i = 0; i < rowLength; i++){
           //gets cells of current row  
           var oCells = oTable.rows.item(i).cells;
           //gets amount of cells of current row
           var cellLength = oCells.length;
           //loops through each cell in current row
           for(var j = 1; j < cellLength; j++){
              // get your cell info here
              var cellVal = oCells.item(j).innerText;
              if(j < cellLength-1){
                 cellVal = cellVal.replace(/&nbsp;/gi,'')
                result +=cellVal + "\t";
                console.log(" cellVal "+cellVal);
              }else{
                console.log(" cellVal2 "+cellVal);
                result +=cellVal;  
              }
            }
            if(i < rowLength-1){
               console.log("add new line"); 
               result += "\n";
            }
          }
          console.log(result);
          this.$copyText(result).then(function (e) {
          alert('Copied');
        }, function (e) {
          alert('Can not copy')
          console.log(e);
        })
       },
       itemNew(){
            this.$router.push({name:'ItemNew'}); 
       },
       getItemList(){
            HTTP.get("getAllItems/").then(response=>{
             this.itemList = response.data.itemList;
             console.log(this.itemList);
          }).catch(error=>{
             console.log(error);
          });
       },
       itemView(itemId){
             this.$router.push({ path: `/ItemView/`+itemId }); 
        },
        itemEdit(itemId){
             this.$router.push({ path: `/ItemEdit/`+itemId }); 
        }    
   }  
}
</script>
