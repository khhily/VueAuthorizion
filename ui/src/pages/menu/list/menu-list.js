export default {
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
            }
        };
    },
    methods: {
        edit(item) {
            this.$router.push({name: 'menuDetail', params: item._id });
        },
        delete(item) {
            this.$http.post('/api/api/menu/delete', {id: item._id}, function(data) {
                if(!data.data.trans || !data.data.trans.errorCode) {
                    this.search();
                }
            });
        },
        add() {
            this.$router.push({path: '/base/menu-detail/0'});
        },
        search() {
            this.getList();
            this.getCount();
        },
        getList() {
            var self = this;
            this.$http.post('/api/api/menu/list', {pager: self.pager}).then(function(data) {
                self.list = data.data.data;
            });
        },
        getCount() {
            var self = this;
            this.$http.post('/api/api/menu/count').then(function(data){
                self.pager.total = data.data.data;
            });
        },
        pageChanged(page) {
            this.pager.currentPage = page;
            this.getList();
        }
    },
    created() {
        this.search();
    },
    watch: {
        '$route'(to, from) {
            this.search();
        }
    }
}