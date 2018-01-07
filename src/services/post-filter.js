import Vue from "vue";
import VueResource from "vue-resource";
import ElementUI from "element-ui";

const loadingService = ElementUI.Loading;

export default {
    install: function () {
        Vue.http.interceptors.push((req, next) => {
            var loadingInstance = loadingService.service({
                fullscreen: true,
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            next(res => {
                loadingInstance.close();
            })
        });
    }
}