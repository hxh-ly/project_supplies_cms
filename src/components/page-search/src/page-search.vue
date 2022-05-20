<!--  -->
<template>
  <div class="page-search">
    <xh-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <!-- <h1 class="title">检索</h1> -->
      </template>
      <template #footer>
        <div class="right-btn">
          <el-button type="primary" @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleQueryClick">检索</el-button>
        </div>
      </template>
    </xh-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, provide, watch } from 'vue'
import XhForm, { IForm } from '@/base-ui/form'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    XhForm
  },
  //发到user
  emits: ['resetBtnClick', 'queryBtnClick', 'changeQueryInfo'],
  setup(props, { emit }) {
    const originFormData: any = {}
    for (const item of props.searchFormConfig?.formItem ?? []) {
      originFormData[item.field] = ''
    }
    const formData = ref(originFormData)
    //ref侦听得到，需要deep，但是新旧值一样
    watch(
      formData,
      (newVal, oldVal) => {
        emit('changeQueryInfo', newVal)
      },
      { deep: true }
    )

    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = originFormData
      emit('resetBtnClick')
    }
    const handleQueryClick = () => {
      //在这里需要把查询参数传递出去 ，修改就跟着 全局的查询参数
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>
<style scoped lang="less">
.page-search {
  .title {
    color: #409eff;
  }
  .right-btn {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
