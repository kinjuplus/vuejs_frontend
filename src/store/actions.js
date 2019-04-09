import Vue from 'vue';
import {HTTP} from '../axios';

export const loadUserInfo = ({commit, state}) => {
    HTTP.get('getUserInfo/').then(function (response) {
        var result = response.data;
        if(result.errorCode=='00'){
           commit('setUserInfo', result.userInfo);				 
         }else{
            commit('setUserInfo', 'Error');
        }
    }).catch(function (error) {
        console.log(error);
    }); 	
}; 

export const findCustomers = ({commit, state}) => {
    HTTP.get('getQueryCustomers/').then(function (response) {
        let result = response.data;
        if(result.errorCode=='00'){
           commit('setCustomers', result.customerList);				 
         }else{
           alert("Error!"); 
        }
    }).catch(function (error) {
        console.log(error);
    }); 

};

export const setLang = ({commit}, payload) => {
    commit('setLang',payload);
}; 

export const findItems = ({commit, state}) => {
    HTTP.get("getAllItems/").then(response=>{
        console.log(response);
        let result = response.data;
        if(result.errorCode=='00'){
            commit('setItemList', result.itemList);				 
        }else{
            alert("Error!"); 
        }
     }).catch(error=>{
        consoel.log(error);
     });
}