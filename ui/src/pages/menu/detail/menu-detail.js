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
        initialBreadcrumb() {
            this.$store.dispatch('breadcrumb/setBreadcrumbs', {
                histories: [{
                    to: {
                        path: '/'
                    },
                    title: '首页'
                }, {
                    to: {
                        name: 'menu-list',
                        params: {
                            pid: this.model.pId
                        }
                    },
                    title: '菜单列表'
                }],
                current: {
                    title: this.$route.params.id ? '编辑菜单' : '新增菜单'
                }
            })
        },
        createSubMenu() {
            this.$router.push({name: 'menu-detail', params: {
                id: 0,
                pid: this.model._id,
            }});
        },
        createSublingMenu() {
            this.$router.push({name: 'menu-detail', params: {
                id: '0',
                pid: this.model.pId || null,
            }});
        },
        getDetail(id) {
            if (id && id != '0') {
                this.$http.post('/api/api/menu/detail', {
                    id
                }).then(function (data) {
                    this.model = data.data.data;
                });
            } else {
                this.model = {
                    pId: this.$route.params.pid || ''
                };
            }
        },
        deleteItem: function(item) {
            this.$http.post('/api/api/menu/delete', {
                id: item._id
            }).then(function (data) {
                if (!data.data.trans || !data.data.trans.errorCode) {
                    this.$router.push({
                        name: 'menu-detail',
                        id: null
                    });
                    this.$store.dispatch('menuTree/refreshMenus');
                }
            });
        },
        save() {
            this.$refs["menuDetailForm"].validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$http.post('/api/api/menu/save', {
                        data: this.model
                    }).finally(function () {
                        this.loading = false;
                    }).then(function (data) {
                        if (!data.data.trans || !data.data.trans.errorCode) {
                            this.$router.push({
                                name: 'menu-detail'
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
            this.initialBreadcrumb();
            this.getDetail(to.params.id);
        }
    },
    created() {
        this.initialBreadcrumb();
        this.getDetail(this.$route.params.id);
    }
}