<!--  -->
<template>
  <div class="xh-form">
    <slot name="header"></slot>
    <el-form
      :label-width="labelWidth"
      :model="modelValue"
      :rules="rules"
      :disabled="isDisable"
      ref="elNativeFromRef"
    >
      <el-row>
        <template v-for="item in formItem" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
              :prop="item.field"
            >
              <template v-if="item.type == 'input' || item.type == 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                  :prop="item.field"
                  :disabled="item.disable"
                ></el-input>
              </template>
              <template v-else-if="item.type == 'numInput'">
                <el-input-number
                  :min="1"
                  :max="999"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                  :disabled="item.disable"
                ></el-input-number>
              </template>
              <template v-else-if="item.type == 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                  style="width: 100%"
                  :prop="item.field"
                  :disabled="item.disable"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >{{ option.title }}</el-option>
                </el-select>
              </template>
              <template v-else-if="item.type == 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                  :disabled="item.disable"
                ></el-date-picker>
              </template>
              <template v-else-if="item.type == 'date'">
                <el-date-picker
                  :model-value="modelValue[`${item.field}`]"
                  type="date"
                  @update:model-value="handleValueChange($event, item.field)"
                  :prop="item.field"
                  :disabled="item.disable"
                />
              </template>
              <template v-else-if="item.type == 'textArea'">
                <el-input
                  :model-value="modelValue[`${item.field}`]"
                  :rows="4"
                  type="textarea"
                  :prop="item.field"
                  :placeholder="item.placeholder"
                  @update:model-value="handleValueChange($event, item.field)"
                  :disabled="item.disable"
                />
              </template>
              <template v-else-if="item.type == 'selfDefine'">
                <div>
                  <div
                    v-for="(meItem, index) in modelValue[`${item.field}`]"
                    :key="meItem.id"
                    class="select-materials-list"
                  >
                    <el-select
                      class="select-box"
                      :model-value="modelValue[`${item.field}`][index]['id']"
                      @update:model-value="
                        handleMaterialChange($event, item.field, index, 'id')
                      "
                    >
                      <el-option
                        v-for="option in downOptions"
                        :key="option.value"
                        :value="option.value"
                      >{{ option.title }}</el-option>
                    </el-select>
                    <el-input-number
                      class="elect-box-num"
                      :min="1"
                      :max="999"
                      :model-value="modelValue[`${item.field}`][index]['num']"
                      @update:model-value="
                        handleMaterialChange($event, item.field, index, 'num')
                      "
                    ></el-input-number>
                    <span class="del-text" @click="delSelect(index)">删除</span>
                  </div>
                  <el-button class="select-materials-list-btn" @click="addMaterials">添加借机物品</el-button>
                </div>
              </template>
              <template v-else-if="item.type == 'upLoad'">
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :prop="item.field"
                  :disabled="item.disable"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <plus />
                  </el-icon>
                </el-upload>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch, reactive } from 'vue'
import { formItem } from '../type'
import type FormInstance from 'element-plus'
import { ElForm, ElMessage, ElUpload } from 'element-plus'
import { Plus } from '@element-plus/icons'
import type UploadProps from '../../../../node_modules/element-plus/lib'
export default defineComponent({
  components: {
    Plus
  },
  props: {
    formItem: {
      type: Array as PropType<formItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    itemStyle: {
      type: Object,
      default: () => {
        return { padding: '10px 40px' }
      }
    },
    colLayout: {
      type: Object,
      default: () => {
        return {
          xl: 6,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    },
    modelValue: {
      type: Object,
      require: true
    },
    rules: {
      type: Object
    },
    ruleForm: {
      type: Object
    },
    isDisable: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'resetFormConfigRef', 'delSelect'],
  setup(props, { emit }) {
    // 外层的formData【key】=''  这样改能影响到引用
    /*     let formData = ref({ ...props.modelValue })
     */
    let imageUrl = ref('')
    watch(
      () => props.modelValue?.file,
      (newVal) => {
        if (!newVal) {
          imageUrl.value = ''
        }
      },
      {
        deep: true
      }
    )
    watch(
      () => imageUrl,
      (newVal) => {
        console.log(newVal)
      }
    )
    const elNativeFromRef = ref<any>()
    let isMaterialDownsList =
      props.formItem[props.formItem.length - 1]?.field == 'materialIdNumberMap'
    let downOptions = reactive(
      isMaterialDownsList
        ? props.formItem[props.formItem.length - 1]?.downOptions
        : {}
    )
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    const handleMaterialChange = (
      value: any,
      field: string,
      id: number,
      key: string
    ) => {
      let materialValue: any[] = props.modelValue![`${field}`]
      materialValue[id] = { ...materialValue[id], [key]: value }
      emit('update:modelValue', { ...props.modelValue, [field]: materialValue })
      materialValue = []
    }
    const addMaterials = () => {
      emit('resetFormConfigRef')
    }
    const delSelect = (index: number) => {
      emit('delSelect', index)
    }
    const filter = (v: any) => {
      if (v) {
        downOptions = props.formItem[
          props.formItem.length - 1
        ].downOptions.filter((item: any) => {
          // 如果直接包含输入值直接返回true
          const val = v.toLowerCase()
          if (item.name.indexOf(val) !== -1) return true
        })
      } else {
        downOptions = props.formItem[props.formItem.length - 1].downOptions
      }
      // 对绑定数据赋值
    }
    const submitForm = async (
      formEl: typeof ElForm | undefined,
      submitRequest: any
    ) => {
      if (!formEl) return
      await formEl.validate(async (valid: any, fields: any) => {
        if (valid) {
          try {
            submitRequest()
            console.log('submit!')
          } catch (error) {
            ElMessage({
              message: '接口有问题',
              type: 'error',
              duration: 500
            })
          }
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    //处理图片上传
    const beforeAvatarUpload: any = (rawFile: any) => {
      console.log(rawFile)
      imageUrl.value = URL.createObjectURL(rawFile)
      //var fr = new FileReader()
      //console.log(fr.readAsArrayBuffer(rawFile));
      props.modelValue!.file = rawFile
      // props.modelValue!.file = (fr.readAsArrayBuffer(rawFile) as any).result
    }
    return {
      handleValueChange,
      handleMaterialChange,
      addMaterials,
      delSelect,
      filter,
      downOptions,
      elNativeFromRef,
      submitForm,
      //上传图片
      beforeAvatarUpload,
      imageUrl
    }
  }
})
</script>
<style scoped lang="less">
.xh-form {
  padding-top: 22px;
}
.select-materials-list {
  margin: 10px 0;
  .select-box {
    width: 160px;
    margin-right: 6px;
  }
  .select-box-num {
    width: 100px;
  }
  .del-text {
    font-size: 12px;
    margin-left: 4px;
    color: #66b1ff;
  }
}
.select-materials-list-btn {
  margin-top: 10px;
}
.avatar-uploader {
  border: 1px dashed #666666;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #acabab;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
