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
        redirect: '/base'
    }, {
        path: '/base',
        component: BaseComponent,
        children: [{
                name: 'menuList',
                path: 'list',
                component: resolve => require(['../pages/menu/list/menu-list.vue'], resolve)
            }, {
                name: 'menuDetail',
                path: 'detail/:id',
                component: resolve => require(['../pages/menu/detail/menu-detail.vue'], resolve)
            }]
        
    }, {
        path: '/login',
        component: LoginComponent
    }]
});

router.beforeEach(globalGuard);

export default router;