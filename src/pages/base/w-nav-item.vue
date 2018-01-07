<template>
<el-submenu v-if="menu.children && menu.children.length > 0" :index="String(menu.id)">
    <template slot="title">
        <span>{{menu.display}}</span>
    </template>
    <w-nav-item v-for="m in menu.children" :key="m.id" :menu="m"></w-nav-item>
</el-submenu>
<el-menu-item v-else :route="{path: menu.path || '/'}" :index="String(menu.id)">
    <span slot="title">{{menu.display}}</span>
</el-menu-item>
</template>
<script>
export default {
    name: 'wNavItem',
    props: {
        menu: Object
    },
    data() {
        return {};
    }
}
</script>