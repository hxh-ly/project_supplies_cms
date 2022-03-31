<!--  -->
<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="clickFold"><fold /></el-icon>
    <div class="container">
      <xh-breadcrumb :breadcrumbs="breadcrumbs"></xh-breadcrumb>
      <user-info-vue></user-info-vue>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Fold } from '@element-plus/icons'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import XhBreadcrumb from '@/base-ui/breadcrumb'
import userInfoVue from './user-info.vue'
import { pathMapBreadcrumbs } from '@/util/map-menu'
export default defineComponent({
  emits: ['foldChange'],
  components: {
    Fold,
    XhBreadcrumb,
    userInfoVue
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const store = useStore()

    const clickFold = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const router = useRoute()
      const currentPath = router.path
      //面包屑数据
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      clickFold,
      breadcrumbs
    }
  }
})
</script>
<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .container {
    flex: 1;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
