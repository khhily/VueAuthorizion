import Vue from "vue";
import VueRouter from "vue-router";
import globalGuard from "./login-guard";
import LoginComponent from "../pages/login/login.vue";
import BaseComponent from "../pages/base/base.vue";

Vue.use(VueRouter);

var router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/base/home'
    }, {
        path: '/base',
        component: BaseComponent,
        children: [{
            path: '',
            redirect: 'home'
        }, {
            path: 'home',
            component: () => import (/* webpackChunkName:'home'*/ '../pages/base/home.vue'),
        }, {
            path: 'menu',
            component: () => import (/* webpackChunkName:'menu'*/ '../pages/menu/tree/menu-tree.vue'),
            children: [{
                path: 'detail/:id?/:pid?',
                name: 'menu-detail',
                component: () => import (/* webpackChunkName:'menu'*/ '../pages/menu/detail/menu-detail.vue'),
            }]
        }]
    }, {
        path: '/login',
        component: LoginComponent
    }]
});

router.beforeEach(globalGuard);

export default router;