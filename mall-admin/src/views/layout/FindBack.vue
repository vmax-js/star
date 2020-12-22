<template>
  <div class="register">
    <a-form :form="form" @submit="handleSubmit" class="findBackForm">
      <a-form-item v-bind="formItemLayout" label="邮箱">
        <!-- 自动绑定form.email -->
        <a-input
          v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '请输入正确的邮箱格式！',
              },
              {
                required: true,
                message: '请输入邮箱！',
              },
            ],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="新密码" has-feedback>
        <a-input
          v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入新密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
          type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
        <a-input
          v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请确认密码!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="验证码">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input
              v-decorator="[
              'code',
              { rules: [{ required: true, message: '请输入验证码！' }] },
            ]"
            />
          </a-col>
          <a-col :span="12">
            <a-button @click="countDown" :class="{disabled: !this.canClick}">
                {{ content }}</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit" style="margin:0px 10px 30px 0px;">找回</a-button>
        <router-link to="/login">
          <a-button type="primary" style="margin:0px 10px 30px 0px;">去登录</a-button>
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import api from '@/api/user';

export default {
  data() {
    return {
      content: '获取验证码',
      totalTime: 3,
      canClick: true,
      findBackForm: {
        email: '',
        password: '',
        code: '',
      },
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'findBack' });
  },
  methods: {
    countDown() {
      //   console.log(this.form.getFieldsValue());
      //   console.log(this.form.getFieldValue("email"));
      const email = this.form.getFieldValue('email');
      //   this.form.setFieldsValue({ code: 1234 });
      //   console.log(this.form.getFieldsValue());
      // 邮箱为空
      if (!email) {
        return this.$message.error('邮箱为空');
      }
      if (!this.canClick) return false;
      this.canClick = false;
      this.content = `${this.totalTime}s后重新发送`;
      //   获取验证码
      api
        .getCode({ email })
        .then((res) => {
          if (res.status === 'success') {
            console.log('验证码已发送');
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
      const clock = setInterval(() => {
        this.totalTime -= 1;
        this.content = `${this.totalTime}s重新发送`;
        if (this.totalTime < 0) {
          // 当倒计时小于0时清除定时器
          clearInterval(clock);
          this.content = '重新发送验证码';
          this.totalTime = 3;
          this.canClick = true;
        }
      }, 1000);
      return true;
    },
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.findBackForm.email = this.form.getFieldValue('email');
          this.findBackForm.password = this.form.getFieldValue('password');
          this.findBackForm.code = this.form.getFieldValue('code');
          api
            .findBack(this.findBackForm)
            .then((res) => {
              console.log('找回结果', res);
            })
            .catch((err1) => {
              this.$message.error(err1);
            });
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur(e) {
      const { value } = e.target;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const { form } = this;
      if (value && value !== form.getFieldValue('password')) {
        callback('密码不一致！');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const { form } = this;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },
};
</script>
<style lang="less" scoped>
.register {
  overflow: hidden;
  .findBackForm {
    width: 60vw;
    max-width: 400px;
    min-width: 400px;
    margin: 100px auto;
    box-shadow: 1px 1px 10px 1px #0743;
    padding: 6px 46px 0px 0px;
  }
  .disabled {
    background-color: #ddd;
    border-color: #ddd;
    color: #57a3f3;
    cursor: not-allowed; // 鼠标变化
  }
}
</style>
