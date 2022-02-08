<!--  -->
<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cmps/login-panel.vue'
export default defineComponent({
  components: {
    LoginPanel
  },
  setup(props) {
    return {}
  }
})
</script>
<style scoped lang="less">
.login {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
