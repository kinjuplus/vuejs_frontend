import axios from 'axios';

export const  HTTP = axios.create({
  baseURL: '/api/',
  withCredentials: true
});


HTTP.interceptors.response.use(function (response) {
  // Do something with response data
  if(response.data.errorCode && response.data.errorCode !="00"){
    alert("Error!!");
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
