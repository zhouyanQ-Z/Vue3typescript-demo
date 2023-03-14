<template>
  <div class="login-container">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="login-form"
    >
      <h2 class="form-title">后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button
        >
        <el-button class="reset-btn" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,ref,getCurrentInstance,ComponentInternalInstance } from "vue";
import { useRouter } from 'vue-router'
import { LoginData } from '@/type/login';
import type { FormInstance,FormRules } from 'element-plus';
import { loginApi } from '@/request/api';



export default defineComponent({
  setup() {

    const data = reactive(new LoginData());

    const rules:FormRules = {
      username: [{required: true,message: '请输入账号',trigger: 'blur'},{min: 3,max:10,message: '账号的长度在3到10之间',trigger:'blur'}],
      password: [{required: true,message: '请输入密码',trigger: 'blur'},{min: 3,max:10,message: '密码的长度在3到10之间',trigger:'blur'}]
    }

    const ruleFormRef = ref<FormInstance>();
    // 获取全局变量
    //const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const router = useRouter();

    // 登录
    const submitForm = (formEl:FormInstance | undefined) => {
      if(!formEl) return;
      formEl.validate(function(valid) {
        if(valid) {
          loginApi(data.ruleForm).then(res => {
            //保存token
            localStorage.setItem('token',res.data.token);
            // 跳转页面
            //proxy?.$router.push('/');
            router.push('/')
          })
        }
      })
    };


    //重置
    const resetForm = (formEl:FormInstance| undefined) => {
      if(!formEl) return;
      formEl.resetFields();
    };


    return {
      ...toRefs(data),
      rules,
      submitForm,
      resetForm,
      ruleFormRef
    };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: url("../../assets/bg.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  position: relative;

  .login-form {
    width: 400px;
    padding: 50px;
    margin: 100px auto;
    background-color: #fff;
    //opacity: .4;
    border-radius: 20px;
    position: absolute;
    top: 0;
    right: 100px;
  }

  .form-title {
    margin-bottom: 20px;
  }

  .btn-box {
    .login-btn,.reset-btn{
      width: 46%;
    }
  }
  
}
</style>
