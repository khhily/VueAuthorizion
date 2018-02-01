import Vue from "vue";
import Vuex from "vuex";
import globalLoadingModule from "./modules/global-loading";
import menuTree from "./modules/menu/menu-tree";
import breadcrumb from "./modules/breadcrumb/breadcrumb";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        messageHideDelay: 3000,
        loginUser: {},
        currentRoute: '',
    },
    mutations: {
        updateLoginUser(state, user) {
            state.loginUser = user;
        },
        setCurrentRoute(state, path) {
            state.currentRoute = path;
        }
    },
    actions: {
        updateLoginUser(ctx, user) {
            ctx.commit('updateLoginUser', user);
        },
        setCurrentRoute(ctx, path) {
            ctx.commit('setCurrentRoute', path);
        }
    },
    modules: {
        globalLoadingModule,
        menuTree,
        breadcrumb
    }
});