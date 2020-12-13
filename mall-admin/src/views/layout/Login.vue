<template>
  <div class="login">
    <a-form-model class="form" ref="loginFrom" :model="loginFrom" :rules="rules" v-bind="layout">
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="loginFrom.email" type="email" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="pass">
        <a-input v-model="loginFrom.pass" type="password" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('loginFrom')">登录</a-button>
        <a-button style="margin-left: 10px" @click="resetForm('loginFrom')">重置</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const regEmail = /^[\w-]+@[\w-.]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (regEmail.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不对'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'));
      }
      return callback();
    };
    return {
      loginFrom: {
        pass: '',
        email: '',
      },
      rules: {
        //   trigger 触发
        pass: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.loginFrom).then((res) => {
            //   成功 跳转到Home页面
            this.$router.push({
              name: 'Home',
            });
            console.log(res);
          }).catch((err) => {
            //   $messsage是ant-design里面的
            // 错误信息提示
            this.$message.error(err);
          });
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less">
@import url("~@/assets/login.less");
</style>
