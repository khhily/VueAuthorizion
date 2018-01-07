<template>
<el-menu>
    <w-nav-item v-for="m in menus" :key="m.id" :menu="m"></w-nav-item>
</el-menu>
</template>

<script>
import wNavItem from "./w-nav-item";
export default {
    name:'wNav',
    props: {
        menus: Array
    },
    components: {
        wNavItem
    }
}
</script>