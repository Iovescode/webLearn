<template>
  <el-dialog
    :visible="true"
    close-on-click-modal:true
    title="提示"
    width="30%"
    center
    @close="centerDialogVisible">

    <el-form ref="numberValidateForm" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
      <el-form-item
        :rules="kk"
        label="age"
        prop="age">
        <el-input v-model.number="numberValidateForm.age" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">Submit</el-button>
        <el-button @click="resetForm('numberValidateForm')">Reset</el-button>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
  name: 'NumberFrom',
  data() {
    return {
      kk: [{ required: true, message: '请输入文字', trigger: 'change' },
        { required: true, message: '请输入文字不能超出10个字', min: 0, max: 10, trigger: 'change' }],
      numberValidateForm: {
        age: ''
      }
    }
  },

  methods: {
    centerDialogVisible() {
      this.$emit('close-dolg')
    },
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

</style>

