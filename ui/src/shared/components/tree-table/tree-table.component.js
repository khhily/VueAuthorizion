export default {
    name: 'tree-table',
    props: {
        data: Array,
        fields: Array,
        parentKey: String,
        idKey: String
    },
    data() {
        return {
            items: []
        };
    },
    methods: {
        initDatas(items, pValue) {
            var subs = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i][this.parentKey] == pValue || (!pValue && !items[i][this.parentKey])) {
                    subs.push(items[i]);
                    var subItems = this.initDatas(items, items[i][this.idKey]);
                    items[i].children = subItems;
                }
            }
            return subs;
        }
    },
    created() {
        if (data) {
            this.items = this.initDatas(data);
        }
    },
    watch: {
        "data" (newVal, oldVal) {
            if(newVal) {
                this.items = this.initDatas(newVal);
            } else {
                this.items = [];
            }
        }
    }
}