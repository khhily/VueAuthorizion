import Vue from "vue";
import VueResource from "vue-resource";
import router from "./router/router";
import ElementUI from "element-ui";
import store from "./vuex/store";

Vue.use(ElementUI);
Vue.use(VueResource);

import 'element-ui/lib/theme-chalk/index.css'

new Vue({
    el: '#myApp',
    router,
    store
});