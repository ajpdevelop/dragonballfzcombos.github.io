import Vue from 'vue/dist/vue';
import store from "./db/store";
import App from './App.vue'

Vue.config.productionTip = false

global.VueApp = new Vue({
    render: h => h(App),
    store
}).$mount('#app')
