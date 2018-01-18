<template>
<el-menu :router="true" :unique-opened="true" text-color="#CCCCCC" background-color="#003366" active-text-color="#FFFFFF">
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