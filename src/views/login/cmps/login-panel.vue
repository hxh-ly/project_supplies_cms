<!--  -->
<template>
  <div class="login-panel">
    <h1 class="title">项目物资管理系统</h1>
    <el-tabs type="border-card" stretch v-model="curTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><avatar /></el-icon>账号登录
          </span>
        </template>
        <login-account ref="acountRef" />
      </el-tab-pane>
  <!--     <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><cellphone /></el-icon>手机登录
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane> -->
    </el-tabs>
    <div class="login-ctrl">
      <el-checkbox v-model="isKeepWord" label="记住密码"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLogin(isKeepWord)"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { Avatar, Cellphone } from '@element-plus/icons'
import { defineComponent, ref } from 'vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    Avatar,
    Cellphone,
    loginAccount,
    loginPhone
  },
  setup(props) {
    const isKeepWord = ref(true)
    const curTab = ref('account')
    const acountRef = ref<InstanceType<typeof loginAccount>>()
    const phoneRef = ref<InstanceType<typeof loginPhone>>()
    const handleLogin = (isKeepWord: boolean) => {
      if (curTab.value == 'account') {
        acountRef.value?.loginAction(isKeepWord)
      } else {
        console.log('a')
        phoneRef.value?.loginAction(isKeepWord)
      }
    }
    return {
      a: 'aa',
      isKeepWord,
      handleLogin,
      acountRef,
      phoneRef,
      curTab
    }
  }
})
</script>
<style scoped lang="less">
.login-panel {
  margin-bottom: 200px;
  width: 320px;
  .title {
    text-align: center;
  }
  .login-ctrl {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
