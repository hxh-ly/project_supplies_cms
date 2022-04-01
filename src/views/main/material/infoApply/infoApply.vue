<!--  -->
<template>
  <div class="borrow-box">
    <div class="form-box">
      <xh-form
        v-bind="modelFormConfigRef"
        v-model="formData"
        @resetFormConfigRef="handleResetValue"
        @sendSave="handleConfirmClick"
        :ruleForm="ruleForm"
        ref="infoApplyFormRef"
      >
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
        file: ''
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
      projectFormItem!.options = store.state.entriesDepartment.map(
        (pItem: any) => ({
          title: pItem.name,
          value: pItem.projectTeamId
        })
      )
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
        type: 2,
        gmtBought: $filters.formatTime(formData.value.gmtBought),
        gmtWarehoused: $filters.formatTime(formData.value.gmtWarehoused)
      }
      console.log(formNeedData)
      infoApplyFormRef.value?.submitForm(
        infoApplyFormRef.value?.elNativeFromRef,
        async () => {
          await normalRequest('/material/input', formNeedData)
          handleResetValue()
        }
      )
      /*  await infoApplyFormRef.value?.elNativeFromRef.validate(
        (valid: boolean, fields: any) => {
          if (valid) {
            console.log('submit!')
            let sendParams = {
              ...formData.value,
              type: '1',
              gmtBought: $filters.formatTime(formData.value.gmtBought),
              gmtWarehoused: $filters.formatTime(formData.value.gmtWarehoused)
            }
            //console.log(sendParams)
            dgut_setOnApplyForm('/material/input', sendParams)
              .then((res) => {
                if (res.data.success) {
                  handleResetValue()
                  ElMessage({
                    message: '添加物资成功',
                    type: 'success',
                    duration: 500
                  })
                } else {
                  throw new Error('请求失败')
                }
              })
              .catch((err) => {
                console.log(err)
                ElMessage({
                  message: '接口有问题',
                  type: 'error',
                  duration: 500
                })
              })
          } else {
            console.log('error submit!', fields)
          }
        }
      ) */
    }
    onMounted(() => {
      console.log(infoApplyFormRef)
    })
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
