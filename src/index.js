import Vue from "vue";
import VueResource from "vue-resource";
import router from "./router/router";

Vue.use(VueResource);

new Vue({
    el: '#myApp',
    router
});