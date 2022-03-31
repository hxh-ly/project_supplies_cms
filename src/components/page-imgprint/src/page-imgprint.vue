<!--  -->
<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :width="modelConfig?.modelWidth || '30%'"
      destroy-on-close
      id="onlyDialog"
    >
      <div class="imgDiv">aaaaaaaaaaa</div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {},
  setup(props) {
    const dialogVisible = ref(false)
    return {
      dialogVisible
    }
  }
})
</script>
<style scoped lang="less">
.imgDiv {
  //visibility: hidden;
}
</style>
