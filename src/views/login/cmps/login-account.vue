<!--  -->
<template>
  <el-form :model="account" :rules="rules" label-width="60px" ref="formRef">
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password></el-input>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm, ElMessage } from 'element-plus'
import { rules } from '../config'
import localCache from '../../../util/cache'
import { useStore } from 'vuex'
export default defineComponent({
  components: {},
  setup(props) {
    const store = useStore()
    const account = reactive({
      name: localCache.getItem('name') ?? '',
      password: localCache.getItem('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepWord: boolean) => {
      if (isKeepWord) {
        //加密
        console.log('记住密码了')
        localCache.setItem('name', account.name)
        localCache.setItem('password', account.password)
      } else {
        localCache.delItem('name')
        localCache.delItem('password')
      }
      //表单验证
      formRef.value?.validate((valid) => {
        if (valid) {
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          ElMessage({
            message: '验证失败，请检查密码或者账户',
            icon: 'error',
            duration: 500
          })
        }
      })
      //
    }
    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>
<style scoped lang="less"></style>
