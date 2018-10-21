<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-form ref="numberValidateForm" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          :rules="[
            { required: true, message: '请输入数字', trigger: 'blur'},
            { message: '请输入两位小数点的数字', pattern: /^\d+(\.\d{0,2})$/,trigger: 'blur'},
            { type: 'number', message: '请输入数字范围', min: 0,max: 1000,trigger: 'blur'} ]"
          label="age"
          prop="age">
          <el-input v-model.number="numberValidateForm.age" type="number" auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')">Submit</el-button>
          <el-button @click="resetForm('numberValidateForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'NumberFrom',
  data() {
    return {
      numberValidateForm: {
        age: ''
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
	-webkit-appearance: none !important;
	margin: 0;
}
</style>

