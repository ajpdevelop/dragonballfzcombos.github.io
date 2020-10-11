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
            options: {
                customProperties: true,
            },
            themes: {
                dark: {
                    primary: "#444140",
                    secondary: "#FFA987",
                    accent: "#F7EBE8",
                    darker: "#191716",
                    info: "#4a24f5",
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                    purple: "#8e43de",
                }
            }
        }
    })
}).$mount('#app')
