import {HTTP} from '../axios.js';
import MockAdapter from 'axios-mock-adapter';
import { countryList } from './data/country';
import { cityList } from './data/cityList';
import { customerList } from './data/customerList';
import { documentList } from './data/documentList';
import { itemList } from './data/itemList';
import { item } from './data/itemDefinition';
import { courseList } from './data/courseList';
import { courseDetail } from './data/courseDetail';
import { barChartData } from './data/barChartData';
import { docTypeList } from './data/docTypeList';
import { plantTypeList } from './data/plantTypeList';
import { workItemList } from './data/workItemList';
import { bulletinList } from './data/bulletinList';
import { bulletinDetail } from './data/bulletinDetail';

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
               name:'baron.su',
               extensionNo:'5014-41956',
               empNo:'18022376' 
            } 
          }
        );

        mock.onPost('/api/saveBulletin').reply(200,{
            errorCode:"00"
          }
        );

        mock.onGet('/api/getQueryCustomers/').reply(200,{
            errorCode:"00",
            customerList:customerList 
          }
        );

        mock.onPost('/pdm/doc/querydocument').reply(200,{
          errorCode:"00",
          documentList:documentList
         }
       );

       mock.onGet('/api/getAllItems/').reply(200,{
          errorCode:"00",
          itemList:itemList 
        }
       );

       mock.onPost('/api/itemsave/').reply(200,{
        errorCode:"00"
        }
       );

       mock.onGet('/api/getItemDefinition/').reply(200,{
          errorCode:"00",
          item:item
        }
       );

       mock.onGet('/api/getItemDefinition/').reply(200,{
          errorCode:"00",
          item:item
       }
       );

       mock.onGet('/api/findAllCourse/').reply(200,{
        errorCode:"00",
        courseList:courseList
        }
       );

       mock.onGet(pathVariableRoute('/api/courseview/:courseId/')).reply(200,{
        errorCode:"00",
        course:courseDetail
        }
       );
     
       mock.onGet('/api/viewCharts/').reply(200,{
          errorCode:"00",
          chartData:barChartData
        }
       );
       
       mock.onGet('/api/getAllDocType/').reply(200,{
          errorCode:"00",
          docTypeList:docTypeList
        }
       );

       mock.onGet('/api/getAllPlant/').reply(200,{
          errorCode:"00",
          plantList:plantTypeList
        }
       );

       mock.onPost('/api/sampleFormSubmit').reply(200,{
          errorCode:"00"
        }
       );

       mock.onPost('/api/saveCourse/').reply(200,{
         errorCode:"00"
        }
       );
       
       mock.onGet('/api/queryWorkItemList').reply(200,{
         errorCode:"00",
         workItemList:workItemList
        }
       );
       
       mock.onGet('/api/getBulletinList').reply(200,{
         errorCode:"00",
         bulletinList:bulletinList
       }
       );
      
       mock.onPost('/api/saveBulletin').reply(200,{
          errorCode:"00"
        }
       );
      
       mock.onGet(pathVariableRoute('/api/bulletinView/:bulletinId/')).reply(200,{
          errorCode:"00",
          bulletin:bulletinDetail
        }
       ); 
       
    }

}

function pathVariableRoute(path='') {
  return typeof path === 'string'
   ? new RegExp(path.replace(/:\w+/g, '[^/]+'))
   : path
}
