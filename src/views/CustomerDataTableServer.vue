<template>
<div>
<MenuComponent/>
 <v-text-field label="search" v-model="search"></v-text-field>
 <v-data-table :headers="headers" 
                          :items="customerList" 
                          :pagination.sync="pagination" 
                          :total-items="totalCustomers" 
                          :loading="loading" 
                          class="elevation-4">
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
import {HTTP} from '../axios.js';
import { setTimeout } from 'timers';

export default{
    name:'CustomerDataTableServer',
    data:function(){
        return{
            search: "",
            totalCustomers: 0,
            customerList: [],
            loading: true,
            pagination: {},
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
           ]
        };
    },watch: {
        params: {
            handler() {
               this.getCustomerList();
            },
            deep: true
        }
    },
    created:function(){
       this.getCustomerList();
    }, computed: {
        params(nv) {
            return {
                ...this.pagination,
                query: this.search
            };
        }
    },
     methods: {
       getCustomerList(){
            HTTP.get('getQueryCustomers/').then(response => {
               this.customerList = response.data.customerList;
               this.totalCustomers = response.data.customerList.length;
                const {
                    sortBy,
                    descending,
                    page,
                    rowsPerPage
                } = this.pagination;
                let search = this.search.trim().toLowerCase();

                if (search) {
                    this.customerList = this.customerList.filter(item => {
                        return Object.values(item)
                            .join(",")
                            .toLowerCase()
                            .includes(search);
                    });
                }

                if (this.pagination.sortBy) {
                     this.customerList =  this.customerList.sort((a, b) => {
                        const sortA = a[sortBy];
                        const sortB = b[sortBy];
                        if (descending) {
                            if (sortA < sortB) return 1;
                            if (sortA > sortB) return -1;
                            return 0;
                        } else {
                            if (sortA < sortB) return -1;
                            if (sortA > sortB) return 1;
                            return 0;
                        }
                    });
                }
                if (rowsPerPage > 0) {
                    this.customerList = this.customerList.slice(
                        (page - 1) * rowsPerPage,
                        page * rowsPerPage
                    );
                }
                setTimeout( ()=>{
                  this.loading = false;
                },500 );
           }).catch( error => {
               console.log(error);
            }); 
       }  
    } 
} 


</script>