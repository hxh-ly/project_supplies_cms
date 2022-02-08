<!--  -->
<template>
  <div class="xh-table">
    <div class="header">
      <slot name="header">
        <div class="header-left">{{ title }}</div>
        <div class="header-handle">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column v-if="isShowSelect" type="selection" width="80" align="center" />
      <el-table-column v-if="isShowId" label="id" type="index" width="80" align="center" />

      <template v-for="item in propList" :key="item.prop">
        <el-table-column align="center" v-bind="item" show-overflow-tooltip>
          <template #default="scope">
            <!-- slot 作用域插槽 1写在template上   2 slot传出数据 -->
            <slot :name="item.slotName" :row="scope.row">
              <!-- 默认 -->
              {{ scope.row[`${item.prop}`] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  components: {},
  props: {
    listData: {
      type: Array,
      require: true
    },
    listCount: {
      type: Number,
      require: true
    },
    propList: {
      type: Array,
      require: true
    },
    isShowId: {
      type: Boolean
    },
    isShowSelect: {
      type: Boolean
    },
    title: {
      type: String,
      default: ''
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10
      })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['emitSelectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('emitSelectionChange', value)
    }
    //每页展示条数变了
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    //当前页变了
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
      /* currentPage4 */
    }
  }
})
</script>
<style scoped lang="less">
.xh-table {
  padding: 20px;
  border-top: 30px solid #f5f5f5;
  .header {
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    .header-left {
      color: #111;
      font-size: 29px;
      font-weight: 800;
    }
  }
  .footer {
    margin-top: 15px;

    .el-pagination {
      text-align: right;
    }
  }
}
</style>
