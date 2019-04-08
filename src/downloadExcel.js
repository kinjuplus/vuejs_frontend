
import {HTTP} from './axios.js';

export class ExcelDownloader{
    download(apiUrl) {
        HTTP.get(apiUrl,{responseType: 'blob'})
        .then(function (response) {
		    const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'file.xlsx');
             document.body.appendChild(link);
             link.click();
         })
         .catch(function (error) {
            console.log(error);
         });
    }
};