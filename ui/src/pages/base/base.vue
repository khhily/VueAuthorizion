<template src="./base.html">
</template>

<script>
import wNav from "./w-nav";
import homeHeader from "./header";
export default {
    name: 'BaseComponent',
    data() {
        return {
            menus: []
        };
    },
    created() {
        var self = this;
        self.$store.dispatch("show");
        self.$http.post('/api/api/user/menus').then(function(data) {
            console.log(data.data);
            self.menus = data.data.data;
        }).finally(function() {
            self.$store.dispatch("hide");
        });
    },
    components: {
        wNav,
        homeHeader
    }
}
</script>