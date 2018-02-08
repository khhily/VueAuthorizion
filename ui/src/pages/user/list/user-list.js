let listjson = require('./user-list.json');
export default {
    name: 'userList',
    data() {
        return {
            list: [],
            condition: {},
            pager: {},
            fields: listjson
        };
    },
    methods: {
        initialBreadcrumb() {
            this.$store.dispatch('breadcrumb/setBreadcrumbs',{
                histories: [{
                    to: { path: '/' },
                    title: '首页'
                }],
                current: {
                    title: '用户列表'
                }
            })
        },
        getList() {
            this.$http.post('/api/user/list', {
                pager: self.pager,
                condition: self.condition
            }).then(function (data) {
                this.list = data.data.data;
            });
        },
        getCount() {
            this.$http.post('/api/user/count', {
                condition: self.condition
            }).then(data => {
                this.pager.total = data.data.data;
            })
        },
        search() {
            this.getList();
            this.getCount();
        }
    },
    created() {
        this.search();
    },
    watch: {
        '$route' (to, from) {
            this.search();
        }
    }
}