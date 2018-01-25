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
            //if(data.children && data.children.length > 0)
            this.$store.dispatch('menuTree/setCurrentKey', data);
            this.$router.push({path: '/base/menu/list/' + data._id});
        }
    },
    created() {
        this.$store.dispatch('menuTree/refreshMenus');
    }
}