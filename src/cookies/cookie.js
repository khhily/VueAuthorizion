import Vue from "vue";
import VueCookie from "vue-cookie";

Vue.use(VueCookie);

var tokenKey = "token";

export default {
    getCookie(key) {
        return VueCookie.get(key);
    },
    setCookie(key, val) {
        VueCookie.set(key, val, { path: '/', expired: 30 });
    },
    removeCookie(key) {
        VueCookie.set(key, null, { path: '/', expired: -1});
    },
    getToken() {
        return VueCookie.get(tokenKey);
    },
    setToken(val) {
        VueCookie.set(tokenKey, val, {path: '/', expired: 1});
    },
    removeToken() {
        VueCookie.set(tokenKey, null, { path: '/', expired: -1});
    }
}