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
    created() {
        let self = this;
        self.$http.post('/api/api/menu/list', {
            pager: this.pager
        }).then(data => {
            self.list = data.data.data;
        });

        self.$http.post('/api/api/menu/count').then(data => {
            self.pager.total = data.data.data;
        })
    }
}