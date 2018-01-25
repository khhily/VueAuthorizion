import Vue from "vue";
export default {
    namespaced: true,
    state: {
        menus: [],
        currentKey: '',
        currentDisplay: '',
        defaultExpandKeys: []
    },
    mutations: {
        refresh(state, menus) {
            state.menus = menus;
            // if(state.currentKey) {
            //     var keys = [];
            //     keys.push(state.currentKey);
            //     state.defaultExpandKeys = keys;
            // }
        },
        setKey(state, key) {
            state.currentKey = key._id;
            state.currentDisplay = key.display;
        }
    },
    actions: {
        refreshMenus(ctx) {
            Vue.http.post('/api/api/menu/tree').then(data => {
                ctx.commit('refresh', data.data.data);
            });
        },
        setCurrentKey(ctx, key) {
            ctx.commit('setKey', key);
        }
    }
}