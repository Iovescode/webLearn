<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :show="show"
      title="title"
      @close="closeDialog">
      <el-form ref="numberValidateForm" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          :rules="[
            { required: true, message: '年龄不能为空'},
            { type: 'number', message: '年龄必须为数字值'}
          ]"
          label="年龄"
          prop="age"
        >
          <el-input v-model.number="numberValidateForm.age" size="mini" controls-position="right" @keydown.native="inputLimit" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const inputLimit = function(e) {
  const num = e.target.value || ''
  const code = e.which || e.keyCode
  const str = (e.key && e.key !== 'Unidentified') ? e.key : num.substr(num.length - 1)
  console.log('|type:' + e.type + '|code:' + code + '|str:' + str + '|value:' + num)
  // 无论任何情况，皆可执行
  if (code === '8') {
    return true
  }
  // 没有满足任何一种情况，中断执行
  if (!(/[\d.]/.test(str) || code === '190')) {
    e.returnValue = false
    return false
  }
  if (num.length > 12 ||
			(num.indexOf('.') >= 0 && code === '190') ||
			((num.indexOf('.') === num.length - 3) && num.length > 3) ||
			(num.length === 0 && code === '190')) {
    e.returnValue = false
    return false
  }
  return true
}

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.show,
      numberValidateForm: {
        age: ''
      }
    }
  },
  watch: {
    show() {
      this.visible = this.show
    }
  },
  mounted() {
    // console.log(555);
  },
  methods: {
    inputLimit: inputLimit,
    closeDialog() {
      this.$emit('update:show', false)
    },

    handleClick() {
      this.numberValidateForm.age = this.numberValidateForm.age.replace(/[^\d]/g, '')
      console.log(56468)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid, 555)
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
    },
    proving1() {
      this.single_bet_min.value = this.single_bet_min.value.replace(/[^\.\d]/g, '')
      this.single_bet_min.value = this.single_bet_min.value.replace('.', '')
    }
  }
}
</script>
