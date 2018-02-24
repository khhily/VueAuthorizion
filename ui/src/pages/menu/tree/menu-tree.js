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
            fields: [{
                field: 'path',
                display: '路由'
            }, {
                field: 'display',
                display: '显示文字'
            }],
            datas: []
        }
    },
    methods: {
        select(data, node) {
            if (data._id) {
                //if(data.children && data.children.length > 0)
                this.$router.push({
                    name: 'menu-detail',
                    params: {
                        id: data._id,
                    }
                });
            }
        },
        getMenus() {
            this.$http.post('')
        }
    },
    created() {

    }
}