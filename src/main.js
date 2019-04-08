import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {store} from "./store/store.js";
import i18n from './components/i18n';
import MenuComponent from './components/MenuComponent.vue';
import moment from 'moment-timezone';
import VueMoment from 'vue-moment';
import DatatableFactory from 'vuejs-datatable';
import BootstrapVue from 'bootstrap-vue';
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import $ from 'jquery';
import Vuetify from 'vuetify';
import VueClipboard from 'vue-clipboard2';
//import CKEditor from '@ckeditor/ckeditor5-vue';
import Mock from './mock/mock'
console.log(console.log(process.env.NODE_ENV));
if(process.env.NODE_ENV === "development"){
  Mock.init();
}


Vue.use(Vuetify, {
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
});

fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);

Vue.component('font-awesome-icon', FontAwesomeIcon);
//Vue.use( CKEditor );

Vue.component('MenuComponent', MenuComponent);
Vue.config.productionTip = false;
Vue.use(DatatableFactory);
Vue.use(BootstrapVue);
Vue.use(VueMoment, {
  moment,
},
);
Vue.use(VueClipboard);


export const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created(){
    this.$store.dispatch('loadUserInfo');
  }
}).$mount("#app");
window['vue'] = app;

import 'vuetify/dist/vuetify.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
