<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
	<div class="content">
		<br/>
        <div class="col-md-6">
          <LineChart
            v-if="dataOneLoaded"
            :chartdata="chartDataOne"
            :options="options">
           </LineChart>
        </div> 
        
        <div class="col-md-6">
          <LineChart
            v-if="dataTwoLoaded"
            :chartdata="chartDataTwo"
            :options="options">
          </LineChart> 
        </div>
	</div>
</div>
</div>

</template>
<script>
import LineChart from '@/components/LineChart.vue';
 import {HTTP} from '../axios.js';


export default{
    name:'ViewLineChart',
    components:{ LineChart},
    data: () => ({
      dataOneLoaded: false,
      dataTwoLoaded: false,
      chartDataOne: null,
      chartDataTwo: null,
      options:null
    }),
    mounted(){
      HTTP.get("viewCharts/").then(response=>{
          if(response.data.errorCode=="00"){
              console.log(response.data.chartData);
              this.chartDataOne = {};
              this.chartDataOne.labels = response.data.chartData[0].lables;
              this.chartDataOne.datasets = [];
              this.chartDataOne.datasets.push({label:'TW',backgroundColor: 'rgba(200,0,0,0.5)', data:response.data.chartData[0].datasets[0].value}); 
              this.chartDataOne.datasets.push({label:'CN',backgroundColor: 'rgba(0,0,200,0.5)', data:response.data.chartData[0].datasets[1].value}); 
              this.dataOneLoaded = true;
              this.options= {
		            responsive : true,
		            maintainAspectRatio : false
	            };
              
              console.log(response.data.chartData[1]);
              this.chartDataTwo = {};
              this.chartDataTwo.labels = response.data.chartData[1].lables;
              this.chartDataTwo.datasets = [];
              this.chartDataTwo.datasets.push({label:'My First dataset',backgroundColor: 'rgba(200,0,0,0.5)', data:response.data.chartData[1].datasets[0].value}); 
              this.chartDataTwo.datasets.push({label:'My Second dataset',backgroundColor: 'rgba(0,0,200,0.5)', data:response.data.chartData[1].datasets[1].value}); 
              this.dataTwoLoaded = true;
              
          }else{
              alert("Error!");
          }
      }).catch(error=>{
        console.log(error);
      });
    }
}

</script>