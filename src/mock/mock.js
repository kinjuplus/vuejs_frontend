import {HTTP} from '../axios.js';
import MockAdapter from 'axios-mock-adapter';
import { countryList } from './data/country';
import { cityList } from './data/cityList';

export default{
    init(){
        let mock = new MockAdapter(HTTP);
        mock.onGet('/api/getCountries').reply(200,{
            errorCode:"00",
            countryList: countryList
          }
        );

        mock.onGet('/api/getCities').reply(200,{
            errorCode:"00",
            cityList: cityList
          }
        );

        mock.onGet('/api/getUserInfo/').reply(200,{
            errorCode:"00",
            userInfo:{
               name:'baron.su'
            } 
          }
        );

        mock.onPost('/api/saveBulletin').reply(200,{
            errorCode:"00"
          }
        );
    }
}