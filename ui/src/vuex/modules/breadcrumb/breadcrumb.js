
export default {
    namespaced: true,
    state: {
        histories: [],
        current: {}
    },
    mutations: {
        setBreadcrumbs(state, model) {
            state.histories = model.histories;
            state.current = model.current;
        }
    },
    actions: {
        setBreadcrumbs(ctx, model) {
            ctx.commit('setBreadcrumbs', model);
        }
    }
}