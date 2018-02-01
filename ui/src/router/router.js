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
            component: resolve => require(['../pages/base/home.vue'], resolve),
        }, {
            path: 'menu',
            component: resolve => require(['../pages/menu/tree/menu-tree.vue'], resolve),
            children: [{
                path: 'detail/:id?/:pid?',
                name: 'menu-detail',
                component: resolve => require(['../pages/menu/detail/menu-detail.vue'], resolve),
            }]
        }]
    }, {
        path: '/login',
        component: LoginComponent
    }]
});

router.beforeEach(globalGuard);

export default router;