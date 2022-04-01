<!--  -->
<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="" />
      <span v-if="!isCollapsed" class="title">物资后台管理系统</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      :isCollapsed="isCollapsed"
      class="el-menu-vertical"
      background-color="#0c2135"
      :unique-opened="true"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in useMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type == 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type == 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '@/store'
import { pathToMenu } from '@/util/map-menu'
export default defineComponent({
  props: {
    isCollapsed: {
      type: Boolean
    }
  },
  components: {},
  setup(props) {
    //store
    const store = userStore()
    const useMenus = computed(() => store.state.login.userMenus)

    //router
    const router = useRouter()
    const curRoute = useRoute()
    const currentPath = curRoute.path

    //data
    const menu = pathToMenu(useMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')

    //handle
    const handleMenuItemClick = (item: any) => {
      console.log('--------')
      console.log(item)

      console.log('菜单栏左边菜单', useMenus, currentPath)
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      useMenus,
      defaultValue,
      handleMenuItemClick
    }
  }
})
</script>
<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
