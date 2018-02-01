<template>
<el-menu :router="true" :unique-opened="true" text-color="#387ef5" background-color="#ffffff" active-text-color="#fc7e31">
    <w-nav-item v-for="m in menus" :key="m._id" :menu="m"></w-nav-item>
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