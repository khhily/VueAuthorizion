import Vue from "vue";
import ElementUI from "element-ui";
import cookie from "../cookies/cookie";

const loadingService = ElementUI.Loading;

export default {
    install: function () {
        Vue.http.interceptors.push((req, next) => {
            var token = cookie.getToken();
            //这里必须用set
            req.headers.set("token", token);
            console.log(token);
            var loadingInstance = loadingService.service({
                fullscreen: true,
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            next(res => {
                loadingInstance.close();
                return res;
            });
        });
    }
}