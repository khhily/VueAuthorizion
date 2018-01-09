export default {
    data() {
        return {
            model: {},
            rules: {
                display: [{
                    required: true,
                    message: '菜单显示必须填写'
                }]
            },
            loading: false
        }
    },
    methods: {
        getDetail(id) {
            if (id && id > 0) {
                this.$http.post('/api/api/menu/detail', {
                    id
                }, function (data) {
                    this.model = data.data.data;
                });
            }
        },
        save() {
            this.$refs["menuDetailForm"].validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$http.post('/api/api/menu/save', {
                        data: this.model
                    }, function (data) {
                        if (!data.data.trans || !data.data.trans.errorCode) {
                            this.$route.push({
                                name: 'menuList'
                            });
                        }
                    });
                }
            });
        }
    },
    watch: {
        '$route' (to, from) {
            this.getDetail(to.params.id);
        }
    },
    created() {
        this.getDetail(this.$route.params.id);
    }
}