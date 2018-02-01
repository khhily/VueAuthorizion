export default {
    data() {
        return {
            option: {
                label: 'display',
                isLeaf: function (data, node) {
                    return !data.children || data.children.length <= 0;
                },
                disabled: function (data, node) {
                    return data.disabled;
                }
            },
        }
    },
    methods: {
        select(data, node) {
            if (data._id) {
                //if(data.children && data.children.length > 0)
                this.$store.dispatch('menuTree/setCurrentKey', data);
                this.$router.push({
                    name: 'menu-detail',
                    params: {
                        id: data._id,
                    }
                });
            }
        },
        disabled(data, node) {
            return data.disabled;
        }
    },
    created() {
        this.$store.dispatch('menuTree/refreshMenus');
    }
}