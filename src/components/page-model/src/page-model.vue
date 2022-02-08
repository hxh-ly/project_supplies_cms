<!--  -->
<template>
  <div class="page-model">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      :before-close="handleClose"
      destroy-on-close
    >
      <xh-form v-bind="modelConfig" v-model="formData"></xh-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import XhForm from '@/base-ui/form'
import { userStore } from '@/store'
/* xhfrom的配置 */
export default defineComponent({
  props: {
    modelConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    XhForm
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    const store = userStore()
    const handleConfirmClick = () => {
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value }
        })
      }
      dialogVisible.value = false
    }
    watch(
      () => props.defaultInfo,
      (newVal) => {
        for (const item of props.modelConfig?.formItem) {
          formData.value[`${item.field}`] = newVal[`${item.field}`]
        }
      }
    )
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>
<style scoped lang="less"></style>
