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
    }
}