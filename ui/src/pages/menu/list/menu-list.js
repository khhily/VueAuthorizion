export default {
    name: 'menuList',
    data() {
        return {
            list: [],
            fields: [{
                field: 'path',
                display: '路由'
            }, {
                field: 'display',
                display: '显示文字'
            }],
            pager: {
                currentPage: 1,
                pageSize: 15,
                total: 1
            },
            condition: {
                pid: ''
            },
            loading: false
        };
    },
    methods: {
        edit: function(item) {
            var params = {pid: this.condition.pid};
            if (item) {
                params.id = item._id;
            }
            this.$router.push({
                name: 'menu-detail',
                params: params
            });
        },
        deleteItem: function(item) {
            this.$http.post('/api/api/menu/delete', {
                id: item._id
            }).then(function (data) {
                if (!data.data.trans || !data.data.trans.errorCode) {
                    this.search();
                    this.$store.dispatch('menuTree/refreshMenus');
                }
            });
        },
        search: function() {
            this.getList();
            this.getCount();
        },
        getList: function() {
            var self = this;
            self.loading = true;
            this.$http.post('/api/api/menu/list', {
                pager: self.pager,
                condition: self.condition
            }).finally(function () {
                self.loading = false;
            }).then(function (data) {
                self.list = data.data.data;
            });
        },
        getCount: function() {
            var self = this;
            this.$http.post('/api/api/menu/count').then(function (data) {
                self.pager.total = data.data.data;
            });
        },
        pageChanged: function(page) {
            this.pager.currentPage = page;
            this.getList();
        }
    },
    created() {
        this.condition.pid = this.$route.params.pid;
        this.search();
    },
    watch: {
        '$route' (to, from) {
            this.condition.pid = to.params.pid;
            this.search();
        }
    }
}