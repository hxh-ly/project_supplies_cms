<!--  -->
<template>
  <div class="xh-form">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItem" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item v-if="!item.isHidden" :label="item.label" :style="itemStyle">
              <template v-if="item.type == 'input' || item.type == 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type == 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type == 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                ></el-date-picker>
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
import { defineComponent, PropType, ref, watch } from 'vue'
import { formItem } from '../type'
export default defineComponent({
  components: {},
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
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 外层的formData【key】=''  这样改能影响到引用
    /*     let formData = ref({ ...props.modelValue })
     */
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      handleValueChange
    }
  }
})
</script>
<style scoped lang="less">
.xh-form {
  padding-top: 22px;
}
</style>
