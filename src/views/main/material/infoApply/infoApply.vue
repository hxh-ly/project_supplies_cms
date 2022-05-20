<!--  -->
<template>
  <div class="borrow-box">
    <div class="form-box">
      <xh-form v-bind="modelFormConfigRef" v-model="formData" @resetFormConfigRef="handleResetValue"
        @sendSave="handleConfirmClick" :ruleForm="ruleForm" ref="infoApplyFormRef">
        <template #header>
          <div class="header-title">物资登记</div>
        </template>
        <template #footer>
          <div class="footer-btn" @click="handleConfirmClick">
            <el-button type="primary">确认添加</el-button>
          </div>
        </template>
      </xh-form>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  computed,
  reactive,
  getCurrentInstance,
  toRaw,
  toRefs,
  onMounted
} from 'vue'
import { modelFormConfig } from './config/model.config'
import { userStore } from '@/store'
import XhForm from '@/base-ui/form'
import {
  dgut_setOnApplyForm,
  dgut_requestProjectItem
} from '@/serve/DgutRequest/dgutRequest'
import { normalRequest } from '@/serve/index'
import { ElMessage, ElForm } from 'element-plus'
import { realValFromName } from '@/util/transData'
import { handleWorkRequest } from '@/util/handleRequest'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
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
    //请求项目组

    //1 全局的日期格式化
    const cns: any = getCurrentInstance()
    const $filters = cns.appContext.config.globalProperties.$filters
    const infoApplyFormRef = ref<InstanceType<typeof XhForm>>()
    const createFormData = () => {
      return {
        name: '',
        model: '',
        unitPrice: '',
        gmtBought: null,
        gmtWarehoused: null,
        fixedAssets: null,
        detail: '',
        remark: '',
        projectTeamId: '',
        file: '',
        photo: '',
        upload: ''
      }
    }

    const ruleForm = createFormData()
    //2 动态添加项目组列表
    let formData = ref<any>(createFormData())
    const modelFormConfigRef = computed(() => {
      const store = userStore()
      let projectFormItem = modelFormConfig.formItem.find(
        (item) => item.field == 'projectTeamId'
      )
      if (projectFormItem && store.state?.entriesDepartment) {
        projectFormItem!.options = store.state.entriesDepartment.map(
          (pItem: any) => ({
            title: pItem.name,
            value: pItem.name,
            realVal: pItem.projectTeamId
          })
        )
      }
      return modelFormConfig
    })
    const handleResetValue = () => {
      const obj: any = createFormData()
      for (let key in obj) {
        formData.value[key] = obj[key]
      }
    }
    const handleConfirmClick = async () => {
      let formNeedData = {
        ...formData.value,
        unitPrice: Number(formData.value.unitPrice),
        //type: 2,
        gmtBought: formData.value.gmtBought
          ? $filters.formatTime(formData.value.gmtBought)
          : $filters.formatTime(new Date()),
        gmtWarehoused: formData.value.gmtWarehoused
          ? $filters.formatTime(formData.value.gmtWarehoused)
          : $filters.formatTime(new Date())
      }
      realValFromName(modelFormConfig, formNeedData)
      // console.log(formNeedData)
      /*  infoApplyFormRef.value?.submitForm(
        infoApplyFormRef.value?.elNativeFromRef,
        handleWorkRequest(()=>normalRequest('/material/input','post', formNeedData),()=>handleResetValue())
      ) */
      handleWorkRequest(
        () => normalRequest('/material/input', 'post', formNeedData),
        () => handleResetValue()
      )
    }
    return {
      infoApplyFormRef,
      formData,
      handleConfirmClick,
      modelFormConfigRef,
      handleResetValue,
      createFormData,
      ruleForm
    }
  }
})
</script>
<style scoped lang="less">
.header-title {
  font-size: 24px;
  font-weight: 600;
  margin: 10px;
}

.borrow-box {
  display: flex;
  justify-content: center;
  width: 70vw;
}

.form-box {
  width: 66%;
}

.footer-btn {
  margin: 16px 0;
}
</style>
