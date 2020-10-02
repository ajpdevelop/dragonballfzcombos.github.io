import Vue from 'vue/dist/vue';

Vue.config.productionTip = false

import createStore from "./db/store";
const store = createStore();

import App from './App.vue'


global.VueApp = new Vue({
    render: h => h(App),
    store
}).$mount('#app')
