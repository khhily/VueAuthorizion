import Vue from "vue";
import VueRouter from "vue-router";
import globalGuard from "./login-guard";
import LoginComponent from "../pages/login/login.vue";

Vue.use(VueRouter);

var router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        component: resolve => require(["../pages/base/base.vue"], resolve)
    }, {
        path: '/login',
        component: LoginComponent
    }]
});

router.beforeEach(globalGuard);

export default router;