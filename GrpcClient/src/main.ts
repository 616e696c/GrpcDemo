import Vue from 'vue';
import App from './App.vue';
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import SolidGauge from 'highcharts/modules/solid-gauge'
import highchartsMoreInit from "highcharts/highcharts-more";
highchartsMoreInit(Highcharts);
SolidGauge(Highcharts);
import HighchartsBoost from 'highcharts/modules/boost'
HighchartsBoost(Highcharts);

Vue.config.productionTip = true;
Vue.use(HighchartsVue);

new Vue({
    render: h => h(App)
}).$mount('#app');
