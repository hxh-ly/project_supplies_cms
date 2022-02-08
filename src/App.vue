<template>
  <div class="app">
    <el-config-provider :locale="zh">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zh from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: String
    }
  },
  setup() {
    return {
      zh
    }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
