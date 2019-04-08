<template>
<div id="header" class="ui-layout-north">
			<ul class="menu">
				<li class="ui-state-enabled has-child-menu" id="queryParentMenu"><a href="#">{{$t('menu.inquiry')}}</a>
					<ul class="sub-menu">
						<li class="ui-state-enabled">
							<a rel="queryCustomer" @click="queryCustomer">{{$t('menu.customer')}}</a>
						</li>
						<li class="ui-state-enabled">
							<a @click="customerDataTableClient">
								Customer Data Table-Client
							</a>
						</li>
						<li class="ui-state-enabled">
							<a @click="customerDataTableServer">
								Customer Data Table-Server
							</a>
						</li>
						<li class="ui-state-enabled">
							<a>Maker</a>
						</li>
						<li class="ui-state-enabled">
							<a @click="queryDocument">Query Docuement</a>
						</li>
					</ul>
				</li>

				<li class="ui-state-enabled has-child-menu"><a href="#">{{$t('menu.file')}}</a>
					<ul class="sub-menu">
						<li class="ui-state-enabled">
							<a @click="uploadFile">UploadFile</a>
						</li>
						<li class="ui-state-enabled">
							<a @click="downloadFile">Download File</a>
						</li>
					</ul></li>

				<li class="ui-state-enabled has-child-menu"><a href="#">{{$t('menu.ajax')}}</a>
					<ul class="sub-menu">
						<li class="ui-state-enabled">
							<a @click="ajaxSearch">Search User Role</a>
						</li>
						<li class="ui-state-enabled">
							<a>Ajax Upload File</a>
						</li>
						<li class="ui-state-enabled">
							<a @click="country">Country</a>
						</li>
						<li class="ui-state-enabled">
							<a @click="countryFragment">Country Fragement</a>
						</li>
					</ul></li>

				<li class="ui-state-enabled has-child-menu"><a href="#">{{$t('menu.dynamicForm')}}</a>
					<ul class="sub-menu">
						<li class="ui-state-enabled">
							<a @click="itemQuery">Item Maintain</a>
						</li>
						<li class="ui-state-enabled">
							<a @click="courseQuery">Course Maintain</a>
						</li>
					</ul></li>

				<li class="ui-state-enabled has-child-menu"><a href="#">{{$t('menu.chart')}}</a>
					<ul class="sub-menu">
						<li class="ui-state-enabled">
							<a @click="chartJs">Chart JS</a>
							<ul class="sub-menu">
								<li class="ui-state-enabled">
									<a href="#" id="line" @click="viewLineChart">Line Chart</a>
								</li>
								<li class="ui-state-enabled">
									<a href="#" id="bar" @click="chartJs">Bar Chart</a></li>
								<li class="ui-state-enabled">
									<a href="#" id="refreshCharts" @click="chartJs">Refresh</a>
								</li>
							</ul></li>
					</ul></li>
				<li class="ui-state-enabled has-child-menu"><a href="#">Rest</a>
					<ul class="sub-menu">
						<li class="ui-state-enabled"><a @click="restCustomer">Call Customer</a></li>
						<li class="ui-state-enabled"><a @click="restDownload">Call Download</a></li>
						<li class="ui-state-enabled"><a @click="restUpload">Call Upload</a></li>
						<li class="ui-state-enabled"><a @click="restMultiUpload">Call Multiple Upload</a></li>
					</ul></li>

				<li class="ui-state-enabled has-child-menu">
					<a href="#">表單</a>
					<ul class="sub-menu">
						<li class="ui-state-enabled">
							<a @click="createSampleForm">
								Create Sample Form
							</a>
						</li>
						<li class="ui-state-enabled">
							<a @click="querySampleForm">
								Query Sample Form
							</a>
						</li>
						<li class="ui-state-enabled">
							<a @click="workItemList"> Work List</a>
						</li>
					</ul>
				</li>			
			
					<li class="ui-state-enabled has-child-menu">
						<a href="#">{{$t('menu.admin')}}</a>
						<ul class="sub-menu">
							<li class="ui-state-enabled">
								<a @click="adminBulletin">{{$t('menu.bulletin')}}</a>
							</li>
						</ul>
					</li>

				<!-- Customization menu END -->
				<li class="logout"><a  @click="logout()">
					<span>{{$t('head.logout')}}</span> <!--Roles: <span sec:authentication="principal.authorities"></span>--></a>
				</li>

				<li class="language has-child-menu"><a href="#"><span>{{$t('language')}}</span></a>
				<ul class="sub-menu">
					<li><a @click="switchLang('tw')"><span>{{$t('Chinese')}}</span></a></li>
					<li><a @click="switchLang('en')"><span>{{$t('English')}}</span></a></li>
				</ul>
				</li>
				
				<li class="welcome has-child-menu">
					<a href="#"><span id="userName">{{$store.getters.getUserInfo.name}}</span></a>
					<ul class="sub-menu">
						<li>
							<!-- <span th:text="#{head.sysVersion} + ' ' + ${systemVersion}">systemVersion</span> -->
							<span>systemVersion</span>
						</li>
						<li><small>{{getUserAgentInfo}}
							</small></li>
					</ul>
				</li>				
			</ul>

			<a class="logo" title="logo"></a>
			<h1 class="title customTitle">{{$t('systemName')}}</h1>
		</div>
</template>

<script>
import axios from 'axios';
import {HTTP} from '../axios.js';

export default {
  name: 'MenuComponent',
  data:function(){
	 return {
	    userAgentInfo:''
	  };	  
   },
   computed:{
      getUserAgentInfo(){
		var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
          tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
          return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
           tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
           if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
         M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
         if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
         return M.join(' ');
	 }
   }, methods:{
    switchLang2: function(lang){
		this.$store.dispatch('setLang', lang);
	},switchLang: function(lang){
      if (lang in vue.$i18n.messages) {
		    this.$i18n.locale = lang;
			//this.$emit('switchLang');
			this.$emit('switchLang',true);
      } else {
        this.loadLocaleMessage(lang, (err, message) => {
        if (err) {
          console.error(err)
          return
        }
          i18n.setLocaleMessage(lang, message)
          this.$i18n.locale = lang
        })
      }
    },
	 loadLocaleMessage: function(locale, cb) {
      console.log('locale', locale);
      return fetch(`./src/lang/${locale}.json` , {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        return res.json();
      }).then((json) => {
        if (Object.keys(json).length === 0) {
          return Promise.reject(new Error('locale empty !!'))
        } else {
          return Promise.resolve(json)
        }
      }).then((message) => {
        cb(null, message)
      }).catch((error) => {
        cb(error)
      });
    },logout(){
		    HTTP.post('logout')
        .then(function (response) {
		    var result = response.data;
		    if(result.errorCode=='00'){
			  window.location.replace("http://jnwmsts01.cminl.oa/InxSSO/Logout.aspx");
		    }
         })
         .catch(function (error) {
            console.log(error);
         });
	  }, queryCustomer(){
		  this.$router.push({name:'QueryCustomer'});
	  }, customerDataTableClient(){
		  this.$router.push({name:'CustomerDataTableClient'});  
	  }, customerDataTableServer(){
		  this.$router.push({name:'CustomerDataTableServer'});  
	  }, queryDocument(){
		  this.$router.push({name:'QueryDocument'});
	  },uploadFile(){
		  this.$router.push({name:'UploadFile'});
	  },downloadFile(){
		  this.$router.push({name:'DownloadFile'});
	  }, ajaxSearch(){
		  this.$router.push({name:'AjaxSearch'});
	  }, country(){
		  this.$router.push({name:'Country'});
	  }, countryFragment(){
		  this.$router.push({name:'CountryFragment'});
	  }, itemQuery(){
		 this.$router.push({name:'ItemQuery'}); 
	  }, courseQuery(){
		 this.$router.push({name:'CourseQuery'}); 
	  }, chartJs(){
		 this.$router.push({name:'ChartJs'}); 
	  }, viewLineChart(){
		  this.$router.push({name:'ViewLineChart'}); 
	  }, restCustomer(){
		  this.$router.push({name:'RestCustomer'}); 
	  }, restDownload(){
		  this.$router.push({name:'RestDownload'}); 
	  },  restUpload(){
		  this.$router.push({name:'RestUpload'}); 
	  }, restMultiUpload(){
		  this.$router.push({name:'RestMultiUpload'}); 
	  }, createSampleForm(){
		  this.$router.push({name:'CreateSampleForm'}); 
	  }, querySampleForm(){
		  this.$router.push({name:'QuerySampleForm'}); 
	  }, workItemList(){
		  this.$router.push({name:'WorkItemList'}); 
	  },adminBulletin(){
		  this.$router.push({name:'AdminBulletin'}); 
	  }
  }
}
</script>

<style scoped>
	

  @import '../assets/css/biz-template/styles/biz.style.css';
  /* @import '../assets/css/biz-template/styles/biz.menu.css'; */
  @import '../assets/css/biz-template/styles/biz.layout.css';
 
  .customTitle{
	  font-size: 36px !important;
	  left: 10% !important;
	  top:30px !important;
	  font-family: Verdana, Arial, Helvetica, sans-serif !important;  
  }
	
  .ui-layout-north ul.menu
 {
    position: absolute;
    left: 0px;
    width: 100%;
    line-height: 26px;
    background: url(../assets/css/biz-template/images/layout/nav.png) repeat-x 0 0;
    border-top: solid 1px #808080;
    border-bottom: solid 1px #808080;
    border-left: none;
    border-right: none;
    padding: 0;
    font-size: 11px;
    -webkit-box-shadow: #AAA 0 0 8px;
    -moz-box-shadow: #AAA 0 0 8px;
    box-shadow: #AAA 0 0 8px;
    margin-left: 0px;
    overflow: visible;
}

.ui-layout-north ul.menu:after {
    content:'';
    display:block;
    clear: both;
}

.ui-layout-north ul.menu a, .ui-layout-west ul.menu a
{
    color: #000;
    text-decoration: none;
    line-height: 26px;
    display: block;
}

.ui-layout-north ul.menu > li 
{
    float: left;
    padding: 0 1em;
    border-right: 1px solid #CCC;
}

.ui-layout-north ul.menu > li:hover
{
    background: url(../assets/css/biz-template/images/layout/nav_hover.png) repeat-x 0 0;
}

.ui-layout-north ul.menu > li.has-child-menu > a
{
    padding-right: 12px;
    background: url(../assets/css/biz-template/images/layout/nav_hasChild1.png) no-repeat right 12px;
}

.ui-layout-north ul.menu .sub-menu { display: none; zoom: 1; }
 .ui-layout-north ul.menu .sub-menu > li { padding: 0 1em; white-space:nowrap; }
.ui-layout-north ul.menu .sub-menu > li:hover { background: #E8F2FF; }

.ui-layout-north ul.menu .sub-menu
{
    position: absolute;
    border: 1px solid #999;
    margin-left: -13px;
    background: #FFF;
    padding: 3px 0;
    z-index: 2;
}

.ui-layout-north ul.menu .sub-menu > li.has-child-menu > a
{
    padding-right: 12px;
    background: url(../assets/css/biz-template/images/layout/nav_hasChild2.png) no-repeat right center;
}

.ui-layout-north ul.menu .sub-menu .sub-menu
{
    margin: -26px 0 0 0;
    left: 100%;
} 
/********************************************************** 上方選單 Style END ***/

/* 特規: Welcome訊息與登出按鈕 */
.ui-layout-north ul.menu > li.welcome, .ui-layout-north ul.menu > li.language, .ui-layout-north ul.menu > li.logout
{
    float: right;
}

/* 特規: 登出按鈕 */
.ui-layout-north ul.menu > li.logout > a
{
    background: url(../assets/css/biz-template/images/icons/logout.png) no-repeat -2px 6px;
    padding: 0 0 0 16px;
}

.ui-layout-north ul.menu > li.logout > a:hover
{
    background: url(../assets/css/biz-template/images/icons/logout_hover.png) no-repeat -2px 6px;
}

.ui-layout-north ul.menu li:hover .sub-menu { 
		display: block;
}

</style>