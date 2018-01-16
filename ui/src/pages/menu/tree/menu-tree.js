export default {
    data() {
        return {
            option: {
                label: 'display',
            },
            isLeaf: function(data, node) {
                return !data.children || data.children.length <= 0;
            }
        }
    },
    methods: {
        select(data, node) {
            if(data.children && data.children.length > 0)
                this.$router.push({path: '/base/menu/list/' + data._id});
        },
        expandMenu(data, node, tree) {
            this.$store.dispatch('menuTree/setCurrentKey', data._id);
        },
        collapseMenu(data, node, tree) {
            this.$store.dispatch('menuTree/setCurrentKey',null);
        }
    },
    created() {
        this.$store.dispatch('menuTree/refreshMenus');
    }
}