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
        initialBreadcrumb() {
            this.$store.dispatch('breadcrumb/setBreadcrumbs',{
                histories: [{
                    to: { path: '/' },
                    title: '首页'
                }],
                current: {
                    title: '菜单列表'
                }
            })
        },
        edit: function() {
            var params = {pid: this.condition.pid, id: 0};
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
        this.condition.pid = this.$route.params.id;
        this.initialBreadcrumb();
        this.search();
    },
    watch: {
        '$route' (to, from) {
            this.condition.pid = to.params.id;
            this.initialBreadcrumb();
            this.search();
        }
    }
}