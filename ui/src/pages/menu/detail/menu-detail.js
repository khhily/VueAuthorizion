export default {
    data() {
        return {
            model: {
                path: '',
                display: '',
                pId: ''
            },
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
            if (id) {
                this.$http.post('/api/api/menu/detail', {
                    id
                }).then(function (data) {
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
                    }).finally(function(){
                        this.loading = false;
                    }).then(function (data) {
                        if (!data.data.trans || !data.data.trans.errorCode) {
                            this.$router.push({
                                name: 'menu-list',
                                params: {
                                    pid: this.model.pid
                                }
                            });
                            this.$store.dispatch('menuTree/refreshMenus');
                        }
                    });
                }
            });
        }
    },
    watch: {
        '$route' (to, from) {
            this.model.pId = to.params.pid || '';
            this.getDetail(to.params.id);
        }
    },
    created() {
        this.model.pId = this.$route.params.pid || '';
        this.getDetail(this.$route.params.id);
    }
}