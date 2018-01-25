<template>
<el-submenu v-if="menu.children && menu.children.length > 0" :index="menu._id">
    <template slot="title">
        <span>{{menu.display}}</span>
    </template>
    <w-nav-item v-for="m in menu.children" :key="m._id" :menu="m"></w-nav-item>
</el-submenu>
<el-menu-item v-else :class="{'is-active': (menu.path||'/') == $store.state.currentRoute}" :route="{path: menu.path || '/'}" :index="menu._id">
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