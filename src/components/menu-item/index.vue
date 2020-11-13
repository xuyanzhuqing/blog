<template>
  <div>
    <el-submenu v-if="data.children && data.children.length" :key="data.path" :index="data.path">
      <template slot="title">
          <item :data="data"/>
      </template>
      <treeMemu v-for="item in data.children" :key="item.path" :data="item"></treeMemu>
    </el-submenu>
    <el-menu-item v-else :index="data.path">
        <item :data="data"/>
    </el-menu-item>
  </div>
</template>
<script>
import item from '@/components/menu-item/item.vue';
export default {
    name: 'treeMemu',
    components: { item },
    props: {
        data: {
            required: false,
            type: Object,
            default: () => []
        }
    }
};
</script>
