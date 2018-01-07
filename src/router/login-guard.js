import Vue from "vue";
import cookie from "../cookies/cookie";

export default function(to, from, next){
    console.log(to.fullPath);
    if(to.fullPath.startsWith('/home') || to.fullPath.startsWith('/home/')) {
        var headers = {
            token: cookie.getToken()
        }
        Vue.http.post('/api/api/user/checklogin', null, {headers: headers}).then(data => {
            if(data.data.data) {
                next();
            } else {
                next({path: '/login', query: { url: to.fullPath }});
            }
        });
    } else {
        next();
    }
}