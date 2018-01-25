import Vue from "vue";
import cookie from "../cookies/cookie";
import store from "./../vuex/store";

export default function(to, from, next){
    console.log(to.fullPath);
    if(to.fullPath.startsWith('/base') || to.fullPath.startsWith('/base/')) {
        var headers = {
            token: cookie.getToken()
        }
        store.dispatch('setCurrentRoute', to.fullPath);
        Vue.http.post('/api/api/user/checklogin', null, {headers: headers}).then(data => {
            if(data.data.data) {
                store.dispatch('updateLoginUser', data.data.data);
                next();
            } else {
                next({path: '/login', query: { url: to.fullPath }});
            }
        });
    } else {
        next();
    }
}