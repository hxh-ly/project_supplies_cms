<!--  -->
<template>
  <div class="phone">
    <el-form :model="phone" :rules="rules" label-width="70px" ref="formRef">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="password">
        <div class="ver-code">
          <el-input v-model="phone.password"></el-input>
          <el-button class="ver-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import localCache from '../../../util/cache'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
export default defineComponent({
  components: {},
  setup(props) {
    const store = useStore()
    const phone = reactive({
      num: '',
      password: ''
    })
    const rules = {
      num: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '长度为5-10个字符',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '验证码必填项',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '长度为5-10个字符',
          trigger: 'blur'
        }
      ]
    }
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepWord: boolean) => {
      console.log('正在登录')
      console.log(isKeepWord)
      if (isKeepWord) {
        //加密
        console.log('记住密码了')
        localCache.setItem('num', phone.num)
      } else {
        localCache.delItem('num')
      }
      formRef.value?.validate((valid) => {
        store.dispatch('login/phoneLoginAction', { ...phone })
      })
    }

    return {
      phone,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>
<style scoped lang="less">
.ver-code {
  display: flex;
}
.ver-btn {
  margin-left: 5px;
}
</style>
