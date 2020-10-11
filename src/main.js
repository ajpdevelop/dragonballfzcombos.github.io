import Vue from 'vue';
import store from "./db/store";
import App from './App.vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.config.productionTip = false

Vue.use(Vuetify);

global.VueApp = new Vue({
    render: h => h(App),
    store,
    vuetify: new Vuetify({
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: "#7c1dff",
                    accent: "#252531",
                    secondary: "#fc03ff",
                    info: "#4a24f5",
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                    purple: "#8e43de",
                }
            }
        },
        options: {
            customProperties: true,
        }
    })
}).$mount('#app')
