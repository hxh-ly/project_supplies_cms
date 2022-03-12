<!--  -->
<template>
  <div class="">
    <div>
      <el-icon size="20"><collection-tag /></el-icon>
      <el-icon size="20"><bell /></el-icon>
      <el-icon size="20"><chat-dot-round /></el-icon>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon size="20"><avatar /></el-icon>

          {{ userName }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick"
              >退出登录</el-dropdown-item
            >
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
/* import { Avatar, Fold, ArrowDown, ChatDotRound, Bell, CollectionTag } from '@element-plus/icons' */
import { useStore } from 'vuex'
import localCache from '@/util/cache'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    /*  ArrowDown,
    Avatar,
    ChatDotRound,
    Bell,
    CollectionTag */
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const handleExitClick = () => {
      localCache.delItem('token')
      router.push('/main')
    }
    const userName = computed(() => store.state.login.userInfo.name)
    return {
      userName,
      handleExitClick
    }
  }
})
</script>
<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
