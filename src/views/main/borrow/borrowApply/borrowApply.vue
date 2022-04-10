<!--  -->
<template>
  <div class="borrow-box">
    <div class="form-box">
      <xh-form
        v-bind="modelFormConfigRef"
        v-model="formData"
        @resetFormConfigRef="handleResetValue"
        @delSelect="handleDelSelect"
        @sendSave="handleConfirmClick"
      >
        <template #header>
          <div class="header-title">物资借用</div>
        </template>
        <template #footer>
          <div class="footer-btn" @click="handleConfirmClick">
            <el-button type="primary">确认申请</el-button>
          </div>
        </template>
      </xh-form>
    </div>
    <keep-alive>
      <material-list-dialog
        ref="pageModalRef"
        :allMaterials="allMaterials"
        :modelConfig="dialogConfigRef"
        @addMaterialItem="handleAddMaterial"
      ></material-list-dialog>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  computed,
  reactive,
  getCurrentInstance
} from 'vue'
import { modelFormConfig } from './config/model.config'
import { userStore } from '@/store'
import XhForm from '@/base-ui/form'
import { dgut_setOnApplyForm, dgut_getMaterialListData } from '@/serve/DgutRequest/dgutRequest'
import { normalRequest } from '@/serve/index'
import { ElMessage } from 'element-plus'
import pageModel from '@/components/page-model'
import { contentTableConfig } from './config/content.config'
import { handleWorkRequest } from '@/util/handleRequest'
import materialListDialog from './cmp/materialListDialog.vue'
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
    XhForm,
    pageModel,
    materialListDialog
  },
  setup(props) {
    //0 请求所有的物资数据
    let allMaterials = ref({})
    dgut_getMaterialListData('/material/list', { size: 50, current: 1 }).then((res: any) => {
      allMaterials.value = res.data?.list?.records || []
      //console.log(allMaterials.value);
    })
    //1 全局的日期格式化
    const cns: any = getCurrentInstance()
    const $filters = cns.appContext.config.globalProperties.$filters
    //2 动态添加部门和角色列表
    let formData = ref<any>({})
    const modelFormConfigRef = computed(() => {
      const store = userStore()
      const materialItem = modelFormConfig.formItem.find(
        (item) => item.field === 'materialIdNumberMap'
      )
      materialItem!.downOptions = store.state.entriesMaterial.map((item) => ({
        title: item.name,
        value: item.materialId
      }))
      // console.log('modelFormConfig',modelFormConfig);
      return modelFormConfig
    })
    const dialogConfigRef = computed(() => {
      return contentTableConfig
    })
    const pageModalRef = ref<InstanceType<typeof materialListDialog>>()
    const handleResetValue = () => {
      //在这里弹窗弹窗
      //异步请求所有数据
      if (pageModalRef.value) {
        pageModalRef.value.dialogVisible = true
      }
    }
    const handleDelSelect = (index: number) => {
      formData.value['materialIdNumberMap'].splice(index, 1)
    }
    const handleConfirmClick = () => {
      let obj: any = {}
      let map: any = {}
      obj['gmtStart'] = $filters.formatTime(formData.value['gmtStart'])
      obj['gmtEnd'] = $filters.formatTime(formData.value['gmtEnd'])
      obj['borrowReason'] = formData.value['borrowReason']
      formData.value['materialIdNumberMap'].forEach((item: any) => {
        map[`${item.id}`] = item.num
      })
      obj['materialIdNumberMap'] = map
      handleWorkRequest(
        function () {
          return dgut_setOnApplyForm('/borrowInfo/apply', obj)
        },
        () => {
          obj = null
          formData.value = {}
        }
      )
    }
    const handleAddMaterial = (v: any) => {
      (formData.value['materialIdNumberMap']) || (formData.value['materialIdNumberMap'] = [])
      v.forEach((item: any) => {
        formData.value['materialIdNumberMap'].push({ id: item.materialId, num: 0 })
      })
    }
    return {
      formData,
      handleConfirmClick,
      modelFormConfigRef,
      handleResetValue,
      handleDelSelect,
      //选择弹窗
      pageModalRef,
      //添加
      dialogConfigRef,
      allMaterials,
      handleAddMaterial
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
