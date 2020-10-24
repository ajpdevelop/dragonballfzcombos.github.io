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
                    primary: "#272727",
                    secondary: "#FF9900",
                    accent: "#6699FF",
                    darker: "#1E1E1E",
                    test: "#a57eca",
                    test2: "#e8e096",
                    info: "#4a24f5",
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                    cpurple: "#a57eca",
                    cyellow: "#e8e096"
                }
            }
        }
    })
}).$mount('#app')
