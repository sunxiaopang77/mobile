<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!-- /导航栏 -->

    <!--
      ValidationProvider 是验证插件提供的一个全局组件
        rules="secret" 配置验证规则
        v-slot="{ errors }" 获取验证相关的结果参数
        errors[0] 用来获取验证失败的错误消息
     -->
    <!-- <ValidationProvider rules="required|email" name="手机号" v-slot="{ errors }">
      <input v-model="user.mobile" type="text">
      <span>{{ errors[0] }}</span>
    </ValidationProvider> -->

    <!-- 登录表单 -->
    <!--
      ValidationObserver 组件会渲染成一个 form 表单
      可以通过 ref 调用这个组件的方法：validate 来进行 js 验证
     -->
    <ValidationObserver tag="form" ref="loginForm">
      <!--
        把需要验证的字段使用 ValidationProvider 包裹起来
        在其上面配置对应的验证规则等信息
       -->
      <ValidationProvider tag="div" name="手机号" rules="required|phone" v-slot="{ errors }">
        <van-field
          v-model="user.mobile"
          required
          clearable
          label="手机号"
          placeholder="请输入手机号"
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <ValidationProvider tag="div" name="验证码" rules="required" v-slot="{ errors }">
        <van-field
          v-model="user.code"
          type="password"
          label="验证码"
          placeholder="请输入验证码"
          required
          :error-message="errors[0]"
        />
      </ValidationProvider>
    </ValidationObserver>
    <!-- /登录表单 -->
    <!-- 登录按钮 -->
    <div class="login-wrap">
      <van-button type="info" :loading="isLoginLoading" @click="onLogin">登录</van-button>
    </div>
    <!-- /登录按钮 -->
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '15201230123',
        code: '246810'
      },
      isLoginLoading: false // 控制登录按钮的 loading 状态
    }
  },

  methods: {
    async onLogin () {
      // 获取表单数据
      // 发送请求
      try {
        // 表单验证
        const isValid = await this.$refs.loginForm.validate()

        // 验证失败，则什么都不做
        if (!isValid) {
          return
        }

        // 验证通过，提交表单
        this.isLoginLoading = true
        const res = await login(this.user)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        }
      }

      // 无论登录成功与否，都停止 loading
      this.isLoginLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .login-wrap {
    padding: 20px;
    .van-button {
      width: 100%;
    }
  }
}
</style>
