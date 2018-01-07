import ElementUI from "element-ui";

const loadingService = ElementUI.Loading;

export default {
    state: {
        loadingCount: 0,
        loading: null
    },
    mutations: {
        mask(state) {
            state.loadingCount++;
            if (state.loadingCount == 1) {
                state.loading = loadingService.service({
                    fullscreen: true,
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            }
        },
        unMask(state) {
            state.loadingCount--;
            if (state.loadingCount == 0) {
                state.loading.close();
                state.loading = null;
            }
        }
    },
    actions: {
        show(ctx) {
            ctx.commit('mask');
        },
        hide(ctx) {
            ctx.commit('unMask');
        }
    }
}