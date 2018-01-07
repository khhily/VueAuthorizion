import Vue from "vue";
import Vuex from "vuex";
import globalLoadingModule from "./modules/global-loading";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        messageHideDelay: 3000
    },
    modules: {
        globalLoadingModule
    }
});